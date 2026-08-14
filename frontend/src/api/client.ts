import { getAccessToken, setAccessToken } from "./token-store";

export const API_URL = import.meta.env.VITE_API_URL ?? "/api";

export class ApiError extends Error {
  status: number;
  detail: string;

  constructor(status: number, title: string, detail = "") {
    super(title);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

let refreshPromise: Promise<boolean> | null = null;

/**
 * Deduplicated: concurrent callers (e.g. React StrictMode's double effect
 * invocation) share the same in-flight request instead of both hitting the
 * single-use refresh token, which would make the second call fail and wipe
 * out the session the first call just restored.
 */
export function refreshSession(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) return false;
      const body = await res.json();
      setAccessToken(body.token ?? null);
      return Boolean(body.token);
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Typed fetch wrapper: attaches the in-memory JWT, sends the httpOnly refresh
 * cookie, and retries once via silent refresh on a 401.
 */
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  allowRefreshRetry = true
): Promise<T> {
  const token = getAccessToken();
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (
    res.status === 401 &&
    allowRefreshRetry &&
    path !== "/auth/login" &&
    path !== "/auth/refresh"
  ) {
    const refreshed = await refreshSession();
    if (refreshed) {
      return apiFetch<T>(path, options, false);
    }
  }

  if (!res.ok) {
    let title = res.statusText;
    let detail = "";
    try {
      const body = await res.json();
      title = body.title ?? body.message ?? title;
      detail = body.detail ?? "";
    } catch {
      // no body
    }
    throw new ApiError(res.status, title, detail);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
