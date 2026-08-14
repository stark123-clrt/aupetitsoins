import type { Comment, Media, ServiceCategory, ServiceDetail } from "@/types";
import { apiFetch } from "./client";

export async function getAdminServices(): Promise<ServiceDetail[]> {
  const { items } = await apiFetch<{ items: ServiceDetail[] }>("/admin/services");
  return items;
}

export interface ServiceInput {
  title: string;
  description: string;
  priceHtCents: number;
  vatRate: number;
  durationMinutes: number;
  category: ServiceCategory;
  active: boolean;
}

export async function createService(input: ServiceInput): Promise<ServiceDetail> {
  return apiFetch<ServiceDetail>("/admin/services", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateService(
  id: string,
  input: Partial<ServiceInput>
): Promise<ServiceDetail> {
  return apiFetch<ServiceDetail>(`/admin/services/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function deleteService(id: string): Promise<void> {
  await apiFetch<void>(`/admin/services/${id}`, { method: "DELETE" });
}

export async function toggleService(
  id: string,
  active: boolean
): Promise<ServiceDetail> {
  return updateService(id, { active });
}

export async function uploadMedia(serviceId: string, file: File): Promise<Media> {
  const formData = new FormData();
  formData.append("file", file);
  return apiFetch<Media>(`/admin/services/${serviceId}/media`, {
    method: "POST",
    body: formData,
  });
}

export async function deleteMedia(id: string): Promise<void> {
  await apiFetch<void>(`/admin/media/${id}`, { method: "DELETE" });
}

export async function getAdminComments(): Promise<Comment[]> {
  const { items } = await apiFetch<{ items: Comment[] }>("/admin/comments");
  return items;
}

export async function approveComment(id: string): Promise<Comment> {
  return apiFetch<Comment>(`/admin/comments/${id}/approve`, { method: "PATCH" });
}

export async function deleteComment(id: string): Promise<void> {
  await apiFetch<void>(`/admin/comments/${id}`, { method: "DELETE" });
}
