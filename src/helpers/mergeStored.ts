export const mergeStored = <T extends object>(stored: unknown, fallback: T): T => {
  if (!stored || typeof stored !== "object" || Array.isArray(stored)) return fallback;
  return { ...fallback, ...(stored as Partial<T>) };
};
