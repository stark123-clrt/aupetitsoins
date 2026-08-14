import type { User } from "@/types";
import { apiFetch, refreshSession } from "./client";
import { setAccessToken } from "./token-store";

export interface Credentials {
  email: string;
  password: string;
}

export async function me(): Promise<User> {
  return apiFetch<User>("/me");
}

export async function login(credentials: Credentials): Promise<User> {
  const data = await apiFetch<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  setAccessToken(data.token);
  return me();
}

/**
 * Called once on app boot: tries to obtain a fresh access token from the
 * httpOnly refresh cookie, without requiring the user to log in again.
 */
export async function tryRestoreSession(): Promise<User | null> {
  const refreshed = await refreshSession();
  if (!refreshed) return null;

  try {
    return await me();
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  setAccessToken(null);
}
