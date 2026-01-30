import { Brain, Calendar, LineChart, MessageSquare, Target, Zap } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Brain,
    title: "AI Dream Analysis",
    description:
      "Share your biggest dreams and our AI breaks them down into a structured roadmap with clear milestones.",
  },
  {
    icon: Calendar,
    title: "Daily Micro-Tasks",
    description:
      "Every day, receive 3-5 personalized tasks that move you closer to your goals. Small steps, big results.",
  },
  {
    icon: MessageSquare,
    title: "Coaching Conversations",
    description:
      "Chat with your AI coach anytime. Get motivation, overcome obstacles, and refine your approach.",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description:
      "Visualize your journey with beautiful dashboards. See your streaks, milestones, and growth over time.",
  },
  {
    icon: Target,
    title: "Adaptive Goals",
    description: "Life changes. Your plan adapts. The AI recalibrates tasks based on your progress and feedback.",
  },
  {
    icon: Zap,
    title: "Momentum Building",
    description:
      "Build unstoppable momentum through consistent daily wins. Watch your confidence and results grow.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to achieve your dreams
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Powerful AI coaching tools designed to help you break through barriers and make consistent progress.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card border-border transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
