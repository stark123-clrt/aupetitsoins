import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/auth";
import { logout } from "@/actions/auth";

const NAV = [
  { href: "/admin/services", label: "Gestion des services" },
  { href: "/admin/categories", label: "Catégories" },
  { href: "/admin/avis", label: "Modération des avis" },
  { href: "/admin/apparence", label: "Personnalisation" },
];

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const session = await requireAdmin();

  return (
    <div className="grid min-h-svh grid-cols-1 bg-[#F5F1E9] text-foreground md:grid-cols-[268px_1fr]">
      <aside className="flex flex-col gap-8.5 bg-foreground px-5.5 py-6.5 text-background">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={601}
            height={568}
            className="h-8 w-auto"
          />
          <span className="font-display text-[22px]">Aux Petits Soins</span>
        </Link>
        <div>
          <div className="text-[11.5px] uppercase tracking-[0.1em] text-background/45">
            Administration
          </div>
          <nav className="mt-3.5 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[10px] px-3.5 py-2.75 text-[15px] text-background/78 hover:bg-background/10"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/services"
              className="rounded-[10px] px-3.5 py-2.75 text-[15px] text-background/78 hover:bg-background/10"
            >
              Voir le site public
            </Link>
          </nav>
        </div>
        <div className="mt-auto border-t border-background/18 pt-4.5">
          <div className="text-[14.5px]">{session.fullName}</div>
          <div className="mt-0.5 text-[13px] text-background/50">{session.email}</div>
          <form action={logout}>
            <button
              type="submit"
              className="mt-3 cursor-pointer text-[13.5px] text-accent-soft"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      <main className="max-w-[1180px] px-6 py-8.5 sm:px-10">{children}</main>
    </div>
  );
}
