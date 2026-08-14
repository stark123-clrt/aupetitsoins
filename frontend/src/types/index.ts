export type Role = "ADMIN";

export type ServiceCategory = "MENAGE" | "GARDE_ENFANT" | "AIDE_ADMIN";

export type MediaType = "PHOTO" | "VIDEO";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  createdAt: string;
}

export interface Media {
  id: string;
  type: MediaType;
  url: string;
  position: number;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  priceHtCents: number;
  vatRate: number;
  durationMinutes: number;
  category: ServiceCategory;
  active: boolean;
}

export interface ServiceDetail extends Service {
  media: Media[];
}

export interface Comment {
  id: string;
  serviceId: string;
  authorName: string;
  content: string;
  approved: boolean;
  createdAt: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
