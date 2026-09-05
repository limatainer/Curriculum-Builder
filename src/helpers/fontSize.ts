export const MIN_PT = 8;
export const MAX_PT = 38;
export const DEFAULT_PT = 10;

export const STACK_PT = 14;
export function clampPt(n: number, fallback: number = DEFAULT_PT): number {
  if (!Number.isFinite(n)) return fallback;
  return Math.min(MAX_PT, Math.max(MIN_PT, Math.round(n)));
}
