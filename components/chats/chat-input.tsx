"use client"

import * as React from "react"
import { Plus, SendHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { teamList, roles } from "@/lib/mock-data"

interface ChatInputProps {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  typingUser?: string | null
}

export function ChatInput({ value, onChange, onSend, typingUser }: ChatInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const [mentionOpen, setMentionOpen] = React.useState(false)
  const [mentionQuery, setMentionQuery] = React.useState("")
  const [mentionIndex, setMentionIndex] = React.useState(0)

  // Detect @ trigger — check if cursor is inside an @mention token
  function detectMention(text: string, cursorPos: number) {
    // Walk backwards from cursor to find the last unmatched @
    const before = text.slice(0, cursorPos)
    const atIdx = before.lastIndexOf("@")
    if (atIdx === -1) return null

    // @ must be at start of text or preceded by a space
    if (atIdx > 0 && before[atIdx - 1] !== " ") return null

    const query = before.slice(atIdx + 1)

    // If there's a space in the query, assume the mention is complete
    if (query.includes(" ")) return null

    return { atIdx, query }
  }

  // Filter team members by the mention query
  const filteredMembers = React.useMemo(() => {
    if (!mentionOpen) return []
    return teamList.filter(
      (p) =>
        p.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
        p.name
          .split(" ")[0]
          .toLowerCase()
          .startsWith(mentionQuery.toLowerCase())
    )
  }, [mentionOpen, mentionQuery])

  // Reset mention index when filtered list changes
  React.useEffect(() => {
    setMentionIndex(0)
  }, [filteredMembers.length])

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue = e.target.value
    onChange(newValue)

    const cursorPos = e.target.selectionStart ?? newValue.length
    const mention = detectMention(newValue, cursorPos)

    if (mention) {
      setMentionOpen(true)
      setMentionQuery(mention.query)
    } else {
      setMentionOpen(false)
      setMentionQuery("")
    }
  }

  function handleSelectMention(personName: string) {
    const firstName = personName.split(" ")[0]
    const textarea = textareaRef.current
    if (!textarea) return

    const cursorPos = textarea.selectionStart ?? value.length
    const mention = detectMention(value, cursorPos)
    if (!mention) return

    // Replace @query with @FirstName + trailing space
    const before = value.slice(0, mention.atIdx)
    const after = value.slice(cursorPos)
    const newValue = `${before}@${firstName} ${after}`
    onChange(newValue)
    setMentionOpen(false)
    setMentionQuery("")

    // Restore focus and cursor position
    requestAnimationFrame(() => {
      textarea.focus()
      const newPos = mention.atIdx + firstName.length + 2 // +2 for @ and space
      textarea.setSelectionRange(newPos, newPos)
    })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (mentionOpen && filteredMembers.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setMentionIndex((prev) => (prev + 1) % filteredMembers.length)
        return
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setMentionIndex((prev) => (prev - 1 + filteredMembers.length) % filteredMembers.length)
        return
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault()
        handleSelectMention(filteredMembers[mentionIndex].name)
        return
      }
      if (e.key === "Escape") {
        e.preventDefault()
        setMentionOpen(false)
        return
      }
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
      setMentionOpen(false)
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
    <div className="relative border-t border-border bg-background/80 backdrop-blur-md">
      {/* @ Mention popup */}
      {mentionOpen && filteredMembers.length > 0 && (
        <div className="absolute bottom-full left-4 right-4 z-50 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="rounded-xl border border-border bg-background/95 p-1.5 shadow-xl backdrop-blur-lg">
            <p className="mb-1 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Team Members
            </p>
            {filteredMembers.map((person, i) => (
              <button
                key={person.id}
                onClick={() => handleSelectMention(person.name)}
                onMouseEnter={() => setMentionIndex(i)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors",
                  i === mentionIndex
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-accent"
                )}
              >
                <div
                  className="flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                  style={{ backgroundColor: person.color }}
                >
                  {person.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{person.name}</p>
                  <p className="truncate text-[10px] text-muted-foreground">
                    {roles[person.id] ?? "Team Member"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

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
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (use /assign @name task)"
            className="max-h-[120px] w-full resize-none rounded-xl border border-border bg-accent/30 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Send button */}
        <button
          onClick={() => {
            onSend()
            setMentionOpen(false)
          }}
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
