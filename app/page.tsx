"use client"

import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { WhatIsIA } from "@/components/what-is-ia"
import { WhyTryIA } from "@/components/why-try-ia"
import { WaitlistForm } from "@/components/download-form"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Hero />
      <Features />
      <WhatIsIA />
      <WhyTryIA />
      <WaitlistForm />
      <Footer />
    </main>
  )
}
