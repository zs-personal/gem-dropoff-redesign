import { useCallback, useEffect, useMemo, useState } from "react";
import centersData from "./data/centers.json";
import { missions } from "./data/missions";
import { copy } from "./copy";
import type { Center, Filter, Lang, Origin, RankedCenter, Sort } from "./types";
import { distanceMiles, lookupZip } from "./lib/geo";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Stats from "./components/Stats";
import Missions from "./components/Missions";
import HowItWorks from "./components/HowItWorks";
import ImpactBand from "./components/ImpactBand";
import Directory from "./components/Directory";
import WhatToDonate from "./components/WhatToDonate";
import Register from "./components/Register";
import Footer from "./components/Footer";

const centers = centersData as Center[];

const STATS = {
  total: centers.length,
  receiving: centers.filter((c) => c.status === "receiving").length,
  full: centers.filter((c) => c.status === "full").length,
  cities: new Set(centers.map((c) => c.city).filter(Boolean)).size,
  missions: missions.filter((m) => m.active).length,
};

export default function App() {
  // Spanish is the primary audience; English is opt-in.
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang | null) ?? "es");
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("name");
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = copy[lang];

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const ranked = useMemo<RankedCenter[]>(() => {
    const needle = query.trim().toLowerCase();
    let list: RankedCenter[] = centers.map((center) => ({
      ...center,
      distanceMi: origin ? distanceMiles(origin, center) : null,
    }));

    if (filter === "receiving") list = list.filter((c) => c.status === "receiving");
    if (filter === "warehouse") list = list.filter((c) => c.kind === "warehouse");

    if (needle) {
      list = list.filter((c) =>
        [c.displayName, c.city ?? "", c.address, c.zip].some((field) => field.toLowerCase().includes(needle)),
      );
    }

    // Receiving centers always sit above full ones; the chosen sort breaks ties.
    return list.sort((a, b) => {
      if (a.status !== b.status) return a.status === "receiving" ? -1 : 1;
      if (sort === "near" && a.distanceMi !== null && b.distanceMi !== null) {
        return a.distanceMi - b.distanceMi;
      }
      return a.displayName.localeCompare(b.displayName, lang === "es" ? "es" : "en");
    });
  }, [query, filter, sort, origin, lang]);

  const applyOrigin = useCallback((next: Origin) => {
    setOrigin(next);
    setSort("near");
    setError(null);
    requestAnimationFrame(() => {
      document.getElementById("centros")?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  const handleZip = useCallback(
    async (zip: string) => {
      if (zip.length !== 5) {
        setError(t.hero.zipError);
        return;
      }
      const hit = await lookupZip(zip);
      if (!hit) {
        setError(t.hero.zipError);
        return;
      }
      applyOrigin({ lat: hit.lat, lng: hit.lng, label: `${zip} · ${hit.city}, ${hit.state}` });
    },
    [applyOrigin, t],
  );

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) {
      setError(t.hero.geoError);
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        applyOrigin({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: lang === "es" ? "Tu ubicación" : "Your location",
        });
      },
      () => {
        setLocating(false);
        setError(t.hero.geoError);
      },
      { timeout: 8000 },
    );
  }, [applyOrigin, lang, t]);

  return (
    <>
      <Header t={t} lang={lang} onLang={setLang} receiving={STATS.receiving} />
      <main>
        <Hero
          t={t}
          lang={lang}
          locating={locating}
          error={error}
          originLabel={origin?.label ?? null}
          onZipSubmit={handleZip}
          onUseLocation={handleLocate}
        />
        <Ticker t={t} receiving={STATS.receiving} />
        <Stats t={t} stats={STATS} />
        <Missions t={t} lang={lang} />
        <HowItWorks t={t} />
        <ImpactBand t={t} />
        <Directory
          t={t}
          lang={lang}
          centers={ranked}
          origin={origin}
          query={query}
          onQuery={setQuery}
          filter={filter}
          onFilter={setFilter}
          sort={sort}
          onSort={setSort}
          onReset={() => {
            setQuery("");
            setFilter("all");
          }}
        />
        <WhatToDonate t={t} />
        <Register t={t} />
      </main>
      <Footer t={t} total={STATS.total} />
    </>
  );
}
