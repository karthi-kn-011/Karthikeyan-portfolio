import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Briefcase, Sparkles } from 'lucide-react'
import { experience } from '../data/portfolioData'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

// Reverse-chronological: current role first
const ORDER = ['kln', 'elysium', 'vinsup']
const items = ORDER.map((id) => experience.find((e) => e.id === id)).filter(Boolean)

function Card({ e }) {
  const featured = e.featured
  return (
    <div
      className={`group relative rounded-2xl p-px transition-transform duration-300 hover:-translate-y-1 ${
        featured ? 'bg-gradient-to-br from-accent-blue/60 via-accent-violet/30 to-transparent' : 'bg-white/[0.08]'
      }`}
    >
      <div className={`h-full rounded-[15px] bg-ink-900 ${featured ? 'p-6 sm:p-8' : 'p-5 sm:p-6'}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {e.tagline && (
              <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-cyan">
                <Sparkles size={12} aria-hidden="true" /> {e.tagline}
              </p>
            )}
            <h3 className={`font-semibold text-white ${featured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
              {e.role}
            </h3>
            <p className="mt-1 text-sm text-zinc-300">{e.org}</p>
            <p className="text-sm text-zinc-500">{e.place}</p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            {e.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] font-medium tracking-widest text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-emerald-400" aria-hidden="true" />
                CURRENT
              </span>
            )}
            <span className="font-mono text-xs text-zinc-400">{e.period}</span>
          </div>
        </div>

        <ul className="mt-5 space-y-2.5">
          {e.points.map((p) => (
            <li key={p} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-blue" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>

        {e.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
            {e.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 })

  return (
    <section id="experience" className="section" aria-labelledby="exp-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="Experience"
          id="exp-title"
          title="Experience"
          subtitle="Where I've turned ideas into working systems."
        />

        <div ref={ref} className="relative pl-8 sm:pl-12">
          <div className="absolute bottom-2 left-[11px] top-2 w-px bg-white/10 sm:left-[19px]" aria-hidden="true">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-accent-blue via-accent-violet to-accent-cyan"
              style={{ scaleY: reduce ? 1 : progress }}
            />
          </div>

          <ol className="space-y-8 sm:space-y-10">
            {items.map((e, i) => (
              <li key={e.id} className="relative">
                <span
                  className={`absolute -left-8 top-6 flex h-6 w-6 items-center justify-center rounded-full border bg-ink-950 sm:-left-12 sm:h-10 sm:w-10 ${
                    e.featured ? 'border-accent-blue/60 text-accent-blue' : 'border-white/15 text-zinc-500'
                  }`}
                  aria-hidden="true"
                >
                  <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                </span>
                <Reveal delay={0.05 * i}>
                  <Card e={e} />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
