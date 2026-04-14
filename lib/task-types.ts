import type { TaskStatus, TaskAssignee } from "@/lib/team-types"

export type TaskPriority = "high" | "medium" | "low"

export type TaskCategory = "backend" | "frontend" | "design" | "docs" | "testing" | "misc"

export interface TaskItem {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  category: TaskCategory
  dueDate?: string
  assignees: TaskAssignee[]
  tags: string[]
  progress?: number
  createdAt: string
  subtasks?: { title: string; done: boolean }[]
}
