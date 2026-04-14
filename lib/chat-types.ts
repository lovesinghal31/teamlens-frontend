export type ChannelKind = "team" | "direct"

export interface ChatChannel {
  id: string
  kind: ChannelKind
  name: string
  avatarInitials: string
  avatarColor: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline?: boolean // DMs only
  memberCount?: number // team channels only
}

export interface ChatMessage {
  id: string
  channelId: string
  senderId: string
  senderName: string
  senderInitials: string
  senderColor: string
  content: string
  timestamp: string
  isOwn: boolean
  isPinned?: boolean
  isSystem?: boolean
  reactions?: { emoji: string; count: number }[]
}
