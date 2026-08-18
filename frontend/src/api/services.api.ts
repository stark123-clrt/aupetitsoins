import type {
  Comment,
  Paginated,
  RecentComment,
  RecentMedia,
  Service,
  ServiceDetail,
} from "@/types";
import { apiFetch } from "./client";

export async function getServices(category?: string): Promise<Service[]> {
  const { items } = await apiFetch<Paginated<Service>>("/services?pageSize=50");
  return category ? items.filter((s) => s.category === category) : items;
}

export async function getService(slug: string): Promise<ServiceDetail> {
  return apiFetch<ServiceDetail>(`/services/${encodeURIComponent(slug)}`);
}

export async function getServiceComments(slug: string): Promise<Comment[]> {
  const { items } = await apiFetch<{ items: Comment[] }>(
    `/services/${encodeURIComponent(slug)}/comments`
  );
  return items;
}

export interface CommentInput {
  authorName: string;
  content: string;
}

export async function postServiceComment(
  slug: string,
  input: CommentInput
): Promise<Comment> {
  return apiFetch<Comment>(`/services/${encodeURIComponent(slug)}/comments`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getRecentComments(limit = 6): Promise<RecentComment[]> {
  const { items } = await apiFetch<{ items: RecentComment[] }>(
    `/comments/recent?limit=${limit}`
  );
  return items;
}

export async function getRecentMedia(limit = 6): Promise<RecentMedia[]> {
  const { items } = await apiFetch<{ items: RecentMedia[] }>(
    `/media/recent?limit=${limit}`
  );
  return items;
}
