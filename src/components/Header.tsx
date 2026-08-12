import { useEffect, useState } from "react";
import type { Copy } from "../copy";
import type { Lang } from "../types";
import { DONATE_URL } from "../config";
import { asset } from "../lib/asset";
import { Button, ButtonLink, StatusDot, cx } from "./ui";

interface Props {
  t: Copy;
  lang: Lang;
  onLang: (lang: Lang) => void;
  receiving: number;
}

export default function Header({ t, lang, onLang, receiving }: Props) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#centros", label: t.nav.find },
    { href: "#misiones", label: t.nav.missions },
    { href: "#como", label: t.nav.how },
    { href: "#donar", label: t.nav.what },
  ];

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 bg-white transition-[box-shadow,height] duration-300",
        stuck ? "shadow-[0_1px_0_rgba(11,11,12,0.1),0_10px_30px_-24px_rgba(11,11,12,0.5)]" : "",
      )}
    >
      <div
        className={cx(
          "mx-auto flex max-w-[1320px] items-center gap-4 px-5 transition-all duration-300 sm:px-8",
          stuck ? "h-[62px]" : "h-[76px]",
        )}
      >
        <a href="#top" className="flex shrink-0 items-center">
          <img
            src={asset("/brand/gem-logo-latam.webp")}
            alt="Global Empowerment Mission — Latin America"
            className={cx("w-auto transition-all duration-300", stuck ? "h-8" : "h-10")}
          />
        </a>

        <span className="ml-1 hidden h-8 w-px bg-hairline xl:block" />

        <span className="hidden whitespace-nowrap leading-tight xl:block">
          <span className="label-xs block text-ink">{t.brand}</span>
          <span className="mt-0.5 block text-[11px] text-slate-faint">{t.brandSub}</span>
        </span>

        <nav className="ml-auto hidden items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label-xs whitespace-nowrap rounded-[3px] px-2.5 py-2.5 text-slate-ink transition-colors hover:bg-bone hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5 lg:ml-3">
          {/* above lg the nav needs the room, and the ticker below carries the same live count */}
          <span className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-open-wash px-3 py-1.5 text-[11px] font-semibold text-open md:inline-flex lg:hidden">
            <StatusDot status="receiving" pulse />
            {t.live(receiving)}
          </span>

          <div className="flex items-center rounded-[3px] border border-hairline">
            {(["es", "en"] as const).map((option) => (
              <button
                key={option}
                onClick={() => onLang(option)}
                aria-pressed={lang === option}
                className={cx(
                  "label-xs px-2.5 py-1.5 transition-colors",
                  lang === option ? "bg-ink text-white" : "text-slate-faint hover:text-ink",
                )}
              >
                {option}
              </button>
            ))}
          </div>

          <span className="hidden sm:block">
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("registrar")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.nav.register}
            </Button>
          </span>

          <ButtonLink href={DONATE_URL} size="sm">
            {t.nav.donate}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
