"use client"

import * as React from "react"
import { Search, Users, Filter, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { TeamMemberRow } from "@/components/team/team-member-row"
import type { TaskAssignee, TeamMemberData, TaskStatus } from "@/lib/team-types"

// ── Team members ───────────────────────────────────────────

const members: TaskAssignee[] = [
  { id: "ds", name: "Divyansh Shrivastava", initials: "DS", color: "#6366f1" },
  { id: "ls", name: "Love Singhal", initials: "LS", color: "#6366f1" },
  { id: "um", name: "Uthkarsh Mandloi", initials: "UM", color: "#ec4899" },
  { id: "rm", name: "Rohan Mehta", initials: "RM", color: "#14b8a6" },
  { id: "ng", name: "Neha Gupta", initials: "NG", color: "#8b5cf6" },
]

const [ds, ls, um, rm, ng] = members

// ── Mock tasks ─────────────────────────────────────────────

interface RawTask {
  id: string
  title: string
  status: TaskStatus
  dueDate?: string
  assigneeIds: string[]
}

const allTasks: RawTask[] = [
  // ── Backend / Infra ───────────────────
  { id: "t1", title: "Setup CI/CD pipeline", status: "pending", dueDate: "Apr 10", assigneeIds: ["ds", "rm"] },
  { id: "t2", title: "Implement auth system", status: "in-progress", dueDate: "Apr 14", assigneeIds: ["rm", "ng"] },
  { id: "t3", title: "Database schema design", status: "in-progress", dueDate: "Apr 11", assigneeIds: ["um", "ds"] },
  { id: "t4", title: "API rate limiting middleware", status: "pending", dueDate: "Apr 15", assigneeIds: ["rm"] },
  { id: "t5", title: "Setup Redis caching layer", status: "at-risk", dueDate: "Apr 12", assigneeIds: ["ds", "rm"] },

  // ── Frontend / UI ─────────────────────
  { id: "t6", title: "Build dashboard UI", status: "in-progress", dueDate: "Apr 13", assigneeIds: ["ds", "ls"] },
  { id: "t7", title: "Design onboarding flow", status: "pending", dueDate: "Apr 9", assigneeIds: ["um"] },
  { id: "t8", title: "Implement dark mode toggle", status: "completed", assigneeIds: ["ls"] },
  { id: "t9", title: "Meeting calendar component", status: "completed", assigneeIds: ["ls", "ds"] },
  { id: "t10", title: "Responsive sidebar navigation", status: "completed", assigneeIds: ["ls", "um"] },

  // ── Documentation / Process ───────────
  { id: "t11", title: "Write API documentation", status: "in-progress", dueDate: "Apr 12", assigneeIds: ["ls", "um"] },
  { id: "t12", title: "Create component storybook", status: "pending", dueDate: "Apr 16", assigneeIds: ["um", "ng"] },
  { id: "t13", title: "Project scaffolding", status: "completed", assigneeIds: ["ds"] },
  { id: "t14", title: "Design system setup", status: "completed", assigneeIds: ["ls", "um"] },
  { id: "t15", title: "Init Git repository", status: "completed", assigneeIds: ["ds", "rm"] },

  // ── Testing / QA ──────────────────────
  { id: "t16", title: "Write unit tests for auth", status: "pending", dueDate: "Apr 17", assigneeIds: ["ng", "rm"] },
  { id: "t17", title: "E2E test suite setup", status: "at-risk", dueDate: "Apr 14", assigneeIds: ["ng"] },
  { id: "t18", title: "Performance audit & optimization", status: "pending", dueDate: "Apr 18", assigneeIds: ["ds", "ng"] },

  // ── Misc ──────────────────────────────
  { id: "t19", title: "Finalize tech stack", status: "completed", assigneeIds: ["ds", "ls", "um", "rm", "ng"] },
  { id: "t20", title: "Sprint retrospective notes", status: "in-progress", dueDate: "Apr 11", assigneeIds: ["um"] },
]

// ── Build team member data ─────────────────────────────────

function buildTeamData(): TeamMemberData[] {
  return members.map((m) => {
    const memberTasks = allTasks
      .filter((t) => t.assigneeIds.includes(m.id))
      .map((t) => ({
        id: t.id,
        title: t.title,
        status: t.status,
        dueDate: t.dueDate,
        assignees: t.assigneeIds.map((aid) => members.find((x) => x.id === aid)!),
      }))

    // Determine role based on member id
    const roles: Record<string, string> = {
      ds: "Project Lead · Full-Stack",
      ls: "Frontend Engineer",
      um: "UI/UX Designer · Frontend",
      rm: "Backend Engineer",
      ng: "QA Engineer · Testing",
    }

    return {
      id: m.id,
      name: m.name,
      initials: m.initials,
      role: roles[m.id] ?? "Engineer",
      color: m.color,
      tasks: memberTasks,
    }
  })
}

const teamData = buildTeamData()

// ── Filter chips ───────────────────────────────────────────

type FilterOption = "all" | "has-pending" | "has-at-risk" | "all-completed"

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: "all", label: "All" },
  { value: "has-pending", label: "Has Pending" },
  { value: "has-at-risk", label: "Has At Risk" },
  { value: "all-completed", label: "All Completed" },
]

function matchesFilter(member: TeamMemberData, filter: FilterOption): boolean {
  if (filter === "all") return true
  if (filter === "has-pending") return member.tasks.some((t) => t.status === "pending")
  if (filter === "has-at-risk") return member.tasks.some((t) => t.status === "at-risk")
  if (filter === "all-completed") return member.tasks.length > 0 && member.tasks.every((t) => t.status === "completed")
  return true
}

// ── Page component ─────────────────────────────────────────

export default function TeamPage() {
  const [expandedId, setExpandedId] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState("")
  const [filter, setFilter] = React.useState<FilterOption>("all")

  const filtered = teamData.filter((m) => {
    const nameMatch = m.name.toLowerCase().includes(search.toLowerCase())
    const filterMatch = matchesFilter(m, filter)
    return nameMatch && filterMatch
  })

  const totalTasks = allTasks.length
  const completedCount = allTasks.filter((t) => t.status === "completed").length

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">Team BitWiser</h1>
          <p className="text-xs text-muted-foreground">
            {members.length} Members · {completedCount}/{totalTasks} tasks completed · Sprint 4
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5">
            <Users className="size-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">{filtered.length}</span>
            <span className="text-xs text-muted-foreground">shown</span>
          </div>
        </div>
      </header>

      {/* Search + Filters */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/3 to-transparent px-6 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex items-center gap-2">
            <Filter className="size-3.5 text-muted-foreground" />
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-all duration-200",
                  filter === opt.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Member list */}
      <div className="flex-1 p-6">
        <div className="mx-auto max-w-4xl space-y-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
              <Users className="size-10 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">No members found</p>
              <p className="text-xs text-muted-foreground/70">Try adjusting your search or filter</p>
            </div>
          ) : (
            filtered.map((member) => (
              <TeamMemberRow
                key={member.id}
                member={member}
                isExpanded={expandedId === member.id}
                onToggle={() =>
                  setExpandedId((prev) => (prev === member.id ? null : member.id))
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
