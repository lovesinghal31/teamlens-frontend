"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { ChatMessage } from "@/lib/chat-types"

// ── Bubble color helpers ───────────────────────────────────

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  if (max === min) return { h: 0, s: 0, l }

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function getBubbleStyle(color: string, isOwn: boolean) {
  const { h, s } = hexToHSL(color)
  if (isOwn) {
    return {
      backgroundColor: `hsla(${h}, ${s}%, 55%, 0.15)`,
      borderColor: `hsla(${h}, ${s}%, 55%, 0.2)`,
    }
  }
  return {
    backgroundColor: `hsla(${h}, ${s}%, 55%, 0.10)`,
    borderColor: `hsla(${h}, ${s}%, 55%, 0.15)`,
  }
}

// ── Component ──────────────────────────────────────────────

interface MessageBubbleProps {
  message: ChatMessage
  showSender: boolean // hide name if consecutive from same sender
}

export function MessageBubble({ message, showSender }: MessageBubbleProps) {
  // ── System messages ──
  if (message.isSystem) {
    return (
      <div className="flex w-full animate-in fade-in-0 duration-300 justify-center py-1">
        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 backdrop-blur-sm">
          <p className="text-xs font-medium text-muted-foreground">{message.content}</p>
          <span className="text-[9px] text-muted-foreground/60">{message.timestamp}</span>
        </div>
      </div>
    )
  }

  const { isOwn } = message
  const bubbleStyle = getBubbleStyle(message.senderColor, isOwn)

  return (
    <div
      className={cn(
        "flex w-full animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex max-w-[70%] gap-2.5",
          isOwn ? "flex-row-reverse" : "flex-row"
        )}
      >
        {/* Avatar — only for received messages */}
        {!isOwn && (
          <div
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white",
              !showSender && "invisible"
            )}
            style={{ backgroundColor: message.senderColor }}
          >
            {message.senderInitials}
          </div>
        )}

        {/* Bubble */}
        <div className="min-w-0">
          {/* Sender name */}
          {!isOwn && showSender && (
            <p
              className="mb-1 text-[11px] font-semibold"
              style={{ color: message.senderColor }}
            >
              {message.senderName}
            </p>
          )}

          <div
            className={cn(
              "group relative rounded-2xl border px-3.5 py-2.5 transition-shadow hover:shadow-sm",
              isOwn ? "rounded-br-md" : "rounded-bl-md"
            )}
            style={bubbleStyle}
          >
            {/* Pinned indicator */}
            {message.isPinned && (
              <span className="absolute -top-2 right-2 text-[10px]">📌</span>
            )}

            <p className="text-sm leading-relaxed text-foreground">
              {message.content}
            </p>

            <p
              className={cn(
                "mt-1 text-[10px] text-muted-foreground",
                isOwn ? "text-right" : "text-left"
              )}
            >
              {message.timestamp}
            </p>
          </div>

          {/* Reactions */}
          {message.reactions && message.reactions.length > 0 && (
            <div className="mt-1 flex gap-1">
              {message.reactions.map((r) => (
                <span
                  key={r.emoji}
                  className="inline-flex items-center gap-0.5 rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                >
                  {r.emoji} {r.count}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
