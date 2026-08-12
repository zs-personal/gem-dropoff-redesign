import type { Copy } from "../copy";
import { useReveal } from "../hooks/useReveal";
import { asset } from "../lib/asset";
import { SectionHead, cx } from "./ui";

export default function HowItWorks({ t }: { t: Copy }) {
  const { ref, className } = useReveal<HTMLDivElement>(0.12);

  return (
    <section id="como" className="bg-white">
      <div ref={ref} className={cx("mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28", className)}>
        <div className="reveal">
          <SectionHead kicker={t.how.eyebrow} title={t.how.title} lede={t.how.lede} />
        </div>

        <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {t.how.steps.map((step, i) => (
            <li key={step.title} className="reveal group" style={{ ["--d" as string]: `${i * 140}ms` }}>
              <div className="relative overflow-hidden rounded-[4px]">
                <div className="aspect-[4/3] overflow-hidden bg-bone">
                  <img
                    src={asset(step.image)}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <span className="absolute left-0 top-0 flex size-14 items-center justify-center bg-orange font-display text-[1.4rem] font-extrabold text-white">
                  0{i + 1}
                </span>
              </div>

              <h3 className="display mt-6 text-[1.35rem] text-ink">{step.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-slate-ink">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
