"use client"

import * as React from "react"
import {
  ListTodo,
  Loader,
  CheckCheck,
  TrendingUp,
  Users,
} from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// ── Mock data ──────────────────────────────────────────────

const todoTasks = [
  { title: "Setup CI/CD pipeline" },
  { title: "Write API documentation" },
  { title: "Design onboarding flow" },
]

const inProgressTasks = [
  { title: "Build dashboard UI", progress: 65 },
  { title: "Implement auth system", progress: 40 },
  { title: "Database schema design", progress: 80 },
]

const completedTasks = [
  { title: "Project scaffolding" },
  { title: "Design system setup" },
  { title: "Init Git repository" },
  { title: "Finalize tech stack" },
]

const workloadData = [
  { name: "Divyansh", initials: "DS", color: "#6366f1", tasks: 6, load: 85 },
  { name: "Love", initials: "LS", color: "#6366f1", tasks: 4, load: 55 },
  { name: "Uthkarsh", initials: "UM", color: "#ec4899", tasks: 5, load: 70 },
  { name: "Rohan", initials: "RM", color: "#14b8a6", tasks: 3, load: 40 },
  { name: "Neha", initials: "NG", color: "#8b5cf6", tasks: 2, load: 25 },
]

// ── Component ──────────────────────────────────────────────

export default function DashboardPage() {
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
            value={`${workloadData.length} Members`}
            icon={Users}
            iconColor="text-violet-500"
            className="sm:col-span-2"
          >
            <div className="space-y-3">
              {workloadData.map((w) => (
                <div key={w.name} className="flex items-center gap-3">
                  <div className="flex w-24 items-center gap-2">
                    <div
                      className="size-6 shrink-0 rounded-full text-center text-[9px] font-medium leading-6 text-white"
                      style={{ backgroundColor: w.color }}
                    >
                      {w.initials}
                    </div>
                    <span className="truncate text-xs text-foreground">{w.name}</span>
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
    </>
  )
}
