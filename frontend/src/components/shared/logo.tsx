import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center", className)}>
      <img src="/logo.jpeg" alt="Aux Petits Soins" className="h-12 w-auto" />
    </Link>
  );
}
