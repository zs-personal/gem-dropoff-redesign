import { useEffect, useRef, useState } from "react";
import type { Copy } from "../copy";
import { asset } from "../lib/asset";
import { Button } from "./ui";

interface Props {
  t: Copy;
  locating: boolean;
  onZipSubmit: (zip: string) => Promise<boolean>;
  onUseLocation: () => void;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function WelcomeModal({ t, locating, onZipSubmit, onUseLocation, onClose }: Props) {
  const [zip, setZip] = useState("");
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const restoreFocusTo = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusTo?.focus();
    };
  }, [onClose]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = await onZipSubmit(zip.trim());
    if (found) onClose();
    else setError(t.hero.zipError);
  };

  const handleRegister = () => {
    onClose();
    requestAnimationFrame(() => {
      document.getElementById("registrar")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      <button
        aria-label={t.welcome.close}
        onClick={onClose}
        className="modal-backdrop absolute inset-0 cursor-default bg-ink/85 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        className="modal-panel relative max-h-full w-full max-w-lg overflow-y-auto rounded-[4px] bg-white shadow-float"
      >
        <div className="relative h-24 overflow-hidden sm:h-28">
          <img
            src={asset("/missions/doral-volunteers.jpg")}
            alt=""
            className="size-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.6),rgba(11,11,12,0.88))]"
          />
          {/* the wordmark ships as black art, so it is inverted for the dark strip */}
          <img
            src={asset("/brand/gem-logo-light.webp")}
            alt="Global Empowerment Mission"
            className="absolute left-6 top-1/2 h-6 w-auto -translate-y-1/2 invert sm:h-7"
          />
          <button
            onClick={onClose}
            aria-label={t.welcome.close}
            className="absolute right-4 top-4 grid size-8 place-items-center rounded-[3px] bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <p className="label-xs text-orange">{t.welcome.kicker}</p>
          <h2 id="welcome-title" className="display mt-3 text-[1.6rem] sm:text-[1.9rem]">
            {t.welcome.title}
          </h2>
          <p className="mt-2.5 text-[14px] leading-relaxed text-slate-ink">{t.welcome.lede}</p>

          <form onSubmit={handleSearch} className="mt-7">
            <h3 className="font-display text-[13.5px] font-bold uppercase tracking-wide text-ink">
              {t.welcome.donate.title}
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-faint">{t.welcome.donate.body}</p>

            <div className="mt-3.5 flex flex-col gap-2 sm:flex-row">
              <label className="flex flex-1 items-center gap-3 rounded-[3px] border border-hairline px-4 py-3 focus-within:border-orange">
                <span className="label-xs shrink-0 text-slate-faint">{t.hero.zipLabel}</span>
                <input
                  ref={inputRef}
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
                    setError(null);
                  }}
                  inputMode="numeric"
                  aria-label={t.hero.zipLabel}
                  placeholder={t.hero.zipPlaceholder}
                  className="w-full bg-transparent font-display text-lg font-semibold tracking-wide outline-none placeholder:text-slate-faint/70"
                />
              </label>
              <Button type="submit" size="md" className="sm:min-w-[112px]">
                {t.welcome.donate.submit}
              </Button>
            </div>

            {error && <p className="mt-2 text-[12.5px] font-medium text-shut">{error}</p>}

            <button
              type="button"
              onClick={() => {
                onUseLocation();
                onClose();
              }}
              disabled={locating}
              className="mt-2.5 text-[13px] font-semibold text-ink underline decoration-orange decoration-2 underline-offset-4 transition-colors hover:text-orange disabled:opacity-60"
            >
              {locating ? t.hero.geoLoading : t.hero.geo}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-hairline" />
            <span className="label-xs text-slate-faint">{t.welcome.or}</span>
            <span className="h-px flex-1 bg-hairline" />
          </div>

          <div>
            <h3 className="font-display text-[13.5px] font-bold uppercase tracking-wide text-ink">
              {t.welcome.register.title}
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-faint">{t.welcome.register.body}</p>
            <Button variant="ink" size="md" className="mt-3.5 w-full" onClick={handleRegister}>
              {t.welcome.register.action}
            </Button>
          </div>

          <button
            onClick={onClose}
            className="mx-auto mt-6 block text-[12.5px] text-slate-faint underline underline-offset-4 transition-colors hover:text-ink"
          >
            {t.welcome.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}
