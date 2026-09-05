import { motion } from "motion/react";
import { LuCheck, LuPalette } from "react-icons/lu";
import { Label } from "@/components/ui/label";
import { PRESETS } from "@/constants";
import { ICON_SIZE } from "@/lib/tokens";
import type { ResumeData } from "@/types";
import { FontSizeControl } from "../FontSizeControl";
import { Section } from "../Section";
import type { SetField } from "../types";

export function StyleSection({ data, set }: { data: ResumeData; set: SetField }) {
  return (
    <Section title="Cores e Estilo" icon={<LuPalette size={ICON_SIZE.section} />}>
      <div className="flex flex-col gap-2">
        <Label>Cor de Destaque</Label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((c) => {
            const selected = data.accentColor === c;
            return (
              <motion.button
                key={c}
                onClick={() => set("accentColor")(c)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="relative flex h-7 w-7 items-center justify-center rounded-none"
                style={{ backgroundColor: c }}
              >
                {selected && (
                  <motion.span
                    layoutId="color-ring"
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                    className="absolute inset-(--ring-offset-selected) rounded-none border border-ink"
                  />
                )}
                {selected && (
                  <LuCheck size={ICON_SIZE.control} color="var(--doc-on-dark)" strokeWidth={3} />
                )}
              </motion.button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Label htmlFor="accent-color">Personalizar</Label>
          <input
            id="accent-color"
            type="color"
            value={data.accentColor}
            onChange={(e) => set("accentColor")(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded-none border border-rule bg-transparent"
          />
          <span className="font-mono text-eyebrow-tight text-ink-muted">
            {data.accentColor.toUpperCase()}
          </span>
        </div>

        <FontSizeControl value={data.fontSizePt} onChange={(v) => set("fontSizePt")(v)} />
      </div>
    </Section>
  );
}
