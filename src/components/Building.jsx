import { motion, useReducedMotion } from 'framer-motion'
import { building } from '../data/portfolioData'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import SystemStatus from './SystemStatus'

function Ring({ value }) {
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <div className="relative h-36 w-36 shrink-0" role="img" aria-label={`${building.name} is ${value}% complete`}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="7" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#ring-g)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - value / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="ring-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4f8cff" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold text-white">{value}%</span>
        <span className="font-mono text-[10px] tracking-widest text-zinc-500">COMPLETE</span>
      </div>
    </div>
  )
}

export default function Building() {
  const reduce = useReducedMotion()
  return (
    <section id="building" className="section" aria-labelledby="build-title">
      <div className="container-x">
        <SectionHeader eyebrow="Now" id="build-title" title="Currently building." />
        <div className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal className="building-card rounded-3xl border border-white/10 bg-ink-900/70 p-6 sm:p-8">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <Ring value={building.progress} />
              <div>
                <p className="font-mono text-xs text-amber-300">● IN PROGRESS</p>
                <h3 className="mt-1 text-3xl font-bold text-white">{building.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">Hyperlocal Smart Donation Engine · IEEE Final-Year Project</p>
              </div>
            </div>

            <ul className="mt-8 space-y-4" aria-label="HSDE modules in development">
              {building.modules.map((m, i) => (
                <li key={m}>
                  <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-300">{m}</span>
                    <span className="text-zinc-600">in development</span>
                  </div>
                  <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.07]" aria-hidden="true">
                    <motion.span
                      className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-accent-blue to-transparent"
                      initial={{ left: '-35%' }}
                      animate={reduce ? { left: '33%' } : { left: ['-35%', '102%'] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="flex items-start">
            <SystemStatus className="w-full" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
