export type TaskStatus = "completed" | "in-progress" | "pending" | "at-risk"

export interface TaskAssignee {
  id: string
  name: string
  initials: string
  color: string
}

export interface TeamTask {
  id: string
  title: string
  status: TaskStatus
  dueDate?: string
  assignees: TaskAssignee[]
}

export interface TeamMemberData {
  id: string
  name: string
  initials: string
  role: string
  color: string
  tasks: TeamTask[]
}
