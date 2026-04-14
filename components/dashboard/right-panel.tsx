"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X, Calendar, Clock, CheckCircle2, Circle, Timer, CalendarClock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { upcomingMeetingsPanel as upcomingMeetings, currentUser } from "@/lib/mock-data"
import { useTaskStore } from "@/lib/task-store"

function getDeadlineStyle(deadline: string | undefined, status: string) {
  if (status === "completed") return "bg-muted/50 text-muted-foreground/60"
  if (deadline === "Apr 9") return "bg-red-500/10 text-red-600 dark:text-red-400"
  if (deadline === "Apr 10") return "bg-amber-500/10 text-amber-600 dark:text-amber-400"
  return "bg-muted text-muted-foreground"
}

interface RightPanelProps {
  open: boolean
  onClose: () => void
}

export function RightPanel({ open, onClose }: RightPanelProps) {
  const [activeTab, setActiveTab] = React.useState<"meetings" | "tasks">("meetings")
  const allTasks = useTaskStore()

  // Derive "your tasks" from the store — only tasks assigned to current user
  const myTasks = React.useMemo(
    () =>
      allTasks
        .filter((t) => t.assignees.some((a) => a.id === currentUser.id))
        .map((t) => ({
          id: t.id,
          title: t.title,
          progress: t.progress ?? (t.status === "completed" ? 100 : 0),
          status: t.status,
          deadline: t.dueDate,
        })),
    [allTasks]
  )

  // Close on Escape
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[380px] flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="border-b border-border">
          <div className="flex h-14 items-center justify-between px-5">
            <h2 className="text-base font-semibold text-foreground">Quick View</h2>
            <button
              onClick={onClose}
              className="flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-accent"
            >
              <X className="size-4 text-muted-foreground" />
            </button>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-1 px-5 pb-3">
            <button
              onClick={() => setActiveTab("meetings")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                activeTab === "meetings"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Calendar className="size-3.5" />
              Meetings
            </button>
            <button
              onClick={() => setActiveTab("tasks")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                activeTab === "tasks"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Timer className="size-3.5" />
              Your Tasks
              <span className="ml-0.5 flex size-4 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">
                {myTasks.length}
              </span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {/* Upcoming Meetings */}
          {activeTab === "meetings" && (
            <div className="space-y-2.5">
              {upcomingMeetings.map((meeting) => (
                <div
                  key={meeting.title}
                  className="rounded-xl border border-border p-3.5 transition-colors hover:bg-accent/50"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="text-sm font-medium text-foreground">{meeting.title}</h4>
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 text-[11px] font-medium",
                        meeting.color
                      )}
                    >
                      <Clock className="mr-1 inline size-3" />
                      {meeting.time.includes("Today") ? "Today" : "Tomorrow"}
                    </span>
                  </div>
                  <p className="mb-2.5 text-xs text-muted-foreground">{meeting.time}</p>
                  <div className="flex items-center -space-x-1.5">
                    {meeting.participants.map((p) => (
                      <Avatar key={p} className="size-6 ring-2 ring-background">
                        <AvatarFallback className="text-[9px] font-medium">{p}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Your Tasks */}
          {activeTab === "tasks" && (
            <div className="space-y-2.5">
              {myTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                  <CheckCircle2 className="size-10 text-emerald-500/30" />
                  <p className="text-sm font-medium text-muted-foreground">All caught up!</p>
                  <p className="text-xs text-muted-foreground/60">No tasks assigned to you</p>
                </div>
              ) : (
                myTasks.map((task) => (
                  <div
                    key={task.id}
                    className="rounded-xl border border-border p-3.5 transition-colors hover:bg-accent/50"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {task.status === "completed" ? (
                          <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                        ) : (
                          <Circle className="size-4 shrink-0 text-muted-foreground" />
                        )}
                        <span
                          className={cn(
                            "truncate text-sm font-medium",
                            task.status === "completed"
                              ? "text-muted-foreground line-through"
                              : "text-foreground"
                          )}
                        >
                          {task.title}
                        </span>
                      </div>
                      {task.deadline && (
                        <span
                          className={cn(
                            "flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium",
                            getDeadlineStyle(task.deadline, task.status)
                          )}
                        >
                          <CalendarClock className="size-2.5" />
                          {task.deadline}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={task.progress} className="h-1.5 flex-1" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {task.progress}%
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
