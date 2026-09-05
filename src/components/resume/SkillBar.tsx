import { motion, useReducedMotion } from "motion/react";
import { withAlpha } from "@/helpers/color";

interface SkillBarProps {
  level: number;
  fgColor: string;
}

export function SkillBar({ level, fgColor }: SkillBarProps) {
  const reduce = useReducedMotion();
  const filled = Math.round(level / 10);
  return (
    <div className="flex" style={{ gap: "var(--doc-space-20)", marginTop: "var(--doc-space-25)" }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 22,
            delay: i * 0.04,
          }}
          style={{
            transformOrigin: "left center",
            backgroundColor: i < filled ? fgColor : withAlpha(fgColor, 20),
            height: "var(--doc-size-bar)",
          }}
          className="flex-1 rounded-full"
        />
      ))}
    </div>
  );
}
