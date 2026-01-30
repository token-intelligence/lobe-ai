import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { BackButton } from "@/components/dashboard/back-button"

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const displayName = user?.user_metadata?.full_name || ""
  const email = user?.email || ""

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <BackButton />

      <div className="mt-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your account settings</p>
      </div>

      <Card className="mt-8 border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Profile</CardTitle>
          <CardDescription className="text-muted-foreground">Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={displayName} disabled className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={email} disabled className="bg-muted" />
          </div>
          <p className="text-xs text-muted-foreground">
            Profile editing coming soon. Contact support for urgent changes.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6 border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Subscription</CardTitle>
          <CardDescription className="text-muted-foreground">Your current plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
            <div>
              <p className="font-medium text-foreground">Free Plan</p>
              <p className="text-sm text-muted-foreground">1 active dream, basic features</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Current</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Upgrade to Pro for unlimited dreams and advanced AI coaching. Coming soon!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
