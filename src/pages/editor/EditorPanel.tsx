import type { ResumeData } from "@/types";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { PersonalSection } from "./sections/PersonalSection";
import { ReferencesSection } from "./sections/ReferencesSection";
import { SkillsSection } from "./sections/SkillsSection";
import { StyleSection } from "./sections/StyleSection";

interface EditorPanelProps {
  data: ResumeData;
  onChange: (d: ResumeData) => void;
}

export function EditorPanel({ data, onChange }: EditorPanelProps) {
  const set = (key: keyof ResumeData) => (val: unknown) => onChange({ ...data, [key]: val });

  return (
    <div className="flex h-full flex-col bg-paper font-body text-ink">
      <div className="flex-shrink-0 border-b border-ink px-5 py-5">
        <div className="font-mono text-eyebrow uppercase text-signal-deep">Editor ⁄ 003</div>
        <div className="mt-2 font-display text-display-xs font-black uppercase text-ink">
          Personalize seu CV
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <PersonalSection data={data} set={set} />
        <StyleSection data={data} set={set} />
        <ExperienceSection items={data.experiences} onChange={set("experiences")} />
        <EducationSection items={data.education} onChange={set("education")} />
        <SkillsSection items={data.skills} onChange={set("skills")} />
        <LanguagesSection items={data.languages} onChange={set("languages")} />
        <ReferencesSection items={data.references} onChange={set("references")} />

        <div className="h-8" />
      </div>
    </div>
  );
}
