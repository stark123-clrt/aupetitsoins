export const queryKeys = {
  services: (category?: string) => ["services", category ?? "all"] as const,
  service: (slug: string) => ["service", slug] as const,
  serviceComments: (slug: string) => ["service-comments", slug] as const,
  recentComments: (limit: number) => ["recent-comments", limit] as const,
  recentMedia: (limit: number) => ["recent-media", limit] as const,
  adminServices: () => ["admin-services"] as const,
  adminComments: () => ["admin-comments"] as const,
};
