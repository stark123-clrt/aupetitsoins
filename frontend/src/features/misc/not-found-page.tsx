import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold tracking-tight text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">Page introuvable</h1>
      <p className="mt-2 text-muted-foreground">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">Retour à l'accueil</Link>
      </Button>
    </div>
  );
}
