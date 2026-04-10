"use client"

import * as React from "react"
import { MessageSquare } from "lucide-react"
import { ChatSidebar } from "@/components/chats/chat-sidebar"
import { ChatHeader } from "@/components/chats/chat-header"
import { ChatArea } from "@/components/chats/chat-area"
import { ChatInput } from "@/components/chats/chat-input"
import type { ChatChannel, ChatMessage } from "@/lib/chat-types"

// ── Mock team members (shared across the app) ──────────────

const people = {
  ds: { id: "ds", name: "Divyansh Shrivastava", initials: "DS", color: "#6366f1" },
  ls: { id: "ls", name: "Love Singhal", initials: "LS", color: "#3b82f6" },
  um: { id: "um", name: "Uthkarsh Mandloi", initials: "UM", color: "#ec4899" },
  rm: { id: "rm", name: "Rohan Mehta", initials: "RM", color: "#14b8a6" },
  ng: { id: "ng", name: "Neha Gupta", initials: "NG", color: "#8b5cf6" },
}

// Current user
const me = people.ds

// ── Mock channels ──────────────────────────────────────────

const mockChannels: ChatChannel[] = [
  {
    id: "general",
    kind: "team",
    name: "General",
    avatarInitials: "GN",
    avatarColor: "#6366f1",
    lastMessage: "Let's sync up on the sprint goals",
    lastMessageTime: "2m",
    unreadCount: 3,
    memberCount: 5,
  },
  {
    id: "frontend",
    kind: "team",
    name: "Frontend",
    avatarInitials: "FE",
    avatarColor: "#3b82f6",
    lastMessage: "PR #42 is ready for review",
    lastMessageTime: "15m",
    unreadCount: 1,
    memberCount: 3,
  },
  {
    id: "backend",
    kind: "team",
    name: "Backend",
    avatarInitials: "BE",
    avatarColor: "#14b8a6",
    lastMessage: "Redis caching layer is deployed",
    lastMessageTime: "1h",
    unreadCount: 0,
    memberCount: 2,
  },
  {
    id: "design",
    kind: "team",
    name: "Design",
    avatarInitials: "DS",
    avatarColor: "#f59e0b",
    lastMessage: "Updated the component library",
    lastMessageTime: "3h",
    unreadCount: 0,
    memberCount: 2,
  },
  {
    id: "qa",
    kind: "team",
    name: "QA Testing",
    avatarInitials: "QA",
    avatarColor: "#ef4444",
    lastMessage: "Regression suite passed ✅",
    lastMessageTime: "5h",
    unreadCount: 0,
    memberCount: 2,
  },
  // Direct Messages
  {
    id: "dm-ls",
    kind: "direct",
    name: "Love Singhal",
    avatarInitials: "LS",
    avatarColor: people.ls.color,
    lastMessage: "Sure, I'll review it now",
    lastMessageTime: "5m",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "dm-um",
    kind: "direct",
    name: "Uthkarsh Mandloi",
    avatarInitials: "UM",
    avatarColor: people.um.color,
    lastMessage: "The mockups look great!",
    lastMessageTime: "30m",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: "dm-rm",
    kind: "direct",
    name: "Rohan Mehta",
    avatarInitials: "RM",
    avatarColor: people.rm.color,
    lastMessage: "API endpoints are ready",
    lastMessageTime: "2h",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "dm-ng",
    kind: "direct",
    name: "Neha Gupta",
    avatarInitials: "NG",
    avatarColor: people.ng.color,
    lastMessage: "Found a bug in the auth flow",
    lastMessageTime: "4h",
    unreadCount: 1,
    isOnline: false,
  },
]

// ── Mock messages per channel ──────────────────────────────

