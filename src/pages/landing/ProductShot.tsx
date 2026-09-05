import { ResumeView } from "@/components/ResumeView";
import { DEFAULT } from "@/constants";
import { cn } from "@/lib/utils";

export function ProductShot({ scaleClass }: { scaleClass: string }) {
  const stripResumeId = (node: HTMLDivElement | null) => {
    node?.querySelector("#resume-page")?.removeAttribute("id");
  };

  return (
    <div
      ref={stripResumeId}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden bg-paper-deep"
    >
      <div className={cn("origin-top", scaleClass)}>
        <ResumeView data={DEFAULT} />
      </div>
    </div>
  );
}
