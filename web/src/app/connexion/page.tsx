import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/components/site/login-form";

export default function ConnexionPage() {
  return (
    <div className="flex min-h-svh flex-col bg-foreground text-background">
      <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between px-6 py-6 sm:px-12">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={601}
            height={568}
            className="h-9 w-auto"
          />
          <span className="font-display text-2xl">Aux Petits Soins</span>
        </Link>
        <Link href="/" className="text-[14.5px] text-background/65">
          ← Retour au site
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 pb-24 pt-12">
        <div className="w-full max-w-[440px]">
          <div className="text-center text-[12.5px] uppercase tracking-[0.1em] text-background/50">
            Espace administration
          </div>
          <h1 className="mt-3.5 text-center text-[44px] leading-[1.08]">Connexion</h1>
          <p className="mt-3 text-center text-[15.5px] leading-relaxed text-background/65">
            Accès réservé à la gestion des services et des avis.
          </p>

          <div className="mt-8 rounded-[22px] bg-background p-8 text-foreground">
            <LoginForm />
          </div>

          <p className="mt-5.5 text-center text-[13.5px] leading-relaxed text-background/45">
            Les visiteurs n&apos;ont pas de compte : les demandes passent par le
            formulaire de contact.
          </p>
        </div>
      </div>
    </div>
  );
}
