"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { Sparkles } from "lucide-react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
              <Sparkles className="size-7 text-primary animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-1.5 animate-pulse rounded-full bg-primary/60" />
            <div className="size-1.5 animate-pulse rounded-full bg-primary/60 [animation-delay:200ms]" />
            <div className="size-1.5 animate-pulse rounded-full bg-primary/60 [animation-delay:400ms]" />
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
