import type { Copy } from "../copy";
import { asset } from "../lib/asset";

export default function Footer({ t, total }: { t: Copy; total: number }) {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            {/* the wordmark ships as pure black art, so it is inverted for the dark footer */}
            <img
              src={asset("/brand/gem-logo-light.webp")}
              alt="Global Empowerment Mission"
              className="h-9 w-auto invert"
              loading="lazy"
            />
            <p className="mt-5 text-[13.5px] leading-relaxed text-white/55">{t.footer.tagline}</p>
          </div>

          <div className="max-w-xs">
            <p className="label-xs text-orange">{t.footer.concept}</p>
            <p className="mt-3 text-[13px] leading-relaxed text-white/55">{t.footer.conceptBody}</p>
            <p className="mt-2 text-[12px] text-white/35">{t.footer.dataNote(total)}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[12px] text-white/35">
          <span>{t.footer.rights}</span>
          <span>© {new Date().getFullYear()} · Global Empowerment Mission</span>
        </div>
      </div>
    </footer>
  );
}
