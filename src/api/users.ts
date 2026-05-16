import { api } from "./client"
import type { UserReadFullInfo } from "@/types"

export function getMe() {
  return api.get<UserReadFullInfo>("/users/get-me")
}
