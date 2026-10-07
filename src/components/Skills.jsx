import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { skills } from '../data/portfolioData'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

function Pill({ label, hot }) {
  const reduce = useReducedMotion()
  return (
    <motion.li
      whileHover={reduce ? undefined : { y: -3, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      tabIndex={0}
      className={`cursor-default rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-accent-blue ${
        hot
          ? 'border-accent-blue/50 bg-accent-blue/10 text-white'
          : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-accent-blue/50 hover:bg-accent-blue/10 hover:text-white focus:border-accent-blue/50 focus:text-white'
      }`}
    >
      {label}
    </motion.li>
  )
}

export default function Skills() {
  const [filter, setFilter] = useState('All')
  const cats = ['All', ...skills.map((s) => s.cat)]
  const shown = filter === 'All' ? skills : skills.filter((s) => s.cat === filter)

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="Skills"
          id="skills-title"
          title="Technical Arsenal"
          subtitle="The languages, frameworks and tools I build with."
        />

        <Reveal className="-mx-5 mb-8 overflow-x-auto px-5 pb-2 scrollbar-none sm:mx-0 sm:px-0">
          <div role="group" aria-label="Filter skills by category" className="flex gap-2 sm:flex-wrap">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`min-h-[40px] shrink-0 rounded-full border px-4 text-sm transition-colors ${
                  filter === c
                    ? 'border-white bg-white text-ink-950'
                    : 'border-white/10 text-zinc-400 hover:border-white/25 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((s, i) => (
              <motion.div
                layout
                key={s.cat}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className={`card p-5 sm:p-6 ${s.items.length > 5 ? 'lg:col-span-2' : ''}`}
              >
                <h3 className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
                  {s.cat}
                  <span className="text-zinc-600">{String(s.items.length).padStart(2, '0')}</span>
                </h3>
                <ul className="flex flex-wrap gap-2" aria-label={`${s.cat} skills`}>
                  {s.items.map((it) => (
                    <Pill key={it} label={it} />
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
