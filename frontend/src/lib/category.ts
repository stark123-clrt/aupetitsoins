import { Baby, FileText, Sparkles, type LucideIcon } from "lucide-react";
import type { ServiceCategory } from "@/types";

export const CATEGORY_ICON: Record<ServiceCategory, LucideIcon> = {
  MENAGE: Sparkles,
  GARDE_ENFANT: Baby,
  AIDE_ADMIN: FileText,
};

export const CATEGORY_PHOTO: Partial<Record<ServiceCategory, string>> = {
  MENAGE: "/hero-home-care.webp",
  GARDE_ENFANT: "/hero-garde-enfant.jpg",
};
