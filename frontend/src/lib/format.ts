import { format, formatDistanceToNow, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import type { ServiceCategory } from "@/types";

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export function computeTtcCents(priceHtCents: number, vatRate: number): number {
  return Math.round(priceHtCents * (1 + vatRate / 100));
}

export function afterTaxCreditCents(ttcCents: number): number {
  return Math.round(ttcCents / 2);
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m}`;
}

export function formatDateTime(iso: string): string {
  return format(new Date(iso), "EEEE d MMMM yyyy 'à' HH'h'mm", { locale: fr });
}

export function formatDateLong(iso: string): string {
  return format(new Date(iso), "d MMMM yyyy", { locale: fr });
}

export function formatTime(iso: string): string {
  return format(new Date(iso), "HH'h'mm", { locale: fr });
}

export function formatDayLabel(iso: string): string {
  return format(new Date(iso), "EEE d MMM", { locale: fr });
}

export function formatRelative(iso: string): string {
  return formatDistanceToNow(new Date(iso), { locale: fr, addSuffix: true });
}

export function sameDay(a: string | Date, b: string | Date): boolean {
  return isSameDay(new Date(a), new Date(b));
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  MENAGE: "Ménage",
  GARDE_ENFANT: "Garde d'enfant",
  AIDE_ADMIN: "Aide administrative",
};

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
