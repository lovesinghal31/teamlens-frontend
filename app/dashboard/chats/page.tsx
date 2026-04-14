"use client"

import * as React from "react"
import { MessageSquare } from "lucide-react"
import { ChatSidebar } from "@/components/chats/chat-sidebar"
import { ChatHeader } from "@/components/chats/chat-header"
import { ChatArea } from "@/components/chats/chat-area"
import { ChatInput } from "@/components/chats/chat-input"
import type { ChatMessage } from "@/lib/chat-types"
import {
  currentUser,
  mockChannels,
  mockMessages as initialMessages,
  typingNames,
  teamList,
  teamMembers,
} from "@/lib/mock-data"
import { addTask } from "@/lib/task-store"
import type { TaskItem } from "@/lib/task-types"

// ── /assign command regex ──────────────────────────────────
// Matches: /assign @FirstName rest of the task title
const ASSIGN_REGEX = /^\/assign\s+@(\S+)\s+(.+)$/i

function now() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

// ── Page component ─────────────────────────────────────────

export default function ChatsPage() {
  const [selectedChannelId, setSelectedChannelId] = React.useState("general")
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [messages, setMessages] = React.useState<Record<string, ChatMessage[]>>(initialMessages)
  const [newMessage, setNewMessage] = React.useState("")
  const [showPinned, setShowPinned] = React.useState(false)
  const [typingUser, setTypingUser] = React.useState<string | null>(null)

  const selectedChannel = mockChannels.find((c) => c.id === selectedChannelId)
  const channelMessages = messages[selectedChannelId] ?? []

  // Filter pinned if toggled
  const displayMessages = showPinned
    ? channelMessages.filter((m) => m.isPinned)
    : channelMessages

  // ── Helpers ────────────────────────────────────────────────

  function appendMessages(channelId: string, ...msgs: ChatMessage[]) {
    setMessages((prev) => ({
      ...prev,
      [channelId]: [...(prev[channelId] ?? []), ...msgs],
    }))
  }

  function makeSystemMessage(channelId: string, content: string): ChatMessage {
    return {
      id: `sys-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      channelId,
      senderId: "system",
      senderName: "System",
      senderInitials: "SY",
      senderColor: "#6b7280",
      content,
      timestamp: now(),
      isOwn: false,
      isSystem: true,
    }
  }

  // ── Handle Send ────────────────────────────────────────────

  function handleSend() {
    const text = newMessage.trim()
    if (!text) return

    // Check for /assign command
    const assignMatch = text.match(ASSIGN_REGEX)

    if (assignMatch) {
      const [, mentionName, taskTitle] = assignMatch

      // Resolve person by first name (case-insensitive)
      const person = teamList.find(
        (p) => p.name.split(" ")[0].toLowerCase() === mentionName.toLowerCase()
      )

      if (!person) {
        // Unknown person — show error system message
        appendMessages(
          selectedChannelId,
          makeSystemMessage(
            selectedChannelId,
            `❌ Could not find team member "@${mentionName}". Try using their first name.`
          )
        )
        setNewMessage("")
        return
      }

      // Create the task
      const assignee = teamMembers.find((m) => m.id === person.id)!
      const newTask: TaskItem = {
        id: `t-chat-${Date.now()}`,
        title: taskTitle.trim(),
        description: `Task assigned via chat by ${currentUser.name}`,
        status: "pending",
        priority: "medium",
        category: "misc",
        assignees: [assignee],
        tags: ["CHAT-ASSIGNED"],
        createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      }

      // Push to shared store
      addTask(newTask)

      // Show the original command as a normal message
      const userMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        channelId: selectedChannelId,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderInitials: currentUser.initials,
        senderColor: currentUser.color,
        content: text,
        timestamp: now(),
        isOwn: true,
      }

      // Show system confirmation
      const sysMsg = makeSystemMessage(
        selectedChannelId,
        `✅ Task assigned to ${person.name}: "${taskTitle.trim()}"`
      )

      appendMessages(selectedChannelId, userMsg, sysMsg)
      setNewMessage("")
      return
    }

    // Normal message
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId: selectedChannelId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderInitials: currentUser.initials,
      senderColor: currentUser.color,
      content: text,
      timestamp: now(),
      isOwn: true,
    }

    appendMessages(selectedChannelId, msg)
    setNewMessage("")

    // Simulate typing response
    const randomName = typingNames[Math.floor(Math.random() * typingNames.length)]
    setTimeout(() => setTypingUser(randomName), 800)
    setTimeout(() => setTypingUser(null), 3000)
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Page header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
            <MessageSquare className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              Chats
            </h1>
            <p className="text-xs text-muted-foreground">
              {mockChannels.filter((c) => c.kind === "team").length} channels ·{" "}
              {mockChannels.filter((c) => c.kind === "direct").length} direct messages
            </p>
          </div>
        </div>
      </header>

      {/* Main content — sidebar + chat */}
      <div className="flex min-h-0 flex-1">
        {/* Chat sidebar */}
        <ChatSidebar
          channels={mockChannels}
          selectedId={selectedChannelId}
          onSelect={(id) => {
            setSelectedChannelId(id)
            setShowPinned(false)
          }}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Chat area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <ChatHeader
            channel={selectedChannel}
            onTogglePinned={() => setShowPinned(!showPinned)}
            showPinned={showPinned}
          />

          <ChatArea messages={displayMessages} />

          <ChatInput
            value={newMessage}
            onChange={setNewMessage}
            onSend={handleSend}
            typingUser={typingUser}
          />
        </div>
      </div>
    </div>
  )
}
