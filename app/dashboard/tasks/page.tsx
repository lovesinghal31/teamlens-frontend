"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Search,
  X,
  Filter,
  LayoutGrid,
  List,
  ListTodo,
  CheckCheck,
  Loader,
  AlertTriangle,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Clock,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TaskColumn } from "@/components/tasks/task-column"
import { TaskCard } from "@/components/tasks/task-card"
import { taskItems } from "@/lib/task-mock-data"
import { currentUser } from "@/lib/mock-data"
import type { TaskStatus } from "@/lib/team-types"
import type { TaskPriority, TaskCategory } from "@/lib/task-types"
import { Progress } from "@/components/ui/progress"

// ── Filter types ───────────────────────────────────────────

type ViewMode = "board" | "list"
type StatusFilter = "all" | TaskStatus
type PriorityFilter = "all" | TaskPriority
type CategoryFilter = "all" | TaskCategory

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "at-risk", label: "At Risk" },
  { value: "completed", label: "Completed" },
]

const priorityFilters: { value: PriorityFilter; label: string; icon: typeof ArrowUp }[] = [
  { value: "all", label: "All", icon: Filter },
  { value: "high", label: "High", icon: ArrowUp },
  { value: "medium", label: "Medium", icon: ArrowRight },
  { value: "low", label: "Low", icon: ArrowDown },
]

const categoryFilters: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "backend", label: "Backend" },
  { value: "frontend", label: "Frontend" },
  { value: "design", label: "Design" },
  { value: "docs", label: "Docs" },
  { value: "testing", label: "Testing" },
  { value: "misc", label: "Misc" },
]

// ── Status order for board columns ─────────────────────────

const statusOrder: TaskStatus[] = ["pending", "in-progress", "at-risk", "completed"]

// ── Stats ──────────────────────────────────────────────────

function useTaskStats() {
  const total = taskItems.length
  const completed = taskItems.filter((t) => t.status === "completed").length
  const inProgress = taskItems.filter((t) => t.status === "in-progress").length
  const pending = taskItems.filter((t) => t.status === "pending").length
  const atRisk = taskItems.filter((t) => t.status === "at-risk").length
  const completionPct = Math.round((completed / total) * 100)

  return { total, completed, inProgress, pending, atRisk, completionPct }
}

// ── Page ───────────────────────────────────────────────────

export default function TaskPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center">
          <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <TaskPageContent />
    </React.Suspense>
  )
}

function TaskPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const assignedMe = searchParams.get("assignedMe") === "true"

  const [view, setView] = React.useState<ViewMode>("board")
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all")
  const [priorityFilter, setPriorityFilter] = React.useState<PriorityFilter>("all")
  const [categoryFilter, setCategoryFilter] = React.useState<CategoryFilter>("all")
  const [expandedId, setExpandedId] = React.useState<string | null>(null)

  const toggleAssignedMe = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (assignedMe) {
      params.delete("assignedMe")
    } else {
      params.set("assignedMe", "true")
    }
    router.push(`/dashboard/tasks?${params.toString()}`, { scroll: false })
  }

  const stats = useTaskStats()

  // Filtered tasks
  const filteredTasks = taskItems.filter((t) => {
    if (assignedMe && !t.assignees.some((a) => a.id === currentUser.id)) return false
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter !== "all" && t.status !== statusFilter) return false
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false
    return true
  })

  // Group by status for board view
  const groupedByStatus = React.useMemo(() => {
    const groups: Record<TaskStatus, typeof filteredTasks> = {
      pending: [],
      "in-progress": [],
      "at-risk": [],
      completed: [],
    }
    filteredTasks.forEach((t) => groups[t.status].push(t))
    return groups
  }, [filteredTasks])

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  const activeFilterCount =
    (assignedMe ? 1 : 0) +
    (statusFilter !== "all" ? 1 : 0) +
    (priorityFilter !== "all" ? 1 : 0) +
    (categoryFilter !== "all" ? 1 : 0)

  const clearFilters = () => {
    setStatusFilter("all")
    setPriorityFilter("all")
    setCategoryFilter("all")
    setSearch("")
    if (assignedMe) {
      const params = new URLSearchParams(searchParams.toString())
      params.delete("assignedMe")
      router.push(`/dashboard/tasks?${params.toString()}`, { scroll: false })
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto" id="task-page">
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">Tasks</h1>
          <p className="text-xs text-muted-foreground">
            {stats.total} total · {stats.completed} completed · Sprint 4
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center rounded-lg border border-border p-0.5">
            <button
              onClick={() => setView("board")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all",
                view === "board"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              id="view-toggle-board"
            >
              <LayoutGrid className="size-3.5" />
              Board
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all",
                view === "list"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              id="view-toggle-list"
            >
              <List className="size-3.5" />
              List
            </button>
          </div>
        </div>
      </header>

      {/* ── Stats bar ── */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/3 to-transparent px-6 py-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <StatMini
            icon={ListTodo}
            label="Total"
            value={stats.total}
            color="text-foreground"
            bg="bg-muted"
          />
          <StatMini
            icon={Clock}
            label="Pending"
            value={stats.pending}
            color="text-amber-600 dark:text-amber-400"
            bg="bg-amber-500/10"
          />
          <StatMini
            icon={Loader}
            label="In Progress"
            value={stats.inProgress}
            color="text-blue-600 dark:text-blue-400"
            bg="bg-blue-500/10"
          />
          <StatMini
            icon={AlertTriangle}
            label="At Risk"
            value={stats.atRisk}
            color="text-red-600 dark:text-red-400"
            bg="bg-red-500/10"
          />
          <StatMini
            icon={CheckCheck}
            label="Completed"
            value={stats.completed}
            color="text-emerald-600 dark:text-emerald-400"
            bg="bg-emerald-500/10"
          />
        </div>

        {/* Progress overview */}
        <div className="mt-3 flex items-center gap-3">
          <Progress value={stats.completionPct} className="h-1.5 flex-1" />
          <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">
            {stats.completionPct}% complete
          </span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="border-b border-border px-6 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              id="task-search-input"
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

          {/* Filter controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Assigned to Me toggle */}
            <button
              onClick={toggleAssignedMe}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-200",
                assignedMe
                  ? "bg-violet-600 text-white shadow-sm shadow-violet-500/25"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              id="filter-assigned-me"
            >
              <User className="size-3" />
              Assigned to Me
            </button>

            {/* Divider */}
            <div className="hidden h-5 w-px bg-border sm:block" />

            {/* Status filter */}
            <div className="flex items-center gap-1">
              {statusFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-200",
                    statusFilter === f.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  id={`filter-status-${f.value}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden h-5 w-px bg-border sm:block" />

            {/* Priority filter */}
            <div className="flex items-center gap-1">
              {priorityFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setPriorityFilter(f.value)}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-200",
                    priorityFilter === f.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  id={`filter-priority-${f.value}`}
                >
                  <f.icon className="size-3" />
                  {f.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden h-5 w-px bg-border sm:block" />

            {/* Category filter */}
            <div className="flex items-center gap-1">
              {categoryFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setCategoryFilter(f.value)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-200",
                    categoryFilter === f.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  id={`filter-category-${f.value}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Clear filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-[11px] font-medium text-destructive transition-all hover:bg-destructive/20"
                id="clear-filters"
              >
                <X className="size-3" />
                Clear ({activeFilterCount})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 p-6">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <ListTodo className="size-12 text-muted-foreground/30" />
            <p className="text-sm font-medium text-muted-foreground">No tasks found</p>
            <p className="text-xs text-muted-foreground/70">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="mt-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Clear all filters
            </button>
          </div>
        ) : view === "board" ? (
          /* ── Board View (Kanban columns) ── */
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {statusOrder.map((status) => (
              <TaskColumn
                key={status}
                status={status}
                tasks={groupedByStatus[status]}
                expandedId={expandedId}
                onToggle={handleToggle}
              />
            ))}
          </div>
        ) : (
          /* ── List View ── */
          <div className="mx-auto max-w-4xl space-y-2.5">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isExpanded={expandedId === task.id}
                onToggle={() => handleToggle(task.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Stat mini card ─────────────────────────────────────────

function StatMini({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: typeof ListTodo
  label: string
  value: number
  color: string
  bg: string
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-card/50 px-3 py-2.5 backdrop-blur-sm transition-all duration-200 hover:border-primary/20 hover:shadow-sm">
      <div className={cn("flex size-8 items-center justify-center rounded-lg", bg)}>
        <Icon className={cn("size-4", color)} />
      </div>
      <div>
        <p className="text-lg font-bold tabular-nums leading-none text-foreground">{value}</p>
        <p className="text-[10px] text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}
