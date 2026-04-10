"use client"

import * as React from "react"
import { Pin, Search, MoreHorizontal, Hash, Users } from "lucide-react"
import type { ChatChannel } from "@/lib/chat-types"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ChatHeaderProps {
  channel: ChatChannel | undefined
  onTogglePinned?: () => void
  showPinned?: boolean
}

export function ChatHeader({
  channel,
  onTogglePinned,
  showPinned,
}: ChatHeaderProps) {
  if (!channel) return null

  const isTeam = channel.kind === "team"

  return (
    <header className="flex items-center justify-between border-b border-border bg-background/60 px-5 py-3 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Channel avatar */}
        {isTeam ? (
          <div
            className="flex size-9 items-center justify-center rounded-lg text-sm font-semibold text-white"
            style={{ backgroundColor: channel.avatarColor }}
          >
            <Hash className="size-4" />
          </div>
        ) : (
          <div className="relative">
            <div
              className="flex size-9 items-center justify-center rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: channel.avatarColor }}
            >
              {channel.avatarInitials}
            </div>
            {channel.isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
            )}
          </div>
        )}

        {/* Channel name & meta */}
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            {isTeam ? `# ${channel.name}` : channel.name}
          </h2>
          {isTeam && channel.memberCount ? (
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Users className="size-3" />
              {channel.memberCount} members
            </p>
          ) : !isTeam ? (
            <p className="flex items-center gap-1 text-[11px]">
              {channel.isOnline ? (
                <>
                  <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Active</span>
                </>
              ) : (
                <span className="text-muted-foreground">Inactive</span>
              )}
            </p>
          ) : null}
        </div>
      </div>

      {/* Actions */}
      <TooltipProvider delay={0}>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger render={
              <button
                onClick={onTogglePinned}
                className={`flex size-8 items-center justify-center rounded-lg transition-colors ${
                  showPinned
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Pin className="size-4" />
              </button>
            } />
            <TooltipContent side="bottom" sideOffset={8}>Pinned messages</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger render={
              <button className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                <Search className="size-4" />
              </button>
            } />
            <TooltipContent side="bottom" sideOffset={8}>Search</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger render={
              <button className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                <MoreHorizontal className="size-4" />
              </button>
            } />
            <TooltipContent side="bottom" sideOffset={8}>More options</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </header>
  )
}
