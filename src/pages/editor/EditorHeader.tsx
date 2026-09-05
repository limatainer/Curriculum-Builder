import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { signOut } from "@/hooks/useSession";

const initialsOf = (name: string) => {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part.charAt(0).toUpperCase()).join("") || "?";
};

export function EditorHeader({ name }: { name: string }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="flex flex-shrink-0 items-center justify-between border-b border-ink bg-paper px-4 py-3 md:px-6">
      <Link
        to="/"
        className="font-mono text-eyebrow uppercase text-ink transition-colors hover:text-signal-deep"
      >
        WEBCV ⁄ 001
      </Link>

      <div className="flex items-center gap-2 md:gap-3">
        <Button type="button" className="hidden sm:flex">
          Assinar
        </Button>

        <span className="flex h-9 w-9 items-center justify-center rounded-none bg-ink font-mono text-eyebrow-tight uppercase text-paper">
          <span className="sr-only">Conta de {name}</span>
          <span aria-hidden="true">{initialsOf(name)}</span>
        </span>

        <Button type="button" variant="outline" onClick={handleSignOut}>
          Sair
        </Button>
      </div>
    </header>
  );
}
