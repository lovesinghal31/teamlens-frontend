"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Search, ChevronLeft, ChevronRight, Hash, X } from "lucide-react"
import type { ChatChannel } from "@/lib/chat-types"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ChatSidebarProps {
  channels: ChatChannel[]
  selectedId: string
  onSelect: (id: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export function ChatSidebar({
  channels,
  selectedId,
  onSelect,
  collapsed,
  onToggleCollapse,
}: ChatSidebarProps) {
  const [search, setSearch] = React.useState("")

  const teamChannels = channels.filter((c) => c.kind === "team")
  const directMessages = channels.filter((c) => c.kind === "direct")

  const filterBySearch = (list: ChatChannel[]) =>
    list.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )

  const filteredTeam = filterBySearch(teamChannels)
  const filteredDMs = filterBySearch(directMessages)

  return (
    <TooltipProvider delay={0}>
      <aside
        className={cn(
          "relative flex h-full flex-col border-r border-border bg-sidebar/50 backdrop-blur-sm transition-all duration-300 ease-in-out",
          collapsed ? "w-[52px]" : "w-[280px]"
        )}
      >
        {/* Search */}
        {!collapsed && (
          <div className="p-3 pb-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search chats..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-full rounded-lg border border-border bg-background pl-8 pr-8 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Scrollable channel list */}
        <div className="flex-1 overflow-y-auto p-2">
          {/* Team Channels */}
          <SectionHeader
            label="Team Channels"
            collapsed={collapsed}
          />
          <div className="mt-1 space-y-0.5">
            {(collapsed ? teamChannels : filteredTeam).map((ch) => (
              <ChannelItem
                key={ch.id}
                channel={ch}
                isSelected={selectedId === ch.id}
                collapsed={collapsed}
                onSelect={() => onSelect(ch.id)}
              />
            ))}
          </div>

          {/* Direct Messages */}
          <SectionHeader
            label="Direct Messages"
            collapsed={collapsed}
            className="mt-4"
          />
          <div className="mt-1 space-y-0.5">
            {(collapsed ? directMessages : filteredDMs).map((ch) => (
              <ChannelItem
                key={ch.id}
                channel={ch}
                isSelected={selectedId === ch.id}
                collapsed={collapsed}
                onSelect={() => onSelect(ch.id)}
              />
            ))}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-1/2 z-40 flex size-6 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-accent"
        >
          {collapsed ? (
            <ChevronRight className="size-3.5 text-muted-foreground" />
          ) : (
            <ChevronLeft className="size-3.5 text-muted-foreground" />
          )}
        </button>
      </aside>
    </TooltipProvider>
  )
}

// ── Section header ─────────────────────────────────────────

function SectionHeader({
  label,
  collapsed,
  className,
}: {
  label: string
  collapsed: boolean
  className?: string
}) {
  if (collapsed) {
    return (
      <div className={cn("my-2 border-t border-border", className)} />
    )
  }
  return (
    <p
      className={cn(
        "px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
        className
      )}
    >
      {label}
    </p>
  )
}

// ── Channel item ───────────────────────────────────────────

function ChannelItem({
  channel,
  isSelected,
  collapsed,
  onSelect,
}: {
  channel: ChatChannel
  isSelected: boolean
  collapsed: boolean
  onSelect: () => void
}) {
  const isTeam = channel.kind === "team"

  const content = (
    <button
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-all duration-150",
        isSelected
          ? "bg-primary/10 text-foreground"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
        collapsed && "justify-center px-0"
      )}
    >
      {/* Avatar / Icon */}
      <div className="relative shrink-0">
        {isTeam ? (
          <div
            className="flex size-8 items-center justify-center rounded-lg text-xs font-semibold text-white"
            style={{ backgroundColor: channel.avatarColor }}
          >
            <Hash className="size-3.5" />
          </div>
        ) : (
          <div
            className="flex size-8 items-center justify-center rounded-full text-[10px] font-semibold text-white"
            style={{ backgroundColor: channel.avatarColor }}
          >
            {channel.avatarInitials}
          </div>
        )}
        {/* Online dot for DMs */}
        {!isTeam && channel.isOnline && (
          <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-sidebar bg-emerald-500" />
        )}
      </div>

      {/* Channel info */}
      {!collapsed && (
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <span className="truncate text-xs font-medium">
              {isTeam ? `${channel.name}` : channel.name}
            </span>
            <span className="shrink-0 text-[10px] text-muted-foreground">
              {channel.lastMessageTime}
            </span>
          </div>
          <div className="flex items-center justify-between gap-1">
            <span className="truncate text-[11px] text-muted-foreground">
              {!isTeam && channel.isOnline ? (
                <span className="text-emerald-500">Active</span>
              ) : !isTeam ? (
                <span className="text-muted-foreground/70">Inactive</span>
              ) : (
                channel.lastMessage
              )}
            </span>
            {channel.unreadCount > 0 && (
              <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                {channel.unreadCount}
              </span>
            )}
          </div>
        </div>
      )}
    </button>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger render={content} />
        <TooltipContent side="right" sideOffset={8}>
          {isTeam ? `# ${channel.name}` : channel.name}
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}
