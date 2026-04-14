"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  CalendarDays,
  CheckCircle2,
  Loader,
  Clock,
  GitMerge,
  MessageSquare,
  MoveRight,
  PlusCircle,
  Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  currentUserProfile,
  recentActivities,
  allTeamTasks,
  mockMeetings,
} from "@/lib/mock-data"

// ── Helpers ────────────────────────────────────────────────

const actionConfig = {
  completed: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Completed" },
  commented: { icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10", label: "Commented on" },
  moved: { icon: MoveRight, color: "text-amber-500", bg: "bg-amber-500/10", label: "Moved" },
  created: { icon: PlusCircle, color: "text-violet-500", bg: "bg-violet-500/10", label: "Created" },
  merged: { icon: GitMerge, color: "text-cyan-500", bg: "bg-cyan-500/10", label: "Merged" },
}

const skillColors: Record<string, { bg: string; text: string; border: string }> = {
  expert: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-500/20",
  },
  intermediate: {
    bg: "bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-500/20",
  },
  beginner: {
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-500/20",
  },
}

// ── Component ──────────────────────────────────────────────

export function ProfilePage() {
  const profile = currentUserProfile

  // Compute stats from existing mock data
  const myTasks = allTeamTasks.filter((t) => t.assigneeIds.includes(profile.id))
  const completedCount = myTasks.filter((t) => t.status === "completed").length
  const inProgressCount = myTasks.filter((t) => t.status === "in-progress").length
  const pendingCount = myTasks.filter((t) => t.status === "pending").length
  const meetingsThisWeek = mockMeetings.filter((m) =>
    m.participants.some((p) => p.initials === profile.initials)
  ).length

  const stats = [
    { label: "Completed", value: completedCount, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "In Progress", value: inProgressCount, icon: Loader, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Pending", value: pendingCount, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Meetings", value: meetingsThisWeek, icon: CalendarDays, color: "text-violet-500", bg: "bg-violet-500/10" },
  ]

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-6 backdrop-blur-md">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
        <div className="h-5 w-px bg-border" />
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          Profile
        </h1>
      </header>

      {/* Content */}
      <div className="mx-auto w-full max-w-4xl space-y-6 p-6">
        {/* ── Profile Header Card ─────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          {/* Gradient banner */}
          <div className="h-32 bg-gradient-to-br from-primary/30 via-primary/10 to-violet-500/20" />

          {/* Avatar + info overlay */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
              {/* Avatar — pulled up into the banner */}
              <div className="-mt-14 shrink-0">
                <div className="relative">
                  <Avatar className="size-24 border-4 border-card shadow-lg">
                    <AvatarFallback
                      className="text-2xl font-bold"
                      style={{ backgroundColor: profile.color, color: "#fff" }}
                    >
                      {profile.initials}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online indicator */}
                  <span
                    className={cn(
                      "absolute bottom-1 right-1 size-4 rounded-full border-2 border-card",
                      profile.status === "online"
                        ? "bg-emerald-500"
                        : profile.status === "away"
                          ? "bg-amber-500"
                          : "bg-muted-foreground/40"
                    )}
                  />
                </div>
              </div>

              {/* Name / role */}
              <div className="flex-1 pt-2 sm:pt-0">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  {profile.name}
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {profile.role}
                </p>
                {profile.bio && (
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground/80">
                    {profile.bio}
                  </p>
                )}
              </div>

              {/* Status badge */}
              <div className="shrink-0">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                    profile.status === "online"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : profile.status === "away"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      profile.status === "online"
                        ? "bg-emerald-500"
                        : profile.status === "away"
                          ? "bg-amber-500"
                          : "bg-muted-foreground/40"
                    )}
                  />
                  {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Row ───────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/20 hover:bg-primary/[0.02]"
            >
              <div className={cn("flex size-10 items-center justify-center rounded-lg", s.bg)}>
                <s.icon className={cn("size-5", s.color)} />
              </div>
              <span className="text-2xl font-bold tabular-nums text-foreground">{s.value}</span>
              <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Two-column grid ─────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left column (3/5) */}
          <div className="space-y-6 lg:col-span-3">
            {/* Contact & Info */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles className="size-4 text-primary" />
                Contact Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Mail, label: "Email", value: profile.email },
                  { icon: Phone, label: "Phone", value: profile.phone },
                  { icon: Globe, label: "Timezone", value: profile.timezone },
                  { icon: CalendarDays, label: "Joined", value: profile.joinedDate },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg bg-muted/40 px-3 py-2.5 transition-colors hover:bg-muted/60"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                      <item.icon className="size-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="truncate text-sm font-medium text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Timeline */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles className="size-4 text-primary" />
                Recent Activity
              </h3>
              <div className="relative space-y-0">
                {/* Vertical line */}
                <div className="absolute left-4 top-2 -bottom-2 w-px bg-border" />

                {recentActivities.map((act, idx) => {
                  const cfg = actionConfig[act.action]
                  return (
                    <div
                      key={act.id}
                      className={cn(
                        "relative flex items-start gap-4 rounded-lg px-1 py-3 transition-colors hover:bg-muted/30",
                        idx === 0 && "pt-0"
                      )}
                    >
                      {/* Dot */}
                      <div
                        className={cn(
                          "relative z-10 mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                          cfg.bg
                        )}
                      >
                        <cfg.icon className={cn("size-4", cfg.color)} />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{act.user.name}</span>{" "}
                          <span className="text-muted-foreground">{cfg.label.toLowerCase()}</span>{" "}
                          <span className="font-medium">{act.target}</span>
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{act.timestamp}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right column (2/5) */}
          <div className="space-y-6 lg:col-span-2">
            {/* Skills & Expertise */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles className="size-4 text-primary" />
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => {
                  const sc = skillColors[skill.level]
                  return (
                    <span
                      key={skill.name}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-transform hover:scale-105",
                        sc.bg,
                        sc.text,
                        sc.border
                      )}
                    >
                      {skill.name}
                      <span className="rounded-full bg-background/60 px-1.5 py-px text-[10px] capitalize">
                        {skill.level}
                      </span>
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Task Breakdown */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles className="size-4 text-primary" />
                Task Breakdown
              </h3>
              <div className="space-y-3.5">
                {[
                  { label: "Completed", count: completedCount, total: myTasks.length, color: "bg-emerald-500" },
                  { label: "In Progress", count: inProgressCount, total: myTasks.length, color: "bg-blue-500" },
                  { label: "Pending", count: pendingCount, total: myTasks.length, color: "bg-amber-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                      <span className="text-xs font-semibold tabular-nums text-foreground">
                        {item.count}/{item.total}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", item.color)}
                        style={{ width: `${item.total > 0 ? (item.count / item.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Tasks List */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles className="size-4 text-primary" />
                My Tasks
              </h3>
              <div className="space-y-2">
                {myTasks.slice(0, 6).map((task) => {
                  const statusStyle =
                    task.status === "completed"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : task.status === "in-progress"
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        : task.status === "at-risk"
                          ? "bg-red-500/10 text-red-600 dark:text-red-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  return (
                    <div
                      key={task.id}
                      className="flex items-center justify-between gap-2 rounded-lg bg-muted/30 px-3 py-2 transition-colors hover:bg-muted/50"
                    >
                      <span
                        className={cn(
                          "truncate text-xs font-medium text-foreground",
                          task.status === "completed" && "line-through text-muted-foreground"
                        )}
                      >
                        {task.title}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize",
                          statusStyle
                        )}
                      >
                        {task.status.replace("-", " ")}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
