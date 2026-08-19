import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/services", label: "Catalogue" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-8 px-6 py-5 sm:px-12">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/brand/logo-mark.png"
          alt=""
          width={601}
          height={568}
          priority
          className="h-11 w-auto"
        />
        <span className="font-display text-[25px] tracking-tight text-foreground">
          Aux Petits Soins
        </span>
      </Link>
      <nav className="hidden items-center gap-8 text-[14.5px] text-foreground-soft md:flex">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-accent">
            {item.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/contact"
        className="rounded-full bg-foreground px-5 py-2.5 text-[14.5px] font-medium text-background hover:text-background"
      >
        Demander une prestation
      </Link>
    </header>
  );
}
