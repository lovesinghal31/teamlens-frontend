import Link from "next/link"
import {
  Sparkles,
  LayoutDashboard,
  CalendarDays,
  Users,
  MessageSquare,
  ArrowRight,
  Zap,
  TrendingUp,
  Shield,
  Brain,
} from "lucide-react"

const features = [
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    description:
      "Real-time metrics, AI-generated insights, and task tracking at a glance. Know exactly where your project stands.",
    color: "from-indigo-500 to-blue-500",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
  },
  {
    icon: CalendarDays,
    title: "AI Meeting Scheduler",
    description:
      "TeamLens detects blockers and auto-schedules meetings. Approve, reschedule, or let the AI handle it.",
    color: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    icon: Users,
    title: "Team Workload View",
    description:
      "See who's overloaded, who's free, and how tasks are distributed. Balance your team effortlessly.",
    color: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
  {
    icon: MessageSquare,
    title: "Integrated Chat",
    description:
      "Team channels, direct messages, and pinned decisions — all wired into your project context.",
    color: "from-pink-500 to-rose-500",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
]

const stats = [
  { value: "40%", label: "Faster sprint delivery", icon: TrendingUp },
  { value: "3x", label: "Fewer missed deadlines", icon: Shield },
  { value: "AI", label: "Powered scheduling", icon: Brain },
  { value: "5+", label: "Team members supported", icon: Users },
]

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Sparkles className="size-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            TeamLens
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="group flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
          >
            Open Dashboard
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-16 text-center sm:pt-24">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
          <Zap className="size-3.5" />
          AI-Powered Collaboration for Group Projects
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Make teamwork{" "}
          <span className="bg-gradient-to-r from-primary via-indigo-500 to-violet-500 bg-clip-text text-transparent">
            actually work
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Unequal contributions, version control chaos, rushed merges, and
          unproductive meetings define most group projects. TeamLens is an AI
          collaborator that solves all of it through smart communication analysis, task tracking, and meeting intelligence.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:brightness-110"
          >
            Enter Dashboard
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-base font-medium text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-accent hover:text-accent-foreground"
          >
            <CalendarDays className="size-4" />
            View Calendar
          </Link>
        </div>

        {/* Stats ribbon */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-border/50 bg-card/50 px-4 py-5 backdrop-blur-sm transition-all duration-200 hover:border-primary/20 hover:shadow-md"
            >
              <stat.icon className="size-5 text-primary/70" />
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Everything your team needs
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Four integrated tools. One unified experience.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20"
            >
              {/* Gradient highlight on hover */}
              <div
                className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${feature.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10`}
              />

              <div className="relative">
                <div
                  className={`mb-4 flex size-12 items-center justify-center rounded-xl ${feature.iconBg}`}
                >
                  <feature.icon className={`size-6 ${feature.iconColor}`} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <div className="overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent p-10 text-center sm:p-14">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
            <Sparkles className="size-7 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ready to build smarter?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Jump into the dashboard and see how TeamLens transforms your team&apos;s
            workflow with AI-powered insights and automation.
          </p>
          <Link
            href="/login"
            className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:brightness-110"
          >
            Get Started
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 text-center">
        <p className="text-xs text-muted-foreground">
          Built by Team BitWiser · Powered by Next.js & AI
        </p>
      </footer>
    </div>
  )
}
