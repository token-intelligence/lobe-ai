"use client"

import { useState } from "react"
import { createDream } from "@/app/actions/dreams"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2, Plus, Sparkles } from "lucide-react"

export function NewDreamButton() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    const result = await createDream(formData)

    if (result.error) {
      toast.error(result.error)
      setIsLoading(false)
      return
    }

    toast.success("Dream created! Let's make it happen.")
    setOpen(false)
    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Dream
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Create a New Dream</DialogTitle>
          <DialogDescription className="text-center">
            {"What's your biggest goal? Share it and we'll help you break it down into achievable steps."}
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Dream Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Start my own business"
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your dream in more detail..."
              rows={3}
              className="resize-none bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetDate">Target Date (optional)</Label>
            <Input
              id="targetDate"
              name="targetDate"
              type="date"
              className="bg-background"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Dream"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
