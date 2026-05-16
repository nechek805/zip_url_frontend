import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMe } from "@/api/users"
import { logout as apiLogout } from "@/api/auth"
import type { UserReadFullInfo } from "@/types"

interface AuthContextValue {
  user: UserReadFullInfo | null
  loading: boolean
  setUser: (u: UserReadFullInfo | null) => void
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserReadFullInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  async function refreshUser() {
    try {
      const me = await getMe()
      setUser(me)
    } catch {
      setUser(null)
    }
  }

  useEffect(() => {
    refreshUser().finally(() => setLoading(false))
  }, [])

  async function logout() {
    try {
      await apiLogout()
    } finally {
      setUser(null)
      navigate("/login")
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
