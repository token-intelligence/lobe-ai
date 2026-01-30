export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Place on Nightstand",
      description:
        "Set up your Lobe device on your nightstand and connect it to your biometric tracker (Fitbit, Oura, Apple Watch, etc.).",
    },
    {
      step: "02",
      title: "Sleep Naturally",
      description:
        "Lobe monitors your biometrics and begins recording when you enter REM sleep - the phase when dreams occur.",
    },
    {
      step: "03",
      title: "Share Your Recall",
      description:
        "Wake up and tell Lobe what you remember of your dream. Even fragments help complete the picture.",
    },
    {
      step: "04",
      title: "Listen to Your Dream",
      description:
        "Lobe combines overnight recordings, biometric data, and your recall to play back your completed dream narrative.",
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
            From nightstand to morning coffee - your dreams, captured and completed
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
