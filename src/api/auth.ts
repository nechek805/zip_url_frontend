import { api } from "./client"

export function register(email: string, password: string) {
  return api.post<{ message: string }>("/auth/register", { email, password })
}

export function login(email: string, password: string) {
  return api.post<{ message: string }>("/auth/login", { email, password })
}

export function logout() {
  return api.post<{ message: string }>("/auth/logout")
}

export function confirmEmail(token: string) {
  return api.get<{ message: string }>(`/auth/confirm-email?token=${encodeURIComponent(token)}`)
}
