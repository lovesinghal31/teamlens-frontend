"use client"

import { cn } from "@/lib/utils"
import { Sparkles, CalendarCheck } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Meeting } from "@/lib/meeting-types"

// ── Color maps ─────────────────────────────────────────────

const bgMap: Record<Meeting["colorScheme"], string> = {
  green: "bg-emerald-500/10 border-l-emerald-500 hover:bg-emerald-500/15",
  yellow: "bg-amber-500/10 border-l-amber-500 hover:bg-amber-500/15",
  red: "bg-red-500/10 border-l-red-500 hover:bg-red-500/15",
  blue: "bg-blue-500/10 border-l-blue-500 hover:bg-blue-500/15",
  amber: "bg-orange-500/10 border-l-orange-500 hover:bg-orange-500/15",
}

const selectedMap: Record<Meeting["colorScheme"], string> = {
  green: "ring-2 ring-emerald-500/50 bg-emerald-500/20",
  yellow: "ring-2 ring-amber-500/50 bg-amber-500/20",
  red: "ring-2 ring-red-500/50 bg-red-500/20",
  blue: "ring-2 ring-blue-500/50 bg-blue-500/20",
  amber: "ring-2 ring-orange-500/50 bg-orange-500/20",
}

// ── Helpers ────────────────────────────────────────────────

function formatTime(hour: number, minute: number) {
  const period = hour >= 12 ? "PM" : "AM"
  const h = hour % 12 || 12
  const m = minute.toString().padStart(2, "0")
  return `${h}:${m} ${period}`
}

// ── Component ──────────────────────────────────────────────

interface MeetingBlockProps {
  meeting: Meeting
  isSelected: boolean
  isOngoing: boolean
  onClick: () => void
  style?: React.CSSProperties
}

export function MeetingBlock({ meeting, isSelected, isOngoing, onClick, style }: MeetingBlockProps) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={cn(
        "absolute inset-x-1 z-10 flex cursor-pointer flex-col overflow-hidden rounded-lg border-l-[3px] px-2 py-1.5 text-left transition-all duration-200 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/30",
        bgMap[meeting.colorScheme],
        isSelected && selectedMap[meeting.colorScheme],
        isOngoing && "shadow-lg shadow-black/10 dark:shadow-black/30"
      )}
    >
      {/* Title + creator badge */}
      <div className="mb-0.5 flex items-center gap-1.5">
        {/* Live indicator dot */}
        {isOngoing && (
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
        )}
        <span className="min-w-0 truncate text-xs font-semibold text-foreground">
          {meeting.title}
        </span>
        {meeting.createdBy === "ai" ? (
          <span className="inline-flex shrink-0 items-center gap-0.5 rounded px-1 py-px text-[9px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-500">
            <Sparkles className="size-2.5" />
            AI
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-0.5 rounded px-1 py-px text-[9px] font-bold uppercase tracking-wider bg-violet-500/15 text-violet-400">
            <CalendarCheck className="size-2.5" />
          </span>
        )}
      </div>

      {/* Time range */}
      <span className="text-[10px] text-muted-foreground">
        {formatTime(meeting.startHour, meeting.startMinute)} –{" "}
        {formatTime(meeting.endHour, meeting.endMinute)}
      </span>

      {/* Participant avatars */}
      {meeting.participants.length > 0 && (
        <div className="mt-auto flex items-center -space-x-1.5 pt-1">
          {meeting.participants.slice(0, 3).map((p) => (
            <Avatar key={p.initials} className="size-5 ring-1 ring-background">
              <AvatarFallback
                className="text-[8px] font-medium"
                style={{ backgroundColor: p.color, color: "white" }}
              >
                {p.initials}
              </AvatarFallback>
            </Avatar>
          ))}
          {meeting.participants.length > 3 && (
            <Avatar className="size-5 ring-1 ring-background">
              <AvatarFallback className="bg-muted text-[8px] font-medium text-muted-foreground">
                +{meeting.participants.length - 3}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      )}
    </button>
  )
}
