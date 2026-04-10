// ── Centralized mock data for TeamLens ─────────────────────
// Single source of truth — all pages import from here.

import type { Meeting, Participant } from "@/lib/meeting-types"
import type { TaskAssignee, TeamMemberData, TaskStatus } from "@/lib/team-types"
import type { ChatChannel, ChatMessage } from "@/lib/chat-types"

// ── Core team members ──────────────────────────────────────

export interface Person {
  id: string
  name: string
  initials: string
  color: string
}

export const people: Record<string, Person> = {
  ds: { id: "ds", name: "Divyansh Shrivastava", initials: "DS", color: "#6366f1" },
  ls: { id: "ls", name: "Love Singhal", initials: "LS", color: "#3b82f6" },
  um: { id: "um", name: "Uthkarsh Mandloi", initials: "UM", color: "#ec4899" },
  rm: { id: "rm", name: "Rohan Mehta", initials: "RM", color: "#14b8a6" },
  ng: { id: "ng", name: "Neha Gupta", initials: "NG", color: "#8b5cf6" },
}

/** Convenience array of all team members */
export const teamList = Object.values(people)

/** Current logged-in user */
export const currentUser = people.ds

// ── Dashboard-compatible team members (without `id`) ───────

export interface DashboardTeamMember {
  name: string
  initials: string
  color: string
}

export const dashboardTeam: DashboardTeamMember[] = teamList.map(({ name, initials, color }) => ({
  name,
  initials,
  color,
}))

// ── Roles ──────────────────────────────────────────────────

export const roles: Record<string, string> = {
  ds: "Project Lead · Full-Stack",
  ls: "Frontend Engineer",
  um: "UI/UX Designer · Frontend",
  rm: "Backend Engineer",
  ng: "QA Engineer · Testing",
}

// ── Dashboard mock data ────────────────────────────────────

const dt = dashboardTeam
const [ds, ls, um, rm, ng] = dt

export const todoTasks = [
  { title: "Setup CI/CD pipeline", assignees: [ds, rm], dueDate: "Apr 10" },
  { title: "Write API documentation", assignees: [ls, um], dueDate: "Apr 12" },
  { title: "Design onboarding flow", assignees: [um], dueDate: "Apr 9" },
]

export const inProgressTasks = [
  { title: "Build dashboard UI", assignees: [ds, ls], progress: 65 },
  { title: "Implement auth system", assignees: [rm, ng], progress: 40 },
  { title: "Database schema design", assignees: [um, ds], progress: 80 },
]

export const completedTasks = [
  { title: "Project scaffolding", assignees: [ds] },
  { title: "Design system setup", assignees: [ls, um] },
  { title: "Init Git repository", assignees: [ds, rm] },
  { title: "Finalize tech stack", assignees: [ds, ls, um, rm, ng] },
]

export const workloadData = [
  { member: ds, tasks: 6, load: 85 },
  { member: ls, tasks: 4, load: 55 },
  { member: um, tasks: 5, load: 70 },
  { member: rm, tasks: 3, load: 40 },
  { member: ng, tasks: 2, load: 25 },
]

export const velocityData = [1, 0, 2, 1, 3, 2, 4]
export const velocityDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export interface ActivityItem {
  id: string
  user: DashboardTeamMember
  action: "completed" | "commented" | "moved" | "created" | "merged"
  target: string
  timestamp: string
}

export const recentActivities: ActivityItem[] = [
  { id: "1", user: ls, action: "completed", target: "Design system setup", timestamp: "2h ago" },
  { id: "2", user: ds, action: "commented", target: "Build dashboard UI", timestamp: "3h ago" },
  { id: "3", user: um, action: "moved", target: "Database schema design", timestamp: "5h ago" },
  { id: "4", user: rm, action: "created", target: "Setup CI/CD pipeline", timestamp: "8h ago" },
  { id: "5", user: ng, action: "merged", target: "Auth flow branch", timestamp: "1d ago" },
]

// ── Right panel mock data ──────────────────────────────────

