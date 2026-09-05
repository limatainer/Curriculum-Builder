import { uid } from "@/helpers/uid";
import type { Education, Experience, Language, Reference, Skill } from "@/types";

export function makeExp() {
  return {
    id: uid(),
    title: "Novo Cargo",
    company: "Empresa",
    location: "Cidade, UF",
    period: "2024 – atual",
    bullets: [],
  } satisfies Experience;
}
export function makeEdu() {
  return {
    id: uid(),
    degree: "Curso",
    institution: "Instituição",
    period: "2024",
  } satisfies Education;
}
export function makeSkill() {
  return { id: uid(), name: "Nova habilidade", level: 70 } satisfies Skill;
}
export function makeLang() {
  return { id: uid(), name: "Idioma" } satisfies Language;
}
export function makeRef() {
  return {
    id: uid(),
    name: "Nome",
    company: "Empresa",
    phone: "",
    email: "",
  } satisfies Reference;
}
