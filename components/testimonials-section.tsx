export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What our users say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our community of language learners.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <h3 className="font-bold">Sarah K.</h3>
                <p className="text-sm text-muted-foreground">English Learner</p>
              </div>
              <p className="text-muted-foreground">
                "The highlight-to-translate feature has been a game-changer for my reading practice. I can quickly learn
                new words without disrupting my flow."
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <h3 className="font-bold">Michael T.</h3>
                <p className="text-sm text-muted-foreground">German Learner</p>
              </div>
              <p className="text-muted-foreground">
                "I love how I can save words to my notebook and review them later. It's helped me expand my German
                vocabulary significantly."
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <h3 className="font-bold">Elena R.</h3>
                <p className="text-sm text-muted-foreground">Bilingual Learner</p>
              </div>
              <p className="text-muted-foreground">
                "Being able to switch between English and German has been perfect for my learning goals. The interface
                is intuitive and the content is engaging."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
