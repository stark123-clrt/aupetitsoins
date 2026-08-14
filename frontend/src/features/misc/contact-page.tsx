import { useState, type FormEvent } from "react";
import { Check, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CONTACT_CARDS = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "01 23 45 67 89",
    sub: "Lun. – Sam.",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@aupetitsoin.fr",
    sub: "Réponse sous 24 h",
  },
  {
    icon: MapPin,
    label: "Zone d'intervention",
    value: "Paris et Île-de-France",
    sub: "Sur rendez-vous",
  },
];

export function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
        Contact
      </div>
      <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
        Parlons de vos besoins
      </h1>
      <p className="mb-10 max-w-xl text-lg text-muted-foreground">
        Une question sur nos prestations, un devis, un partenariat ? Écrivez-nous,
        nous répondons sous 24 h ouvrées.
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <div className="flex flex-col gap-4">
          {CONTACT_CARDS.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent">
                <c.icon className="size-5 text-primary" />
              </span>
              <div>
                <div className="text-xs text-muted-foreground">{c.label}</div>
                <div className="font-bold">{c.value}</div>
                <div className="text-xs text-muted-foreground">{c.sub}</div>
              </div>
            </div>
          ))}
          <div className="rounded-2xl bg-secondary/40 p-5">
            <div className="mb-1.5 flex items-center gap-2 font-bold">
              <Clock className="size-4 text-primary" />
              Horaires
            </div>
            <p className="text-sm leading-loose text-muted-foreground">
              Lun. – Ven. : 8h00 – 19h00
              <br />
              Samedi : 9h00 – 13h00
            </p>
          </div>
        </div>

        <Card className="rounded-2xl p-8 shadow-sm">
          <CardContent className="p-0">
            {sent ? (
              <div className="py-12 text-center">
                <span className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
                  <Check className="size-8 text-green-700 dark:text-green-300" />
                </span>
                <h2 className="mb-2 text-2xl font-bold">Message envoyé</h2>
                <p className="mb-6 text-muted-foreground">
                  Merci — nous revenons vers vous très vite.
                </p>
                <Button variant="outline" onClick={() => setSent(false)}>
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="contact-name">Nom complet</FieldLabel>
                    <Input id="contact-name" required placeholder="Camille Martin" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="contact-phone">Téléphone</FieldLabel>
                    <Input id="contact-phone" placeholder="06 12 34 56 78" />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="vous@exemple.fr"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="contact-subject">Sujet</FieldLabel>
                  <Select defaultValue="info">
                    <SelectTrigger id="contact-subject" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Demande d'information</SelectItem>
                      <SelectItem value="devis">Demande de devis</SelectItem>
                      <SelectItem value="partenariat">Partenariat</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                  <Textarea
                    id="contact-message"
                    required
                    placeholder="Décrivez votre besoin…"
                    className="min-h-32"
                  />
                </Field>
                <Button type="submit" size="lg" className="mt-2">
                  Envoyer le message
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