export const upcomingMeetingsPanel = [
  {
    title: "Sprint Review",
    time: "Today, 3:00 PM",
    participants: ["AS", "PK", "RM"],
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Design Sync",
    time: "Today, 5:30 PM",
    participants: ["DS", "LS"],
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    title: "Client Demo",
    time: "Tomorrow, 11:00 AM",
    participants: ["DS", "UM", "RM", "LS"],
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
]

export const yourTasks = [
  { title: "Design system tokens", progress: 85, status: "in-progress" as const, deadline: "Apr 9" },
  { title: "API integration layer", progress: 40, status: "in-progress" as const, deadline: "Apr 12" },
  { title: "User auth flow", progress: 100, status: "completed" as const, deadline: "Apr 5" },
  { title: "Dashboard analytics", progress: 10, status: "in-progress" as const, deadline: "Apr 10" },
]

// ── Team page mock data ────────────────────────────────────

export const teamMembers: TaskAssignee[] = teamList.map((p) => ({
  id: p.id,
  name: p.name,
  initials: p.initials,
  color: p.color,
}))

interface RawTask {
  id: string
  title: string
  status: TaskStatus
  dueDate?: string
  assigneeIds: string[]
}

export const allTeamTasks: RawTask[] = [
  // Backend / Infra
  { id: "t1", title: "Setup CI/CD pipeline", status: "pending", dueDate: "Apr 10", assigneeIds: ["ds", "rm"] },
  { id: "t2", title: "Implement auth system", status: "in-progress", dueDate: "Apr 14", assigneeIds: ["rm", "ng"] },
  { id: "t3", title: "Database schema design", status: "in-progress", dueDate: "Apr 11", assigneeIds: ["um", "ds"] },
  { id: "t4", title: "API rate limiting middleware", status: "pending", dueDate: "Apr 15", assigneeIds: ["rm"] },
  { id: "t5", title: "Setup Redis caching layer", status: "at-risk", dueDate: "Apr 12", assigneeIds: ["ds", "rm"] },
  // Frontend / UI
  { id: "t6", title: "Build dashboard UI", status: "in-progress", dueDate: "Apr 13", assigneeIds: ["ds", "ls"] },
  { id: "t7", title: "Design onboarding flow", status: "pending", dueDate: "Apr 9", assigneeIds: ["um"] },
  { id: "t8", title: "Implement dark mode toggle", status: "completed", assigneeIds: ["ls"] },
  { id: "t9", title: "Meeting calendar component", status: "completed", assigneeIds: ["ls", "ds"] },
  { id: "t10", title: "Responsive sidebar navigation", status: "completed", assigneeIds: ["ls", "um"] },
  // Documentation / Process
  { id: "t11", title: "Write API documentation", status: "in-progress", dueDate: "Apr 12", assigneeIds: ["ls", "um"] },
  { id: "t12", title: "Create component storybook", status: "pending", dueDate: "Apr 16", assigneeIds: ["um", "ng"] },
  { id: "t13", title: "Project scaffolding", status: "completed", assigneeIds: ["ds"] },
  { id: "t14", title: "Design system setup", status: "completed", assigneeIds: ["ls", "um"] },
  { id: "t15", title: "Init Git repository", status: "completed", assigneeIds: ["ds", "rm"] },
  // Testing / QA
  { id: "t16", title: "Write unit tests for auth", status: "pending", dueDate: "Apr 17", assigneeIds: ["ng", "rm"] },
  { id: "t17", title: "E2E test suite setup", status: "at-risk", dueDate: "Apr 14", assigneeIds: ["ng"] },
  { id: "t18", title: "Performance audit & optimization", status: "pending", dueDate: "Apr 18", assigneeIds: ["ds", "ng"] },
  // Misc
  { id: "t19", title: "Finalize tech stack", status: "completed", assigneeIds: ["ds", "ls", "um", "rm", "ng"] },
  { id: "t20", title: "Sprint retrospective notes", status: "in-progress", dueDate: "Apr 11", assigneeIds: ["um"] },
]

export function buildTeamData(): TeamMemberData[] {
  return teamMembers.map((m) => {
    const memberTasks = allTeamTasks
      .filter((t) => t.assigneeIds.includes(m.id))
      .map((t) => ({
        id: t.id,
        title: t.title,
        status: t.status,
        dueDate: t.dueDate,
        assignees: t.assigneeIds.map((aid) => teamMembers.find((x) => x.id === aid)!),
      }))

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

// ── Meetings page mock data ────────────────────────────────

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function getDateForCurrentWeek(dayIndex: number) {
  const now = new Date()
  const jsDay = now.getDay()
  const mondayOffset = jsDay === 0 ? -6 : 1 - jsDay
  const monday = new Date(now)
  monday.setDate(now.getDate() + mondayOffset)

  const target = new Date(monday)
  target.setDate(monday.getDate() + dayIndex)
  return toDateKey(target)
}

const meetingParticipants: Record<string, Participant> = {
  ds: { ...people.ds, attendance: "required" },
  ls: { ...people.ls, attendance: "required" },
  um: { ...people.um, attendance: "required" },
  rm: { ...people.rm, attendance: "optional" },
  ng: { ...people.ng, attendance: "optional" },
  pn: { name: "Priya Nair", initials: "PN", color: "#f59e0b", attendance: "required" },
}

const mp = meetingParticipants

export const mockMeetings: Meeting[] = [
  {
    id: "1",
    title: "Sprint Blocker Review",
    date: getDateForCurrentWeek(0),
    startHour: 9, startMinute: 0, endHour: 10, endMinute: 0,
    priority: "high",
    approvalStatus: "approved",
    createdBy: "ai",
    tags: ["SPRINT", "BLOCKERS"],
    aiReasoning: "AI detected 3 unresolved blockers from the previous sprint that require immediate team attention. Scheduling this as the first meeting of the week ensures early resolution.",
    agenda: ["Review CI pipeline failure and rollback strategy", "Discuss auth token expiry affecting staging", "Assign owners for each blocker with ETA"],
    participants: [{ ...mp.ds, attendance: "required" }, { ...mp.ls, attendance: "required" }, { ...mp.um, attendance: "optional" }],
    tasks: [
      { title: "Resolve CI Pipeline Failure", assignee: mp.ds, progress: 60, status: "at-risk" },
      { title: "Fix Auth Token Expiry", assignee: mp.ls, progress: 85, status: "on-track" },
    ],
    colorScheme: "red",
  },
  {
    id: "2",
    title: "Q2 Roadmap Alignment",
    date: getDateForCurrentWeek(1),
    startHour: 10, startMinute: 0, endHour: 11, endMinute: 0,
    priority: "low",
    approvalStatus: "approved",
    createdBy: "predefined",
    tags: ["PLANNING", "ROADMAP"],
    aiReasoning: "Predefined quarterly planning meeting. Scheduled at the start of each quarter to align team goals.",
    agenda: ["Review Q1 outcomes and learnings", "Present Q2 OKRs and key milestones", "Align on resource allocation across features", "Identify cross-team dependencies"],
    participants: [{ ...mp.ds, attendance: "required" }, { ...mp.pn, attendance: "required" }, { ...mp.ng, attendance: "optional" }],
    tasks: [
      { title: "Roadmap Document Draft", assignee: mp.pn, progress: 90, status: "on-track" },
      { title: "Stakeholder Input", assignee: mp.pn, progress: 50, status: "on-track" },
    ],
    colorScheme: "green",
  },
  {
    id: "3",
    title: "Design Handoff",
    date: getDateForCurrentWeek(0),
    startHour: 11, startMinute: 0, endHour: 11, endMinute: 45,
    priority: "medium",
    approvalStatus: "approved",
    createdBy: "ai",
    tags: ["DESIGN", "HANDOFF"],
    aiReasoning: "Design team completed the final mockups on Friday. AI scheduled this handoff to align designers and developers before sprint tasks begin.",
    agenda: ["Walk through finalized Figma screens", "Clarify interaction states and edge cases", "Discuss component reuse opportunities"],
    participants: [{ ...mp.ls, attendance: "required" }, { ...mp.um, attendance: "required" }],
    tasks: [{ title: "Component Spec Review", assignee: mp.ls, progress: 70, status: "on-track" }],
    colorScheme: "yellow",
  },
  {
    id: "4",
    title: "Weekly Standup",
    date: getDateForCurrentWeek(3),
    startHour: 9, startMinute: 30, endHour: 10, endMinute: 0,
    priority: "low",
    approvalStatus: "approved",
    createdBy: "predefined",
    tags: ["STANDUP", "WEEKLY"],
    aiReasoning: "Recurring weekly standup. This is a predefined meeting that runs every Thursday for active sprint contributors.",
    agenda: ["Each member shares yesterday's progress", "Flag any blockers or risks", "Align on today's priorities"],
    participants: [
      { ...mp.ds, attendance: "required" }, { ...mp.ls, attendance: "required" },
      { ...mp.um, attendance: "required" }, { ...mp.rm, attendance: "optional" },
      { ...mp.ng, attendance: "optional" },
    ],
    tasks: [],
    colorScheme: "blue",
  },
  {
    id: "5",
    title: "Backend Architecture Review",
    date: getDateForCurrentWeek(3),
    startHour: 13, startMinute: 0, endHour: 14, endMinute: 0,
    priority: "medium",
    approvalStatus: "pending",
    createdBy: "ai",
    tags: ["BACKEND", "ARCHITECTURE"],
    aiReasoning: "AI identified potential scaling bottlenecks in the current API layer. This review is recommended before the next deployment cycle.",
    agenda: ["Analyze current API response times under load", "Review database query optimization opportunities", "Discuss caching strategy for high-traffic endpoints", "Evaluate microservice vs monolith trade-offs"],
    participants: [{ ...mp.ds, attendance: "required" }, { ...mp.rm, attendance: "required" }],
    tasks: [
      { title: "API Layer Audit", assignee: mp.rm, progress: 40, status: "at-risk" },
      { title: "Load Test Results", assignee: mp.ds, progress: 65, status: "on-track" },
    ],
    colorScheme: "amber",
  },
  {
    id: "6",
    title: "QA Regression Testing",
    date: getDateForCurrentWeek(2),
    startHour: 14, startMinute: 0, endHour: 15, endMinute: 0,
    priority: "high",
    approvalStatus: "approved",
    createdBy: "predefined",
    tags: ["QA", "TESTING"],
    aiReasoning: "Predefined pre-release regression testing session. Triggered by 5 bug reports filed in the last 48 hours.",
    agenda: ["Run full regression suite on staging", "Triage newly reported bugs by severity", "Validate fixes for P0 and P1 issues", "Sign off on release candidate readiness"],
    participants: [{ ...mp.um, attendance: "required" }, { ...mp.rm, attendance: "required" }, { ...mp.ng, attendance: "required" }],
    tasks: [
      { title: "Test Suite Execution", assignee: mp.um, progress: 30, status: "at-risk" },
      { title: "Bug Triage", assignee: mp.ng, progress: 55, status: "on-track" },
    ],
    colorScheme: "red",
  },
  {
    id: "7",
    title: "Release Readiness",
    date: getDateForCurrentWeek(4),
    startHour: 15, startMinute: 0, endHour: 16, endMinute: 0,
    priority: "high",
    approvalStatus: "approved",
    createdBy: "ai",
    tags: ["RELEASE", "DEPLOYMENT"],
    aiReasoning: "Sprint ends Friday. AI scheduled a final readiness check to ensure all critical tasks are completed and the release is green-lit.",
    agenda: ["Walk through release checklist status", "Confirm staging verification is complete", "Review changelog and release notes", "Final go/no-go decision"],
    participants: [
      { ...mp.ds, attendance: "required" }, { ...mp.pn, attendance: "required" },
      { ...mp.rm, attendance: "required" }, { ...mp.ng, attendance: "optional" },
    ],
    tasks: [
      { title: "Release Checklist", assignee: mp.ds, progress: 80, status: "on-track" },
      { title: "Staging Verification", assignee: mp.rm, progress: 45, status: "at-risk" },
      { title: "Changelog Draft", assignee: mp.pn, progress: 100, status: "completed" },
    ],
    colorScheme: "red",
  },
  {
    id: "8",
    title: "1:1 Mentoring Session",
    date: getDateForCurrentWeek(5),
    startHour: 11, startMinute: 0, endHour: 11, endMinute: 30,
    priority: "low",
    approvalStatus: "approved",
    createdBy: "predefined",
    tags: ["1:1", "MENTORING"],
    aiReasoning: "Predefined weekly 1:1 between Divyansh and Uthkarsh for mentoring and growth check-ins.",
    agenda: ["Discuss progress on current sprint tasks", "Review learning goals for the week", "Career development and feedback"],
    participants: [{ ...mp.ds, attendance: "required" }, { ...mp.um, attendance: "required" }],
    tasks: [],
    colorScheme: "green",
  },
  {
    id: "9",
    title: "Late Night Deployment",
    date: getDateForCurrentWeek(3),
    startHour: 0, startMinute: 0, endHour: 2, endMinute: 0,
    priority: "high",
    approvalStatus: "approved",
    createdBy: "ai",
    tags: ["DEPLOYMENT", "HOTFIX"],
    aiReasoning: "AI detected a critical production bug. Emergency deployment window scheduled for minimal user impact.",
    agenda: ["Deploy hotfix to production", "Monitor error rates post-deploy", "Confirm rollback plan if needed"],
    participants: [
      { ...mp.ds, attendance: "required" }, { ...mp.ls, attendance: "required" },
      { ...mp.rm, attendance: "optional" },
    ],
    tasks: [
      { title: "Hotfix PR Review", assignee: mp.ds, progress: 100, status: "completed" },
      { title: "Production Monitoring", assignee: mp.ls, progress: 20, status: "at-risk" },
    ],
    colorScheme: "red",
  },
]

// ── Chats page mock data ───────────────────────────────────

export const mockChannels: ChatChannel[] = [
  { id: "general", kind: "team", name: "General", avatarInitials: "GN", avatarColor: "#6366f1", lastMessage: "Let's sync up on the sprint goals", lastMessageTime: "2m", unreadCount: 3, memberCount: 5 },
  { id: "frontend", kind: "team", name: "Frontend", avatarInitials: "FE", avatarColor: "#3b82f6", lastMessage: "PR #42 is ready for review", lastMessageTime: "15m", unreadCount: 1, memberCount: 3 },
  { id: "backend", kind: "team", name: "Backend", avatarInitials: "BE", avatarColor: "#14b8a6", lastMessage: "Redis caching layer is deployed", lastMessageTime: "1h", unreadCount: 0, memberCount: 2 },
  { id: "design", kind: "team", name: "Design", avatarInitials: "DS", avatarColor: "#f59e0b", lastMessage: "Updated the component library", lastMessageTime: "3h", unreadCount: 0, memberCount: 2 },
  { id: "qa", kind: "team", name: "QA Testing", avatarInitials: "QA", avatarColor: "#ef4444", lastMessage: "Regression suite passed ✅", lastMessageTime: "5h", unreadCount: 0, memberCount: 2 },
  // Direct Messages
  { id: "dm-ls", kind: "direct", name: "Love Singhal", avatarInitials: "LS", avatarColor: people.ls.color, lastMessage: "Sure, I'll review it now", lastMessageTime: "5m", unreadCount: 2, isOnline: true },
  { id: "dm-um", kind: "direct", name: "Uthkarsh Mandloi", avatarInitials: "UM", avatarColor: people.um.color, lastMessage: "The mockups look great!", lastMessageTime: "30m", unreadCount: 0, isOnline: true },
  { id: "dm-rm", kind: "direct", name: "Rohan Mehta", avatarInitials: "RM", avatarColor: people.rm.color, lastMessage: "API endpoints are ready", lastMessageTime: "2h", unreadCount: 0, isOnline: false },
  { id: "dm-ng", kind: "direct", name: "Neha Gupta", avatarInitials: "NG", avatarColor: people.ng.color, lastMessage: "Found a bug in the auth flow", lastMessageTime: "4h", unreadCount: 1, isOnline: false },
]

export const mockMessages: Record<string, ChatMessage[]> = {
  general: [
    { id: "g1", channelId: "general", senderId: "ls", senderName: "Love Singhal", senderInitials: "LS", senderColor: people.ls.color, content: "Hey everyone! Just pushed the latest dashboard changes. Can someone take a look?", timestamp: "9:15 AM", isOwn: false },
    { id: "g2", channelId: "general", senderId: "um", senderName: "Uthkarsh Mandloi", senderInitials: "UM", senderColor: people.um.color, content: "Nice work Love! The stat cards look really clean. I'll check the responsive layout.", timestamp: "9:18 AM", isOwn: false },
    { id: "g3", channelId: "general", senderId: "ds", senderName: "Divyansh Shrivastava", senderInitials: "DS", senderColor: people.ds.color, content: "Looks great! Let's make sure the dark mode renders properly too. I noticed some contrast issues last sprint.", timestamp: "9:22 AM", isOwn: true },
    { id: "g4", channelId: "general", senderId: "rm", senderName: "Rohan Mehta", senderInitials: "RM", senderColor: people.rm.color, content: "On a related note — the API for task metrics is now live on staging. You can swap out the mock data whenever you're ready.", timestamp: "9:30 AM", isOwn: false, reactions: [{ emoji: "🚀", count: 3 }] },
    { id: "g5", channelId: "general", senderId: "ng", senderName: "Neha Gupta", senderInitials: "NG", senderColor: people.ng.color, content: "I'll write integration tests for the new endpoints today. Should be done by EOD.", timestamp: "9:35 AM", isOwn: false },
    { id: "g6", channelId: "general", senderId: "ds", senderName: "Divyansh Shrivastava", senderInitials: "DS", senderColor: people.ds.color, content: "Perfect! Let's sync up on the sprint goals after standup. We need to finalize the Q2 roadmap items.", timestamp: "9:40 AM", isOwn: true, isPinned: true },
    { id: "g7", channelId: "general", senderId: "ls", senderName: "Love Singhal", senderInitials: "LS", senderColor: people.ls.color, content: "Sounds good! Also — should we add the chat feature to this sprint or push it to next? 🤔", timestamp: "9:45 AM", isOwn: false },
    { id: "g8", channelId: "general", senderId: "um", senderName: "Uthkarsh Mandloi", senderInitials: "UM", senderColor: people.um.color, content: "I think we can squeeze it in. The wireframes are already done.", timestamp: "9:48 AM", isOwn: false, reactions: [{ emoji: "👍", count: 2 }, { emoji: "💪", count: 1 }] },
  ],
  frontend: [
    { id: "f1", channelId: "frontend", senderId: "ls", senderName: "Love Singhal", senderInitials: "LS", senderColor: people.ls.color, content: "PR #42 is up for the meeting calendar component. Added auto-scroll to current time.", timestamp: "10:00 AM", isOwn: false },
    { id: "f2", channelId: "frontend", senderId: "ds", senderName: "Divyansh Shrivastava", senderInitials: "DS", senderColor: people.ds.color, content: "Reviewing now. Quick question — are we using useRef for the scroll container?", timestamp: "10:05 AM", isOwn: true },
    { id: "f3", channelId: "frontend", senderId: "ls", senderName: "Love Singhal", senderInitials: "LS", senderColor: people.ls.color, content: "Yes, useRef with a useEffect on mount. Calculates the pixel offset from the current hour and calls scrollTo.", timestamp: "10:08 AM", isOwn: false },
    { id: "f4", channelId: "frontend", senderId: "um", senderName: "Uthkarsh Mandloi", senderInitials: "UM", senderColor: people.um.color, content: "The ongoing meeting indicator with the pulsing green dot looks really nice btw 🟢", timestamp: "10:15 AM", isOwn: false, reactions: [{ emoji: "✨", count: 2 }] },
    { id: "f5", channelId: "frontend", senderId: "ds", senderName: "Divyansh Shrivastava", senderInitials: "DS", senderColor: people.ds.color, content: "LGTM! Approved. Let's merge after lunch.", timestamp: "10:20 AM", isOwn: true },
  ],
  backend: [
    { id: "b1", channelId: "backend", senderId: "rm", senderName: "Rohan Mehta", senderInitials: "RM", senderColor: people.rm.color, content: "Deployed the Redis caching layer to staging. Response times dropped by ~40%.", timestamp: "11:00 AM", isOwn: false, reactions: [{ emoji: "🔥", count: 2 }] },
    { id: "b2", channelId: "backend", senderId: "ds", senderName: "Divyansh Shrivastava", senderInitials: "DS", senderColor: people.ds.color, content: "That's a massive improvement! Did you set up cache invalidation for the task endpoints?", timestamp: "11:05 AM", isOwn: true },
    { id: "b3", channelId: "backend", senderId: "rm", senderName: "Rohan Mehta", senderInitials: "RM", senderColor: people.rm.color, content: "Yep, using a write-through strategy. Task updates invalidate the relevant cache keys immediately.", timestamp: "11:10 AM", isOwn: false },
    { id: "b4", channelId: "backend", senderId: "ds", senderName: "Divyansh Shrivastava", senderInitials: "DS", senderColor: people.ds.color, content: "Great stuff. Let's add some monitoring dashboards for cache hit rates. Can you set up a Grafana panel?", timestamp: "11:15 AM", isOwn: true, isPinned: true },
  ],
  design: [
    { id: "d1", channelId: "design", senderId: "um", senderName: "Uthkarsh Mandloi", senderInitials: "UM", senderColor: people.um.color, content: "Updated the component library with the new color tokens. Check the Figma link 🎨", timestamp: "2:00 PM", isOwn: false },
    { id: "d2", channelId: "design", senderId: "ls", senderName: "Love Singhal", senderInitials: "LS", senderColor: people.ls.color, content: "Love the new accent colors! The oklch values are way more consistent than what we had before.", timestamp: "2:10 PM", isOwn: false },
    { id: "d3", channelId: "design", senderId: "um", senderName: "Uthkarsh Mandloi", senderInitials: "UM", senderColor: people.um.color, content: "Thanks! Also added dark mode variants for each. Should be a 1:1 mapping in the CSS variables.", timestamp: "2:15 PM", isOwn: false, reactions: [{ emoji: "🎯", count: 1 }] },
  ],
  qa: [
    { id: "q1", channelId: "qa", senderId: "ng", senderName: "Neha Gupta", senderInitials: "NG", senderColor: people.ng.color, content: "Full regression suite passed on staging. 147/147 tests green ✅", timestamp: "4:00 PM", isOwn: false, reactions: [{ emoji: "🎉", count: 3 }] },
    { id: "q2", channelId: "qa", senderId: "rm", senderName: "Rohan Mehta", senderInitials: "RM", senderColor: people.rm.color, content: "Nice! Any flaky tests we should watch out for?", timestamp: "4:05 PM", isOwn: false },
    { id: "q3", channelId: "qa", senderId: "ng", senderName: "Neha Gupta", senderInitials: "NG", senderColor: people.ng.color, content: "Two tests in the auth module were timing out intermittently. I increased the timeout and added retry logic. Stable now.", timestamp: "4:10 PM", isOwn: false },
  ],
  "dm-ls": [
    { id: "dl1", channelId: "dm-ls", senderId: "ds", senderName: "Divyansh Shrivastava", senderInitials: "DS", senderColor: people.ds.color, content: "Hey Love, can you review the sidebar animation PR? I made the collapse transition smoother.", timestamp: "10:30 AM", isOwn: true },
    { id: "dl2", channelId: "dm-ls", senderId: "ls", senderName: "Love Singhal", senderInitials: "LS", senderColor: people.ls.color, content: "Sure, I'll take a look now! Is it on the feature/sidebar-v2 branch?", timestamp: "10:32 AM", isOwn: false },
    { id: "dl3", channelId: "dm-ls", senderId: "ds", senderName: "Divyansh Shrivastava", senderInitials: "DS", senderColor: people.ds.color, content: "Yep, that's the one. The key change is in sidebar.tsx — I used transition-all with duration-300 for the width.", timestamp: "10:33 AM", isOwn: true },
    { id: "dl4", channelId: "dm-ls", senderId: "ls", senderName: "Love Singhal", senderInitials: "LS", senderColor: people.ls.color, content: "Looking at it now. The tooltip on collapsed icons is a nice touch! 👌", timestamp: "10:40 AM", isOwn: false },
    { id: "dl5", channelId: "dm-ls", senderId: "ls", senderName: "Love Singhal", senderInitials: "LS", senderColor: people.ls.color, content: "Sure, I'll review it now. Left a couple of minor comments but overall LGTM.", timestamp: "10:45 AM", isOwn: false },
  ],
  "dm-um": [
    { id: "du1", channelId: "dm-um", senderId: "um", senderName: "Uthkarsh Mandloi", senderInitials: "UM", senderColor: people.um.color, content: "Divyansh, I finished the wireframes for the chat page. Want me to share them in the design channel?", timestamp: "1:00 PM", isOwn: false },
    { id: "du2", channelId: "dm-um", senderId: "ds", senderName: "Divyansh Shrivastava", senderInitials: "DS", senderColor: people.ds.color, content: "Yes please! Also send me a direct link so I can annotate them.", timestamp: "1:05 PM", isOwn: true },
    { id: "du3", channelId: "dm-um", senderId: "um", senderName: "Uthkarsh Mandloi", senderInitials: "UM", senderColor: people.um.color, content: "The mockups look great! Here's the Figma link: figma.com/file/teamlens-chat", timestamp: "1:10 PM", isOwn: false, reactions: [{ emoji: "🙌", count: 1 }] },
  ],
  "dm-rm": [
    { id: "dr1", channelId: "dm-rm", senderId: "ds", senderName: "Divyansh Shrivastava", senderInitials: "DS", senderColor: people.ds.color, content: "Rohan, what's the status on the rate limiting middleware?", timestamp: "3:00 PM", isOwn: true },
    { id: "dr2", channelId: "dm-rm", senderId: "rm", senderName: "Rohan Mehta", senderInitials: "RM", senderColor: people.rm.color, content: "Almost done! Using a sliding window algorithm with Redis. Should be ready for review tomorrow.", timestamp: "3:15 PM", isOwn: false },
    { id: "dr3", channelId: "dm-rm", senderId: "rm", senderName: "Rohan Mehta", senderInitials: "RM", senderColor: people.rm.color, content: "API endpoints are ready. I'll update the docs and ping you.", timestamp: "3:20 PM", isOwn: false },
  ],
  "dm-ng": [
    { id: "dn1", channelId: "dm-ng", senderId: "ng", senderName: "Neha Gupta", senderInitials: "NG", senderColor: people.ng.color, content: "Hey Divyansh, I found a bug in the auth flow. Token refresh is failing silently when the session expires.", timestamp: "11:00 AM", isOwn: false },
    { id: "dn2", channelId: "dm-ng", senderId: "ds", senderName: "Divyansh Shrivastava", senderInitials: "DS", senderColor: people.ds.color, content: "Oh that's not good. Can you create a ticket with the reproduction steps? I'll prioritize it.", timestamp: "11:10 AM", isOwn: true },
    { id: "dn3", channelId: "dm-ng", senderId: "ng", senderName: "Neha Gupta", senderInitials: "NG", senderColor: people.ng.color, content: "Already done! Ticket #287. It's happening on the /api/refresh-token endpoint. The 401 isn't being caught by the interceptor.", timestamp: "11:15 AM", isOwn: false },
    { id: "dn4", channelId: "dm-ng", senderId: "ds", senderName: "Divyansh Shrivastava", senderInitials: "DS", senderColor: people.ds.color, content: "Found a bug in the auth flow. Thanks for catching it. I'll patch the interceptor today.", timestamp: "11:20 AM", isOwn: true, reactions: [{ emoji: "🙏", count: 1 }] },
  ],
}

export const typingNames = ["Love", "Uthkarsh", "Rohan", "Neha"]
