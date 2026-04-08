"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MeetingCalendar } from "@/components/meetings/meeting-calendar"
import { MeetingDetailSidebar } from "@/components/meetings/meeting-detail-sidebar"
import type { Meeting, Participant } from "@/lib/meeting-types"

// ── Mock participants ──────────────────────────────────────

const people: Record<string, Participant> = {
  ds: { name: "Divyansh Shrivastava", initials: "DS", color: "#6366f1", attendance: "required" },
  ls: { name: "Love Singhal", initials: "LS", color: "#6366f1", attendance: "required" },
  um: { name: "Uthkarsh Mandloi", initials: "UM", color: "#ec4899", attendance: "required" },
  rm: { name: "Rohan Mehta", initials: "RM", color: "#14b8a6", attendance: "optional" },
  ng: { name: "Neha Gupta", initials: "NG", color: "#8b5cf6", attendance: "optional" },
  pn: { name: "Priya Nair", initials: "PN", color: "#f59e0b", attendance: "required" },
}

// ── Mock meetings ──────────────────────────────────────────

const mockMeetings: Meeting[] = [
  {
    id: "1",
    title: "Sprint Blocker Review",
    day: 0, // Mon
    startHour: 9,
    startMinute: 0,
    endHour: 10,
    endMinute: 0,
    priority: "high",
    approvalStatus: "approved",
    createdBy: "ai",
    tags: ["SPRINT", "BLOCKERS"],
    aiReasoning:
      "AI detected 3 unresolved blockers from the previous sprint that require immediate team attention. Scheduling this as the first meeting of the week ensures early resolution.",
    agenda: [
      "Review CI pipeline failure and rollback strategy",
      "Discuss auth token expiry affecting staging",
      "Assign owners for each blocker with ETA",
    ],
    participants: [
      { ...people.ds, attendance: "required" },
      { ...people.ls, attendance: "required" },
      { ...people.um, attendance: "optional" },
    ],
    tasks: [
      { title: "Resolve CI Pipeline Failure", assignee: people.ds, progress: 60, status: "at-risk" },
      { title: "Fix Auth Token Expiry", assignee: people.ls, progress: 85, status: "on-track" },
    ],
    colorScheme: "red",
  },
  {
    id: "2",
    title: "Q2 Roadmap Alignment",
    day: 1, // Tue
    startHour: 10,
    startMinute: 0,
    endHour: 11,
    endMinute: 0,
    priority: "low",
    approvalStatus: "approved",
    createdBy: "predefined",
    tags: ["PLANNING", "ROADMAP"],
    aiReasoning: "Predefined quarterly planning meeting. Scheduled at the start of each quarter to align team goals.",
    agenda: [
      "Review Q1 outcomes and learnings",
      "Present Q2 OKRs and key milestones",
      "Align on resource allocation across features",
      "Identify cross-team dependencies",
    ],
    participants: [
      { ...people.ds, attendance: "required" },
      { ...people.pn, attendance: "required" },
      { ...people.ng, attendance: "optional" },
    ],
    tasks: [
      { title: "Roadmap Document Draft", assignee: people.pn, progress: 90, status: "on-track" },
      { title: "Stakeholder Input", assignee: people.pn, progress: 50, status: "on-track" },
    ],
    colorScheme: "green",
  },
  {
    id: "3",
    title: "Design Handoff",
    day: 0, // Mon
    startHour: 11,
    startMinute: 0,
    endHour: 11,
    endMinute: 45,
    priority: "medium",
    approvalStatus: "approved",
    createdBy: "ai",
    tags: ["DESIGN", "HANDOFF"],
    aiReasoning:
      "Design team completed the final mockups on Friday. AI scheduled this handoff to align designers and developers before sprint tasks begin.",
    agenda: [
      "Walk through finalized Figma screens",
      "Clarify interaction states and edge cases",
      "Discuss component reuse opportunities",
    ],
    participants: [
      { ...people.ls, attendance: "required" },
      { ...people.um, attendance: "required" },
    ],
    tasks: [
      { title: "Component Spec Review", assignee: people.ls, progress: 70, status: "on-track" },
    ],
    colorScheme: "yellow",
  },
  {
    id: "4",
    title: "Weekly Standup",
    day: 3, // Thu
    startHour: 9,
    startMinute: 30,
    endHour: 10,
    endMinute: 0,
    priority: "low",
    approvalStatus: "approved",
    createdBy: "predefined",
    tags: ["STANDUP", "WEEKLY"],
    aiReasoning:
      "Recurring weekly standup. This is a predefined meeting that runs every Thursday for active sprint contributors.",
    agenda: [
      "Each member shares yesterday's progress",
      "Flag any blockers or risks",
      "Align on today's priorities",
    ],
    participants: [
      { ...people.ds, attendance: "required" },
      { ...people.ls, attendance: "required" },
      { ...people.um, attendance: "required" },
      { ...people.rm, attendance: "optional" },
      { ...people.ng, attendance: "optional" },
    ],
    tasks: [],
    colorScheme: "blue",
  },
  {
    id: "5",
    title: "Backend Architecture Review",
    day: 3, // Thu
    startHour: 13,
    startMinute: 0,
    endHour: 14,
    endMinute: 0,
    priority: "medium",
    approvalStatus: "pending",
    createdBy: "ai",
    tags: ["BACKEND", "ARCHITECTURE"],
    aiReasoning:
      "AI identified potential scaling bottlenecks in the current API layer. This review is recommended before the next deployment cycle.",
    agenda: [
      "Analyze current API response times under load",
      "Review database query optimization opportunities",
      "Discuss caching strategy for high-traffic endpoints",
      "Evaluate microservice vs monolith trade-offs",
    ],
    participants: [
      { ...people.ds, attendance: "required" },
      { ...people.rm, attendance: "required" },
    ],
    tasks: [
      { title: "API Layer Audit", assignee: people.rm, progress: 40, status: "at-risk" },
      { title: "Load Test Results", assignee: people.ds, progress: 65, status: "on-track" },
    ],
    colorScheme: "amber",
  },
  {
    id: "6",
    title: "QA Regression Testing",
    day: 2, // Wed
    startHour: 14,
    startMinute: 0,
    endHour: 15,
    endMinute: 0,
    priority: "high",
    approvalStatus: "approved",
    createdBy: "predefined",
    tags: ["QA", "TESTING"],
    aiReasoning:
      "Predefined pre-release regression testing session. Triggered by 5 bug reports filed in the last 48 hours.",
    agenda: [
      "Run full regression suite on staging",
      "Triage newly reported bugs by severity",
      "Validate fixes for P0 and P1 issues",
      "Sign off on release candidate readiness",
    ],
    participants: [
      { ...people.um, attendance: "required" },
      { ...people.rm, attendance: "required" },
      { ...people.ng, attendance: "required" },
    ],
    tasks: [
      { title: "Test Suite Execution", assignee: people.um, progress: 30, status: "at-risk" },
      { title: "Bug Triage", assignee: people.ng, progress: 55, status: "on-track" },
    ],
    colorScheme: "red",
  },
  {
    id: "7",
    title: "Release Readiness",
    day: 4, // Fri
    startHour: 15,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    priority: "high",
    approvalStatus: "approved",
    createdBy: "ai",
    tags: ["RELEASE", "DEPLOYMENT"],
    aiReasoning:
      "Sprint ends Friday. AI scheduled a final readiness check to ensure all critical tasks are completed and the release is green-lit.",
    agenda: [
      "Walk through release checklist status",
      "Confirm staging verification is complete",
      "Review changelog and release notes",
      "Final go/no-go decision",
    ],
    participants: [
      { ...people.ds, attendance: "required" },
      { ...people.pn, attendance: "required" },
      { ...people.rm, attendance: "required" },
      { ...people.ng, attendance: "optional" },
    ],
    tasks: [
      { title: "Release Checklist", assignee: people.ds, progress: 80, status: "on-track" },
      { title: "Staging Verification", assignee: people.rm, progress: 45, status: "at-risk" },
      { title: "Changelog Draft", assignee: people.pn, progress: 100, status: "completed" },
    ],
    colorScheme: "red",
  },
  {
    id: "8",
    title: "1:1 Mentoring Session",
    day: 5, // Sat
    startHour: 11,
    startMinute: 0,
    endHour: 11,
    endMinute: 30,
    priority: "low",
    approvalStatus: "approved",
    createdBy: "predefined",
    tags: ["1:1", "MENTORING"],
    aiReasoning: "Predefined weekly 1:1 between Divyansh and Uthkarsh for mentoring and growth check-ins.",
    agenda: [
      "Discuss progress on current sprint tasks",
      "Review learning goals for the week",
      "Career development and feedback",
    ],
    participants: [
      { ...people.ds, attendance: "required" },
      { ...people.um, attendance: "required" },
    ],
    tasks: [],
    colorScheme: "green",
  },
  {
    id: "9",
    title: "Late Night Deployment",
    day: 3, // Thu (today)
    startHour: 0,
    startMinute: 0,
    endHour: 1,
    endMinute: 0,
    priority: "high",
    approvalStatus: "approved",
    createdBy: "ai",
    tags: ["DEPLOYMENT", "HOTFIX"],
    aiReasoning:
      "AI detected a critical production bug. Emergency deployment window scheduled for minimal user impact.",
    agenda: [
      "Deploy hotfix to production",
      "Monitor error rates post-deploy",
      "Confirm rollback plan if needed",
    ],
    participants: [
      { ...people.ds, attendance: "required" },
      { ...people.ls, attendance: "required" },
      { ...people.rm, attendance: "optional" },
    ],
    tasks: [
      { title: "Hotfix PR Review", assignee: people.ds, progress: 100, status: "completed" },
      { title: "Production Monitoring", assignee: people.ls, progress: 20, status: "at-risk" },
    ],
    colorScheme: "red",
  },
]

