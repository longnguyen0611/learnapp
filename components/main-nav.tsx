import Link from "next/link"
import { BookOpen } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <BookOpen className="h-6 w-6" />
        <span className="inline-block font-bold">LinguaLearn</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link
          href="/#features"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Features
        </Link>
        <Link
          href="/#testimonials"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Testimonials
        </Link>
        <Link
          href="/about"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          About
        </Link>
      </nav>
    </div>
  )
}
