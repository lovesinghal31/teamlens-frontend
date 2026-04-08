export interface Participant {
  name: string
  initials: string
  color: string
  attendance: "required" | "optional"
}

export interface MeetingTask {
  title: string
  assignee: Participant
  progress: number
  status: "on-track" | "at-risk" | "completed"
}

export interface Meeting {
  id: string
  title: string
  date: string // YYYY-MM-DD
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
  priority: "low" | "medium" | "high"
  approvalStatus: "approved" | "pending" | "declined"
  createdBy: "ai" | "predefined"
  tags: string[]
  aiReasoning: string
  agenda: string[] // Discussion points for the meeting
  participants: Participant[]
  tasks: MeetingTask[]
  colorScheme: "green" | "yellow" | "red" | "blue" | "amber"
}
