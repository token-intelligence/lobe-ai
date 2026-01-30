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
            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
          <span className="text-sm text-muted-foreground">AI-Powered Life Coaching</span>
        </div>

        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Turn your dreams into{" "}
          <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
            daily actions
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
          Lobe is your personal AI life coach that breaks down your biggest goals into achievable daily micro-tasks.
          Build momentum, stay accountable, and transform your life one day at a time.
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
            <p className="text-3xl font-bold text-foreground">10K+</p>
            <p className="text-sm text-muted-foreground">Dreams Started</p>
          </div>
          <div className="hidden h-8 w-px bg-border sm:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">94%</p>
            <p className="text-sm text-muted-foreground">Completion Rate</p>
          </div>
          <div className="hidden h-8 w-px bg-border sm:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">4.9/5</p>
            <p className="text-sm text-muted-foreground">User Rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}
