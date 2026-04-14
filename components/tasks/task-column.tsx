"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { TaskItem } from "@/lib/task-types"
import { TaskCard } from "@/components/tasks/task-card"
import type { TaskStatus } from "@/lib/team-types"

// ── Column config ──────────────────────────────────────────

const columnConfig: Record<
  TaskStatus,
  { title: string; dotColor: string; headerGradient: string }
> = {
  pending: {
    title: "To Do",
    dotColor: "bg-amber-500",
    headerGradient: "from-amber-500/10 to-transparent",
  },
  "in-progress": {
    title: "In Progress",
    dotColor: "bg-blue-500",
    headerGradient: "from-blue-500/10 to-transparent",
  },
  "at-risk": {
    title: "At Risk",
    dotColor: "bg-red-500",
    headerGradient: "from-red-500/10 to-transparent",
  },
  completed: {
    title: "Completed",
    dotColor: "bg-emerald-500",
    headerGradient: "from-emerald-500/10 to-transparent",
  },
}

interface TaskColumnProps {
  status: TaskStatus
  tasks: TaskItem[]
  expandedId: string | null
  onToggle: (id: string) => void
}

export function TaskColumn({ status, tasks, expandedId, onToggle }: TaskColumnProps) {
  const config = columnConfig[status]

  return (
    <div className="flex flex-col min-w-0" id={`task-column-${status}`}>
      {/* Column header */}
      <div
        className={cn(
          "mb-3 flex items-center justify-between rounded-xl bg-gradient-to-r px-4 py-3",
          config.headerGradient
        )}
      >
        <div className="flex items-center gap-2.5">
          <span className={cn("size-2.5 rounded-full", config.dotColor)} />
          <h2 className="text-sm font-bold tracking-tight text-foreground">
            {config.title}
          </h2>
        </div>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold tabular-nums text-muted-foreground">
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-2.5 flex-1">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-10 text-sm text-muted-foreground/50">
            No tasks
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isExpanded={expandedId === task.id}
              onToggle={() => onToggle(task.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}
