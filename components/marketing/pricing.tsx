import Link from "next/link"

const plans = [
  {
    name: "Basic",
    price: "$9",
    period: "/month",
    description: "Dream capture essentials",
    features: [
      "Dream completion",
      "Audio playback",
      "7-day dream history",
      "Basic biometric sync",
    ],
    cta: "Join Waitlist",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For dream explorers",
    features: [
      "Everything in Basic",
      "AI dream interpretation",
      "Unlimited dream history",
      "Pattern recognition",
      "Recurring dream alerts",
      "Multi-device household",
    ],
    cta: "Join Waitlist",
    popular: true,
  },
  {
    name: "Plus",
    price: "$29",
    period: "/month",
    description: "The complete experience",
    features: [
      "Everything in Pro",
      "Dream image generation",
      "Dream video generation",
      "Shareable dream content",
      "Priority support",
      "Early feature access",
    ],
    cta: "Join Waitlist",
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Device + Subscription
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Purchase your Lobe device, then choose a plan that fits your dream exploration needs.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl bg-card p-8 ${
                plan.popular ? "border-2 border-primary ring-1 ring-primary" : "border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#waitlist"
                className={`mt-8 block w-full rounded-lg px-4 py-3 text-center font-semibold transition-colors ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border text-foreground hover:bg-card"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Lobe device sold separately. Extended free trial required to build your dream pattern profile.
        </p>
      </div>
    </section>
  )
}
