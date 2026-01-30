"use client"

import Link from "next/link"
import { signOut } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User as UserIcon } from "lucide-react"

interface DashboardNavProps {
  user: {
    email?: string | null
    user_metadata?: {
      full_name?: string
      name?: string
    }
  }
}

export function DashboardNav({ user }: DashboardNavProps) {
  const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "User"
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">L</span>
          </div>
          <span className="text-xl font-semibold text-foreground">Lobe</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                {initials}
              </div>
              <span className="hidden text-sm text-foreground sm:inline">{displayName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium text-foreground">{displayName}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex cursor-pointer items-center">
                <UserIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex cursor-pointer items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <form action={signOut}>
              <DropdownMenuItem asChild>
                <button type="submit" className="flex w-full cursor-pointer items-center text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
