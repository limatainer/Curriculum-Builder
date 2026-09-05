import { createRouter, RouterProvider } from "@tanstack/react-router";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { createRoot } from "react-dom/client";
import { routeTree } from "@/routeTree.gen";
import "@/index.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
injectSpeedInsights();

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
