export interface Bullet {
  id: string;
  text: string;
}
export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: Bullet[];
}
export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
}
export interface Skill {
  id: string;
  name: string;
  level: number;
}
export interface Language {
  id: string;
  name: string;
}
export interface Reference {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
}

export interface ResumeData {
  name: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  about: string;
  accentColor: string;
  fontSizePt: number;
  photo: string | null;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  references: Reference[];
}
