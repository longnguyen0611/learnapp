"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onDemoClick?: () => void
}

export function HeroSection({ onDemoClick }: HeroSectionProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Learn English and German the Smart Way
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Enhance your language skills with our interactive platform. Save words, practice translations, and track
                your progress.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {onDemoClick && (
                <Button size="lg" onClick={onDemoClick} className="bg-green-600 hover:bg-green-700">
                  🎯 Try Demo Account
                </Button>
              )}
              <Link href="/register">
                <Button size="lg" variant="outline">
                  Get Started
                </Button>
              </Link>
              <Link href="/#features">
                <Button size="lg" variant="ghost">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <img
            src="/placeholder.svg?height=550&width=550"
            width="550"
            height="550"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  )
}
