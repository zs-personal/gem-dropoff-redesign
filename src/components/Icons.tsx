type IconProps = { className?: string };

const base = "h-full w-full";

export function Mark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="4.5" rx="1.6" fill="currentColor" opacity="0.9" />
      <path d="M4.2 9.5h15.6v9.4a1.6 1.6 0 0 1-1.6 1.6H5.8a1.6 1.6 0 0 1-1.6-1.6z" fill="currentColor" opacity="0.25" />
      <path
        d="M4.2 9.5h15.6v9.4a1.6 1.6 0 0 1-1.6 1.6H5.8a1.6 1.6 0 0 1-1.6-1.6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 18.2c-2.4-1.7-3.9-3.05-3.9-4.6a2.05 2.05 0 0 1 3.9-.95 2.05 2.05 0 0 1 3.9.95c0 1.55-1.5 2.9-3.9 4.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Search({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.7" />
      <path d="m15.8 15.8 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Pin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <path
        d="M12 21s6.5-6.1 6.5-10.4A6.5 6.5 0 0 0 5.5 10.6C5.5 14.9 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.3" r="2.35" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function Clock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.6V12l3 1.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Arrow({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <path d="M5 12h13m0 0-5.2-5.2M18 12l-5.2 5.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Crosshair({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <path d="m5 12.8 4.3 4.2L19 7.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Warehouse({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <path d="M3 20V9.4l9-4.4 9 4.4V20" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.5 20v-6h7v6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

/* --- "what to donate" glyphs --- */

export function Pill({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <rect x="2.8" y="8.6" width="18.4" height="6.8" rx="3.4" stroke="currentColor" strokeWidth="1.6" transform="rotate(-34 12 12)" />
      <path d="M9.1 15.4 15 9.1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Can({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <rect x="6" y="3.6" width="12" height="16.8" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 8h12M6 16h12" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Soap({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <rect x="3.4" y="11" width="17.2" height="9.4" rx="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 11V8.6A2.6 2.6 0 0 1 10.6 6h1.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16.2" cy="5.4" r="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function Bottle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <path d="M10 3.4h4v2.2a4 4 0 0 0 .9 2.5l.7.9a4 4 0 0 1 .9 2.5v7.1a2 2 0 0 1-2 2H9.5a2 2 0 0 1-2-2v-7.1a4 4 0 0 1 .9-2.5l.7-.9a4 4 0 0 0 .9-2.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.4 14h7.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Shirt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <path d="M9 3.8 5 5.9l1.3 4.2-2 .7 2 8.4h11.4l2-8.4-2-.7L19 5.9l-4-2.1a3 3 0 0 1-6 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function Tent({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <path d="M12 4.2 2.6 19.4h18.8L12 4.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 4.2v15.2M12 19.4l4.4-7.6M12 19.4 7.6 11.8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function Droplet({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base} aria-hidden="true">
      <path d="M12 3.2c3.4 3.9 5.6 6.8 5.6 9.5A5.6 5.6 0 0 1 6.4 12.7c0-2.7 2.2-5.6 5.6-9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
