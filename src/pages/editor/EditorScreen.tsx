import { useState } from "react";
import { LuDownload, LuPanelLeft, LuX } from "react-icons/lu";
import { ResumeView } from "@/components/ResumeView";
import { Button } from "@/components/ui/button";
import { DEFAULT } from "@/constants";
import { ICON_SIZE } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import type { ResumeData } from "@/types";
import { EditorHeader } from "./EditorHeader";
import { EditorPanel } from "./EditorPanel";
import { resumeFileName } from "./fileName";

const ZOOM_STEP = 0.05;
const MIN_SCALE = 0.25;
const MAX_SCALE = 1.2;
const DEFAULT_SCALE = 0.85;
const PAGE_WIDTH = 794;
const PANEL_WIDTH = 320;
const PREVIEW_GUTTER = 48;
const PANEL_BREAKPOINT = 768;

const fitScale = () => {
  const panel = window.innerWidth >= PANEL_BREAKPOINT ? PANEL_WIDTH : 0;
  const available = window.innerWidth - panel - PREVIEW_GUTTER;
  return Math.min(DEFAULT_SCALE, Math.max(MIN_SCALE, available / PAGE_WIDTH));
};

export function EditorScreen() {
  const [data, setData] = useState<ResumeData>(DEFAULT);
  const [scale, setScale] = useState(fitScale);
  const [panelOpen, setPanelOpen] = useState(false);

  const handlePrint = () => {
    const previous = document.title;
    const restore = () => {
      document.title = previous;
    };

    window.addEventListener("afterprint", restore, { once: true });
    document.title = resumeFileName(data.name, data.title);

    try {
      window.print();
    } catch {
      window.removeEventListener("afterprint", restore);
      restore();
    }
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-paper-deep font-body">
      <EditorHeader name={data.name} />

      <div className="flex min-h-0 flex-1">
        {panelOpen && (
          <button
            type="button"
            aria-label="Fechar editor"
            onClick={() => setPanelOpen(false)}
            className="fixed inset-0 z-20 bg-ink/40 md:hidden"
          />
        )}

        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 flex w-[min(20rem,86vw)] flex-col border-r border-ink bg-paper transition-transform duration-200",
            "md:static md:z-10 md:flex md:translate-x-0",
            panelOpen ? "flex translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex-1 overflow-y-auto [scrollbar-color:color-mix(in_oklab,var(--ink)_20%,transparent)_transparent] [scrollbar-width:thin]">
            <EditorPanel data={data} onChange={setData} />
          </div>
          <Button
            type="button"
            variant="icon"
            size="iconSm"
            onClick={() => setPanelOpen(false)}
            aria-label="Fechar editor"
            className="absolute right-3 top-3 z-40 bg-paper md:hidden"
          >
            <LuX size={ICON_SIZE.control} aria-hidden="true" />
          </Button>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-shrink-0 items-center justify-between gap-2 border-b border-rule bg-paper px-3 py-3 md:gap-3 md:px-6">
            <div className="flex min-w-0 items-center gap-2 md:gap-3">
              {!panelOpen && (
                <Button
                  type="button"
                  variant="icon"
                  size="iconSm"
                  onClick={() => setPanelOpen(true)}
                  aria-label="Abrir editor"
                  className="md:hidden"
                >
                  <LuPanelLeft size={ICON_SIZE.control} aria-hidden="true" />
                </Button>
              )}
              <span className="hidden font-mono text-eyebrow uppercase text-ink lg:inline">
                Pré-visualização
              </span>
              <span className="hidden whitespace-nowrap border border-rule px-2 py-0.5 font-mono text-eyebrow uppercase text-ink-muted sm:inline">
                A4 · PDF
              </span>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2 md:gap-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  type="button"
                  variant="icon"
                  size="iconSm"
                  onClick={() => setScale((s) => Math.max(MIN_SCALE, s - ZOOM_STEP))}
                  aria-label="Diminuir zoom"
                  className="font-mono text-sm"
                >
                  −
                </Button>
                <span className="w-10 text-center font-mono text-eyebrow-tight text-ink-muted sm:w-12">
                  {Math.round(scale * 100)}%
                </span>
                <Button
                  type="button"
                  variant="icon"
                  size="iconSm"
                  onClick={() => setScale((s) => Math.min(MAX_SCALE, s + ZOOM_STEP))}
                  aria-label="Aumentar zoom"
                  className="font-mono text-sm"
                >
                  +
                </Button>
              </div>

              <Button
                type="button"
                onClick={handlePrint}
                aria-label="Baixar PDF"
                className="gap-2 px-3 sm:px-4"
              >
                <LuDownload size={ICON_SIZE.control} aria-hidden="true" />
                <span className="hidden sm:inline">Baixar PDF</span>
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto [scrollbar-color:color-mix(in_oklab,var(--ink)_20%,transparent)_transparent] [scrollbar-width:thin]">
            <div
              className="flex justify-center px-3 py-4 md:px-6 md:py-8"
              style={{ "--zoom": scale } as React.CSSProperties}
            >
              <div id="resume-zoom">
                <ResumeView data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
