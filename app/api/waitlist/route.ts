import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const { error } = await supabase.from("waitlist").insert({ email })

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { success: false, message: "You're already on the waitlist!" },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { success: false, message: "Something went wrong. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: "You're on the list! We'll be in touch soon." },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
