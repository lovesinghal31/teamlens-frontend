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
} from "@/lib/mock-data"

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

  function handleSend() {
    const text = newMessage.trim()
    if (!text) return

    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId: selectedChannelId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderInitials: currentUser.initials,
      senderColor: currentUser.color,
      content: text,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      isOwn: true,
    }

    setMessages((prev) => ({
      ...prev,
      [selectedChannelId]: [...(prev[selectedChannelId] ?? []), msg],
    }))
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
