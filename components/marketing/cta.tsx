import { WaitlistForm } from "./waitlist-form"

export function CTA() {
  return (
    <section id="waitlist" className="bg-card py-24 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to transform your life?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
          Join thousands of dreamers who are turning their goals into reality. Get early access and be the first to
          experience Lobe AI.
        </p>

        <div className="mt-10 flex justify-center">
          <WaitlistForm />
        </div>

        <p className="mt-4 text-sm text-muted-foreground">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
