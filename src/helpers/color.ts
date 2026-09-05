export const withAlpha = (color: string, percent: number) =>
  `color-mix(in oklab, ${color} ${percent}%, transparent)`;
