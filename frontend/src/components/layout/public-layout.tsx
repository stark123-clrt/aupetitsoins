import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Menu } from "lucide-react";
import { useAuth } from "@/features/auth/auth-context";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const NAV = [
  { to: "/", label: "Accueil", end: true },
  { to: "/services", label: "Nos services" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export function PublicLayout() {
  const { isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-8">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="-ml-2 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader className="border-b border-border">
                  <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
                  <SheetDescription className="sr-only">
                    Accédez aux pages du site
                  </SheetDescription>
                  <Logo />
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4">
                  {NAV.map((item) => (
                    <SheetClose asChild key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                          cn(
                            "rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    </SheetClose>
                  ))}
                </nav>
                {isAdmin && (
                  <div className="mt-auto border-t border-border p-4">
                    <SheetClose asChild>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/admin">
                          <LayoutDashboard className="size-4" />
                          Espace admin
                        </Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </SheetContent>
            </Sheet>
            <Logo />
            <nav className="hidden items-center gap-1 md:flex">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            {isAdmin && (
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin">
                  <LayoutDashboard className="size-4" />
                  <span className="hidden sm:inline">Espace admin</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Services à domicile de confiance : ménage, garde d'enfant et aide
              administrative.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Ménage & repassage</li>
              <li>Garde d'enfant</li>
              <li>Aide administrative</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">À savoir</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>50 % de crédit d'impôt</li>
              <li>Intervenants qualifiés</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contact@aupetitsoin.fr</li>
              <li>01 23 45 67 89</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Aux Petits Soins
        </div>
      </footer>
    </div>
  );
}
