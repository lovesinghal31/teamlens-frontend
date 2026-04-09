"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TeamMemberData, TeamTask, TaskStatus } from "@/lib/team-types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ── Status config ──────────────────────────────────────────

const statusConfig: Record<TaskStatus, { label: string; bg: string; text: string; dot: string }> = {
  completed: {
    label: "Completed",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  "in-progress": {
    label: "In Progress",
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  pending: {
    label: "Pending",
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  "at-risk": {
    label: "At Risk",
    bg: "bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    dot: "bg-red-500",
  },
}

// ── Helpers ────────────────────────────────────────────────

function countByStatus(tasks: TeamTask[], status: TaskStatus) {
  return tasks.filter((t) => t.status === status).length
}

// ── Co-assignee avatars ────────────────────────────────────

function CoAssignees({ task, currentMemberId }: { task: TeamTask; currentMemberId: string }) {
  const others = task.assignees.filter((a) => a.id !== currentMemberId)
  if (others.length === 0) return null

  return (
    <TooltipProvider delay={0}>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-muted-foreground">with</span>
        <div className="flex items-center -space-x-1.5">
          {others.map((a) => (
            <Tooltip key={a.id}>
              <TooltipTrigger
                render={
                  <Avatar className="size-5 ring-1 ring-card transition-transform hover:z-10 hover:scale-110">
                    <AvatarFallback
                      className="text-[8px] font-medium"
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
        </div>
      </div>
    </TooltipProvider>
  )
}

// ── Task sub-row ───────────────────────────────────────────

function TaskRow({ task, memberId, isEven }: { task: TeamTask; memberId: string; isEven: boolean }) {
  const cfg = statusConfig[task.status]

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 transition-colors",
        isEven ? "bg-muted/30" : "bg-transparent"
      )}
    >
      {/* Status dot */}
      <span className={cn("size-2 shrink-0 rounded-full", cfg.dot)} />

      {/* Title */}
      <span
        className={cn(
          "min-w-0 truncate text-sm text-foreground",
          task.status === "completed" && "line-through opacity-60"
        )}
      >
        {task.title}
      </span>

      {/* Status badge — right after title */}
      <span
        className={cn(
          "shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
          cfg.bg,
          cfg.text
        )}
      >
        {cfg.label}
      </span>

      {/* Spacer pushes deadline + co-assignees to the right */}
      <span className="flex-1" />

      {/* Due date */}
      {task.dueDate && (
        <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {task.dueDate}
        </span>
      )}

      {/* Co-assignees */}
      <CoAssignees task={task} currentMemberId={memberId} />
    </div>
  )
}

// ── Main component ─────────────────────────────────────────

interface TeamMemberRowProps {
  member: TeamMemberData
  isExpanded: boolean
  onToggle: () => void
}

export function TeamMemberRow({ member, isExpanded, onToggle }: TeamMemberRowProps) {
  const total = member.tasks.length
  const completed = countByStatus(member.tasks, "completed")
  const pending = countByStatus(member.tasks, "pending")
  const inProgress = countByStatus(member.tasks, "in-progress")
  const atRisk = countByStatus(member.tasks, "at-risk")

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300",
        isExpanded
          ? "shadow-lg shadow-black/5 dark:shadow-black/25"
          : "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20"
      )}
    >
      {/* Collapsed header — always visible */}
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/50"
      >
        {/* Avatar */}
        <Avatar className="size-10 shrink-0 ring-2 ring-primary/10">
          <AvatarFallback
            className="text-sm font-semibold"
            style={{ backgroundColor: member.color, color: "white" }}
          >
            {member.initials}
          </AvatarFallback>
        </Avatar>

        {/* Name + role */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{member.name}</p>
          <p className="truncate text-xs text-muted-foreground">{member.role}</p>
        </div>

        {/* Mini stat pills */}
        <div className="hidden items-center gap-2 sm:flex">
          <StatPill label="Total" value={total} className="bg-muted text-muted-foreground" />
          {inProgress > 0 && (
            <StatPill
              label="Active"
              value={inProgress}
              className="bg-blue-500/10 text-blue-600 dark:text-blue-400"
            />
          )}
          {pending > 0 && (
            <StatPill
              label="Pending"
              value={pending}
              className="bg-amber-500/10 text-amber-600 dark:text-amber-400"
            />
          )}
          {atRisk > 0 && (
            <StatPill
              label="At Risk"
              value={atRisk}
              className="bg-red-500/10 text-red-600 dark:text-red-400"
            />
          )}
          <StatPill
            label="Done"
            value={completed}
            className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          />
        </div>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {/* Expandable task list */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          {/* Divider */}
          <div className="mx-5 border-t border-border" />

          {member.tasks.length === 0 ? (
            <div className="flex items-center justify-center px-5 py-8 text-sm text-muted-foreground">
              No tasks assigned
            </div>
          ) : (
            <div className="py-2">
              {member.tasks.map((task, i) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  memberId={member.id}
                  isEven={i % 2 === 0}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Stat pill ──────────────────────────────────────────────

function StatPill({
  label,
  value,
  className,
}: {
  label: string
  value: number
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
        className
      )}
    >
      {value} {label}
    </span>
  )
}
