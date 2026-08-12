import type { Copy } from "../copy";
import { useReveal } from "../hooks/useReveal";
import { Bottle, Can, Droplet, Pill, Soap, Tent } from "./Icons";
import { SectionHead, cx } from "./ui";

const glyphs = [Pill, Can, Soap, Bottle, Tent, Droplet];

export default function WhatToDonate({ t }: { t: Copy }) {
  const { ref, className } = useReveal<HTMLDivElement>(0.12);

  return (
    <section id="donar" className="bg-white">
      <div ref={ref} className={cx("mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28", className)}>
        <div className="reveal">
          <SectionHead kicker={t.what.eyebrow} title={t.what.title} lede={t.what.lede} />
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {t.what.items.map((item, i) => {
            const Glyph = glyphs[i];
            return (
              <li
                key={item.label}
                className="reveal group flex items-center gap-5 bg-white px-6 py-7 transition-colors duration-300 hover:bg-bone"
                style={{ ["--d" as string]: `${i * 70}ms` }}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-[3px] bg-orange/10 p-3 text-orange transition-all duration-300 group-hover:bg-orange group-hover:text-white">
                  <Glyph />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[14px] font-semibold uppercase leading-snug tracking-wide text-ink">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-[13px] text-slate-faint">{item.note}</span>
                </span>
              </li>
            );
          })}
        </ul>

        <p className="reveal mt-5 text-[12.5px] italic text-slate-faint">{t.what.disclaimer}</p>
      </div>
    </section>
  );
}
