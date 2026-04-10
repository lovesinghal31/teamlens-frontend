"use client"

import * as React from "react"
import { MessageSquare } from "lucide-react"

export default function ChatsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Page header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
            <MessageSquare className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              Chats
            </h1>
            <p className="text-xs text-muted-foreground">
              Team & Direct Messages
            </p>
          </div>
        </div>
      </header>

      {/* Main content placeholder */}
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground"></p>
      </div>
    </div>
  )
}
