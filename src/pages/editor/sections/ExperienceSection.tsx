import { AnimatePresence } from "motion/react";
import { LuBriefcase, LuPlus, LuX } from "react-icons/lu";
import { Label } from "@/components/ui/label";
import { uid } from "@/helpers/uid";
import { ICON_SIZE } from "@/lib/tokens";
import type { Experience } from "@/types";
import { AddButton } from "../AddButton";
import { EntryHeader } from "../EntryHeader";
import { Field } from "../Field";
import { makeExp } from "../factories";
import { entryCard, inlineInput } from "../fieldStyles";
import { MotionCard } from "../MotionCard";
import { RemoveButton } from "../RemoveButton";
import { Section } from "../Section";
import { useArrayField } from "../useArrayField";

interface ExperienceSectionProps {
  items: Experience[];
  onChange: (items: Experience[]) => void;
}

export function ExperienceSection({ items, onChange }: ExperienceSectionProps) {
  const exps = useArrayField(items, onChange);

  const mapBullets = (expId: string, fn: (e: Experience) => Experience) =>
    onChange(items.map((e) => (e.id === expId ? fn(e) : e)));

  const addBullet = (expId: string) =>
    mapBullets(expId, (e) => ({ ...e, bullets: [...e.bullets, { id: uid(), text: "" }] }));

  const removeBullet = (expId: string, bId: string) =>
    mapBullets(expId, (e) => ({ ...e, bullets: e.bullets.filter((b) => b.id !== bId) }));

  const updateBullet = (expId: string, bId: string, text: string) =>
    mapBullets(expId, (e) => ({
      ...e,
      bullets: e.bullets.map((b) => (b.id === bId ? { ...b, text } : b)),
    }));

  return (
    <Section
      title="Experiência Profissional"
      icon={<LuBriefcase size={ICON_SIZE.section} />}
      defaultOpen
    >
      <AnimatePresence initial={false}>
        {items.map((exp, idx) => (
          <MotionCard key={exp.id} className={entryCard}>
            <EntryHeader
              label="Experiência"
              index={idx}
              removeLabel="Remover experiência"
              onRemove={() => exps.remove(exp.id)}
            />
            <Field
              label="Cargo"
              value={exp.title}
              onChange={(v) => exps.update(exp.id, "title", v)}
            />
            <Field
              label="Empresa"
              value={exp.company}
              onChange={(v) => exps.update(exp.id, "company", v)}
            />
            <Field
              label="Localização"
              value={exp.location}
              onChange={(v) => exps.update(exp.id, "location", v)}
            />
            <Field
              label="Período"
              value={exp.period}
              onChange={(v) => exps.update(exp.id, "period", v)}
            />
            <div>
              <Label>Atividades</Label>
              <div className="flex flex-col gap-1.5 mt-1">
                {exp.bullets.map((b) => (
                  <div key={b.id} className="flex gap-1.5 items-start">
                    <input
                      className={inlineInput}
                      value={b.text}
                      onChange={(e) => updateBullet(exp.id, b.id, e.target.value)}
                      placeholder="Descreva uma atividade..."
                    />
                    <RemoveButton
                      label="Remover atividade"
                      onClick={() => removeBullet(exp.id, b.id)}
                      className="mt-0.5"
                    >
                      <LuX size={ICON_SIZE.control} />
                    </RemoveButton>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addBullet(exp.id)}
                  className="mt-1 flex items-center gap-1 font-mono text-eyebrow uppercase text-ink transition-colors hover:text-signal-deep"
                >
                  <LuPlus size={ICON_SIZE.control} /> Adicionar atividade
                </button>
              </div>
            </div>
          </MotionCard>
        ))}
      </AnimatePresence>
      <AddButton label="Adicionar experiência" onClick={() => exps.add(makeExp())} />
    </Section>
  );
}
