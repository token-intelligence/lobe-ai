"use client"

import { useState } from "react"
import Link from "next/link"
import { login } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    const result = await login(formData)
    if (result?.error) {
      toast.error(result.error)
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="text-center">
          <Link href="/" className="mb-4 inline-flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">L</span>
            </div>
          </Link>
          <CardTitle className="text-2xl text-foreground">Welcome back</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to continue your journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                required
                className="bg-background"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/auth/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
