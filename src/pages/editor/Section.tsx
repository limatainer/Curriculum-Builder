import { LuChevronDown } from "react-icons/lu";
import { ICON_SIZE } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import styles from "./Section.module.css";

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Section({ title, icon, children, defaultOpen = false }: SectionProps) {
  return (
    <details className={cn(styles.section, "border-b border-rule")} open={defaultOpen}>
      <summary className="flex select-none items-center gap-2.5 px-4 py-3 transition-colors hover:bg-paper-deep">
        <span className="text-ink-muted">{icon}</span>
        <span className="flex-1 font-mono text-eyebrow uppercase text-ink">{title}</span>
        <span className={cn(styles.chev, "text-ink-muted")}>
          <LuChevronDown size={ICON_SIZE.control} />
        </span>
      </summary>
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className="flex flex-col gap-4 px-4 pb-5">{children}</div>
        </div>
      </div>
    </details>
  );
}
