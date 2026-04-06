"use client"

export default function DashboardPage() {
  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            PaperBoat
          </h1>
          <p className="text-xs text-muted-foreground">Sprint 4 · Week 2</p>
        </div>
      </header>

      {/* Main content area */}
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Dashboard content coming soon...</p>
      </div>
    </>
  )
}
