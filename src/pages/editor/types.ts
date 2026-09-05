import type { ResumeData } from "@/types";

export type SetField = (key: keyof ResumeData) => (val: unknown) => void;
