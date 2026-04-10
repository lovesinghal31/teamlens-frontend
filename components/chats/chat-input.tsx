"use client"

import * as React from "react"
import { Plus, SendHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  typingUser?: string | null
}

export function ChatInput({ value, onChange, onSend, typingUser }: ChatInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  // Auto-resize textarea
  React.useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [value])

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur-md">
      {/* Typing indicator */}
      {typingUser && (
        <div className="flex items-center gap-2 px-5 pt-2">
          <div className="flex gap-0.5">
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0ms]" />
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:150ms]" />
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:300ms]" />
          </div>
          <span className="text-[11px] text-muted-foreground">
            {typingUser} is typing...
          </span>
        </div>
      )}

      {/* Input row */}
      <div className="flex items-end gap-2 px-4 py-3">
        {/* Attachment button */}
        <button className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          <Plus className="size-4" />
        </button>

        {/* Textarea */}
        <div className="relative min-h-[36px] flex-1">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="max-h-[120px] w-full resize-none rounded-xl border border-border bg-accent/30 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Send button */}
        <button
          onClick={onSend}
          disabled={!value.trim()}
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-200",
            value.trim()
              ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg"
              : "bg-muted text-muted-foreground"
          )}
        >
          <SendHorizontal className="size-4" />
        </button>
      </div>
    </div>
  )
}
