import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { approach } from '../data/portfolioData'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

export default function Approach() {
  const [active, setActive] = useState(0)

  return (
    <section id="approach" className="section" aria-labelledby="approach-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="Process"
          id="approach-title"
          title="My engineering approach"
          subtitle="How an idea becomes dependable software."
        />
        <Reveal>
          <ol className="flex flex-col gap-3 lg:h-72 lg:flex-row">
            {approach.map((s, i) => {
              const on = active === i
              return (
                <li
                  key={s.n}
                  className={`min-w-0 transition-[flex] duration-500 ease-out ${on ? 'lg:flex-[2.6]' : 'lg:flex-1'}`}
                  onMouseEnter={() => setActive(i)}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-expanded={on}
                    className={`flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-5 text-left transition-colors duration-300 ${
                      on
                        ? 'border-accent-blue/40 bg-gradient-to-br from-accent-blue/[0.12] to-accent-violet/[0.06]'
                        : 'border-white/10 bg-ink-900/60 hover:border-white/20'
                    }`}
                  >
                    <span className={`font-mono text-sm ${on ? 'text-accent-cyan' : 'text-zinc-600'}`}>{s.n}</span>
                    <span>
                      <span className="block text-xl font-semibold text-white sm:text-2xl">{s.t}</span>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.span
                            key="d"
                            className="block overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className="mt-2 block text-sm leading-relaxed text-zinc-300">{s.d}</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
