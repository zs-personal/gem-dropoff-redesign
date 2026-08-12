import type { Copy } from "../copy";
import { useCountUp } from "../hooks/useCountUp";
import { useReveal } from "../hooks/useReveal";
import { cx } from "./ui";

interface Props {
  t: Copy;
  stats: { total: number; receiving: number; cities: number; missions: number };
}

function Stat({ value, label, active, delay }: { value: number; label: string; active: boolean; delay: number }) {
  const shown = useCountUp(value, active);
  return (
    <div className="reveal border-t border-white/15 pt-6" style={{ ["--d" as string]: `${delay}ms` }}>
      <span className="display block text-[3.6rem] leading-none text-orange sm:text-[4.4rem]">{shown}</span>
      <span className="mt-3 block max-w-[9rem] text-[13px] leading-snug text-white/55">{label}</span>
    </div>
  );
}

export default function Stats({ t, stats }: Props) {
  const { ref, seen, className } = useReveal<HTMLDivElement>(0.3);

  const items = [
    { value: stats.receiving, label: t.stats.receiving },
    { value: stats.total, label: t.stats.centers },
    { value: stats.cities, label: t.stats.cities },
    { value: stats.missions, label: t.stats.missions },
  ];

  return (
    <section className="bg-ink">
      <div
        ref={ref}
        className={cx("mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-20", className)}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4">
          {items.map((item, i) => (
            <Stat key={item.label} value={item.value} label={item.label} active={seen} delay={i * 110} />
          ))}
        </div>
      </div>
    </section>
  );
}
