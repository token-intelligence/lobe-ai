"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, Loader2, RefreshCw } from "lucide-react"
import { toast } from "sonner"

interface DreamTasksProps {
  dreamId: string
  dreamTitle: string
}

interface Task {
  id: string
  title: string
  completed: boolean
}

export function DreamTasks({ dreamTitle }: DreamTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)

  const generateTasks = async () => {
    setIsGenerating(true)
    
    // Simulate AI task generation (in production, this would call an AI API)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const generatedTasks: Task[] = [
      {
        id: "1",
        title: `Research the key requirements for "${dreamTitle}"`,
        completed: false,
      },
      {
        id: "2",
        title: "Write down 3 specific actions you can take this week",
        completed: false,
      },
      {
        id: "3",
        title: "Identify one person who can help you with this goal",
        completed: false,
      },
      {
        id: "4",
        title: "Spend 15 minutes visualizing your success",
        completed: false,
      },
      {
        id: "5",
        title: "Set a reminder to review your progress tomorrow",
        completed: false,
      },
    ]
    
    setTasks(generatedTasks)
    setHasGenerated(true)
    setIsGenerating(false)
    toast.success("Daily tasks generated!")
  }

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
    
    const task = tasks.find(t => t.id === taskId)
    if (task && !task.completed) {
      toast.success("Great job! Keep going!")
    }
  }

  const completedCount = tasks.filter(t => t.completed).length

  if (!hasGenerated) {
    return (
      <Card className="border-dashed border-border bg-card">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">Generate Your Daily Tasks</h3>
          <p className="mt-2 max-w-sm text-center text-muted-foreground">
            {"Let our AI coach create personalized micro-tasks to help you make progress on your dream today."}
          </p>
          <Button onClick={generateTasks} className="mt-6 gap-2" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4" />
                Generate Tasks
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-foreground">{"Today's Tasks"}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {completedCount} of {tasks.length} completed
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={generateTasks}
          disabled={isGenerating}
          className="gap-2"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center gap-3 rounded-lg border border-border p-4 transition-colors ${
                task.completed ? "bg-primary/5 border-primary/30" : "bg-background"
              }`}
            >
              <Checkbox
                id={task.id}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <label
                htmlFor={task.id}
                className={`flex-1 cursor-pointer text-sm ${
                  task.completed ? "text-muted-foreground line-through" : "text-foreground"
                }`}
              >
                {task.title}
              </label>
            </div>
          ))}
        </div>

        {completedCount === tasks.length && tasks.length > 0 && (
          <div className="mt-6 rounded-lg bg-primary/10 p-4 text-center">
            <p className="font-medium text-primary">
              Amazing work! You completed all your tasks for today!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
