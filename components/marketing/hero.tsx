import Link from "next/link"

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-16">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
          <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
          </svg>
          <span className="text-sm text-muted-foreground">AI-Powered Dream Capture</span>
        </div>

        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Never lose a{" "}
          <span className="bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
            dream again
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
          Lobe is a screenless AI device that captures your dreams while you sleep and completes them before they fade.
          Wake up to a full narrative of what you dreamed - ready to share over morning coffee.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#waitlist"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Join Waitlist
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="#how-it-works"
            className="rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-card"
          >
            See How It Works
          </Link>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-12">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">66%</p>
            <p className="text-sm text-muted-foreground">of Americans are sleep-deprived</p>
          </div>
          <div className="hidden h-8 w-px bg-border sm:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">5 min</p>
            <p className="text-sm text-muted-foreground">before dreams fade from memory</p>
          </div>
          <div className="hidden h-8 w-px bg-border sm:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">REM</p>
            <p className="text-sm text-muted-foreground">sleep detection via biometrics</p>
          </div>
        </div>
      </div>
    </section>
  )
}
