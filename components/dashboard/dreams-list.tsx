"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Target, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

interface Dream {
  id: string
  title: string
  description: string | null
  status: string
  progress: number
  target_date: string | null
  created_at: string
}

interface DreamsListProps {
  dreams: Dream[]
}

export function DreamsList({ dreams }: DreamsListProps) {
  const router = useRouter()

  const handleDelete = async (dreamId: string) => {
    const supabase = createClient()
    const { error } = await supabase.from("dreams").delete().eq("id", dreamId)

    if (error) {
      toast.error("Failed to delete dream")
      return
    }

    toast.success("Dream deleted")
    router.refresh()
  }

  if (dreams.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
        <Target className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">No dreams yet</h3>
        <p className="mt-2 text-center text-muted-foreground">
          Create your first dream and start your journey towards achieving it.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {dreams.map((dream) => (
        <Card key={dream.id} className="group border-border bg-card transition-colors hover:border-primary/50">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <CardTitle className="line-clamp-1 text-foreground">{dream.title}</CardTitle>
                {dream.description && (
                  <CardDescription className="mt-1 line-clamp-2 text-muted-foreground">
                    {dream.description}
                  </CardDescription>
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
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{dream.progress}%</span>
                </div>
                <Progress value={dream.progress} className="h-2" />
              </div>

              {dream.target_date && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Target: {new Date(dream.target_date).toLocaleDateString()}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Link href={`/dashboard/dreams/${dream.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(dream.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
