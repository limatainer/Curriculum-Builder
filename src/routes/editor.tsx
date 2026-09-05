import { createFileRoute, redirect } from "@tanstack/react-router";
import { isSignedIn } from "@/hooks/useSession";
import { EditorScreen } from "@/pages/editor/EditorScreen";

export const Route = createFileRoute("/editor")({
  beforeLoad: () => {
    if (!isSignedIn()) throw redirect({ to: "/" });
  },
  component: EditorScreen,
});
