import { useRef } from "react";
import { LuUpload, LuUser } from "react-icons/lu";
import { ICON_SIZE } from "@/lib/tokens";
import type { ResumeData } from "@/types";
import { Field } from "../Field";
import { Section } from "../Section";
import type { SetField } from "../types";

export function PersonalSection({ data, set }: { data: ResumeData; set: SetField }) {
  const photoRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set("photo")(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Section title="Informações Pessoais" icon={<LuUser size={ICON_SIZE.section} />} defaultOpen>
      <div className="flex items-center gap-3 mb-1">
        <div
          className="flex h-14 w-14 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-none border border-ink/30 bg-paper-deep transition-colors hover:border-signal"
          onClick={() => photoRef.current?.click()}
        >
          {data.photo ? (
            <img src={data.photo} alt="foto" className="w-full h-full object-cover" />
          ) : (
            <LuUpload size={ICON_SIZE.section} className="text-ink-muted" />
          )}
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <button
            type="button"
            onClick={() => photoRef.current?.click()}
            className="text-left font-mono text-eyebrow uppercase text-ink transition-colors hover:text-signal-deep"
          >
            Carregar foto
          </button>
          {data.photo && (
            <button
              type="button"
              onClick={() => set("photo")(null)}
              className="text-left font-mono text-eyebrow uppercase text-ink-muted transition-colors hover:text-signal-deep"
            >
              Remover
            </button>
          )}
        </div>
        <input
          ref={photoRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhoto}
        />
      </div>
      <Field label="Nome Completo" value={data.name} onChange={set("name")} />
      <Field label="Cargo / Título" value={data.title} onChange={set("title")} />
      <Field label="Telefone" value={data.phone} onChange={set("phone")} />
      <Field label="E-mail" value={data.email} onChange={set("email")} />
      <Field label="Website / LinkedIn" value={data.website} onChange={set("website")} />
      <Field label="Endereço" value={data.address} onChange={set("address")} />
      <Field label="Sobre Mim" value={data.about} onChange={set("about")} multiline />
    </Section>
  );
}
