"use server"

import { createClient } from "@/lib/supabase/server"

export async function joinWaitlist(email: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("waitlist").insert({ email })

  if (error) {
    if (error.code === "23505") {
      return { success: false, message: "You're already on the waitlist!" }
    }
    return { success: false, message: "Something went wrong. Please try again." }
  }

  return { success: true, message: "You're on the list! We'll be in touch soon." }
}
