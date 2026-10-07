import { Award, Users } from 'lucide-react'
import { achievements } from '../data/portfolioData'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

const leadership = new Set(['Leadership', 'Core Team', 'Team'])

export default function Achievements() {
  return (
    <section id="achievements" className="section" aria-labelledby="ach-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="Recognition"
          id="ach-title"
          title="Recognition & Leadership"
          subtitle="Hackathons, conferences and teams I've contributed to."
        />
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {achievements.map((a, i) => {
            const Icon = leadership.has(a.tag) ? Users : Award
            return (
              <Reveal as="li" key={a.t} delay={(i % 2) * 0.06} y={16}>
                <div className="group flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-ink-900/60 p-5 transition-colors hover:border-white/20">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-violet transition-colors group-hover:text-accent-blue">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold leading-snug text-white">{a.t}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{a.s}</p>
                    <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                      {a.tag}
                    </span>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
