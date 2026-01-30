"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export async function login(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/dashboard")
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get("origin") || ""
  
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${origin}/dashboard`,
      data: {
        name,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/auth/sign-up-success")
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}
