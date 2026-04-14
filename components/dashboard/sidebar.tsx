"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  User,
  Settings,
  Moon,
  Sun,
  LogOut,
  ChevronsUpDown,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CalendarDays, label: "Meetings", href: "/dashboard/meetings" },
  { icon: Users, label: "Team", href: "/dashboard/team" },
  { icon: MessageSquare, label: "Chats", href: "/dashboard/chats" },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <TooltipProvider delay={0}>
      <aside
        className={cn(
          "relative z-40 flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out",
          collapsed ? "w-[68px]" : "w-[240px]"
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-2.5 px-4">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="size-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-base font-semibold tracking-tight text-foreground">
              TeamLens
            </span>
          )}
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href)

            const linkContent = (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="size-[18px] shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.label}>
                  <TooltipTrigger
                    render={linkContent}
                  />
                  <TooltipContent side="right" sideOffset={8}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return <React.Fragment key={item.label}>{linkContent}</React.Fragment>
          })}
        </nav>

        {/* User section with popover */}
        <div className="border-t border-border p-3">
          <Popover>
            <PopoverTrigger
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent",
                collapsed && "justify-center"
              )}
            >
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/15 text-xs font-medium text-primary">
                  DS
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-sm font-medium text-foreground">Divyansh Shrivastava</p>
                    <p className="truncate text-xs text-muted-foreground">Admin</p>
                  </div>
                  <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
                </>
              )}
            </PopoverTrigger>

            <PopoverContent
              side="top"
              sideOffset={8}
              align="start"
              className="w-56"
            >
              {/* User header inside popover */}
              <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-primary/15 text-xs font-medium text-primary">
                    DS
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">Divyansh Shrivastava</p>
                  <p className="truncate text-xs text-muted-foreground">divyansh.s@teamlens.dev</p>
                </div>
              </div>

              <div className="my-1 h-px bg-border" />

              {/* Menu items */}
              <div className="space-y-0.5 p-1">
                <button
                  onClick={() => router.push("/dashboard/profile")}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  <User className="size-4 text-muted-foreground" />
                  Profile
                </button>

                <button
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  <Settings className="size-4 text-muted-foreground" />
                  Settings
                </button>

                <button
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  <span className="flex items-center gap-3">
                    {resolvedTheme === "dark" ? (
                      <Sun className="size-4 text-muted-foreground" />
                    ) : (
                      <Moon className="size-4 text-muted-foreground" />
                    )}
                    Theme
                  </span>
                  <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {resolvedTheme === "dark" ? "Light" : "Dark"}
                  </span>
                </button>
              </div>

              <div className="my-1 h-px bg-border" />

              <div className="p-1">
                <button
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400"
                >
                  <LogOut className="size-4" />
                  Log out
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 flex size-6 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-accent"
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
