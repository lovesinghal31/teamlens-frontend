"use client"

import * as React from "react"
import { Search, Users, Filter, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { TeamMemberRow } from "@/components/team/team-member-row"
import type { TeamMemberData } from "@/lib/team-types"
import { teamMembers, allTeamTasks, buildTeamData } from "@/lib/mock-data"

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

// ── Build from centralized data ────────────────────────────

const teamData = buildTeamData()

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

  const totalTasks = allTeamTasks.length
  const completedCount = allTeamTasks.filter((t) => t.status === "completed").length

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">Team BitWiser</h1>
          <p className="text-xs text-muted-foreground">
            {teamMembers.length} Members · {completedCount}/{totalTasks} tasks completed · Sprint 4
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
