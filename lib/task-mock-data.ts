// ── Task page mock data ──────────────────────────────────
// Rich task data for the dedicated tasks board.

import type { TaskItem } from "@/lib/task-types"
import { teamMembers } from "@/lib/mock-data"

const m = (id: string) => teamMembers.find((t) => t.id === id)!

export const taskItems: TaskItem[] = [
  // ── Backend / Infra ──
  {
    id: "t1",
    title: "Setup CI/CD pipeline",
    description:
      "Configure GitHub Actions for automated testing, linting, and deployment to staging on every push to main.",
    status: "pending",
    priority: "high",
    category: "backend",
    dueDate: "Apr 10",
    assignees: [m("ds"), m("rm")],
    tags: ["INFRA", "DEVOPS"],
    createdAt: "Apr 3",
    subtasks: [
      { title: "Create workflow YAML", done: false },
      { title: "Setup staging environment", done: false },
      { title: "Configure deployment secrets", done: false },
    ],
  },
  {
    id: "t2",
    title: "Implement auth system",
    description:
      "Build JWT-based authentication with refresh tokens, session management, and role-based access control.",
    status: "in-progress",
    priority: "high",
    category: "backend",
    dueDate: "Apr 14",
    assignees: [m("rm"), m("ng")],
    tags: ["AUTH", "SECURITY"],
    progress: 40,
    createdAt: "Apr 4",
    subtasks: [
      { title: "JWT token generation", done: true },
      { title: "Refresh token flow", done: true },
      { title: "Role-based middleware", done: false },
      { title: "Session invalidation", done: false },
    ],
  },
  {
    id: "t3",
    title: "Database schema design",
    description:
      "Design and implement the PostgreSQL schema with migrations for users, teams, tasks, and meeting entities.",
    status: "in-progress",
    priority: "medium",
    category: "backend",
    dueDate: "Apr 11",
    assignees: [m("um"), m("ds")],
    tags: ["DATABASE", "SCHEMA"],
    progress: 80,
    createdAt: "Apr 2",
    subtasks: [
      { title: "Entity relationship diagram", done: true },
      { title: "Migration scripts", done: true },
      { title: "Seed data", done: true },
      { title: "Index optimization", done: false },
    ],
  },
  {
    id: "t4",
    title: "API rate limiting middleware",
    description:
      "Implement token bucket rate limiting using Redis to protect API endpoints from abuse and ensure fair usage.",
    status: "pending",
    priority: "medium",
    category: "backend",
    dueDate: "Apr 15",
    assignees: [m("rm")],
    tags: ["API", "SECURITY"],
    createdAt: "Apr 6",
    subtasks: [
      { title: "Redis sliding window algorithm", done: false },
      { title: "Per-user rate limits", done: false },
      { title: "Rate limit headers", done: false },
    ],
  },
  {
    id: "t5",
    title: "Setup Redis caching layer",
    description:
      "Introduce a write-through caching strategy for high-traffic endpoints using Redis to reduce DB load.",
    status: "at-risk",
    priority: "high",
    category: "backend",
    dueDate: "Apr 12",
    assignees: [m("ds"), m("rm")],
    tags: ["PERFORMANCE", "CACHING"],
    progress: 25,
    createdAt: "Apr 5",
    subtasks: [
      { title: "Redis connection setup", done: true },
      { title: "Read-through strategy", done: false },
      { title: "Cache invalidation logic", done: false },
      { title: "Monitoring dashboard", done: false },
    ],
  },

  // ── Frontend / UI ──
  {
    id: "t6",
    title: "Build dashboard UI",
    description:
      "Create the main dashboard with stat cards, velocity sparkline, workload distribution, and activity feed.",
    status: "in-progress",
    priority: "high",
    category: "frontend",
    dueDate: "Apr 13",
    assignees: [m("ds"), m("ls")],
    tags: ["UI", "DASHBOARD"],
    progress: 65,
    createdAt: "Apr 3",
    subtasks: [
      { title: "Stat cards grid", done: true },
      { title: "Velocity sparkline chart", done: true },
      { title: "Activity feed component", done: true },
      { title: "Right panel quick view", done: false },
      { title: "Mobile responsive layout", done: false },
    ],
  },
  {
    id: "t7",
    title: "Design onboarding flow",
    description:
      "Design and implement the step-by-step onboarding flow for new users joining a team project.",
    status: "pending",
    priority: "low",
    category: "design",
    dueDate: "Apr 9",
    assignees: [m("um")],
    tags: ["UX", "ONBOARDING"],
    createdAt: "Apr 4",
    subtasks: [
      { title: "Wireframe screens", done: false },
      { title: "Illustration assets", done: false },
      { title: "Animation specs", done: false },
    ],
  },
  {
    id: "t8",
    title: "Implement dark mode toggle",
    description:
      "Add a persistent theme toggle using next-themes with smooth transitions between light and dark mode.",
    status: "completed",
    priority: "low",
    category: "frontend",
    assignees: [m("ls")],
    tags: ["UI", "THEMING"],
    progress: 100,
    createdAt: "Apr 1",
    subtasks: [
      { title: "Theme provider setup", done: true },
      { title: "Toggle component", done: true },
      { title: "CSS variable mapping", done: true },
    ],
  },
  {
    id: "t9",
    title: "Meeting calendar component",
    description:
      "Build the weekly calendar view with time slots, meeting cards, drag support, and auto-scroll to current time.",
    status: "completed",
    priority: "medium",
    category: "frontend",
    assignees: [m("ls"), m("ds")],
    tags: ["UI", "CALENDAR"],
    progress: 100,
    createdAt: "Apr 2",
    subtasks: [
      { title: "Week grid layout", done: true },
      { title: "Meeting card display", done: true },
      { title: "Auto-scroll to now", done: true },
      { title: "Current time indicator", done: true },
    ],
  },
  {
    id: "t10",
    title: "Responsive sidebar navigation",
    description:
      "Create a collapsible sidebar with tooltips on collapse, smooth width transitions, and active route highlighting.",
    status: "completed",
    priority: "medium",
    category: "frontend",
    assignees: [m("ls"), m("um")],
    tags: ["UI", "NAVIGATION"],
    progress: 100,
    createdAt: "Apr 1",
    subtasks: [
      { title: "Collapse animation", done: true },
      { title: "Tooltip on collapsed", done: true },
      { title: "Active route indicator", done: true },
    ],
  },

  // ── Documentation / Process ──
  {
    id: "t11",
    title: "Write API documentation",
    description:
      "Document all REST API endpoints using OpenAPI spec with request/response examples and error codes.",
    status: "in-progress",
    priority: "medium",
    category: "docs",
    dueDate: "Apr 12",
    assignees: [m("ls"), m("um")],
    tags: ["DOCS", "API"],
    progress: 55,
    createdAt: "Apr 5",
    subtasks: [
      { title: "Auth endpoints", done: true },
      { title: "Task endpoints", done: true },
      { title: "Meeting endpoints", done: false },
      { title: "Chat endpoints", done: false },
    ],
  },
  {
    id: "t12",
    title: "Create component storybook",
    description:
      "Set up Storybook with stories for all shared UI components to serve as a living design reference.",
    status: "pending",
    priority: "low",
    category: "docs",
    dueDate: "Apr 16",
    assignees: [m("um"), m("ng")],
    tags: ["DOCS", "COMPONENTS"],
    createdAt: "Apr 6",
    subtasks: [
      { title: "Storybook setup", done: false },
      { title: "Button stories", done: false },
      { title: "Input/Form stories", done: false },
      { title: "Card stories", done: false },
    ],
  },
  {
    id: "t13",
    title: "Project scaffolding",
    description:
      "Initialize the Next.js project with TypeScript, Tailwind CSS, ESLint, and folder structure conventions.",
    status: "completed",
    priority: "high",
    category: "misc",
    assignees: [m("ds")],
    tags: ["SETUP", "TOOLING"],
    progress: 100,
    createdAt: "Mar 28",
  },
  {
    id: "t14",
    title: "Design system setup",
    description:
      "Define the design token system using CSS custom properties with oklch colors for consistent theming.",
    status: "completed",
    priority: "high",
    category: "design",
    assignees: [m("ls"), m("um")],
    tags: ["DESIGN", "TOKENS"],
    progress: 100,
    createdAt: "Mar 30",
  },
  {
    id: "t15",
    title: "Init Git repository",
    description:
      "Set up the GitHub repository with branch protection, issue templates, and PR review requirements.",
    status: "completed",
    priority: "medium",
    category: "misc",
    assignees: [m("ds"), m("rm")],
    tags: ["GIT", "SETUP"],
    progress: 100,
    createdAt: "Mar 28",
  },

  // ── Testing / QA ──
  {
    id: "t16",
    title: "Write unit tests for auth",
    description:
      "Comprehensive unit tests for JWT generation, refresh flow, session management, and edge cases.",
    status: "pending",
    priority: "medium",
    category: "testing",
    dueDate: "Apr 17",
    assignees: [m("ng"), m("rm")],
    tags: ["TESTING", "AUTH"],
    createdAt: "Apr 7",
    subtasks: [
      { title: "Token generation tests", done: false },
      { title: "Refresh flow tests", done: false },
      { title: "Edge case tests", done: false },
    ],
  },
  {
    id: "t17",
    title: "E2E test suite setup",
    description:
      "Configure Playwright for end-to-end testing with CI integration and visual regression snapshots.",
    status: "at-risk",
    priority: "high",
    category: "testing",
    dueDate: "Apr 14",
    assignees: [m("ng")],
    tags: ["TESTING", "E2E"],
    progress: 15,
    createdAt: "Apr 6",
    subtasks: [
      { title: "Playwright configuration", done: true },
      { title: "CI pipeline integration", done: false },
      { title: "Visual regression setup", done: false },
      { title: "Test data fixtures", done: false },
    ],
  },
  {
    id: "t18",
    title: "Performance audit & optimization",
    description:
      "Run Lighthouse audits, optimize bundle size, lazy-load routes, and implement image optimization.",
    status: "pending",
    priority: "low",
    category: "testing",
    dueDate: "Apr 18",
    assignees: [m("ds"), m("ng")],
    tags: ["PERFORMANCE", "AUDIT"],
    createdAt: "Apr 8",
    subtasks: [
      { title: "Lighthouse audit", done: false },
      { title: "Bundle analysis", done: false },
      { title: "Route lazy loading", done: false },
      { title: "Image optimization", done: false },
    ],
  },

  // ── Misc ──
  {
    id: "t19",
    title: "Finalize tech stack",
    description:
      "Research, evaluate, and finalize the full technology stack including frameworks, libraries, and hosting.",
    status: "completed",
    priority: "high",
    category: "misc",
    assignees: [m("ds"), m("ls"), m("um"), m("rm"), m("ng")],
    tags: ["PLANNING", "TECH"],
    progress: 100,
    createdAt: "Mar 29",
  },
  {
    id: "t20",
    title: "Sprint retrospective notes",
    description:
      "Document sprint retrospective findings, action items, and improvement suggestions for the team.",
    status: "in-progress",
    priority: "low",
    category: "docs",
    dueDate: "Apr 11",
    assignees: [m("um")],
    tags: ["PROCESS", "RETRO"],
    progress: 60,
    createdAt: "Apr 7",
    subtasks: [
      { title: "Gather feedback", done: true },
      { title: "Categorize themes", done: true },
      { title: "Write action items", done: false },
    ],
  },
]
