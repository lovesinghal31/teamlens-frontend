"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { MeetingBlock } from "@/components/meetings/meeting-block"
import type { Meeting } from "@/lib/meeting-types"

// ── Constants ──────────────────────────────────────────────

const HOUR_HEIGHT = 72 // px per hour row
const TOTAL_HOURS = 24
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function formatHourLabel(hour: number) {
  if (hour === 0) return "12 AM"
  if (hour === 12) return "12 PM"
  if (hour < 12) return `${hour} AM`
  return `${hour - 12} PM`
}

/** Get array of Date objects for Mon-Sun of the week containing `anchor`. */
function getWeekDates(anchor: Date): Date[] {
  const d = new Date(anchor)
  // JS getDay(): 0=Sun. We want 0=Mon.
  const jsDay = d.getDay()
  const mondayOffset = jsDay === 0 ? -6 : 1 - jsDay
  const monday = new Date(d)
  monday.setDate(d.getDate() + mondayOffset)

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(monday)
    day.setDate(monday.getDate() + i)
    return day
  })
}

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

// ── Component ──────────────────────────────────────────────

interface MeetingCalendarProps {
  meetings: Meeting[]
  selectedMeetingId: string | null
  onSelectMeeting: (meeting: Meeting) => void
  weekStart: Date
}

export function MeetingCalendar({
  meetings,
  selectedMeetingId,
  onSelectMeeting,
  weekStart,
}: MeetingCalendarProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const weekDates = getWeekDates(weekStart)

  // Auto-scroll to center on current time on mount
  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    const currentPx = (currentMinutes / 60) * HOUR_HEIGHT
    // Put current time in the upper-middle (about 1/3 from top)
    const targetScroll = currentPx - el.clientHeight / 3
    el.scrollTop = Math.max(0, targetScroll)
  }, [])

  const today = new Date()

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card">
      {/* Day header row */}
      <div className="flex shrink-0 border-b border-border">
        {/* Time gutter spacer */}
        <div className="w-[72px] shrink-0 border-r border-border" />

        {weekDates.map((date, idx) => {
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()

          return (
            <div
              key={idx}
              className={cn(
                "flex flex-1 flex-col items-center border-r border-border py-3 text-center last:border-r-0",
                isToday && "bg-primary/5"
              )}
            >
              <span
                className={cn(
                  "text-[11px] font-medium tracking-widest uppercase",
                  isToday ? "text-primary" : "text-muted-foreground"
                )}
              >
                {DAY_LABELS[idx]}
              </span>
              <span
                className={cn(
                  "mt-0.5 flex size-8 items-center justify-center rounded-full text-lg font-semibold",
                  isToday
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
                )}
              >
                {date.getDate()}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {date.toLocaleString("en-US", { month: "short" }).toUpperCase()}
              </span>
            </div>
          )
        })}
      </div>

      {/* Scrollable time grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div
          className="relative flex"
          style={{ height: TOTAL_HOURS * HOUR_HEIGHT }}
        >
          {/* Time gutter */}
          <div className="sticky left-0 z-20 w-[72px] shrink-0 border-r border-border bg-card">
            {Array.from({ length: TOTAL_HOURS }, (_, h) => (
              <div
                key={h}
                className="flex items-start justify-end pr-3 text-[11px] font-medium text-muted-foreground"
                style={{ height: HOUR_HEIGHT, paddingTop: 4 }}
              >
                {formatHourLabel(h)}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDates.map((date, dayIdx) => {
            const isToday =
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear()

            const dayMeetings = meetings.filter(
              (m) => m.date === toDateKey(date)
            )

            return (
              <div
                key={dayIdx}
                className={cn(
                  "relative flex-1 border-r border-border last:border-r-0",
                  isToday && "bg-primary/[0.02]"
                )}
              >
                {/* Hour grid lines */}
                {Array.from({ length: TOTAL_HOURS }, (_, h) => (
                  <div
                    key={h}
                    className="border-b border-border/50"
                    style={{ height: HOUR_HEIGHT }}
                  />
                ))}

                {/* Meeting blocks */}
                {dayMeetings.map((meeting) => {
                  const startMinutes =
                    meeting.startHour * 60 + meeting.startMinute
                  const endMinutes = meeting.endHour * 60 + meeting.endMinute
                  const top = (startMinutes / 60) * HOUR_HEIGHT
                  const height =
                    ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT

                  const currentMinutes =
                    today.getHours() * 60 + today.getMinutes()
                  const isOngoing =
                    isToday &&
                    currentMinutes >= startMinutes &&
                    currentMinutes < endMinutes

                  return (
                    <MeetingBlock
                      key={meeting.id}
                      meeting={meeting}
                      isSelected={selectedMeetingId === meeting.id}
                      isOngoing={isOngoing}
                      onClick={() => onSelectMeeting(meeting)}
                      style={{
                        top,
                        height: Math.max(height, 28),
                      }}
                    />
                  )
                })}
              </div>
            )
          })}

          {/* Current time line — spans full width across all columns */}
          <div
            className="pointer-events-none absolute right-0 left-0 z-20 flex items-center"
            style={{
              top:
                ((today.getHours() * 60 + today.getMinutes()) / 60) *
                HOUR_HEIGHT,
            }}
          >
            <div className="flex w-[72px] shrink-0 items-center justify-end pr-1">
              <div className="size-2.5 rounded-full bg-red-500 shadow-md shadow-red-500/50" />
            </div>
            <div className="h-[2px] flex-1 bg-red-500 shadow-sm shadow-red-500/30" />
          </div>
        </div>
      </div>
    </div>
  )
}
