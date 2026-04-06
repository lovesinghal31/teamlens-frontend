import * as React from "react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  iconColor?: string
  children?: React.ReactNode
  className?: string
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-primary",
  children,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-9 items-center justify-center rounded-xl bg-primary/10",
              iconColor === "text-primary" ? "bg-primary/10" : ""
            )}
          >
            <Icon className={cn("size-[18px]", iconColor)} />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
      </div>
      <p className="mb-3 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      {children && <div>{children}</div>}
    </div>
  )
}
