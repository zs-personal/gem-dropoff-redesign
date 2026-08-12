import { useEffect, useRef, useState } from "react";
import type { Copy } from "../copy";
import type { Lang } from "../types";
import { missions } from "../data/missions";
import { useReveal } from "../hooks/useReveal";
import { asset } from "../lib/asset";
import { Button, cx } from "./ui";

interface Props {
  t: Copy;
  lang: Lang;
  locating: boolean;
  error: string | null;
  originLabel: string | null;
  onZipSubmit: (zip: string) => void;
  onUseLocation: () => void;
}

export default function Hero({ t, lang, locating, error, originLabel, onZipSubmit, onUseLocation }: Props) {
  const [zip, setZip] = useState("");
  const imageRef = useRef<HTMLDivElement>(null);
  const { ref, className } = useReveal<HTMLDivElement>(0.05);
  const active = missions.filter((m) => m.active);

  // gentle parallax drift on the backdrop
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const node = imageRef.current;
        if (!node) return;
        node.style.transform = `translate3d(0, ${Math.min(window.scrollY, 900) * 0.22}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink">
      <div ref={imageRef} className="absolute inset-0 -z-10 will-change-transform">
        <img
          src={asset("/missions/venezuela.webp")}
          alt="Equipos de rescate trabajando entre los escombros de un edificio colapsado tras el terremoto"
          className="ken-burns size-full object-cover object-center"
          fetchPriority="high"
        />
      </div>

      {/* legibility scrims */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,11,12,0.86)_0%,rgba(11,11,12,0.45)_38%,rgba(11,11,12,0.82)_82%,#0b0b0c_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_15%_70%,rgba(11,11,12,0.8)_0%,transparent_60%)]"
      />

      <div
        ref={ref}
        className={cx(
          "mx-auto grid min-h-[88vh] max-w-[1320px] grid-cols-1 items-end gap-10 px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:grid-cols-12 lg:gap-10",
          className,
        )}
      >
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
            <span className="pulse-ring inline-block size-2 rounded-full bg-alert" />
            <span className="label-xs text-white">{t.hero.badge}</span>
          </span>

          <p className="label-xs mt-7 text-orange">{t.hero.eyebrow}</p>

          <h1 className="display mt-4 text-[2rem] text-white sm:text-[3.3rem] lg:text-[4.1rem] xl:text-[4.6rem]">
            {t.hero.title.map((line, i) => (
              <span key={line} className="line-mask" style={{ ["--d" as string]: `${120 + i * 130}ms` }}>
                <span>{line}</span>
              </span>
            ))}
          </h1>

          <p
            className="reveal mt-6 max-w-xl text-[15.5px] leading-relaxed text-white/70 sm:text-[16.5px]"
            style={{ ["--d" as string]: "460ms" }}
          >
            {t.hero.lede}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onZipSubmit(zip.trim());
            }}
            className="reveal mt-9 max-w-xl"
            style={{ ["--d" as string]: "580ms" }}
          >
            <div className="flex flex-col gap-2 rounded-[4px] border border-white/20 bg-white/10 p-2 backdrop-blur-xl sm:flex-row sm:items-center">
              <label className="flex flex-1 items-center gap-3 px-4 py-2.5 sm:py-1">
                <span className="label-xs shrink-0 text-white/50">{t.hero.zipLabel}</span>
                <input
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  inputMode="numeric"
                  aria-label={t.hero.zipLabel}
                  placeholder={t.hero.zipPlaceholder}
                  className="w-full bg-transparent font-display text-2xl font-semibold tracking-wide text-white outline-none placeholder:text-white/35"
                />
              </label>
              <Button type="submit" size="lg" className="sm:min-w-[132px]">
                {t.hero.submit}
              </Button>
            </div>
          </form>

          <div
            className="reveal mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]"
            style={{ ["--d" as string]: "660ms" }}
          >
            <button
              onClick={onUseLocation}
              disabled={locating}
              className="font-semibold text-white underline decoration-orange decoration-2 underline-offset-[6px] transition-colors hover:text-orange disabled:opacity-60"
            >
              {locating ? t.hero.geoLoading : t.hero.geo}
            </button>
            {originLabel && (
              <span className="rounded-full bg-orange px-3 py-1 text-[11.5px] font-semibold text-white">
                {originLabel}
              </span>
            )}
            {error && <span className="font-medium text-amber">{error}</span>}
          </div>
        </div>

        {/* active missions panel */}
        <aside
          className="reveal lg:col-span-5 lg:justify-self-end lg:pb-2"
          style={{ ["--d" as string]: "760ms" }}
        >
          <div className="w-full rounded-[4px] border border-white/15 bg-white/8 p-5 backdrop-blur-xl sm:p-6 lg:max-w-[420px]">
            <div className="flex items-center justify-between">
              <span className="label-xs text-white/55">{t.missions.title}</span>
              <span className="label-xs text-orange">GEM 2026</span>
            </div>

            <ul className="mt-5 space-y-3">
              {active.map((mission) => (
                <li key={mission.id}>
                  <a
                    href="#misiones"
                    className="group flex items-center gap-4 rounded-[3px] border border-white/10 bg-ink/40 p-2.5 transition-colors hover:border-orange/60"
                  >
                    <span className="h-14 w-20 shrink-0 overflow-hidden rounded-[2px]">
                      <img
                        src={asset(mission.image)}
                        alt=""
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-[13.5px] font-semibold uppercase tracking-wide text-white">
                        {mission.title[lang]}
                      </span>
                      <span className="mt-1 flex items-center gap-2 text-[11.5px] text-white/50">
                        <span className="pulse-ring inline-block size-1.5 rounded-full bg-alert" />
                        {t.missions.active} · {mission.place[lang]}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#misiones"
              className="label-xs mt-5 inline-flex items-center gap-2 text-white transition-colors hover:text-orange"
            >
              {t.missions.recent}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </aside>
      </div>

      <span className="scroll-cue pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="label-xs text-white/50">{t.hero.scroll}</span>
        <span className="h-8 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </span>
    </section>
  );
}
