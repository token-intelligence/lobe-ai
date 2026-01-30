"use client"

import { useState } from "react"
import { updateDreamProgress } from "@/app/actions/dreams"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface DreamProgressUpdaterProps {
  dreamId: string
  currentProgress: number
}

export function DreamProgressUpdater({ dreamId, currentProgress }: DreamProgressUpdaterProps) {
  const [progress, setProgress] = useState(currentProgress)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async () => {
    if (progress === currentProgress) return

    setIsLoading(true)
    const result = await updateDreamProgress(dreamId, progress)

    if (result.error) {
      toast.error(result.error)
      setIsLoading(false)
      return
    }

    toast.success(result.completed ? "Congratulations! Dream completed!" : "Progress updated!")
    setIsLoading(false)
  }

  return (
    <div className="space-y-4 rounded-lg border border-border bg-muted/30 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Update Progress</span>
        <span className="text-sm font-bold text-primary">{progress}%</span>
      </div>
      <Slider
        value={[progress]}
        onValueChange={(value) => setProgress(value[0])}
        max={100}
        step={5}
        className="w-full"
      />
      <Button
        onClick={handleUpdate}
        disabled={progress === currentProgress || isLoading}
        size="sm"
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          "Save Progress"
        )}
      </Button>
    </div>
  )
}
