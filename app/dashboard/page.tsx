"use client"

import * as React from "react"
import {
  ListTodo,
  Loader,
  CheckCheck,
  TrendingUp,
  PanelRightOpen,
  Users,
} from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { AvatarGroup, type TeamMember } from "@/components/dashboard/avatar-group"
import { RightPanel } from "@/components/dashboard/right-panel"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// ── Mock data ──────────────────────────────────────────────

const team: TeamMember[] = [
  { name: "Divyansh Shrivastava", initials: "DS", color: "#6366f1" },
  { name: "Love Singhal", initials: "LS", color: "#6366f1" },
  { name: "Uthkarsh Mandloi", initials: "UM", color: "#ec4899" },
  { name: "Rohan Mehta", initials: "RM", color: "#14b8a6" },
  { name: "Neha Gupta", initials: "NG", color: "#8b5cf6" },
]

const todoTasks = [
  { title: "Setup CI/CD pipeline", assignees: [team[0], team[3]] },
  { title: "Write API documentation", assignees: [team[1], team[2]] },
  { title: "Design onboarding flow", assignees: [team[2]] },
]

const inProgressTasks = [
  { title: "Build dashboard UI", assignees: [team[0], team[1]], progress: 65 },
  { title: "Implement auth system", assignees: [team[3], team[4]], progress: 40 },
  { title: "Database schema design", assignees: [team[2], team[0]], progress: 80 },
]

const completedTasks = [
  { title: "Project scaffolding", assignees: [team[0]] },
  { title: "Design system setup", assignees: [team[1], team[2]] },
  { title: "Init Git repository", assignees: [team[0], team[3]] },
  { title: "Finalize tech stack", assignees: [team[0], team[1], team[2], team[3], team[4]] },
]

const workloadData = [
  { member: team[0], tasks: 6, load: 85 },
  { member: team[1], tasks: 4, load: 55 },
  { member: team[2], tasks: 5, load: 70 },
  { member: team[3], tasks: 3, load: 40 },
  { member: team[4], tasks: 2, load: 25 },
]

// ── Component ──────────────────────────────────────────────

export default function DashboardPage() {
  const [rightPanelOpen, setRightPanelOpen] = React.useState(false)

  const totalTasks = todoTasks.length + inProgressTasks.length + completedTasks.length
  const completionPct = Math.round((completedTasks.length / totalTasks) * 100)

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            PaperBoat
          </h1>
          <p className="text-xs text-muted-foreground">Sprint 4 · Week 2</p>
        </div>
        <button
          onClick={() => setRightPanelOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <PanelRightOpen className="size-4" />
          <span className="hidden sm:inline">Quick View</span>
        </button>
      </header>

      {/* Cards grid */}
      <div className="p-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Tasks To Do */}
          <StatCard
            title="To Do"
            value={todoTasks.length}
            icon={ListTodo}
            iconColor="text-amber-500"
          >
            <div className="space-y-2.5">
              {todoTasks.map((t) => (
                <div key={t.title} className="flex items-center justify-between gap-2">
                  <span className="truncate text-xs text-muted-foreground">{t.title}</span>
                  <AvatarGroup members={t.assignees} max={3} />
                </div>
              ))}
            </div>
          </StatCard>

          {/* Tasks In Progress */}
          <StatCard
            title="In Progress"
            value={inProgressTasks.length}
            icon={Loader}
            iconColor="text-blue-500"
          >
            <div className="space-y-3">
              {inProgressTasks.map((t) => (
                <div key={t.title}>
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-muted-foreground">{t.title}</span>
                    <AvatarGroup members={t.assignees} max={3} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={t.progress} className="h-1.5 flex-1" />
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {t.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </StatCard>

          {/* Tasks Completed */}
          <StatCard
            title="Completed"
            value={completedTasks.length}
            icon={CheckCheck}
            iconColor="text-emerald-500"
          >
            <div className="space-y-2.5">
              {completedTasks.map((t) => (
                <div key={t.title} className="flex items-center justify-between gap-2">
                  <span className="truncate text-xs text-muted-foreground line-through">
                    {t.title}
                  </span>
                  <AvatarGroup members={t.assignees} max={3} />
                </div>
              ))}
            </div>
          </StatCard>

          {/* Project Completion */}
          <StatCard
            title="Project Completion"
            value={`${completionPct}%`}
            icon={TrendingUp}
            iconColor="text-primary"
          >
            <div className="space-y-2">
              <Progress value={completionPct} className="h-2" />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>{completedTasks.length} of {totalTasks} tasks done</span>
                <span>{totalTasks - completedTasks.length} remaining</span>
              </div>
            </div>
          </StatCard>

          {/* Workload Distribution — spans 2 cols */}
          <StatCard
            title="Workload Distribution"
            value={`${team.length} Members`}
            icon={Users}
            iconColor="text-violet-500"
            className="sm:col-span-2"
          >
            <div className="space-y-3">
              {workloadData.map((w) => (
                <div key={w.member.name} className="flex items-center gap-3">
                  <div className="flex w-24 items-center gap-2">
                    <div
                      className="size-6 shrink-0 rounded-full text-center text-[9px] font-medium leading-6 text-white"
                      style={{ backgroundColor: w.member.color }}
                    >
                      {w.member.initials}
                    </div>
                    <span className="truncate text-xs text-foreground">{w.member.name.split(" ")[0]}</span>
                  </div>
                  <Progress value={w.load} className="h-1.5 flex-1" />
                  <span
                    className={cn(
                      "w-12 text-right text-[11px] font-medium",
                      w.load > 75
                        ? "text-red-500"
                        : w.load > 50
                          ? "text-amber-500"
                          : "text-emerald-500"
                    )}
                  >
                    {w.tasks} tasks
                  </span>
                </div>
              ))}
            </div>
          </StatCard>
        </div>
      </div>

      {/* Right panel */}
      <RightPanel open={rightPanelOpen} onClose={() => setRightPanelOpen(false)} />
    </>
  )
}
