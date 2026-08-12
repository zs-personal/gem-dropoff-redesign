import type { Copy } from "../copy";
import { DONATE_URL } from "../config";
import { useReveal } from "../hooks/useReveal";
import { ButtonLink, Kicker, cx } from "./ui";

export default function Give({ t }: { t: Copy }) {
  const { ref, className } = useReveal<HTMLDivElement>(0.12);

  return (
    <section id="donar-dinero" className="bg-bone">
      <div ref={ref} className={cx("mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-24", className)}>
        <div className="reveal grid items-center gap-10 rounded-[4px] border border-hairline bg-white p-7 shadow-card sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-12">
          <div className="lg:col-span-7">
            <Kicker>{t.give.eyebrow}</Kicker>
            <h2 className="display mt-5 text-[1.9rem] sm:text-[2.6rem]">{t.give.title}</h2>
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-slate-ink">{t.give.lede}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {t.give.funds.map((fund) => (
                <li
                  key={fund}
                  className="rounded-full border border-hairline bg-bone px-3.5 py-1.5 text-[12px] font-medium text-slate-ink"
                >
                  {fund}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-hairline lg:pl-14">
            <p className="display text-[3.4rem] leading-none text-alert sm:text-[4rem]">{t.give.stat}</p>
            <p className="mt-2.5 max-w-[15rem] font-display text-[14px] font-semibold uppercase leading-snug tracking-wide text-ink">
              {t.give.statLabel}
            </p>
            <p className="mt-2 text-[12.5px] text-slate-faint">{t.give.overhead}</p>

            <ButtonLink href={DONATE_URL} size="lg" className="mt-7 w-full">
              {t.give.action}
              <span aria-hidden="true">↗</span>
            </ButtonLink>

            <p className="mt-3.5 text-[12px] text-slate-faint">{t.give.secure}</p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-faint/85">{t.give.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
