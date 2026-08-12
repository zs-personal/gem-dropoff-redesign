import type { Copy } from "../copy";
import type { Lang } from "../types";
import { missions } from "../data/missions";
import { useReveal } from "../hooks/useReveal";
import { asset } from "../lib/asset";
import { SectionHead, cx } from "./ui";

export default function Missions({ t, lang }: { t: Copy; lang: Lang }) {
  const { ref, className } = useReveal<HTMLDivElement>(0.12);
  const active = missions.filter((m) => m.active);
  const recent = missions.filter((m) => !m.active);

  return (
    <section id="misiones" className="bg-ink pb-20 sm:pb-28">
      <div ref={ref} className={cx("mx-auto max-w-[1320px] px-5 sm:px-8", className)}>
        <div className="reveal">
          <SectionHead kicker={t.missions.eyebrow} title={t.missions.title} lede={t.missions.lede} tone="light" />
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {active.map((mission, i) => (
            <article
              key={mission.id}
              className="reveal group relative overflow-hidden rounded-[4px] border border-white/10"
              style={{ ["--d" as string]: `${i * 130}ms` }}
            >
              <div className="aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
                <img
                  src={asset(mission.image)}
                  alt={mission.title[lang]}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                />
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.15)_0%,rgba(11,11,12,0.55)_45%,rgba(11,11,12,0.95)_100%)]"
              />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-alert px-2.5 py-1">
                    <span className="pulse-ring inline-block size-1.5 rounded-full bg-white" />
                    <span className="label-xs text-white">{t.missions.active}</span>
                  </span>
                  <span className="label-xs text-white/60">
                    {mission.year} · {mission.place[lang]}
                  </span>
                </div>

                <h3 className="display mt-4 text-[1.9rem] text-white sm:text-[2.4rem]">{mission.title[lang]}</h3>

                <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-white/70">{mission.blurb[lang]}</p>

                <span className="mt-5 block h-[3px] w-0 bg-orange transition-all duration-500 group-hover:w-24" />
              </div>
            </article>
          ))}
        </div>

        <div className="reveal mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-5">
            <h3 className="display text-[1.5rem] text-white sm:text-[1.9rem]">{t.missions.recent}</h3>
            <p className="max-w-md text-[13.5px] text-white/50">{t.missions.recentLede}</p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((mission, i) => (
              <article
                key={mission.id}
                className="reveal group overflow-hidden rounded-[3px] border border-white/10 bg-ink-2"
                style={{ ["--d" as string]: `${i * 90}ms` }}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={asset(mission.image)}
                    alt={mission.title[lang]}
                    loading="lazy"
                    className="size-full object-cover opacity-85 transition-all duration-[900ms] group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <div className="p-4">
                  <span className="label-xs text-orange">{mission.year}</span>
                  <h4 className="mt-2 font-display text-[14.5px] font-semibold uppercase leading-tight tracking-wide text-white">
                    {mission.title[lang]}
                  </h4>
                  <p className="mt-1.5 text-[12px] text-white/45">{mission.place[lang]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
