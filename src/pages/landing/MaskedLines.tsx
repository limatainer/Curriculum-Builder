import { motion, useReducedMotion } from "motion/react";
import { REVEAL_EASE, WORD_STAGGER } from "./constants";

export function MaskedLines({ lines, underlineWord }: { lines: string[]; underlineWord?: string }) {
  const reducedMotion = useReducedMotion() ?? false;
  let order = 0;

  return (
    <span>
      {lines.map((line) => (
        <span key={line} className="block">
          {line.split(" ").map((word, i) => {
            const delay = reducedMotion ? 0 : order++ * WORD_STAGGER;

            return (
              <span
                key={`${word}-${i}`}
                className="relative -mb-(--mask-bleed) mr-(--mask-gap) inline-block overflow-hidden pb-(--mask-bleed)"
              >
                <motion.span
                  className="inline-block"
                  initial={reducedMotion ? { opacity: 0 } : { y: "110%" }}
                  whileInView={reducedMotion ? { opacity: 1 } : { y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={
                    reducedMotion ? { duration: 0.01 } : { duration: 0.7, delay, ease: REVEAL_EASE }
                  }
                >
                  {word}
                </motion.span>

                {word === underlineWord ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute bottom-(--underline-offset) left-0 h-(--underline-height) w-full origin-left bg-signal"
                    initial={reducedMotion ? { opacity: 0 } : { scaleX: 0 }}
                    whileInView={reducedMotion ? { opacity: 1 } : { scaleX: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={
                      reducedMotion
                        ? { duration: 0.01 }
                        : { duration: 0.9, delay: delay + 0.35, ease: REVEAL_EASE }
                    }
                  />
                ) : null}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
