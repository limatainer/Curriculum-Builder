import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { signIn } from "@/hooks/useSession";
import { Landing } from "@/pages/landing/Landing";

export const Route = createFileRoute("/")({ component: LandingRoute });

function LandingRoute() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    signIn();
    navigate({ to: "/editor" });
  };

  return <Landing onSignIn={handleSignIn} />;
}
