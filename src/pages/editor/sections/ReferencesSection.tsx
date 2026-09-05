import { AnimatePresence } from "motion/react";
import { LuUser } from "react-icons/lu";
import { ICON_SIZE } from "@/lib/tokens";
import type { Reference } from "@/types";
import { AddButton } from "../AddButton";
import { EntryHeader } from "../EntryHeader";
import { Field } from "../Field";
import { makeRef } from "../factories";
import { entryCard } from "../fieldStyles";
import { MotionCard } from "../MotionCard";
import { Section } from "../Section";
import { useArrayField } from "../useArrayField";

interface ReferencesSectionProps {
  items: Reference[];
  onChange: (items: Reference[]) => void;
}

export function ReferencesSection({ items, onChange }: ReferencesSectionProps) {
  const refs = useArrayField(items, onChange);

  return (
    <Section title="Referências" icon={<LuUser size={ICON_SIZE.section} />}>
      <AnimatePresence initial={false}>
        {items.map((r, idx) => (
          <MotionCard key={r.id} className={entryCard}>
            <EntryHeader
              label="Referência"
              index={idx}
              removeLabel="Remover referência"
              onRemove={() => refs.remove(r.id)}
            />
            <Field label="Nome" value={r.name} onChange={(v) => refs.update(r.id, "name", v)} />
            <Field
              label="Empresa"
              value={r.company}
              onChange={(v) => refs.update(r.id, "company", v)}
            />
            <Field
              label="Telefone"
              value={r.phone}
              onChange={(v) => refs.update(r.id, "phone", v)}
            />
            <Field label="E-mail" value={r.email} onChange={(v) => refs.update(r.id, "email", v)} />
          </MotionCard>
        ))}
      </AnimatePresence>
      <AddButton label="Adicionar referência" onClick={() => refs.add(makeRef())} />
    </Section>
  );
}
