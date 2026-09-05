import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ResumeData } from "@/types";
import { ExperienceEntry } from "./ExperienceEntry";
import styles from "./ResumeView.module.css";
import { SectionHeader } from "./SectionHeader";
import { colAnim, INK, INK_MUTED, T } from "./tokens";

export function ResumeBody({ data, hex }: { data: ResumeData; hex: string }) {
  return (
    <motion.div
      {...colAnim}
      transition={{ ...colAnim.transition, delay: 0.13 }}
      className="flex flex-col flex-1"
      style={{
        gap: "var(--doc-space-220)",
        padding: "var(--doc-space-200) var(--doc-space-220)",
      }}
    >
      {data.experiences.length > 0 && (
        <section>
          <SectionHeader color={hex} title="EXPERIÊNCIA" />
          <div className="flex flex-col" style={{ gap: "var(--doc-space-160)" }}>
            {data.experiences.map((exp) => (
              <ExperienceEntry key={exp.id} exp={exp} hex={hex} />
            ))}
          </div>
        </section>
      )}

      {data.references.length > 0 && (
        <section>
          <SectionHeader color={hex} title="REFERÊNCIAS" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(var(--doc-ref-column-min), 1fr))",
              gap: "var(--doc-space-120)",
            }}
          >
            {data.references.map((r) => (
              <div key={r.id} className={cn(styles.cvEntry, "min-w-0")}>
                <div className="font-bold" style={{ fontSize: T.lead, color: INK }}>
                  {r.name}
                </div>
                <div style={{ fontSize: T.small }}>{r.company}</div>
                {r.phone && (
                  <div
                    style={{
                      fontSize: T.micro,
                      color: INK_MUTED,
                      marginTop: "var(--doc-space-30)",
                    }}
                  >
                    Tel: {r.phone}
                  </div>
                )}
                {r.email && (
                  <div style={{ fontSize: T.micro, color: INK_MUTED, overflowWrap: "anywhere" }}>
                    {r.email}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}
