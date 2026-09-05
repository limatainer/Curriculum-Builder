import { isDarkHex } from "@/helpers/contrast";
import { clampPt, STACK_PT } from "@/helpers/fontSize";
import { cn } from "@/lib/utils";
import type { ResumeData } from "@/types";
import { ResumeBody } from "./resume/ResumeBody";
import { ResumeHeader } from "./resume/ResumeHeader";
import { ResumeSidebar } from "./resume/ResumeSidebar";
import styles from "./resume/ResumeView.module.css";

export function ResumeView({ data }: { data: ResumeData }) {
  const hex = data.accentColor;
  const fgColor = isDarkHex(hex) ? "var(--doc-on-dark)" : "var(--doc-on-light)";

  const pt = clampPt(data.fontSizePt);
  const stacked = pt >= STACK_PT;

  return (
    <div
      id="resume-page"
      className={cn(styles.page, "relative bg-doc-paper shadow-2xl font-body")}
      style={{ fontSize: `${pt}pt` }}
    >
      <ResumeHeader data={data} hex={hex} fgColor={fgColor} />

      <div style={{ display: "flex", flexDirection: stacked ? "column" : "row" }}>
        <ResumeSidebar data={data} hex={hex} stacked={stacked} />
        <ResumeBody data={data} hex={hex} />
      </div>

      <div
        aria-hidden="true"
        className={cn(styles.pageGuides, "pointer-events-none absolute inset-0")}
      />
    </div>
  );
}
