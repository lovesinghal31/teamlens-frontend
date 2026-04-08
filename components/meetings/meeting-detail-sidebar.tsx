"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  X,
  Sparkles,
  ListChecks,
  CalendarPlus,
  LogOut,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Meeting } from "@/lib/meeting-types"

// ── Helpers ────────────────────────────────────────────────

const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

function formatTime(hour: number, minute: number) {
  const period = hour >= 12 ? "PM" : "AM"
  const h = hour % 12 || 12
  const m = minute.toString().padStart(2, "0")
  return `${h}:${m} ${period}`
}

const priorityBadge: Record<
  Meeting["priority"],
  { label: string; className: string }
> = {
  low: {
    label: "LOW PRIORITY",
    className:
      "bg-emerald-500/15 text-emerald-500 before:content-['●'] before:mr-1.5 before:text-emerald-500",
  },
  medium: {
    label: "MEDIUM PRIORITY",
    className:
      "bg-amber-500/15 text-amber-500 before:content-['●'] before:mr-1.5 before:text-amber-500",
  },
  high: {
    label: "HIGH PRIORITY",
    className:
      "bg-red-500/15 text-red-500 before:content-['●'] before:mr-1.5 before:text-red-500",
  },
}

const approvalBadge: Record<
  Meeting["approvalStatus"],
  { label: string; className: string }
> = {
  approved: {
    label: "✓ APPROVED",
    className: "bg-emerald-500/15 text-emerald-400",
  },
  pending: {
    label: "⏳ PENDING",
    className: "bg-amber-500/15 text-amber-400",
  },
  declined: {
    label: "✕ DECLINED",
    className: "bg-red-500/15 text-red-400",
  },
}

const taskStatusBadge: Record<string, { label: string; className: string }> = {
  "on-track": {
    label: "On Track",
    className:
      "border border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  },
  "at-risk": {
    label: "At Risk",
    className: "border border-red-500/30 text-red-400 bg-red-500/10",
  },
  completed: {
    label: "Done",
    className:
      "border border-muted-foreground/30 text-muted-foreground bg-muted/50",
  },
}

// ── Component ──────────────────────────────────────────────

interface MeetingDetailSidebarProps {
  meeting: Meeting | null
  open: boolean
  onClose: () => void
}

export function MeetingDetailSidebar({
  meeting,
  open,
  onClose,
}: MeetingDetailSidebarProps) {
  // Close on Escape
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const requiredParticipants =
    meeting?.participants.filter((p) => p.attendance === "required") ?? []
  const optionalParticipants =
    meeting?.participants.filter((p) => p.attendance === "optional") ?? []

  const overallProgress =
    meeting && meeting.tasks.length > 0
      ? Math.round(
          meeting.tasks.reduce((sum, t) => sum + t.progress, 0) /
            meeting.tasks.length
        )
      : 0

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[400px] flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {meeting && (
          <>
            {/* Header */}
            <div className="space-y-4 border-b border-border px-6 pb-5 pt-6">
              {/* Badges + close */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                      priorityBadge[meeting.priority].className
                    )}
                  >
                    {priorityBadge[meeting.priority].label}
                  </span>
                  <span
                    className={cn(
                      "rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                      approvalBadge[meeting.approvalStatus].className
                    )}
                  >
                    {approvalBadge[meeting.approvalStatus].label}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-accent"
                >
                  <X className="size-4 text-muted-foreground" />
                </button>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                {meeting.title}
              </h2>

              {/* Day + time */}
              <p className="text-sm text-muted-foreground">
                {DAY_NAMES[meeting.day]} ·{" "}
                {formatTime(meeting.startHour, meeting.startMinute)} –{" "}
                {formatTime(meeting.endHour, meeting.endMinute)}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {meeting.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
              {/* AI Reasoning */}
              <section>
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                  <Sparkles className="size-3.5" />
                  AI Reasoning
                </div>
                <div className="rounded-xl bg-card border border-border p-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {meeting.aiReasoning}
                  </p>
                </div>
              </section>

              <Separator />

              {/* Agenda */}
              {meeting.agenda.length > 0 && (
                <section>
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                    <ListChecks className="size-3.5" />
                    Agenda
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <ol className="space-y-2.5">
                      {meeting.agenda.map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-sm">
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-400">
                            {idx + 1}
                          </span>
                          <span className="text-muted-foreground leading-5">{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </section>
              )}

              {meeting.agenda.length > 0 && meeting.tasks.length > 0 && <Separator />}

              {/* Task Snapshot */}
              {meeting.tasks.length > 0 && (
                <section>
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
                    <span className="text-sm">◆</span>
                    Task Snapshot
                  </div>

                  {/* Overall */}
                  <div className="mb-4 rounded-xl border border-border bg-card p-4">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                        Overall
                      </span>
                      <span className="font-bold text-foreground">
                        {overallProgress}%
                      </span>
                    </div>
                    <Progress value={overallProgress} className="h-2" />
                  </div>

                  {/* Individual tasks */}
                  <div className="space-y-3">
                    {meeting.tasks.map((task) => (
                      <div
                        key={task.title}
                        className="rounded-xl border border-border bg-card p-4"
                      >
                        <div className="mb-2.5 flex items-center justify-between gap-2">
                          <h4 className="truncate text-sm font-semibold text-foreground">
                            {task.title}
                          </h4>
                          <span
                            className={cn(
                              "shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                              taskStatusBadge[task.status].className
                            )}
                          >
                            {taskStatusBadge[task.status].label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-5">
                            <AvatarFallback
                              className="text-[8px] font-medium"
                              style={{
                                backgroundColor: task.assignee.color,
                                color: "white",
                              }}
                            >
                              {task.assignee.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            {task.assignee.name.split(" ")[0]}
                          </span>
                          <Progress
                            value={task.progress}
                            className="h-1.5 flex-1"
                          />
                          <span className="text-xs font-semibold text-muted-foreground">
                            {task.progress}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <Separator />

              {/* Participants */}
              <section>
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span className="text-sm">○</span>
                  Participants
                </div>

                {/* Required */}
                {requiredParticipants.length > 0 && (
                  <div className="mb-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                      Required
                    </p>
                    <div className="space-y-2">
                      {requiredParticipants.map((p) => (
                        <div
                          key={p.initials}
                          className="flex items-center gap-2.5"
                        >
                          <Avatar className="size-7">
                            <AvatarFallback
                              className="text-[10px] font-medium"
                              style={{
                                backgroundColor: p.color,
                                color: "white",
                              }}
                            >
                              {p.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-foreground">
                            {p.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional */}
                {optionalParticipants.length > 0 && (
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                      Optional
                    </p>
                    <div className="space-y-2">
                      {optionalParticipants.map((p) => (
                        <div
                          key={p.initials}
                          className="flex items-center gap-2.5 opacity-60"
                        >
                          <Avatar className="size-7">
                            <AvatarFallback
                              className="text-[10px] font-medium"
                              style={{
                                backgroundColor: p.color,
                                color: "white",
                              }}
                            >
                              {p.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-foreground">
                            {p.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 border-t border-border px-6 py-4">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent">
                <CalendarPlus className="size-4" />
                Add to Calendar
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent">
                <LogOut className="size-4" />
                Request to Leave
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
