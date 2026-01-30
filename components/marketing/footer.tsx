import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">L</span>
            </div>
            <span className="text-xl font-semibold text-foreground">Lobe</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
            <Link href="/auth/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Log In
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Lobe AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
