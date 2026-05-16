export interface SessionRead {
  id: number
  created_at: string
  expires_at: string
}

export interface ZipURLFullInfo {
  id: number
  original_url: string
  zipped_url: string
  created_at: string
}

export interface UserReadFullInfo {
  id: number
  email: string
  sessions: SessionRead[]
  zip_urls: ZipURLFullInfo[]
}

export interface ApiError {
  status: number
  message: string
}
