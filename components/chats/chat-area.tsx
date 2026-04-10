"use client"

import * as React from "react"
import { MessageSquareDashed } from "lucide-react"
import { MessageBubble } from "./message-bubble"
import type { ChatMessage } from "@/lib/chat-types"

interface ChatAreaProps {
  messages: ChatMessage[]
}

export function ChatArea({ messages }: ChatAreaProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  if (messages.length === 0) {
    return (
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        {/* Transparent gradient background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-primary/[0.04]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.015] [background-image:radial-gradient(circle,currentColor_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
            <MessageSquareDashed className="size-7 text-primary" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Start the conversation! 💬
          </p>
          <p className="text-xs text-muted-foreground/70">
            Send a message to get things rolling
          </p>
        </div>
      </div>
    )
  }

  // Group messages by date
  const groupedMessages = groupByDate(messages)

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      {/* Transparent gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-primary/[0.04]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.015] [background-image:radial-gradient(circle,currentColor_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Scrollable messages */}
      <div className="relative flex-1 overflow-y-auto px-5 py-4">
        {groupedMessages.map((group) => (
          <div key={group.label}>
            {/* Date separator */}
            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-[10px] font-medium text-muted-foreground">
                {group.label}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Messages */}
            <div className="space-y-2">
              {group.messages.map((msg, idx) => {
                const prevMsg = idx > 0 ? group.messages[idx - 1] : null
                const showSender =
                  !msg.isOwn &&
                  (!prevMsg || prevMsg.senderId !== msg.senderId || prevMsg.isOwn)

                return (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    showSender={showSender}
                  />
                )
              })}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}

// ── Date grouping helper ───────────────────────────────────

interface MessageGroup {
  label: string
  messages: ChatMessage[]
}

function groupByDate(messages: ChatMessage[]): MessageGroup[] {
  // For mock data we'll just label all as "Today"
  // In production, parse timestamps and group properly
  return [{ label: "Today", messages }]
}
