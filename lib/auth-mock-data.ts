// ── Auth mock data & localStorage helpers ──────────────────
// Stores users as JSON array in localStorage under "teamlens_users".
// Session (logged-in user) stored under "teamlens_session".

export interface AuthUser {
  id: string
  name: string
  email: string
  password: string
  initials: string
  color: string
}

const STORAGE_KEY = "teamlens_users"
const SESSION_KEY = "teamlens_session"

/** Pre-seeded mock users (matches people in mock-data.ts) */
export const MOCK_USERS: AuthUser[] = [
  {
    id: "ds",
    name: "Divyansh Shrivastava",
    email: "divyansh.s@teamlens.dev",
    password: "password123",
    initials: "DS",
    color: "#6366f1",
  },
  {
    id: "ls",
    name: "Love Singhal",
    email: "love.s@teamlens.dev",
    password: "password123",
    initials: "LS",
    color: "#3b82f6",
  },
  {
    id: "um",
    name: "Uthkarsh Mandloi",
    email: "uthkarsh.m@teamlens.dev",
    password: "password123",
    initials: "UM",
    color: "#ec4899",
  },
  {
    id: "rm",
    name: "Rohan Mehta",
    email: "rohan.m@teamlens.dev",
    password: "password123",
    initials: "RM",
    color: "#14b8a6",
  },
  {
    id: "ng",
    name: "Neha Gupta",
    email: "neha.g@teamlens.dev",
    password: "password123",
    initials: "NG",
    color: "#8b5cf6",
  },
]

// ── localStorage CRUD ──────────────────────────────────────

/** Seed localStorage with mock users if not already present */
export function initAuthStore(): void {
  if (typeof window === "undefined") return
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USERS))
  }
}

/** Get all users from localStorage */
export function getUsers(): AuthUser[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    initAuthStore()
    return [...MOCK_USERS]
  }
  return JSON.parse(raw) as AuthUser[]
}

/** Add a new user to localStorage. Returns false if email already exists. */
export function addUser(user: Omit<AuthUser, "id">): AuthUser | null {
  const users = getUsers()
  const emailExists = users.some(
    (u) => u.email.toLowerCase() === user.email.toLowerCase()
  )
  if (emailExists) return null

  const newUser: AuthUser = {
    ...user,
    id: crypto.randomUUID().slice(0, 8),
  }
  users.push(newUser)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  return newUser
}

// ── Authentication ─────────────────────────────────────────

/** Authenticate by email + password. Returns the user on success, null on failure. */
export function authenticateUser(
  email: string,
  password: string
): AuthUser | null {
  const users = getUsers()
  return (
    users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    ) ?? null
  )
}

// ── Session (logged-in user) ───────────────────────────────

export type SessionUser = Omit<AuthUser, "password">

/** Save the current session (omit password for safety) */
export function setCurrentSession(user: AuthUser): void {
  const { password: _, ...session } = user
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

/** Get the current session user, or null */
export function getCurrentSession(): SessionUser | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as SessionUser
  } catch {
    return null
  }
}

/** Clear the current session */
export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}
