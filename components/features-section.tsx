import { BookMarked, Globe, Lightbulb, Repeat } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need to master a new language
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools you need to learn English and German effectively.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <Globe className="h-8 w-8 text-primary" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Dual Language Support</h3>
                <p className="text-muted-foreground">
                  Learn both English and German with specialized content for each language.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <BookMarked className="h-8 w-8 text-primary" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Personal Vocabulary Notebook</h3>
                <p className="text-muted-foreground">
                  Save words and phrases to your personal notebook for later review.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <Lightbulb className="h-8 w-8 text-primary" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Smart Translation</h3>
                <p className="text-muted-foreground">
                  Highlight any text to get instant translations and save new words.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Repeat className="h-8 w-8 text-primary" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Practice Mode</h3>
                <p className="text-muted-foreground">Review your saved words with interactive exercises and quizzes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
