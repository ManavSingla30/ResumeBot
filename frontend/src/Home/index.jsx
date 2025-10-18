import React from 'react'
import Header from '@/components/custom/Header'
import Button from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Sparkles, Zap, Shield, FileText, CheckCircle2, ArrowRight } from 'lucide-react'

function Home() {
  const { isSignedIn } = useUser()

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Assisted Writing',
      desc: 'Generate tailored bullet points and summaries with one click.'
    },
    {
      icon: FileText,
      title: 'ATS Friendly',
      desc: 'Clean structure and keywords that work with modern ATS.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      desc: 'Create a polished resume in minutes, not hours.'
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      desc: 'Your data stays yours, protected by industry best practices.'
    }
  ]

  const primaryCtaHref = isSignedIn ? '/dashboard' : '/auth/sign-in'

  return (
    <>
      <Header/>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-purple-50 dark:from-neutral-950 dark:to-neutral-900">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-neutral-600 dark:text-neutral-300">
                  <Sparkles className="size-4 text-[#9f5bff]"/>
                  <span>Build a standout resume with AI</span>
                </div>
                <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
                  <span className="bg-gradient-to-r from-[#9f5bff] to-[#6a34ff] bg-clip-text text-transparent">Design</span> a better career, faster
                </h1>
                <p className="mt-4 max-w-prose text-neutral-600 dark:text-neutral-300 md:text-lg">
                  Create beautiful, ATS-friendly resumes in minutes. Customize templates, leverage AI suggestions, and export with confidence.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link to={primaryCtaHref}>
                    <Button className="bg-[#9f5bff] text-white hover:bg-[#8a41ff]">
                      Get Started
                      <ArrowRight className="size-4"/>
                    </Button>
                  </Link>
                  <a href="#how-it-works">
                    <Button variant="outline" className="border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800">
                      How it works
                    </Button>
                  </a>
                </div>
                <div className="mt-6 flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                  <CheckCircle2 className="size-4 text-green-500"/>
                  No credit card required
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-400"/>
                    <div className="size-3 rounded-full bg-yellow-400"/>
                    <div className="size-3 rounded-full bg-green-400"/>
                  </div>
                  <div className="rounded-lg border border-dashed border-neutral-200 p-6 dark:border-neutral-700">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Preview</p>
                    <h3 className="mt-2 text-xl font-semibold">Beautiful, ATS-friendly resumes</h3>
                    <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                      <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-green-500"/> Smart sections & formatting</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-green-500"/> AI phrasing and keyword tips</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-green-500"/> One-click PDF export</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Everything you need to shine</h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">Powerful tools without the complexity.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon, title, desc }) => {
              const Icon = icon;
              return (
              <div key={title} className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex size-10 items-center justify-center rounded-lg bg-purple-100 text-[#7a40ff] dark:bg-purple-500/20">
                  <Icon className="size-5"/>
                </div>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{desc}</p>
              </div>
            )})}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">How it works</h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">Three simple steps to your next opportunity.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((num) => (
              <div key={num} className="relative rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <div className="absolute -top-3 left-6 flex size-8 items-center justify-center rounded-full bg-[#9f5bff] text-white">{num}</div>
                <h3 className="mt-4 font-semibold">
                  {num === 1 && 'Tell us about yourself'}
                  {num === 2 && 'Get AI suggestions'}
                  {num === 3 && 'Customize & export'}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                  {num === 1 && 'Add your experience, skills, and education. We structure it smartly.'}
                  {num === 2 && 'Improve your bullets with tailored, role-specific phrasing.'}
                  {num === 3 && 'Polish the design and export your PDF with one click.'}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#9f5bff] to-[#6a34ff] p-8 md:p-12">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white md:text-3xl">Ready to build your standout resume?</h3>
              <p className="mt-2 max-w-prose text-purple-50">Join now and craft a resume that gets you noticed.</p>
              <div className="mt-6">
                <Link to={primaryCtaHref}>
                  <Button className="bg-white text-[#6a34ff] hover:bg-purple-50">
                    Start for free
                    <ArrowRight className="size-4"/>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-white/20 blur-3xl"/>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 bg-white py-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
        © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
      </footer>
    </>
  )
}

export default Home