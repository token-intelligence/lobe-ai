"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createDream(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to create a dream" }
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const targetDate = formData.get("targetDate") as string

  const { error } = await supabase.from("dreams").insert({
    user_id: user.id,
    title: title.trim(),
    description: description?.trim() || null,
    target_date: targetDate || null,
    status: "active",
    progress: 0,
  })

  if (error) {
    return { error: "Failed to create dream" }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function deleteDream(dreamId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("dreams").delete().eq("id", dreamId)

  if (error) {
    return { error: "Failed to delete dream" }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function updateDreamProgress(dreamId: string, progress: number) {
  const supabase = await createClient()
  
  const status = progress === 100 ? "completed" : "active"

  const { error } = await supabase
    .from("dreams")
    .update({ progress, status })
    .eq("id", dreamId)

  if (error) {
    return { error: "Failed to update progress" }
  }

  revalidatePath("/dashboard")
  revalidatePath(`/dashboard/dreams/${dreamId}`)
  return { success: true, completed: progress === 100 }
}
