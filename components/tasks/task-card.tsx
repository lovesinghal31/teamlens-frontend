"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Calendar,
  ChevronDown,
  CheckCircle2,
  Circle,
  AlertTriangle,
  ArrowUp,
  ArrowRight,
  ArrowDown,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import type { TaskItem } from "@/lib/task-types"
import type { TaskStatus } from "@/lib/team-types"

// ── Status config ──────────────────────────────────────────

const statusConfig: Record<
  TaskStatus,
  { label: string; bg: string; text: string; dot: string; icon: typeof Circle }
> = {
  completed: {
    label: "Completed",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
  },
  "in-progress": {
    label: "In Progress",
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
    icon: Circle,
  },
  pending: {
    label: "Pending",
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    icon: Circle,
  },
  "at-risk": {
    label: "At Risk",
    bg: "bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    dot: "bg-red-500",
    icon: AlertTriangle,
  },
}

const priorityConfig = {
  high: {
    label: "High",
    icon: ArrowUp,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  medium: {
    label: "Medium",
    icon: ArrowRight,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  low: {
    label: "Low",
    icon: ArrowDown,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  backend: { label: "Backend", color: "bg-teal-500/10 text-teal-600 dark:text-teal-400" },
  frontend: { label: "Frontend", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  design: { label: "Design", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
  docs: { label: "Docs", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  testing: { label: "Testing", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  misc: { label: "Misc", color: "bg-gray-500/10 text-gray-600 dark:text-gray-400" },
}

// ── Task Card ──────────────────────────────────────────────

interface TaskCardProps {
  task: TaskItem
  isExpanded: boolean
  onToggle: () => void
}

export function TaskCard({ task, isExpanded, onToggle }: TaskCardProps) {
  const status = statusConfig[task.status]
  const priority = priorityConfig[task.priority]
  const category = categoryConfig[task.category]
  const PriorityIcon = priority.icon

  const completedSubtasks = task.subtasks?.filter((s) => s.done).length ?? 0
  const totalSubtasks = task.subtasks?.length ?? 0

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300",
        isExpanded
          ? "shadow-lg shadow-black/5 dark:shadow-black/25 ring-1 ring-primary/10"
          : "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 hover:border-primary/20"
      )}
    >
      {/* Header row */}
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-accent/30"
        id={`task-card-${task.id}`}
      >
        {/* Status dot */}
        <span className={cn("mt-1.5 size-2.5 shrink-0 rounded-full", status.dot)} />

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={cn(
                "truncate text-sm font-semibold text-foreground",
                task.status === "completed" && "line-through opacity-60"
              )}
            >
              {task.title}
            </h3>
          </div>

          {/* Meta row */}
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            {/* Priority */}
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                priority.bg,
                priority.color
              )}
            >
              <PriorityIcon className="size-2.5" />
              {priority.label}
            </span>

            {/* Status badge */}
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                status.bg,
                status.text
              )}
            >
              {status.label}
            </span>

            {/* Category */}
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                category.color
              )}
            >
              {category.label}
            </span>

            {/* Due date */}
            {task.dueDate && (
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <Calendar className="size-2.5" />
                {task.dueDate}
              </span>
            )}

            {/* Subtask count */}
            {totalSubtasks > 0 && (
              <span className="text-[10px] text-muted-foreground">
                {completedSubtasks}/{totalSubtasks} subtasks
              </span>
            )}
          </div>
        </div>

        {/* Right side: assignees + chevron */}
        <div className="flex shrink-0 items-center gap-2">
          <TooltipProvider delay={0}>
            <div className="flex -space-x-1.5">
              {task.assignees.slice(0, 3).map((a) => (
                <Tooltip key={a.id}>
                  <TooltipTrigger
                    render={
                      <Avatar className="size-6 ring-2 ring-card transition-transform hover:z-10 hover:scale-110">
                        <AvatarFallback
                          className="text-[8px] font-semibold"
                          style={{ backgroundColor: a.color, color: "white" }}
                        >
                          {a.initials}
                        </AvatarFallback>
                      </Avatar>
                    }
                  />
                  <TooltipContent side="top" sideOffset={4}>
                    <p className="text-xs font-medium">{a.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
              {task.assignees.length > 3 && (
                <Avatar className="size-6 ring-2 ring-card">
                  <AvatarFallback className="bg-muted text-[8px] font-semibold text-muted-foreground">
                    +{task.assignees.length - 3}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </TooltipProvider>

          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-300",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Expandable detail */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-4 py-3.5 space-y-3">
            {/* Description */}
            <p className="text-xs leading-relaxed text-muted-foreground">
              {task.description}
            </p>

            {/* Progress bar if applicable */}
            {task.progress !== undefined && task.status !== "completed" && (
              <div className="flex items-center gap-3">
                <Progress value={task.progress} className="h-1.5 flex-1" />
                <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">
                  {task.progress}%
                </span>
              </div>
            )}

            {/* Tags */}
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Subtasks */}
            {task.subtasks && task.subtasks.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-foreground">
                  Subtasks ({completedSubtasks}/{totalSubtasks})
                </p>
                {task.subtasks.map((sub, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {sub.done ? (
                      <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500" />
                    ) : (
                      <Circle className="size-3.5 shrink-0 text-muted-foreground/50" />
                    )}
                    <span
                      className={cn(
                        "text-xs",
                        sub.done
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      )}
                    >
                      {sub.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Footer meta */}
            <div className="flex items-center justify-between pt-1 border-t border-border/50">
              <span className="text-[10px] text-muted-foreground">
                Created {task.createdAt}
              </span>
              <div className="flex items-center gap-1.5">
                {task.assignees.map((a) => (
                  <span key={a.id} className="text-[10px] text-muted-foreground">
                    {a.name.split(" ")[0]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
