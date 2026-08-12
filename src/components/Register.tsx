import { useState } from "react";
import type { Copy } from "../copy";
import { useReveal } from "../hooks/useReveal";
import { asset } from "../lib/asset";
import { Check } from "./Icons";
import { Button, Kicker, cx } from "./ui";

function Field({
  label,
  placeholder,
  className,
}: {
  label: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <label className={cx("block", className)}>
      <span className="label-xs mb-2 block text-slate-faint">{label}</span>
      <input
        placeholder={placeholder}
        className="w-full rounded-[3px] border border-hairline bg-white px-4 py-3 text-[14px] outline-none transition-colors placeholder:text-slate-faint/80 focus:border-orange"
      />
    </label>
  );
}

export default function Register({ t }: { t: Copy }) {
  const [kind, setKind] = useState<"collection" | "warehouse">("collection");
  const [sent, setSent] = useState(false);
  const { ref, className } = useReveal<HTMLDivElement>(0.12);

  return (
    <section id="registrar" className="relative overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute inset-0 opacity-25">
        <img
          src={asset("/missions/doral-warehouse.jpg")}
          alt=""
          className="size-full object-cover"
          loading="lazy"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(100deg,#0b0b0c_38%,rgba(11,11,12,0.82)_100%)]"
      />

      <div ref={ref} className={cx("relative mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28", className)}>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <Kicker tone="light">{t.register.eyebrow}</Kicker>
            <h2 className="display mt-5 text-[2.2rem] text-white sm:text-[3.1rem]">{t.register.title}</h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-white/65">{t.register.lede}</p>

            <ul className="mt-9 space-y-4">
              {t.register.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3.5 text-[14.5px] text-white/85">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-orange p-1 text-white">
                    <Check />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal rounded-[4px] bg-white p-6 sm:p-9" style={{ ["--d" as string]: "140ms" }}>
            {sent ? (
              <div className="flex min-h-[380px] flex-col items-start justify-center">
                <span className="grid size-14 place-items-center rounded-[3px] bg-open-wash p-3.5 text-open">
                  <Check />
                </span>
                <h3 className="display mt-6 text-[1.8rem]">{t.register.form.successTitle}</h3>
                <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-slate-ink">
                  {t.register.form.successBody}
                </p>
                <Button variant="outline" size="sm" className="mt-7" onClick={() => setSent(false)}>
                  {t.register.form.successAction}
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-5"
              >
                <Field label={t.register.form.name} placeholder={t.register.form.namePlaceholder} />
                <Field label={t.register.form.address} placeholder={t.register.form.addressPlaceholder} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t.register.form.contact} placeholder={t.register.form.contactPlaceholder} />
                  <Field label={t.register.form.hours} placeholder={t.register.form.hoursPlaceholder} />
                </div>

                <div>
                  <span className="label-xs mb-2 block text-slate-faint">{t.register.form.type}</span>
                  <div className="flex gap-2">
                    {(
                      [
                        { key: "collection", label: t.register.form.typeCollection },
                        { key: "warehouse", label: t.register.form.typeWarehouse },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => setKind(option.key)}
                        aria-pressed={kind === option.key}
                        className={cx(
                          "label-xs flex-1 rounded-[3px] border px-3 py-3 transition-colors",
                          kind === option.key
                            ? "border-ink bg-ink text-white"
                            : "border-hairline text-slate-ink hover:border-ink/40",
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
                  <Button type="submit" size="lg">
                    {t.register.form.submit}
                  </Button>
                  <button
                    type="button"
                    className="text-[13px] font-semibold text-slate-ink underline decoration-hairline decoration-2 underline-offset-4 hover:text-ink"
                  >
                    {t.register.form.already}
                  </button>
                </div>

                <p className="text-[11.5px] italic text-slate-faint">{t.register.form.demoNote}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
