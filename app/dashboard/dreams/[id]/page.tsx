import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Target } from "lucide-react"
import { DreamTasks } from "@/components/dashboard/dream-tasks"
import { BackButton } from "@/components/dashboard/back-button"
import { DreamProgressUpdater } from "@/components/dashboard/dream-progress-updater"

interface DreamPageProps {
  params: Promise<{ id: string }>
}

export default async function DreamPage({ params }: DreamPageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) notFound()

  const { data: dream } = await supabase
    .from("dreams")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (!dream) notFound()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <BackButton />

      <Card className="mt-6 border-border bg-card">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl text-foreground">{dream.title}</CardTitle>
              {dream.description && (
                <CardDescription className="mt-2 text-muted-foreground">{dream.description}</CardDescription>
              )}
            </div>
            <Badge
              variant={dream.status === "active" ? "default" : dream.status === "completed" ? "secondary" : "outline"}
            >
              {dream.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium text-foreground">{dream.progress}%</span>
              </div>
              <Progress value={dream.progress} className="h-3" />
            </div>

            <div className="flex flex-wrap gap-4">
              {dream.target_date && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Target: {new Date(dream.target_date).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                <span>Created: {new Date(dream.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <DreamProgressUpdater dreamId={dream.id} currentProgress={dream.progress} />
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-foreground">Daily Tasks</h2>
        <DreamTasks dreamId={dream.id} dreamTitle={dream.title} />
      </div>
    </div>
  )
}
