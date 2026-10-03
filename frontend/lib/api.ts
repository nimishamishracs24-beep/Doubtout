export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

export type User = {
  user_id: number;
  email?: string;
  fullName?: string;
  role: "student" | "professor";
};

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers ?? {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error ?? "Request failed");
  return data as T;
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("doubtoutUser");
  if (!raw) return null;
  try { return JSON.parse(raw) as User; } catch { return null; }
}
