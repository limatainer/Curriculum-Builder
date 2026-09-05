const ILLEGAL = /[/\\:*?"<>|]|\p{C}/gu;

const clean = (value: string) => value.replace(ILLEGAL, " ").replace(/\s+/g, " ").trim();

export function resumeFileName(name: string, title: string) {
  const parts = [clean(name) || "curriculo", clean(title)].filter(Boolean);
  return parts.join("_").replace(/[.\s]+$/, "");
}
