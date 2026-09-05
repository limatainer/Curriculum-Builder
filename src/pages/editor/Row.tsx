import { motion } from "motion/react";

const rowMotion = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
  transition: { type: "spring" as const, stiffness: 340, damping: 26 },
};

export function Row({ children }: { children: React.ReactNode }) {
  return (
    <motion.div layout {...rowMotion} className="flex items-center gap-2">
      {children}
    </motion.div>
  );
}
