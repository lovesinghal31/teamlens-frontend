"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X, Calendar, Clock, CheckCircle2, Circle, Timer } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const upcomingMeetings = [
  {
    title: "Sprint Review",
    time: "Today, 3:00 PM",
    participants: ["AS", "PK", "RM"],
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Design Sync",
    time: "Today, 5:30 PM",
    participants: ["DS", "LS"],
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    title: "Client Demo",
    time: "Tomorrow, 11:00 AM",
    participants: ["DS", "UM", "RM", "LS"],
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
]

const yourTasks = [
  { title: "Design system tokens", progress: 85, status: "in-progress" as const },
  { title: "API integration layer", progress: 40, status: "in-progress" as const },
  { title: "User auth flow", progress: 100, status: "completed" as const },
  { title: "Dashboard analytics", progress: 10, status: "in-progress" as const },
]

interface RightPanelProps {
  open: boolean
  onClose: () => void
}

export function RightPanel({ open, onClose }: RightPanelProps) {
  const [activeTab, setActiveTab] = React.useState<"meetings" | "tasks">("meetings")
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
              {yourTasks.map((task) => (
                <div
                  key={task.title}
                  className="rounded-xl border border-border p-3.5 transition-colors hover:bg-accent/50"
                >
                  <div className="mb-2 flex items-center gap-2">
                    {task.status === "completed" ? (
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                    ) : (
                      <Circle className="size-4 shrink-0 text-muted-foreground" />
                    )}
                    <span
                      className={cn(
                        "text-sm font-medium",
                        task.status === "completed"
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      )}
                    >
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={task.progress} className="h-1.5 flex-1" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {task.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
