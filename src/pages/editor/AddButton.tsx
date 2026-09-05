import { motion } from "motion/react";
import { LuPlus } from "react-icons/lu";
import { ICON_SIZE } from "@/lib/tokens";

const addBtnHover = { scale: 1.02, x: 2 };
const addBtnTap = { scale: 0.97 };
const addBtnTransition = {
  type: "spring" as const,
  stiffness: 380,
  damping: 22,
};

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={addBtnHover}
      whileTap={addBtnTap}
      transition={addBtnTransition}
      className="flex items-center gap-2 self-start font-mono text-eyebrow uppercase text-ink transition-colors hover:text-signal-deep"
    >
      <LuPlus size={ICON_SIZE.control} />
      {label}
    </motion.button>
  );
}
