import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface WelcomeCardProps {
  name: string
  dreamsCount: number
}

export function WelcomeCard({ name, dreamsCount }: WelcomeCardProps) {
  const greeting = getGreeting()

  return (
    <Card className="border-border bg-card">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {greeting}, {name}!
          </h1>
          <p className="text-muted-foreground">
            {dreamsCount === 0
              ? "Ready to start your journey? Create your first dream and let's make it happen."
              : `You have ${dreamsCount} active dream${dreamsCount === 1 ? "" : "s"}. Keep pushing forward!`}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}
