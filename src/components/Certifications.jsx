import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Cloud, Database, GraduationCap, ChevronLeft, ChevronRight, Rocket, ShieldCheck } from 'lucide-react'
import { certifications } from '../data/portfolioData'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

const icons = { Cloud, Brain, ShieldCheck, Database, GraduationCap, Rocket }
const PREVIEW = 2

export default function Certifications() {
  const [all, setAll] = useState(false)
  const rail = useRef(null)

  const scrollBy = (dir) => {
    const el = rail.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <section id="certifications" className="section" aria-labelledby="cert-title">
      <div className="container-x">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader eyebrow="Learning" id="cert-title" title="Certifications" subtitle="Continuous learning across cloud, AI, data and security." />
          <div className="mb-12 hidden gap-2 sm:mb-16 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll certifications left"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-zinc-300 hover:border-white/25"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll certifications right"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-zinc-300 hover:border-white/25"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <Reveal>
        <div
          ref={rail}
          tabIndex={0}
          aria-label="Certification categories, scrollable"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 scrollbar-none sm:px-8 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
        >
          {certifications.map((c) => {
            const Icon = icons[c.icon] || Cloud
            const items = all ? c.items : c.items.slice(0, PREVIEW)
            const hidden = c.items.length - items.length
            return (
              <motion.article
                layout
                key={c.cat}
                className="card w-[280px] shrink-0 snap-start p-5 sm:w-[320px] sm:p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-blue">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300">{c.cat}</h3>
                </div>
                <ul className="space-y-2.5">
                  {items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-sm leading-snug text-zinc-300">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-violet" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
                {hidden > 0 && <p className="mt-3 font-mono text-[11px] text-zinc-500">+{hidden} more</p>}
                {c.issuer && all && <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">{c.issuer}</p>}
              </motion.article>
            )
          })}
        </div>
      </Reveal>

      <div className="container-x mt-6">
        <button type="button" onClick={() => setAll((v) => !v)} aria-expanded={all} className="btn-ghost">
          {all ? 'Show fewer' : 'View all certifications'}
        </button>
      </div>
    </section>
  )
}
