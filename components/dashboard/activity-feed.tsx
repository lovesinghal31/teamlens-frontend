"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  GitBranch,
  Plus,
} from "lucide-react"

export interface ActivityItem {
  id: string
  user: { name: string; initials: string; color: string }
  action: "completed" | "commented" | "moved" | "created" | "merged"
  target: string
  timestamp: string
}

const actionConfig = {
  completed: {
    icon: CheckCircle2,
    verb: "completed",
    iconClass: "text-emerald-500",
    bgClass: "bg-emerald-500/10",
  },
  commented: {
    icon: MessageSquare,
    verb: "commented on",
    iconClass: "text-blue-500",
    bgClass: "bg-blue-500/10",
  },
  moved: {
    icon: ArrowRight,
    verb: "moved",
    iconClass: "text-amber-500",
    bgClass: "bg-amber-500/10",
  },
  created: {
    icon: Plus,
    verb: "created",
    iconClass: "text-violet-500",
    bgClass: "bg-violet-500/10",
  },
  merged: {
    icon: GitBranch,
    verb: "merged",
    iconClass: "text-teal-500",
    bgClass: "bg-teal-500/10",
  },
}

interface ActivityFeedProps {
  activities: ActivityItem[]
  className?: string
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {activities.map((activity, index) => {
        const config = actionConfig[activity.action]
        const Icon = config.icon

        return (
          <div
            key={activity.id}
            className="group relative flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent/50"
          >
            {/* Timeline connector */}
            {index < activities.length - 1 && (
              <div className="absolute left-[23px] top-[38px] h-[calc(100%-14px)] w-px bg-border" />
            )}

            {/* Avatar */}
            <Avatar className="relative z-10 size-7 shrink-0 ring-2 ring-card">
              <AvatarFallback
                className="text-[9px] font-medium"
                style={{ backgroundColor: activity.user.color, color: "white" }}
              >
                {activity.user.initials}
              </AvatarFallback>
            </Avatar>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  {activity.user.name.split(" ")[0]}
                </span>{" "}
                {config.verb}{" "}
                <span className="font-medium text-foreground">{activity.target}</span>
              </p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <div className={cn("flex size-3.5 items-center justify-center rounded", config.bgClass)}>
                  <Icon className={cn("size-2", config.iconClass)} />
                </div>
                <span className="text-[10px] text-muted-foreground/70">{activity.timestamp}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
