import type { Lang } from "../types";

const DAY_ES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const DAY_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DAY_KEYS: Record<string, number> = { dom: 0, lun: 1, mar: 2, mie: 3, jue: 4, vie: 5, sab: 6 };

const TIME_RANGE = /(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–—-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i;

const deaccent = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

interface Interval {
  days: number[];
  start: number | null;
  end: number | null;
}

function dayIndex(token: string) {
  const key = deaccent(token).slice(0, 3);
  return key in DAY_KEYS ? DAY_KEYS[key] : null;
}

function expandDays(spec: string): number[] {
  const days = new Set<number>();
  for (const token of spec.split(",")) {
    const range = token.split(/[–—]|(?<=\s)-(?=\s)/).map((t) => t.trim()).filter(Boolean);
    if (range.length === 2) {
      const from = dayIndex(range[0]);
      const to = dayIndex(range[1]);
      if (from === null || to === null) continue;
      let cursor = from;
      for (let guard = 0; guard < 8; guard += 1) {
        days.add(cursor);
        if (cursor === to) break;
        cursor = (cursor + 1) % 7;
      }
    } else {
      const single = dayIndex(token);
      if (single !== null) days.add(single);
    }
  }
  return [...days];
}

function toMinutes(hour: string, minute: string, meridiem: string) {
  let h = Number(hour) % 12;
  if (meridiem.toUpperCase() === "PM") h += 12;
  return h * 60 + Number(minute);
}

export function parseHours(raw: string | null): Interval[] {
  if (!raw) return [];
  return raw
    .split("·")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment): Interval | null => {
      const match = segment.match(TIME_RANGE);
      const daySpec = match ? segment.slice(0, match.index).trim() : segment;
      const days = expandDays(daySpec);
      if (!days.length) return null;
      if (!match) return { days, start: null, end: null };
      const start = toMinutes(match[1], match[2], match[3]);
      let end = toMinutes(match[4], match[5], match[6]);
      if (end <= start) end += 24 * 60; // spills past midnight
      return { days, start, end };
    })
    .filter((v): v is Interval => v !== null);
}

function miamiNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = DAY_EN.indexOf(get("weekday"));
  const hour = Number(get("hour")) % 24;
  return { day: day === -1 ? new Date().getDay() : day, minutes: hour * 60 + Number(get("minute")) };
}

function formatClock(minutes: number, lang: Lang) {
  const m = ((minutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const h24 = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  const meridiem = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return lang === "es" ? `${h12}:${mm} ${meridiem}` : `${h12}:${mm} ${meridiem}`;
}

export type OpenState =
  | { kind: "open"; until: string }
  | { kind: "opens-later"; at: string }
  | { kind: "closed-today" }
  | { kind: "unknown" };

export function openState(raw: string | null, lang: Lang): OpenState {
  const intervals = parseHours(raw);
  if (!intervals.length) return { kind: "unknown" };
  const timed = intervals.filter((i) => i.start !== null);
  if (!timed.length) return { kind: "unknown" };

  const { day, minutes } = miamiNow();
  const yesterday = (day + 6) % 7;

  for (const interval of timed) {
    if (interval.days.includes(day) && minutes >= interval.start! && minutes < interval.end!) {
      return { kind: "open", until: formatClock(interval.end!, lang) };
    }
    // an interval started yesterday can still be running
    if (interval.days.includes(yesterday) && interval.end! > 24 * 60 && minutes + 24 * 60 < interval.end!) {
      return { kind: "open", until: formatClock(interval.end!, lang) };
    }
  }

  const laterToday = timed
    .filter((i) => i.days.includes(day) && i.start! > minutes)
    .sort((a, b) => a.start! - b.start!)[0];
  if (laterToday) return { kind: "opens-later", at: formatClock(laterToday.start!, lang) };

  return { kind: "closed-today" };
}

/** The source data is Spanish-only; swap day tokens when the UI is in English. */
export function localizeHours(raw: string | null, lang: Lang) {
  if (!raw) return null;
  if (lang === "es") return raw;
  return DAY_ES.reduce(
    (acc, es, i) => acc.replace(new RegExp(`\\b${es}\\b`, "g"), DAY_EN[i]),
    raw,
  );
}
