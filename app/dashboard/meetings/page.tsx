"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MeetingCalendar } from "@/components/meetings/meeting-calendar"
import { MeetingDetailSidebar } from "@/components/meetings/meeting-detail-sidebar"
import type { Meeting } from "@/lib/meeting-types"
import { mockMeetings } from "@/lib/mock-data"

// ── Helpers ────────────────────────────────────────────────

function getWeekLabel(date: Date) {
  const d = new Date(date)
  const jsDay = d.getDay()
  const mondayOffset = jsDay === 0 ? -6 : 1 - jsDay
  const monday = new Date(d)
  monday.setDate(d.getDate() + mondayOffset)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const fmt = (dt: Date) =>
    dt.toLocaleDateString("en-US", { month: "short", day: "numeric" })

  return `Week of ${fmt(monday)} – ${fmt(sunday)}, ${monday.getFullYear()}`
}

// ── Page component ─────────────────────────────────────────

export default function MeetingsPage() {
  const [weekStart, setWeekStart] = React.useState(() => new Date())
  const [selectedMeeting, setSelectedMeeting] = React.useState<Meeting | null>(
    null
  )

  function shiftWeek(direction: -1 | 1) {
    setWeekStart((prev) => {
      const next = new Date(prev)
      next.setDate(next.getDate() + direction * 7)
      return next
    })
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              Meeting Calendar
            </h1>
            <p className="text-xs text-muted-foreground">
              {getWeekLabel(weekStart)}
            </p>
          </div>

          {/* Week navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => shiftWeek(-1)}
              className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => shiftWeek(1)}
              className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Calendar */}
      <div className="flex min-h-0 flex-1 flex-col p-4">
        <MeetingCalendar
          meetings={mockMeetings}
          selectedMeetingId={selectedMeeting?.id ?? null}
          onSelectMeeting={(m) => setSelectedMeeting(m)}
          weekStart={weekStart}
        />
      </div>

      {/* Detail sidebar */}
      <MeetingDetailSidebar
        meeting={selectedMeeting}
        open={selectedMeeting !== null}
        onClose={() => setSelectedMeeting(null)}
      />
    </div>
  )
}
