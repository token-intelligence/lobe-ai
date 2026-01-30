"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
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
          <Sparkles className="h-4 w-4 text-primary" />
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
          <Link href="/auth/sign-up">
            <Button size="lg" className="gap-2">
              Start Your Journey
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="outline" size="lg">
              See How It Works
            </Button>
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
