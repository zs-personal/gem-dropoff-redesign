import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

type Variant = "orange" | "ink" | "outline" | "onDark" | "donate";
type Size = "sm" | "md" | "lg";

const variants = {
  orange: "bg-orange text-white hover:bg-orange-deep",
  ink: "bg-ink text-white hover:bg-ink-3",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white",
  onDark: "border border-white/30 text-white hover:bg-white hover:text-ink",
  donate: "bg-alert text-white hover:bg-alert-deep",
} as const;

const sizes = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-6 py-3 text-[12px]",
  lg: "px-8 py-4 text-[13px]",
} as const;

const buttonClass = (variant: Variant, size: Size, className?: string) =>
  cx(
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[3px] font-display font-semibold uppercase tracking-[0.14em] transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
    sizes[size],
    variants[variant],
    className,
  );

export function Button({
  variant = "orange",
  size = "md",
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button {...rest} className={buttonClass(variant, size, className)} />;
}

/** Same styling as Button, for destinations off the page. */
export function ButtonLink({
  variant = "donate",
  size = "md",
  className,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size }) {
  return <a target="_blank" rel="noopener noreferrer" {...rest} className={buttonClass(variant, size, className)} />;
}

export function StatusDot({ status, pulse = false }: { status: "receiving" | "full"; pulse?: boolean }) {
  return (
    <span
      className={cx(
        "inline-block size-2 shrink-0 rounded-full",
        status === "receiving" ? "bg-open" : "bg-shut",
        pulse && "pulse-ring",
      )}
    />
  );
}

export function Kicker({
  children,
  tone = "orange",
  className,
}: {
  children: ReactNode;
  tone?: "orange" | "light" | "ink";
  className?: string;
}) {
  return (
    <p
      className={cx(
        "label-xs flex items-center gap-3",
        tone === "orange" && "text-orange",
        tone === "light" && "text-white/60",
        tone === "ink" && "text-slate-faint",
        className,
      )}
    >
      <span className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function SectionHead({
  kicker,
  title,
  lede,
  tone = "ink",
  align = "left",
}: {
  kicker?: string;
  title: string;
  lede?: string;
  tone?: "ink" | "light";
  align?: "left" | "center";
}) {
  return (
    <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {kicker && (
        <Kicker tone={tone === "light" ? "light" : "orange"} className={cx(align === "center" && "justify-center")}>
          {kicker}
        </Kicker>
      )}
      <h2
        className={cx(
          "display mt-5 text-[2.1rem] sm:text-[3rem] lg:text-[3.4rem]",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cx(
            "mt-5 text-[15.5px] leading-relaxed sm:text-base",
            tone === "light" ? "text-white/65" : "text-slate-ink",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
