import { LuTrash2 } from "react-icons/lu";
import { ICON_SIZE } from "@/lib/tokens";
import { cn } from "@/lib/utils";

interface RemoveButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function RemoveButton({ label, onClick, className, children }: RemoveButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn("text-ink-muted transition-colors hover:text-signal-deep", className)}
    >
      {children ?? <LuTrash2 size={ICON_SIZE.control} />}
    </button>
  );
}
