import { cn } from "@/lib/utils";
import type { Experience } from "@/types";
import styles from "./ResumeView.module.css";
import { INK, INK_MUTED, T } from "./tokens";

export function ExperienceEntry({ exp, hex }: { exp: Experience; hex: string }) {
  return (
    <div className={cn(styles.cvEntry, "flex")} style={{ gap: "var(--doc-space-90)" }}>
      <div
        className="flex flex-col items-center flex-shrink-0"
        style={{ paddingTop: "var(--doc-space-35)" }}
      >
        <span
          className="rounded-full flex-shrink-0"
          style={{
            width: "var(--doc-size-node)",
            height: "var(--doc-size-node)",
            border: `var(--doc-border-node) solid ${hex}`,
          }}
        />
        <span
          className="flex-1"
          style={{
            width: "var(--doc-hairline)",
            marginTop: "var(--doc-space-30)",
            backgroundColor: "var(--doc-rule-soft)",
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="flex flex-wrap items-baseline justify-between"
          style={{ gap: "var(--doc-space-30) var(--doc-space-120)" }}
        >
          <span className="font-bold" style={{ fontSize: T.lead, color: INK }}>
            {exp.title}
          </span>
          <span
            className="font-light whitespace-nowrap"
            style={{ fontSize: T.micro, color: INK_MUTED }}
          >
            {exp.period}
          </span>
        </div>
        <div style={{ fontSize: T.small, marginBottom: "var(--doc-space-40)" }}>
          {exp.company} · {exp.location}
        </div>
        {exp.bullets.length > 0 && (
          <ul className="flex flex-col" style={{ gap: "var(--doc-space-30)" }}>
            {exp.bullets.map((b) => (
              <li key={b.id} className="flex" style={{ gap: "var(--doc-space-55)" }}>
                <span aria-hidden="true" className="flex-shrink-0" style={{ color: hex }}>
                  •
                </span>
                <span className="min-w-0">{b.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
