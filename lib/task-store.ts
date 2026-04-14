// ── Shared task store ──────────────────────────────────────
// Mutable in-memory store so Chat can add tasks and Tasks page sees them live.
// Uses useSyncExternalStore for React 18-compatible subscriptions.

import { useSyncExternalStore } from "react"
import type { TaskItem } from "@/lib/task-types"
import { taskItems as initialTasks } from "@/lib/task-mock-data"

// ── Module-level mutable state ─────────────────────────────

let tasks: TaskItem[] = [...initialTasks]
let listeners: Array<() => void> = []

function emitChange() {
  listeners.forEach((l) => l())
}

// ── Public API ─────────────────────────────────────────────

export function getTaskSnapshot(): TaskItem[] {
  return tasks
}

export function subscribe(listener: () => void): () => void {
  listeners = [...listeners, listener]
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

export function addTask(task: TaskItem) {
  tasks = [task, ...tasks]
  emitChange()
}

// ── React hook ─────────────────────────────────────────────

export function useTaskStore(): TaskItem[] {
  return useSyncExternalStore(subscribe, getTaskSnapshot, getTaskSnapshot)
}
