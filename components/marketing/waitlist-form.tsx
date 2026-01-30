"use client"

import { useState } from "react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setMessage(null)

    // Simulate API call for preview
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setMessage({ type: "success", text: "You're on the list! We'll be in touch soon." })
    setEmail("")
    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? "Joining..." : "Join Waitlist"}
        </button>
      </form>
      {message && (
        <p className={`mt-3 text-sm ${message.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
          {message.text}
        </p>
      )}
    </div>
  )
}
