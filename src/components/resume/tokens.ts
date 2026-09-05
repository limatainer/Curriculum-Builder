export const T = {
  micro: "var(--doc-text-micro)",
  small: "var(--doc-text-small)",
  lead: "var(--doc-text-lead)",
  title: "var(--doc-text-title)",
  name: "var(--doc-text-name)",
} as const;

export const INK = "var(--doc-ink)";
export const INK_MUTED = "var(--doc-ink-muted)";

export const colAnim = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 260, damping: 24 },
};
