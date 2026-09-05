import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const cardMotion = {
  initial: { opacity: 0, height: 0, scale: 0.95 },
  animate: { opacity: 1, height: "auto", scale: 1 },
  exit: { opacity: 0, height: 0, scale: 0.95 },
  transition: { type: "spring" as const, stiffness: 320, damping: 28 },
};

export function MotionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div layout {...cardMotion} className={cn("overflow-hidden", className)}>
      {children}
    </motion.div>
  );
}
