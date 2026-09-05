import { AnimatePresence } from "motion/react";
import { LuBookOpen } from "react-icons/lu";
import { ICON_SIZE } from "@/lib/tokens";
import type { Language } from "@/types";
import { AddButton } from "../AddButton";
import { makeLang } from "../factories";
import { inlineInput } from "../fieldStyles";
import { RemoveButton } from "../RemoveButton";
import { Row } from "../Row";
import { Section } from "../Section";
import { useArrayField } from "../useArrayField";

interface LanguagesSectionProps {
  items: Language[];
  onChange: (items: Language[]) => void;
}

export function LanguagesSection({ items, onChange }: LanguagesSectionProps) {
  const langs = useArrayField(items, onChange);

  return (
    <Section title="Idiomas" icon={<LuBookOpen size={ICON_SIZE.section} />}>
      <AnimatePresence initial={false}>
        {items.map((l) => (
          <Row key={l.id}>
            <input
              className={inlineInput}
              value={l.name}
              onChange={(e) => langs.update(l.id, "name", e.target.value)}
              placeholder="ex: Inglês (Fluente)"
            />
            <RemoveButton label="Remover idioma" onClick={() => langs.remove(l.id)} />
          </Row>
        ))}
      </AnimatePresence>
      <AddButton label="Adicionar idioma" onClick={() => langs.add(makeLang())} />
    </Section>
  );
}
