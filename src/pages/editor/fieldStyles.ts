import { FIELD_BASE } from "@/lib/tokens";
import { cn } from "@/lib/utils";

export const inlineInput = cn(
  FIELD_BASE,
  "min-w-0 flex-1 py-1 text-xs placeholder:text-ink-muted/60"
);

export const entryCard = "border border-rule bg-paper-deep/50 p-3 flex flex-col gap-3";
