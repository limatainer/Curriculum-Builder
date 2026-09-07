import { withAlpha } from "@/helpers/color";
import styles from "./ResumeView.module.css";

interface SectionHeaderProps {
  color: string;
  title: string;
}

export function SectionHeader({ color, title }: SectionHeaderProps) {
  return (
    <div
      className={`${styles.sectionHeader} flex items-center`}
      style={{
        gap: "var(--doc-space-70)",
        marginBottom: "var(--doc-space-100)",
        fontSize: "var(--doc-text-section)",
      }}
    >
      <div className="h-px flex-1" style={{ backgroundColor: withAlpha(color, 30) }} />
      <span
        className="font-black"
        style={{
          fontFamily: "var(--font-heading)",
          color,
          letterSpacing: "var(--doc-tracking-wide)",
        }}
      >
        {title}
      </span>
      <div className="h-px flex-1" style={{ backgroundColor: withAlpha(color, 30) }} />
    </div>
  );
}
