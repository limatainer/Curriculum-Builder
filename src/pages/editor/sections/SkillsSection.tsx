import { AnimatePresence } from "motion/react";
import { LuSlidersHorizontal } from "react-icons/lu";
import { ICON_SIZE } from "@/lib/tokens";
import type { Skill } from "@/types";
import { AddButton } from "../AddButton";
import { makeSkill } from "../factories";
import { inlineInput } from "../fieldStyles";
import { RemoveButton } from "../RemoveButton";
import { Row } from "../Row";
import { Section } from "../Section";
import { useArrayField } from "../useArrayField";

interface SkillsSectionProps {
  items: Skill[];
  onChange: (items: Skill[]) => void;
}

export function SkillsSection({ items, onChange }: SkillsSectionProps) {
  const skills = useArrayField(items, onChange);

  return (
    <Section title="Habilidades" icon={<LuSlidersHorizontal size={ICON_SIZE.section} />}>
      <AnimatePresence initial={false}>
        {items.map((s) => (
          <Row key={s.id}>
            <input
              className={inlineInput}
              value={s.name}
              onChange={(e) => skills.update(s.id, "name", e.target.value)}
              placeholder="Habilidade"
            />
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={s.level}
                onChange={(e) => skills.update(s.id, "level", Number(e.target.value))}
                className="w-20 accent-signal"
              />
              <span className="w-9 text-right font-mono text-meta text-ink-muted">{s.level}%</span>
            </div>
            <RemoveButton label="Remover habilidade" onClick={() => skills.remove(s.id)} />
          </Row>
        ))}
      </AnimatePresence>
      <AddButton label="Adicionar habilidade" onClick={() => skills.add(makeSkill())} />
    </Section>
  );
}
