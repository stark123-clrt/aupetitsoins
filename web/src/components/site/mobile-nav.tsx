"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function MobileNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Referme le menu après une navigation, sinon il resterait ouvert
  // par-dessus la nouvelle page.
  useEffect(() => setOpen(false), [pathname]);

  // Empêche le défilement de l'arrière-plan tant que le panneau est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-input text-foreground"
      >
        <Menu className="size-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background">
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-display text-[22px]">Aux Petits Soins</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-input"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="flex flex-col px-6 pt-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-border py-5 font-display text-[30px] tracking-tight"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto px-6 pb-10">
            <Link
              href="/contact"
              className="block rounded-full bg-foreground px-6 py-4 text-center text-[15.5px] font-medium text-background"
            >
              Demander une prestation
            </Link>
            <a
              href="tel:+33651736150"
              className="mt-3 block text-center text-[15px] text-muted"
            >
              06 51 73 61 50
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
