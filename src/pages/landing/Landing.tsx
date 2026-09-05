import { useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { cn } from "@/lib/utils";
import {
  ACCENT_WORD,
  HERO_LINES,
  PHOTO_SRC,
  SECTIONS,
  SIGNIN_SECTION_ID,
  TICKER_ITEMS,
} from "./constants";
import styles from "./Landing.module.css";
import { MaskedLines } from "./MaskedLines";
import { ProductShot } from "./ProductShot";
import { ScrollRevealImage } from "./ScrollRevealImage";
import { SignInCard } from "./SignInCard";

export function Landing({ onSignIn }: { onSignIn: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const signedIn = useSession();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const scrollToSignIn = () => {
    document.getElementById(SIGNIN_SECTION_ID)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const handleMasthead = () => {
    if (signedIn) navigate({ to: "/editor" });
    else scrollToSignIn();
  };

  return (
    <div
      ref={scrollRef}
      className="relative h-dvh overflow-y-auto overflow-x-hidden bg-paper font-body text-ink"
    >
      <div className="fixed inset-x-0 top-0 z-50 h-(--progress-height) bg-ink">
        <motion.div
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
          className="h-full w-full bg-signal"
        />
      </div>

      <header className="sticky top-0 z-40 border-b border-rule bg-paper">
        <div className="mx-auto flex max-w-shell items-center justify-between px-5 py-4 md:px-10">
          <span className="font-mono text-eyebrow uppercase text-ink">WEBCV ⁄ 001</span>
          <Button type="button" variant="outline" onClick={handleMasthead} className="duration-150">
            {signedIn ? "Continuar" : "Entrar"}
          </Button>
        </div>
      </header>

      <main>
        <section className="mx-auto flex min-h-(--hero-min-height) max-w-shell flex-col justify-center px-5 pb-16 pt-16 md:px-10">
          <motion.div style={reducedMotion ? undefined : { y: heroY, opacity: heroOpacity }}>
            <h1 className="font-display text-display-xl font-black uppercase">
              <MaskedLines lines={HERO_LINES} underlineWord={ACCENT_WORD} />
            </h1>

            <div className="mt-10 flex items-center gap-4 md:mt-16">
              <span className="font-mono text-eyebrow uppercase text-ink">── 01</span>
              <span className="h-px flex-1 bg-rule" />
              <span className="font-mono text-eyebrow uppercase text-signal-deep">
                Escreva · Veja · PDF
              </span>
            </div>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-muted">
              Um editor de currículo que mostra a folha impressa enquanto você digita. Você escreve,
              olha, corrige e baixa. Nada além disso.
            </p>
          </motion.div>
        </section>

        <div className="overflow-hidden border-y border-ink bg-ink py-3">
          <div
            className={cn(
              styles.tickerTrack,
              "flex w-max whitespace-nowrap font-mono text-eyebrow-wide uppercase text-paper"
            )}
          >
            <span>{TICKER_ITEMS.repeat(4)}</span>
            <span aria-hidden="true">{TICKER_ITEMS.repeat(4)}</span>
          </div>
        </div>

        {SECTIONS.map((section, index) => {
          const isBand = index === 1;
          const numeralFirst = index % 2 === 0;

          return (
            <section
              key={section.number}
              className={cn("border-b border-rule", isBand ? "bg-paper-deep" : "bg-paper")}
            >
              <div className="mx-auto grid max-w-shell gap-8 px-5 py-24 md:grid-cols-12 md:gap-12 md:px-10 md:py-32">
                <div className={cn("md:col-span-3", numeralFirst ? "md:order-1" : "md:order-2")}>
                  <div className="sticky top-24">
                    <span className="block font-mono text-numeral text-ink">{section.number}</span>
                    <span className="mt-4 block h-px w-16 bg-signal" />
                  </div>
                </div>

                <div className={cn("md:col-span-9", numeralFirst ? "md:order-2" : "md:order-1")}>
                  <h2 className="font-display text-display-lg font-black">
                    <MaskedLines lines={[section.title]} />
                  </h2>

                  <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">
                    {section.body}
                  </p>

                  <p className="mt-4 font-mono text-eyebrow uppercase text-signal-deep">
                    {section.caption}
                  </p>

                  <div className="mt-12">
                    {index === 0 ? (
                      <ScrollRevealImage
                        src={PHOTO_SRC}
                        alt="Mesa de trabalho com caderno aberto, caneta e notebook"
                        height="58vh"
                        fromWidth="70%"
                        toWidth="100%"
                        container={scrollRef}
                        className={styles.duotone}
                      />
                    ) : (
                      <ScrollRevealImage
                        height={index === 1 ? "72vh" : "58vh"}
                        fromWidth="70%"
                        toWidth="100%"
                        container={scrollRef}
                      >
                        <ProductShot
                          scaleClass={
                            index === 1
                              ? "scale-(--shot-scale-wide) sm:scale-(--shot-scale-wide-sm) lg:scale-(--shot-scale-wide-lg)"
                              : "scale-(--shot-scale-base) sm:scale-(--shot-scale-base-sm) lg:scale-100"
                          }
                        />
                      </ScrollRevealImage>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <section id={SIGNIN_SECTION_ID}>
          <SignInCard onSignIn={onSignIn} />
        </section>
      </main>
    </div>
  );
}
