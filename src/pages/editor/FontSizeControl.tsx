import { useId, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { clampPt, MAX_PT, MIN_PT, STACK_PT } from "@/helpers/fontSize";
import { cn } from "@/lib/utils";

export function FontSizeControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const id = useId();
  const current = clampPt(value);
  const [draft, setDraft] = useState(String(current));

  const commitPt = (pt: number) => {
    setDraft(String(pt));
    onChange(pt);
  };

  const handleChange = (raw: string) => {
    const parsed = Number(raw);
    if (raw.trim() !== "" && Number.isFinite(parsed) && parsed > MAX_PT) {
      commitPt(MAX_PT);
      return;
    }
    setDraft(raw);
    if (raw.trim() === "" || !Number.isFinite(parsed) || parsed < MIN_PT) return;
    onChange(clampPt(parsed));
  };

  const commit = () => {
    const raw = draft.trim();
    commitPt(raw === "" ? current : clampPt(Number(raw), current));
  };

  const step = (delta: number) => commitPt(clampPt(current + delta));

  const stepButton = cn(
    buttonVariants({ variant: "step", size: "iconMd" }),
    "disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
  );

  return (
    <div className="mt-4 flex flex-col gap-2 border-t border-rule pt-4">
      <Label htmlFor={id}>Tamanho da fonte</Label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Diminuir fonte"
          onClick={() => step(-1)}
          disabled={current <= MIN_PT}
          className={stepButton}
        >
          −
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={MIN_PT}
          max={MAX_PT}
          step={1}
          value={draft}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
          }}
          className="h-8 w-14 rounded-none border border-ink/30 bg-transparent px-2 text-center text-sm text-ink transition-colors focus:border-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        />
        <button
          type="button"
          aria-label="Aumentar fonte"
          onClick={() => step(1)}
          disabled={current >= MAX_PT}
          className={stepButton}
        >
          +
        </button>
        <span className="font-mono text-meta text-ink-muted">pt</span>
      </div>
      {current >= STACK_PT && (
        <p className="font-mono text-micro text-ink-muted">
          Nesse tamanho o currículo passa para coluna única.
        </p>
      )}
    </div>
  );
}
