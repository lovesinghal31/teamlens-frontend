"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  type AuthUser,
  type SessionUser,
  initAuthStore,
  authenticateUser,
  addUser,
  setCurrentSession,
  getCurrentSession,
  clearSession,
} from "@/lib/auth-mock-data"

interface AuthContextValue {
  user: SessionUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => { success: boolean; error?: string }
  signup: (
    name: string,
    email: string,
    password: string
  ) => { success: boolean; error?: string }
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<SessionUser | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const router = useRouter()

  // On mount: seed store & restore session
  React.useEffect(() => {
    initAuthStore()
    const session = getCurrentSession()
    setUser(session)
    setIsLoading(false)
  }, [])

  const login = React.useCallback(
    (email: string, password: string) => {
      const matched = authenticateUser(email, password)
      if (!matched) {
        return { success: false, error: "Invalid email or password" }
      }
      setCurrentSession(matched)
      const { password: _, ...sessionUser } = matched
      setUser(sessionUser)
      return { success: true }
    },
    []
  )

  const signup = React.useCallback(
    (name: string, email: string, password: string) => {
      // Generate initials from name
      const parts = name.trim().split(/\s+/)
      const initials = parts
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() ?? "")
        .join("")

      // Pick a random color
      const colors = ["#6366f1", "#3b82f6", "#ec4899", "#14b8a6", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981"]
      const color = colors[Math.floor(Math.random() * colors.length)]

      const newUser = addUser({ name, email, password, initials, color })
      if (!newUser) {
        return { success: false, error: "An account with this email already exists" }
      }
      setCurrentSession(newUser)
      const { password: _, ...sessionUser } = newUser
      setUser(sessionUser)
      return { success: true }
    },
    []
  )

  const logout = React.useCallback(() => {
    clearSession()
    setUser(null)
    router.push("/login")
  }, [router])

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
    }),
    [user, isLoading, login, signup, logout]
  )

  return <AuthContext value={value}>{children}</AuthContext>
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return ctx
}
