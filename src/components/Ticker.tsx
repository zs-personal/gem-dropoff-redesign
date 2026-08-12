import type { Copy } from "../copy";

export default function Ticker({ t, receiving }: { t: Copy; receiving: number }) {
  const items = [t.live(receiving), ...t.ticker];
  // duplicated so the -50% keyframe loops seamlessly
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-orange-deep/40 bg-orange py-3.5">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className="label-xs flex items-center whitespace-nowrap text-white">
            {item}
            <span aria-hidden="true" className="mx-6 text-white/55">
              ✱
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
