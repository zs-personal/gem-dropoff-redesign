import type { Copy } from "../copy";
import type { Lang, RankedCenter } from "../types";
import { formatDistance } from "../lib/geo";
import { localizeHours, openState } from "../lib/hours";
import { Clock, Pin, Warehouse } from "./Icons";
import { cx } from "./ui";

interface Props {
  center: RankedCenter;
  t: Copy;
  lang: Lang;
  active: boolean;
  onActivate: (id: string | null) => void;
  onShowOnMap: (id: string) => void;
}

export default function CenterCard({ center, t, lang, active, onActivate, onShowOnMap }: Props) {
  const isFull = center.status === "full";
  const state = openState(center.hours, lang);
  const hours = localizeHours(center.hours, lang);

  const openLabel =
    state.kind === "open"
      ? t.card.openNow(state.until)
      : state.kind === "opens-later"
        ? t.card.opensLater(state.at)
        : state.kind === "closed-today"
          ? t.card.closedToday
          : t.card.hoursUnknown;

  return (
    <article
      onMouseEnter={() => onActivate(center.id)}
      onMouseLeave={() => onActivate(null)}
      className={cx(
        "group relative scroll-mt-28 overflow-hidden rounded-[4px] border bg-white pl-5 pr-5 py-5 transition-all duration-200",
        active ? "border-orange shadow-card" : "border-hairline hover:border-ink/25 hover:shadow-card",
        isFull && "bg-bone/60",
      )}
    >
      <span
        aria-hidden="true"
        className={cx("absolute inset-y-0 left-0 w-[4px]", isFull ? "bg-shut/60" : "bg-open")}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3
            className={cx(
              "font-display text-[15.5px] font-bold uppercase leading-tight tracking-[-0.01em]",
              isFull ? "text-slate-ink" : "text-ink",
            )}
          >
            {center.displayName}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-slate-faint">
            <span className="inline-flex items-center gap-1.5">
              {center.kind === "warehouse" ? <Warehouse className="size-3.5" /> : <Pin className="size-3.5" />}
              {center.kind === "warehouse" ? t.card.warehouse : t.card.collection}
            </span>
            {center.city && (
              <span>
                {center.city}
                {center.state && `, ${center.state}`}
              </span>
            )}
            {center.distanceMi !== null && (
              <span className="font-bold uppercase tracking-wide text-orange">
                {formatDistance(center.distanceMi, lang)}
              </span>
            )}
          </div>
        </div>

        <span
          className={cx(
            "label-xs inline-flex shrink-0 items-center gap-1.5 rounded-[2px] px-2.5 py-1.5",
            isFull ? "bg-shut-wash text-shut" : "bg-open-wash text-open",
          )}
        >
          {isFull ? t.card.full : t.card.receiving}
        </span>
      </div>

      <p className="mt-3.5 text-[13.5px] leading-relaxed text-slate-ink">{center.address}</p>

      {hours && (
        <div className="mt-2.5 flex items-start gap-2 text-[12.5px] text-slate-faint">
          <Clock className="mt-0.5 size-3.5 shrink-0" />
          <span>
            {!isFull && (
              <span
                className={cx(
                  "mr-1.5 font-bold uppercase tracking-wide",
                  state.kind === "open" ? "text-open" : state.kind === "opens-later" ? "text-orange" : "text-slate-faint",
                )}
              >
                {openLabel}
              </span>
            )}
            <span className={cx(!isFull && "hidden sm:inline before:mr-1.5 before:content-['·']")}>{hours}</span>
          </span>
        </div>
      )}

      {isFull && (
        <p className="mt-3.5 rounded-[3px] bg-shut-wash px-3.5 py-2.5 text-[12.5px] font-medium text-shut">
          {t.card.fullNotice}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            center.precision === "exact" ? `${center.lat},${center.lng}` : center.address,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="label-xs inline-flex items-center gap-1.5 rounded-[3px] border border-ink/20 px-3 py-2 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
        >
          <Pin className="size-3.5" />
          {t.card.directions}
        </a>
        <button
          onClick={() => onShowOnMap(center.id)}
          className="label-xs rounded-[3px] px-3 py-2 text-slate-faint transition-colors hover:bg-bone hover:text-ink"
        >
          {t.card.call}
        </button>
        {center.precision === "approximate" && (
          <span className="text-[11.5px] italic text-slate-faint">{t.card.approx}</span>
        )}
      </div>
    </article>
  );
}
