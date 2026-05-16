import { api } from "./client"

interface CreateZipResponse {
  message: string
  originalUrl: string
  zipped_url: string
}

export function createZipUrl(url: string) {
  return api.post<CreateZipResponse>(`/zip-url/create-zip-url?url=${encodeURIComponent(url)}`)
}
