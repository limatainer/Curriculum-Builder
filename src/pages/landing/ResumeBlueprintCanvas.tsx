import { useEffect, useRef } from "react";
import {
  buildDots,
  type Dot,
  drawScene,
  LOOP_DURATION,
  PAGE_HEIGHT_FRACTION,
  PAGE_RATIO,
} from "./blueprint";

export function ResumeBlueprintCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId = 0;
    const start = performance.now();
    let dots: Dot[] = [];
    let size = { width: 0, height: 0 };
    let page = { x: 0, y: 0, width: 0, height: 0 };

    const render = (elapsed: number) => drawScene(ctx, size, page, dots, elapsed);

    const measure = () => {
      const dpr = window.devicePixelRatio || 1;
      size = { width: parent.clientWidth, height: parent.clientHeight };
      canvas.width = size.width * dpr;
      canvas.height = size.height * dpr;
      canvas.style.width = `${size.width}px`;
      canvas.style.height = `${size.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const pageHeight = size.height * PAGE_HEIGHT_FRACTION;
      const pageWidth = pageHeight * PAGE_RATIO;
      page = {
        x: (size.width - pageWidth) / 2,
        y: (size.height - pageHeight) / 2,
        width: pageWidth,
        height: pageHeight,
      };
      dots = buildDots(pageWidth, pageHeight);
    };

    const loop = (now: number) => {
      render((now - start) % LOOP_DURATION);
      frameId = requestAnimationFrame(loop);
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      if (reducedMotion) render(LOOP_DURATION);
    });
    resizeObserver.observe(parent);

    measure();
    if (reducedMotion) {
      render(LOOP_DURATION);
    } else {
      frameId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} tabIndex={-1} aria-hidden="true" className="absolute inset-0" />;
}
