export const PAGE_RATIO = 1 / Math.SQRT2;
export const PAGE_HEIGHT_FRACTION = 0.68;
const DOT_SPACING = 13;
const DOT_RADIUS = 1.3;
const LINE_DURATION = 1600;
export const LOOP_DURATION = 15000;

const SIGNAL = "22, 163, 74";
const PAPER = "242, 240, 235";

type Point = { x: number; y: number };

const NODES: Record<string, Point> = {
  header: { x: 0.5, y: 0.12 },
  experience: { x: 0.24, y: 0.38 },
  skills: { x: 0.76, y: 0.56 },
  education: { x: 0.3, y: 0.76 },
  references: { x: 0.7, y: 0.9 },
};

const ROUTES: { from: Point; to: Point; delay: number }[] = [
  { from: NODES.header, to: NODES.experience, delay: 200 },
  { from: NODES.experience, to: NODES.skills, delay: 1400 },
  { from: NODES.skills, to: NODES.education, delay: 2600 },
  { from: NODES.education, to: NODES.references, delay: 3800 },
];

const LABELS: {
  at: Point;
  text: string;
  align: CanvasTextAlign;
  delay: number;
}[] = [
  { at: NODES.experience, text: "EXPERIÊNCIA", align: "left", delay: 1400 },
  { at: NODES.skills, text: "HABILIDADES", align: "right", delay: 2600 },
];

export type Dot = Point & { alpha: number };

export const buildDots = (pageWidth: number, pageHeight: number): Dot[] => {
  const cols = Math.max(1, Math.floor(pageWidth / DOT_SPACING));
  const rows = Math.max(1, Math.floor(pageHeight / DOT_SPACING));
  const offsetX = (pageWidth - (cols - 1) * DOT_SPACING) / 2;
  const offsetY = (pageHeight - (rows - 1) * DOT_SPACING) / 2;

  return Array.from({ length: cols * rows }, (_, i) => ({
    x: offsetX + (i % cols) * DOT_SPACING,
    y: offsetY + Math.floor(i / cols) * DOT_SPACING,
    alpha: 0.2 + Math.random() * 0.5,
  }));
};

const routeProgress = (elapsed: number, delay: number) => {
  if (elapsed <= delay) return 0;
  return Math.min(1, (elapsed - delay) / LINE_DURATION);
};

export const drawScene = (
  ctx: CanvasRenderingContext2D,
  size: { width: number; height: number },
  page: { x: number; y: number; width: number; height: number },
  dots: Dot[],
  elapsed: number
) => {
  ctx.clearRect(0, 0, size.width, size.height);

  ctx.save();
  ctx.translate(page.x, page.y);

  for (const dot of dots) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(${SIGNAL}, ${dot.alpha})`;
    ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.lineWidth = 2;
  ctx.lineCap = "round";

  for (const route of ROUTES) {
    const progress = routeProgress(elapsed, route.delay);
    if (progress === 0) continue;

    const from = {
      x: route.from.x * page.width,
      y: route.from.y * page.height,
    };
    const to = { x: route.to.x * page.width, y: route.to.y * page.height };
    const head = {
      x: from.x + (to.x - from.x) * progress,
      y: from.y + (to.y - from.y) * progress,
    };

    ctx.beginPath();
    ctx.strokeStyle = `rgba(${SIGNAL}, 0.65)`;
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(head.x, head.y);
    ctx.stroke();

    if (progress >= 1) continue;

    ctx.beginPath();
    ctx.fillStyle = `rgb(${SIGNAL})`;
    ctx.shadowColor = `rgb(${SIGNAL})`;
    ctx.shadowBlur = 14;
    ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  ctx.font = '500 11px "JetBrains Mono", monospace';
  ctx.textBaseline = "middle";

  for (const label of LABELS) {
    const appeared = Math.min(1, Math.max(0, (elapsed - label.delay) / LINE_DURATION));
    if (appeared === 0) continue;

    ctx.fillStyle = `rgba(${PAPER}, ${appeared * 0.7})`;
    ctx.textAlign = label.align;
    const offset = label.align === "left" ? 14 : -14;
    ctx.fillText(label.text, label.at.x * page.width + offset, label.at.y * page.height);
  }

  ctx.restore();
};
