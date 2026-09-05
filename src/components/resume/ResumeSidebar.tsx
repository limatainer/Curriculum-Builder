import { motion } from "motion/react";
import type { ResumeData } from "@/types";
import styles from "./ResumeView.module.css";
import { SectionHeader } from "./SectionHeader";
import { SkillBar } from "./SkillBar";
import { colAnim, INK, INK_MUTED, T } from "./tokens";

export function ResumeSidebar({
  data,
  hex,
  stacked,
}: {
  data: ResumeData;
  hex: string;
  stacked: boolean;
}) {
  return (
    <motion.aside
      {...colAnim}
      transition={{ ...colAnim.transition, delay: 0.05 }}
      className="flex flex-col"
      style={{
        width: stacked ? "100%" : "var(--doc-sidebar-width)",
        flexShrink: 0,
        gap: "var(--doc-space-200)",
        padding: "var(--doc-space-200)",
        backgroundColor: "var(--doc-surface)",
        [stacked ? "borderBottom" : "borderRight"]: `var(--doc-hairline) solid var(--doc-rule)`,
      }}
    >
      <section>
        <SectionHeader color={hex} title="SOBRE MIM" />
        <p style={{ lineHeight: "var(--doc-leading-relaxed)" }}>{data.about}</p>
      </section>

      {data.education.length > 0 && (
        <section>
          <SectionHeader color={hex} title="FORMAÇÃO" />
          <div className="flex flex-col" style={{ gap: "var(--doc-space-100)" }}>
            {data.education.map((e) => (
              <div key={e.id} className={styles.cvEntry}>
                <div className="font-bold" style={{ color: INK }}>
                  {e.degree}
                </div>
                <div style={{ fontSize: T.small }}>{e.institution}</div>
                <div style={{ fontSize: T.micro, color: INK_MUTED }}>{e.period}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionHeader color={hex} title="HABILIDADES" />
          <div className="flex flex-col" style={{ gap: "var(--doc-space-85)" }}>
            {data.skills.map((s) => (
              <div key={s.id} className={styles.cvEntry}>
                <div style={{ fontSize: T.small }}>{s.name}</div>
                <SkillBar level={s.level} fgColor={hex} />
              </div>
            ))}
          </div>
        </section>
      )}

      {data.languages.length > 0 && (
        <section>
          <SectionHeader color={hex} title="IDIOMAS" />
          <div className="flex flex-col" style={{ gap: "var(--doc-space-50)" }}>
            {data.languages.map((l) => (
              <div key={l.id} className="flex items-center" style={{ gap: "var(--doc-space-60)" }}>
                <span
                  className="rounded-full flex-shrink-0"
                  style={{
                    width: "var(--doc-size-dot)",
                    height: "var(--doc-size-dot)",
                    backgroundColor: hex,
                  }}
                />
                {l.name}
              </div>
            ))}
          </div>
        </section>
      )}
    </motion.aside>
  );
}
