import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FIELD_BASE, ICON_SIZE } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { ResumeBlueprintCanvas } from "./ResumeBlueprintCanvas";

interface SignInCardProps {
  onSignIn: () => void | Promise<void>;
}

export function SignInCard({ onSignIn }: SignInCardProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (honeypotRef.current?.value) return;

    setSubmitting(true);
    try {
      await onSignIn();
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void submit();
  };

  const fieldClass = cn(
    FIELD_BASE,
    "w-full border-b-2 py-2.5 text-base placeholder:text-ink-muted/60"
  );

  const labelClass = "mb-1 block";

  const overlayIn = (delay: number) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: reducedMotion ? 0.01 : 0.6, delay: reducedMotion ? 0 : delay },
  });

  return (
    <div className="w-full border-t border-ink bg-paper">
      <div className="border-b border-ink bg-ink px-5 py-4 md:hidden">
        <span className="font-mono text-eyebrow uppercase text-paper">Entrar ⁄ 002</span>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-ink md:block md:min-h-(--signin-panel-min-height)">
          <ResumeBlueprintCanvas reducedMotion={reducedMotion} />

          <div className="relative flex h-full flex-col justify-end gap-5 p-10 lg:p-14">
            <motion.span
              {...overlayIn(0.05)}
              className="font-mono text-eyebrow uppercase text-signal"
            >
              Entrar ⁄ 002
            </motion.span>

            <motion.h2
              {...overlayIn(0.16)}
              className="font-display text-display-md font-black uppercase text-paper"
            >
              A página em branco já vem preenchida
            </motion.h2>

            <motion.p
              {...overlayIn(0.28)}
              className="max-w-sm text-sm leading-relaxed text-paper/70"
            >
              Entre e comece a editar um currículo completo — troque o que é seu, apague o resto.
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-5 py-12 md:border-l md:border-ink md:px-12 md:py-16">
          <h2 className="font-display text-display-sm font-black uppercase">Bem-vindo de volta</h2>
          <p className="mt-3 text-sm text-ink-muted">Entre na sua conta para continuar.</p>

          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => void submit()}
            disabled={submitting}
            className="mt-10 w-full gap-3 disabled:opacity-60"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.27-4.74 3.27-8.09Z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
              />
            </svg>
            Entrar com Google
          </Button>

          <div className="my-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-rule" />
            <span className="font-mono text-eyebrow uppercase text-ink-muted">ou</span>
            <span className="h-px flex-1 bg-rule" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <input
              ref={honeypotRef}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-(--offscreen-x) h-0 w-0 overflow-hidden"
            />

            <div>
              <Label htmlFor="signin-email" className={labelClass}>
                E-mail
              </Label>
              <input
                id="signin-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="seu@email.com.br"
                className={fieldClass}
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <Label htmlFor="signin-password" className={labelClass}>
                  Senha
                </Label>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  className="font-mono text-eyebrow uppercase text-signal-deep transition-colors hover:text-ink"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              <input
                id="signin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className={fieldClass}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full gap-3 disabled:opacity-70"
            >
              {submitting ? (
                <LuLoaderCircle
                  size={ICON_SIZE.control}
                  className="animate-spin"
                  aria-hidden="true"
                />
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <a
            href="#recuperar-senha"
            className="mt-8 font-mono text-eyebrow uppercase text-ink-muted underline underline-offset-4 transition-colors hover:text-signal-deep"
          >
            Esqueceu a senha?
          </a>
        </div>
      </div>
    </div>
  );
}
