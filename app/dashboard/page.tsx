import { createClient } from "@/lib/supabase/server"
import { DreamsList } from "@/components/dashboard/dreams-list"
import { NewDreamButton } from "@/components/dashboard/new-dream-button"
import { WelcomeCard } from "@/components/dashboard/welcome-card"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: dreams } = await supabase
    .from("dreams")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "there"

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <WelcomeCard name={displayName} dreamsCount={dreams?.length || 0} />
      
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Your Dreams</h2>
          <NewDreamButton />
        </div>
        
        <DreamsList dreams={dreams || []} />
      </div>
    </div>
  )
}
