"use client"

import * as React from "react"
import {
  ListTodo,
  Loader,
  CheckCheck,
  TrendingUp,
  PanelRightOpen,
  Users,
  Activity,
  Plus,
  Zap,
  Bell,
} from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { AvatarGroup } from "@/components/dashboard/avatar-group"
import { RightPanel } from "@/components/dashboard/right-panel"
import { Sparkline } from "@/components/dashboard/sparkline"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  dashboardTeam,
  todoTasks,
  inProgressTasks,
  completedTasks,
  workloadData,
  velocityData,
  velocityDays,
  recentActivities,
} from "@/lib/mock-data"

// ── Helpers ────────────────────────────────────────────────

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

function getDueLabel(dueDate: string) {
  // Simplified: highlight "Apr 9" as approaching since it's closest
  if (dueDate === "Apr 9") return { label: dueDate, urgent: true }
  return { label: dueDate, urgent: false }
}

// ── Component ──────────────────────────────────────────────

export default function DashboardPage() {
  const [rightPanelOpen, setRightPanelOpen] = React.useState(false)

  const totalTasks = todoTasks.length + inProgressTasks.length + completedTasks.length
  const completionPct = Math.round((completedTasks.length / totalTasks) * 100)

  const totalVelocity = velocityData.reduce((a, b) => a + b, 0)
  const avgVelocity = (totalVelocity / velocityData.length).toFixed(1)

  // Count tasks due within next 3 days for greeting summary
  const upcomingDueCount = todoTasks.filter(
    (t) => t.dueDate === "Apr 9" || t.dueDate === "Apr 10"
  ).length

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            PaperBoat
          </h1>
          <p className="text-xs text-muted-foreground">Sprint 4 · Week 2</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Bell className="size-4" />
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-red-500" />
            </span>
          </button>
          <button
            className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">New Task</span>
          </button>
          <button
            onClick={() => setRightPanelOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <PanelRightOpen className="size-4" />
            <span className="hidden sm:inline">Quick View</span>
          </button>
        </div>
      </header>

      {/* Greeting bar */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/3 to-transparent px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <Zap className="size-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                {getGreeting()}, Divyansh 👋
              </h2>
              <p className="text-sm text-muted-foreground">
                {upcomingDueCount > 0 ? (
                  <>
                    You have{" "}
                    <span className="font-medium text-amber-600 dark:text-amber-400">
                      {upcomingDueCount} task{upcomingDueCount > 1 ? "s" : ""} due soon
                    </span>
                    {" · "}
                    {completedTasks.length} completed this sprint · Team velocity is{" "}
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">trending up</span>
                  </>
                ) : (
                  <>
                    {completedTasks.length} tasks completed this sprint · Team is on track
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

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
              {todoTasks.map((t) => {
                const due = getDueLabel(t.dueDate)
                return (
                  <div key={t.title} className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="truncate text-xs text-muted-foreground">{t.title}</span>
                      <span
                        className={cn(
                          "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium",
                          due.urgent
                            ? "bg-red-500/10 text-red-600 dark:text-red-400"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {due.label}
                      </span>
                    </div>
                    <AvatarGroup members={t.assignees} max={3} />
                  </div>
                )
              })}
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

          {/* Progress Rate / Velocity */}
          <StatCard
            title="Tasks Progress Rate"
            value={`${avgVelocity}/day`}
            icon={Activity}
            iconColor="text-cyan-500"
          >
            <div className="space-y-2">
              <Sparkline data={velocityData} className="h-12 w-full" />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                {velocityDays.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <TrendingUp className="size-3 text-emerald-500" />
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  +33% from last week
                </span>
              </div>
            </div>
          </StatCard>

          {/* Recent Activity */}
          <StatCard
            title="Recent Activity"
            value={`${recentActivities.length} Updates`}
            icon={Activity}
            iconColor="text-orange-500"
          >
            <ActivityFeed activities={recentActivities.slice(0, 4)} />
          </StatCard>

          {/* Workload Distribution — spans 3 cols */}
          <StatCard
            title="Workload Distribution"
            value={`${dashboardTeam.length} Members`}
            icon={Users}
            iconColor="text-violet-500"
            className="sm:col-span-2 lg:col-span-3"
          >
            <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  )
}
