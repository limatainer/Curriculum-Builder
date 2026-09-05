import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

const SPRING = { stiffness: 120, damping: 80 };
const OFFSET: ["start end", "start start"] = ["start end", "start start"];
const INNER_WIDTH = "95%";
const FROM_SCALE = 1.25;
const TO_SCALE = 1;
const FROM_RADIUS = "0px";
const TO_RADIUS = "22px";

interface ScrollRevealBaseProps {
  height: string;
  fromWidth: string;
  toWidth: string;
  container?: React.RefObject<HTMLElement | null>;
  className?: string;
}

type ScrollRevealImageProps = ScrollRevealBaseProps &
  (
    | { src: string; alt: string; children?: never }
    | { src?: never; alt?: never; children: React.ReactNode }
  );

export function ScrollRevealImage({
  src,
  alt,
  children,
  height,
  fromWidth,
  toWidth,
  container,
  className,
}: ScrollRevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({ target: ref, container, offset: OFFSET });
  const progress = useSpring(scrollYProgress, SPRING);
  const width = useTransform(progress, [0, 1], [fromWidth, toWidth]);
  const scale = useTransform(progress, [0, 1], [FROM_SCALE, TO_SCALE]);
  const radius = useTransform(progress, [0.5, 1], [FROM_RADIUS, TO_RADIUS]);

  const content = src ? (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover"
    />
  ) : (
    children
  );

  if (reducedMotion) {
    return (
      <div
        className={className}
        style={{
          width: toWidth,
          height,
          borderRadius: TO_RADIUS,
          position: "relative",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            width: INNER_WIDTH,
            height: "100%",
            transform: `translateX(-50%) scale(${TO_SCALE})`,
          }}
        >
          {content}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        width,
        height,
        borderRadius: radius,
        position: "relative",
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          x: "-50%",
          width: INNER_WIDTH,
          height: "100%",
          scale,
        }}
      >
        {content}
      </motion.div>
    </motion.div>
  );
}
