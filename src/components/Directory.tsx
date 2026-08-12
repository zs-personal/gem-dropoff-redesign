import { useEffect, useState } from "react";
import type { Copy } from "../copy";
import type { Filter, Lang, Origin, RankedCenter, Sort } from "../types";
import { useReveal } from "../hooks/useReveal";
import CenterCard from "./CenterCard";
import CenterMap from "./CenterMap";
import { Search } from "./Icons";
import { Button, SectionHead, cx } from "./ui";

const PAGE = 10;

interface Props {
  t: Copy;
  lang: Lang;
  centers: RankedCenter[];
  origin: Origin | null;
  query: string;
  onQuery: (value: string) => void;
  filter: Filter;
  onFilter: (value: Filter) => void;
  sort: Sort;
  onSort: (value: Sort) => void;
  onReset: () => void;
}

export default function Directory({
  t,
  lang,
  centers,
  origin,
  query,
  onQuery,
  filter,
  onFilter,
  sort,
  onSort,
  onReset,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [focus, setFocus] = useState<{ id: string; nonce: number } | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [visible, setVisible] = useState(PAGE);
  const { ref, className } = useReveal<HTMLDivElement>(0.05);

  useEffect(() => setVisible(PAGE), [query, filter, sort, origin]);

  const shown = centers.slice(0, visible);
  const remaining = centers.length - shown.length;
  const dirty = query !== "" || filter !== "all";

  const filters: { key: Filter; label: string }[] = [
    { key: "receiving", label: t.directory.filters.receiving },
    { key: "all", label: t.directory.filters.all },
    { key: "warehouse", label: t.directory.filters.warehouse },
  ];

  const showOnMap = (id: string) => {
    setActiveId(id);
    setFocus({ id, nonce: Date.now() });
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setMobileView("map");
      document.getElementById("mapa")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="centros" className="bg-bone">
      <div ref={ref} className={cx("mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-24", className)}>
        <div className="reveal">
          <SectionHead kicker={t.directory.eyebrow} title={t.directory.title} lede={t.directory.lede} />
        </div>

        {/* toolbar */}
        <div className="reveal mt-10 flex flex-col gap-3 rounded-[4px] border border-hairline bg-white p-3 lg:flex-row lg:items-center">
          <label className="flex flex-1 items-center gap-3 rounded-[3px] bg-bone px-4 py-3">
            <Search className="size-4 shrink-0 text-slate-faint" />
            <span className="sr-only">{t.directory.search}</span>
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder={t.directory.search}
              className="w-full bg-transparent text-[14px] outline-none placeholder:text-slate-faint"
            />
            {query && (
              <button
                onClick={() => onQuery("")}
                className="label-xs shrink-0 text-slate-faint hover:text-ink"
              >
                {t.directory.clear}
              </button>
            )}
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-[3px] border border-hairline">
              {filters.map((item) => (
                <button
                  key={item.key}
                  onClick={() => onFilter(item.key)}
                  aria-pressed={filter === item.key}
                  className={cx(
                    "label-xs px-3.5 py-2.5 transition-colors",
                    filter === item.key ? "bg-ink text-white" : "text-slate-ink hover:text-ink",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2">
              <span className="label-xs hidden text-slate-faint sm:inline">{t.directory.sortLabel}</span>
              <select
                value={sort}
                onChange={(e) => onSort(e.target.value as Sort)}
                className="label-xs rounded-[3px] border border-hairline bg-white px-3 py-2.5 text-ink outline-none"
              >
                <option value="name">{t.directory.sort.name}</option>
                <option value="near" disabled={!origin}>
                  {t.directory.sort.near}
                </option>
              </select>
            </label>
          </div>
        </div>

        <div className="reveal mt-5 flex items-center justify-between gap-3">
          <p className="label-xs text-slate-ink">
            {origin ? t.directory.resultsNear(centers.length, origin.label) : t.directory.results(centers.length)}
          </p>

          <div className="flex items-center rounded-[3px] border border-hairline bg-white lg:hidden">
            {(["list", "map"] as const).map((view) => (
              <button
                key={view}
                onClick={() => setMobileView(view)}
                aria-pressed={mobileView === view}
                className={cx(
                  "label-xs px-3.5 py-2 transition-colors",
                  mobileView === view ? "bg-ink text-white" : "text-slate-ink",
                )}
              >
                {view === "list" ? t.directory.listTab : t.directory.mapTab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-12">
          <div className={cx("lg:col-span-7", mobileView === "map" && "hidden lg:block")}>
            {centers.length === 0 ? (
              <div className="rounded-[4px] border border-dashed border-hairline bg-white px-6 py-16 text-center">
                <p className="display text-[1.4rem]">{t.directory.empty.title}</p>
                <p className="mx-auto mt-2 max-w-xs text-[13.5px] text-slate-ink">{t.directory.empty.body}</p>
                {dirty && (
                  <Button variant="outline" size="sm" className="mt-6" onClick={onReset}>
                    {t.directory.empty.action}
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {shown.map((center) => (
                    <CenterCard
                      key={center.id}
                      center={center}
                      t={t}
                      lang={lang}
                      active={activeId === center.id}
                      onActivate={setActiveId}
                      onShowOnMap={showOnMap}
                    />
                  ))}
                </div>

                {remaining > 0 && (
                  <div className="mt-8 flex flex-col items-center gap-2.5">
                    <Button variant="outline" onClick={() => setVisible((v) => v + PAGE)}>
                      {t.directory.more(Math.min(PAGE, remaining))}
                    </Button>
                    <span className="text-[12px] text-slate-faint">
                      {t.directory.showing(shown.length, centers.length)}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          <div id="mapa" className={cx("lg:col-span-5", mobileView === "list" && "hidden lg:block")}>
            <div className="lg:sticky lg:top-24">
              <div className="h-[440px] overflow-hidden rounded-[4px] border border-hairline bg-white lg:h-[calc(100vh-9rem)] lg:max-h-[780px]">
                <CenterMap
                  centers={centers}
                  activeId={activeId}
                  focus={focus}
                  origin={origin}
                  onActivate={setActiveId}
                  t={t}
                />
              </div>
              <p className="mt-2.5 px-1 text-[11.5px] text-slate-faint">
                {lang === "es"
                  ? "Haz clic en el mapa para activar el zoom con la rueda."
                  : "Click the map to enable scroll zoom."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
