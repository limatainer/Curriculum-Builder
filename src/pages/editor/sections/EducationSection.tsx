import { AnimatePresence } from "motion/react";
import { LuGraduationCap } from "react-icons/lu";
import { ICON_SIZE } from "@/lib/tokens";
import type { Education } from "@/types";
import { AddButton } from "../AddButton";
import { EntryHeader } from "../EntryHeader";
import { Field } from "../Field";
import { makeEdu } from "../factories";
import { entryCard } from "../fieldStyles";
import { MotionCard } from "../MotionCard";
import { Section } from "../Section";
import { useArrayField } from "../useArrayField";

interface EducationSectionProps {
  items: Education[];
  onChange: (items: Education[]) => void;
}

export function EducationSection({ items, onChange }: EducationSectionProps) {
  const edu = useArrayField(items, onChange);

  return (
    <Section title="Formação Acadêmica" icon={<LuGraduationCap size={ICON_SIZE.section} />}>
      <AnimatePresence initial={false}>
        {items.map((e, idx) => (
          <MotionCard key={e.id} className={entryCard}>
            <EntryHeader
              label="Formação"
              index={idx}
              removeLabel="Remover formação"
              onRemove={() => edu.remove(e.id)}
            />
            <Field
              label="Curso / Grau"
              value={e.degree}
              onChange={(v) => edu.update(e.id, "degree", v)}
            />
            <Field
              label="Instituição"
              value={e.institution}
              onChange={(v) => edu.update(e.id, "institution", v)}
            />
            <Field
              label="Período"
              value={e.period}
              onChange={(v) => edu.update(e.id, "period", v)}
            />
          </MotionCard>
        ))}
      </AnimatePresence>
      <AddButton label="Adicionar formação" onClick={() => edu.add(makeEdu())} />
    </Section>
  );
}
