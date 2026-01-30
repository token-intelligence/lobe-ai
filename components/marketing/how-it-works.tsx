export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Share Your Dream",
      description:
        "Tell Lobe about your biggest goal. Whether it's starting a business, getting fit, or learning a new skill - we've got you covered.",
    },
    {
      step: "02",
      title: "Get Your Roadmap",
      description:
        "Our AI analyzes your dream and creates a personalized roadmap with milestones, timelines, and the first steps to take.",
    },
    {
      step: "03",
      title: "Complete Daily Tasks",
      description:
        "Each day, you'll receive 3-5 micro-tasks tailored to your energy, schedule, and progress. Check them off and build momentum.",
    },
    {
      step: "04",
      title: "Transform Your Life",
      description:
        "Watch as small daily actions compound into massive results. Track your progress and celebrate every milestone.",
    },
  ]

  return (
    <section id="how-it-works" className="bg-card py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How Lobe works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Four simple steps to transform your dreams into reality
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-[calc(50%+2rem)] hidden h-0.5 w-[calc(100%-4rem)] bg-border lg:block" />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <span className="text-lg font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