// ── Helpers ────────────────────────────────────────────────

function getWeekLabel(date: Date) {
  const d = new Date(date)
  const jsDay = d.getDay()
  const mondayOffset = jsDay === 0 ? -6 : 1 - jsDay
  const monday = new Date(d)
  monday.setDate(d.getDate() + mondayOffset)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const fmt = (dt: Date) =>
    dt.toLocaleDateString("en-US", { month: "short", day: "numeric" })

  return `Week of ${fmt(monday)} – ${fmt(sunday)}, ${monday.getFullYear()}`
}

// ── Page component ─────────────────────────────────────────

export default function MeetingsPage() {
  const [weekStart, setWeekStart] = React.useState(() => new Date())
  const [selectedMeeting, setSelectedMeeting] = React.useState<Meeting | null>(null)

  function shiftWeek(direction: -1 | 1) {
    setWeekStart((prev) => {
      const next = new Date(prev)
      next.setDate(next.getDate() + direction * 7)
      return next
    })
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              Meeting Calendar
            </h1>
            <p className="text-xs text-muted-foreground">{getWeekLabel(weekStart)}</p>
          </div>

          {/* Week navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => shiftWeek(-1)}
              className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => shiftWeek(1)}
              className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Calendar */}
      <div className="flex flex-1 flex-col p-4">
        <MeetingCalendar
          meetings={mockMeetings}
          selectedMeetingId={selectedMeeting?.id ?? null}
          onSelectMeeting={(m) => setSelectedMeeting(m)}
          weekStart={weekStart}
        />
      </div>

      {/* Detail sidebar */}
      <MeetingDetailSidebar
        meeting={selectedMeeting}
        open={selectedMeeting !== null}
        onClose={() => setSelectedMeeting(null)}
      />
    </>
  )
}