const mockMessages: Record<string, ChatMessage[]> = {
  general: [
    {
      id: "g1",
      channelId: "general",
      senderId: "ls",
      senderName: "Love Singhal",
      senderInitials: "LS",
      senderColor: people.ls.color,
      content: "Hey everyone! Just pushed the latest dashboard changes. Can someone take a look?",
      timestamp: "9:15 AM",
      isOwn: false,
    },
    {
      id: "g2",
      channelId: "general",
      senderId: "um",
      senderName: "Uthkarsh Mandloi",
      senderInitials: "UM",
      senderColor: people.um.color,
      content: "Nice work Love! The stat cards look really clean. I'll check the responsive layout.",
      timestamp: "9:18 AM",
      isOwn: false,
    },
    {
      id: "g3",
      channelId: "general",
      senderId: "ds",
      senderName: "Divyansh Shrivastava",
      senderInitials: "DS",
      senderColor: people.ds.color,
      content: "Looks great! Let's make sure the dark mode renders properly too. I noticed some contrast issues last sprint.",
      timestamp: "9:22 AM",
      isOwn: true,
    },
    {
      id: "g4",
      channelId: "general",
      senderId: "rm",
      senderName: "Rohan Mehta",
      senderInitials: "RM",
      senderColor: people.rm.color,
      content: "On a related note — the API for task metrics is now live on staging. You can swap out the mock data whenever you're ready.",
      timestamp: "9:30 AM",
      isOwn: false,
      reactions: [{ emoji: "🚀", count: 3 }],
    },
    {
      id: "g5",
      channelId: "general",
      senderId: "ng",
      senderName: "Neha Gupta",
      senderInitials: "NG",
      senderColor: people.ng.color,
      content: "I'll write integration tests for the new endpoints today. Should be done by EOD.",
      timestamp: "9:35 AM",
      isOwn: false,
    },
    {
      id: "g6",
      channelId: "general",
      senderId: "ds",
      senderName: "Divyansh Shrivastava",
      senderInitials: "DS",
      senderColor: people.ds.color,
      content: "Perfect! Let's sync up on the sprint goals after standup. We need to finalize the Q2 roadmap items.",
      timestamp: "9:40 AM",
      isOwn: true,
      isPinned: true,
    },
    {
      id: "g7",
      channelId: "general",
      senderId: "ls",
      senderName: "Love Singhal",
      senderInitials: "LS",
      senderColor: people.ls.color,
      content: "Sounds good! Also — should we add the chat feature to this sprint or push it to next? 🤔",
      timestamp: "9:45 AM",
      isOwn: false,
    },
    {
      id: "g8",
      channelId: "general",
      senderId: "um",
      senderName: "Uthkarsh Mandloi",
      senderInitials: "UM",
      senderColor: people.um.color,
      content: "I think we can squeeze it in. The wireframes are already done.",
      timestamp: "9:48 AM",
      isOwn: false,
      reactions: [{ emoji: "👍", count: 2 }, { emoji: "💪", count: 1 }],
    },
  ],
  frontend: [
    {
      id: "f1",
      channelId: "frontend",
      senderId: "ls",
      senderName: "Love Singhal",
      senderInitials: "LS",
      senderColor: people.ls.color,
      content: "PR #42 is up for the meeting calendar component. Added auto-scroll to current time.",
      timestamp: "10:00 AM",
      isOwn: false,
    },
    {
      id: "f2",
      channelId: "frontend",
      senderId: "ds",
      senderName: "Divyansh Shrivastava",
      senderInitials: "DS",
      senderColor: people.ds.color,
      content: "Reviewing now. Quick question — are we using useRef for the scroll container?",
      timestamp: "10:05 AM",
      isOwn: true,
    },
    {
      id: "f3",
      channelId: "frontend",
      senderId: "ls",
      senderName: "Love Singhal",
      senderInitials: "LS",
      senderColor: people.ls.color,
      content: "Yes, useRef with a useEffect on mount. Calculates the pixel offset from the current hour and calls scrollTo.",
      timestamp: "10:08 AM",
      isOwn: false,
    },
    {
      id: "f4",
      channelId: "frontend",
      senderId: "um",
      senderName: "Uthkarsh Mandloi",
      senderInitials: "UM",
      senderColor: people.um.color,
      content: "The ongoing meeting indicator with the pulsing green dot looks really nice btw 🟢",
      timestamp: "10:15 AM",
      isOwn: false,
      reactions: [{ emoji: "✨", count: 2 }],
    },
    {
      id: "f5",
      channelId: "frontend",
      senderId: "ds",
      senderName: "Divyansh Shrivastava",
      senderInitials: "DS",
      senderColor: people.ds.color,
      content: "LGTM! Approved. Let's merge after lunch.",
      timestamp: "10:20 AM",
      isOwn: true,
    },
  ],
  backend: [
    {
      id: "b1",
      channelId: "backend",
      senderId: "rm",
      senderName: "Rohan Mehta",
      senderInitials: "RM",
      senderColor: people.rm.color,
      content: "Deployed the Redis caching layer to staging. Response times dropped by ~40%.",
      timestamp: "11:00 AM",
      isOwn: false,
      reactions: [{ emoji: "🔥", count: 2 }],
    },
    {
      id: "b2",
      channelId: "backend",
      senderId: "ds",
      senderName: "Divyansh Shrivastava",
      senderInitials: "DS",
      senderColor: people.ds.color,
      content: "That's a massive improvement! Did you set up cache invalidation for the task endpoints?",
      timestamp: "11:05 AM",
      isOwn: true,
    },
    {
      id: "b3",
      channelId: "backend",
      senderId: "rm",
      senderName: "Rohan Mehta",
      senderInitials: "RM",
      senderColor: people.rm.color,
      content: "Yep, using a write-through strategy. Task updates invalidate the relevant cache keys immediately.",
      timestamp: "11:10 AM",
      isOwn: false,
    },
    {
      id: "b4",
      channelId: "backend",
      senderId: "ds",
      senderName: "Divyansh Shrivastava",
      senderInitials: "DS",
      senderColor: people.ds.color,
      content: "Great stuff. Let's add some monitoring dashboards for cache hit rates. Can you set up a Grafana panel?",
      timestamp: "11:15 AM",
      isOwn: true,
      isPinned: true,
    },
  ],
  design: [
    {
      id: "d1",
      channelId: "design",
      senderId: "um",
      senderName: "Uthkarsh Mandloi",
      senderInitials: "UM",
      senderColor: people.um.color,
      content: "Updated the component library with the new color tokens. Check the Figma link 🎨",
      timestamp: "2:00 PM",
      isOwn: false,
    },
    {
      id: "d2",
      channelId: "design",
      senderId: "ls",
      senderName: "Love Singhal",
      senderInitials: "LS",
      senderColor: people.ls.color,
      content: "Love the new accent colors! The oklch values are way more consistent than what we had before.",
      timestamp: "2:10 PM",
      isOwn: false,
    },
    {
      id: "d3",
      channelId: "design",
      senderId: "um",
      senderName: "Uthkarsh Mandloi",
      senderInitials: "UM",
      senderColor: people.um.color,
      content: "Thanks! Also added dark mode variants for each. Should be a 1:1 mapping in the CSS variables.",
      timestamp: "2:15 PM",
      isOwn: false,
      reactions: [{ emoji: "🎯", count: 1 }],
    },
  ],
  qa: [
    {
      id: "q1",
      channelId: "qa",
      senderId: "ng",
      senderName: "Neha Gupta",
      senderInitials: "NG",
      senderColor: people.ng.color,
      content: "Full regression suite passed on staging. 147/147 tests green ✅",
      timestamp: "4:00 PM",
      isOwn: false,
      reactions: [{ emoji: "🎉", count: 3 }],
    },
    {
      id: "q2",
      channelId: "qa",
      senderId: "rm",
      senderName: "Rohan Mehta",
      senderInitials: "RM",
      senderColor: people.rm.color,
      content: "Nice! Any flaky tests we should watch out for?",
      timestamp: "4:05 PM",
      isOwn: false,
    },
    {
      id: "q3",
      channelId: "qa",
      senderId: "ng",
      senderName: "Neha Gupta",
      senderInitials: "NG",
      senderColor: people.ng.color,
      content: "Two tests in the auth module were timing out intermittently. I increased the timeout and added retry logic. Stable now.",
      timestamp: "4:10 PM",
      isOwn: false,
    },
  ],
  "dm-ls": [
    {
      id: "dl1",
      channelId: "dm-ls",
      senderId: "ds",
      senderName: "Divyansh Shrivastava",
      senderInitials: "DS",
      senderColor: people.ds.color,
      content: "Hey Love, can you review the sidebar animation PR? I made the collapse transition smoother.",
      timestamp: "10:30 AM",
      isOwn: true,
    },
    {
      id: "dl2",
      channelId: "dm-ls",
      senderId: "ls",
      senderName: "Love Singhal",
      senderInitials: "LS",
      senderColor: people.ls.color,
      content: "Sure, I'll take a look now! Is it on the feature/sidebar-v2 branch?",
      timestamp: "10:32 AM",
      isOwn: false,
    },
    {
      id: "dl3",
      channelId: "dm-ls",
      senderId: "ds",
      senderName: "Divyansh Shrivastava",
      senderInitials: "DS",
      senderColor: people.ds.color,
      content: "Yep, that's the one. The key change is in sidebar.tsx — I used transition-all with duration-300 for the width.",
      timestamp: "10:33 AM",
      isOwn: true,
    },
    {
      id: "dl4",
      channelId: "dm-ls",
      senderId: "ls",
      senderName: "Love Singhal",
      senderInitials: "LS",
      senderColor: people.ls.color,
      content: "Looking at it now. The tooltip on collapsed icons is a nice touch! 👌",
      timestamp: "10:40 AM",
      isOwn: false,
    },
    {
      id: "dl5",
      channelId: "dm-ls",
      senderId: "ls",
      senderName: "Love Singhal",
      senderInitials: "LS",
      senderColor: people.ls.color,
      content: "Sure, I'll review it now. Left a couple of minor comments but overall LGTM.",
      timestamp: "10:45 AM",
      isOwn: false,
    },
  ],
  "dm-um": [
    {
      id: "du1",
      channelId: "dm-um",
      senderId: "um",
      senderName: "Uthkarsh Mandloi",
      senderInitials: "UM",
      senderColor: people.um.color,
      content: "Divyansh, I finished the wireframes for the chat page. Want me to share them in the design channel?",
      timestamp: "1:00 PM",
      isOwn: false,
    },
    {
      id: "du2",
      channelId: "dm-um",
      senderId: "ds",
      senderName: "Divyansh Shrivastava",
      senderInitials: "DS",
      senderColor: people.ds.color,
      content: "Yes please! Also send me a direct link so I can annotate them.",
      timestamp: "1:05 PM",
      isOwn: true,
    },
    {
      id: "du3",
      channelId: "dm-um",
      senderId: "um",
      senderName: "Uthkarsh Mandloi",
      senderInitials: "UM",
      senderColor: people.um.color,
      content: "The mockups look great! Here's the Figma link: figma.com/file/teamlens-chat",
      timestamp: "1:10 PM",
      isOwn: false,
      reactions: [{ emoji: "🙌", count: 1 }],
    },
  ],
  "dm-rm": [
    {
      id: "dr1",
      channelId: "dm-rm",
      senderId: "ds",
      senderName: "Divyansh Shrivastava",
      senderInitials: "DS",
      senderColor: people.ds.color,
      content: "Rohan, what's the status on the rate limiting middleware?",
      timestamp: "3:00 PM",
      isOwn: true,
    },
    {
      id: "dr2",
      channelId: "dm-rm",
      senderId: "rm",
      senderName: "Rohan Mehta",
      senderInitials: "RM",
      senderColor: people.rm.color,
      content: "Almost done! Using a sliding window algorithm with Redis. Should be ready for review tomorrow.",
      timestamp: "3:15 PM",
      isOwn: false,
    },
    {
      id: "dr3",
      channelId: "dm-rm",
      senderId: "rm",
      senderName: "Rohan Mehta",
      senderInitials: "RM",
      senderColor: people.rm.color,
      content: "API endpoints are ready. I'll update the docs and ping you.",
      timestamp: "3:20 PM",
      isOwn: false,
    },
  ],
  "dm-ng": [
    {
      id: "dn1",
      channelId: "dm-ng",
      senderId: "ng",
      senderName: "Neha Gupta",
      senderInitials: "NG",
      senderColor: people.ng.color,
      content: "Hey Divyansh, I found a bug in the auth flow. Token refresh is failing silently when the session expires.",
      timestamp: "11:00 AM",
      isOwn: false,
    },
    {
      id: "dn2",
      channelId: "dm-ng",
      senderId: "ds",
      senderName: "Divyansh Shrivastava",
      senderInitials: "DS",
      senderColor: people.ds.color,
      content: "Oh that's not good. Can you create a ticket with the reproduction steps? I'll prioritize it.",
      timestamp: "11:10 AM",
      isOwn: true,
    },
    {
      id: "dn3",
      channelId: "dm-ng",
      senderId: "ng",
      senderName: "Neha Gupta",
      senderInitials: "NG",
      senderColor: people.ng.color,
      content: "Already done! Ticket #287. It's happening on the /api/refresh-token endpoint. The 401 isn't being caught by the interceptor.",
      timestamp: "11:15 AM",
      isOwn: false,
    },
    {
      id: "dn4",
      channelId: "dm-ng",
      senderId: "ds",
      senderName: "Divyansh Shrivastava",
      senderInitials: "DS",
      senderColor: people.ds.color,
      content: "Found a bug in the auth flow. Thanks for catching it. I'll patch the interceptor today.",
      timestamp: "11:20 AM",
      isOwn: true,
      reactions: [{ emoji: "🙏", count: 1 }],
    },
  ],
}

// Typing simulation options
const typingNames = ["Love", "Uthkarsh", "Rohan", "Neha"]

// ── Page component ─────────────────────────────────────────

export default function ChatsPage() {
  const [selectedChannelId, setSelectedChannelId] = React.useState("general")
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [messages, setMessages] = React.useState<Record<string, ChatMessage[]>>(mockMessages)
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
      senderId: me.id,
      senderName: me.name,
      senderInitials: me.initials,
      senderColor: me.color,
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
