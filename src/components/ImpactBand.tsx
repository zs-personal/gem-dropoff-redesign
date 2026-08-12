import { useEffect, useRef } from "react";
import type { Copy } from "../copy";
import { useReveal } from "../hooks/useReveal";
import { asset } from "../lib/asset";
import { cx } from "./ui";

export default function ImpactBand({ t }: { t: Copy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { ref, className } = useReveal<HTMLDivElement>(0.25);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const image = imageRef.current;
        if (!section || !image) return;
        const rect = section.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        // -1 when the band is entering from below, 1 when it has passed above
        const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        image.style.transform = `translate3d(0, ${progress * -70}px, 0) scale(1.18)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-ink">
      <img
        ref={imageRef}
        src={asset("/missions/doral-volunteers.jpg")}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 size-full scale-[1.18] object-cover will-change-transform"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,rgba(11,11,12,0.94)_20%,rgba(11,11,12,0.72)_100%)]"
      />

      <div
        ref={ref}
        className={cx("mx-auto flex min-h-[52vh] max-w-[1320px] items-center px-5 py-20 sm:px-8 sm:py-28", className)}
      >
        <figure className="reveal max-w-3xl">
          <figcaption className="label-xs text-orange">{t.impact.context}</figcaption>
          <blockquote className="display mt-6 text-[1.7rem] leading-[1.12] text-white sm:text-[2.5rem] lg:text-[3rem]">
            “{t.impact.quote}”
          </blockquote>
          <figcaption className="mt-7 flex items-center gap-3.5">
            <span className="h-px w-10 bg-orange" />
            <span className="label-xs text-white/60">{t.impact.source}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
