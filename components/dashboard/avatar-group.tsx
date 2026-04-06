"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export interface TeamMember {
  name: string
  initials: string
  color: string
}

interface AvatarGroupProps {
  members: TeamMember[]
  max?: number
  size?: "sm" | "md"
}

const sizeClasses = {
  sm: "size-7 text-[10px]",
  md: "size-8 text-xs",
}

export function AvatarGroup({ members, max = 4, size = "sm" }: AvatarGroupProps) {
  const visible = members.slice(0, max)
  const remaining = members.length - max

  return (
    <TooltipProvider delay={0}>
      <div className="flex items-center -space-x-2">
        {visible.map((member) => (
          <Tooltip key={member.name}>
            <TooltipTrigger
              render={
                <Avatar
                  className={cn(
                    "ring-2 ring-card transition-transform hover:z-10 hover:scale-110",
                    sizeClasses[size]
                  )}
                >
                  <AvatarFallback
                    className={cn("font-medium", sizeClasses[size])}
                    style={{ backgroundColor: member.color, color: "white" }}
                  >
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              }
            />
            <TooltipContent side="bottom" sideOffset={4}>
              <p className="text-xs font-medium">{member.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        {remaining > 0 && (
          <Tooltip>
            <TooltipTrigger
              render={
                <Avatar
                  className={cn(
                    "ring-2 ring-card",
                    sizeClasses[size]
                  )}
                >
                  <AvatarFallback
                    className={cn(
                      "bg-muted font-medium text-muted-foreground",
                      sizeClasses[size]
                    )}
                  >
                    +{remaining}
                  </AvatarFallback>
                </Avatar>
              }
            />
            <TooltipContent side="bottom" sideOffset={4}>
              <div className="space-y-0.5">
                {members.slice(max).map((m) => (
                  <p key={m.name} className="text-xs">{m.name}</p>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  )
}
