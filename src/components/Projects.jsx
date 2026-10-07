import { useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  Building2,
  Github,
  HandHeart,
  HeartPulse,
  Network,
  Route,
  ScanSearch,
  Stethoscope,
  Users,
} from 'lucide-react'
import { projects } from '../data/portfolioData'
import Flow, { useCycle } from './Flow'
import ProjectModal from './ProjectModal'
import SectionHeader from './SectionHeader'

const hsdeSteps = [
  { label: 'DONOR', icon: HandHeart },
  { label: 'AI VERIFICATION', icon: ScanSearch },
  { label: 'MATCHING ENGINE', icon: Network },
  { label: 'NGO', icon: Building2 },
  { label: 'VOLUNTEER', icon: Users },
  { label: 'OPTIMIZED ROUTE', icon: Route },
]

function Meta({ p }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-mono text-xs text-zinc-500">{p.num}</span>
        <span className="font-mono text-[11px] text-accent-cyan">{p.category}</span>
      </div>
    </>
  )
}

function Status({ p }) {
  const live = p.progress != null
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-300">
      <span
        className={`h-1.5 w-1.5 rounded-full ${live ? 'animate-pulseDot bg-amber-400' : 'bg-emerald-400'}`}
        aria-hidden="true"
      />
      {p.status}
    </span>
  )
}

function Actions({ p, open }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <button type="button" onClick={() => open(p)} data-magnetic className="btn-primary" aria-label={`View project: ${p.name}`}>
        View Project <ArrowUpRight size={16} aria-hidden="true" />
      </button>
      {p.github && (
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="btn-ghost"
        >
          <Github size={16} aria-hidden="true" /> GitHub
        </a>
      )}
    </div>
  )
}

function Tech({ list }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technology stack">
      {list.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  )
}

/* ---------- previews ---------- */

function EMBookPreview({ p }) {
  const a = useCycle(p.flow.length, 1000)
  return (
    <div className="preview-diagram-box rounded-xl border border-white/10 bg-ink-950/60 p-4" aria-hidden="true">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{p.flowLabel}</p>
      <div className="flex items-center gap-1 overflow-hidden">
        {p.flow.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-1">
            <span
              className={`flex-1 rounded-md border py-2 text-center font-mono text-[11px] transition-all duration-500 ${
                a === -1 || i <= a
                  ? 'border-accent-violet/50 bg-accent-violet/10 text-white embook-step-active'
                  : 'border-white/10 text-zinc-500 embook-step-inactive'
              }`}
            >
              {s}
            </span>
            {i < p.flow.length - 1 && <span className="h-px w-1.5 shrink-0 bg-white/20 sm:w-2" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function ResumePreview({ p }) {
  return (
    <div className="preview-diagram-box rounded-xl border border-white/10 bg-ink-950/60 p-4" aria-hidden="true">
      <Flow steps={p.flow} layout="vertical" compact label="Resume pipeline" />
    </div>
  )
}

function HospireoPreview() {
  return (
    <div
      className="hospireo-preview relative overflow-hidden rounded-xl border border-teal-300/15 bg-gradient-to-br from-teal-400/[0.07] to-transparent p-4"
      aria-hidden="true"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2 text-teal-200">
          <HeartPulse size={16} />
          <span className="font-mono text-[11px] tracking-wider">DEPARTMENTS</span>
        </span>
        <span className="h-2 w-12 rounded-full bg-white/10" />
      </div>
      <div className="mb-4 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-6 rounded-full ${i === 0 ? 'w-16 bg-teal-300/25' : 'w-12 bg-white/[0.06]'}`}
          />
        ))}
      </div>
      <div className="space-y-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="hospireo-item flex items-center gap-3 rounded-lg border border-white/[0.07] bg-ink-900/70 p-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-300/10 text-teal-200">
              <Stethoscope size={16} />
            </span>
            <span className="flex-1 space-y-1.5">
              <span className="block h-2 w-2/5 rounded-full bg-white/20" />
              <span className="block h-1.5 w-1/4 rounded-full bg-white/10" />
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-teal-200">
              <span className={`h-1.5 w-1.5 rounded-full bg-teal-300 ${i === 0 ? 'animate-pulseDot' : ''}`} />
              Availability
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- cards ---------- */

function CardShell({ p, open, className = '', children }) {
  const reduce = useReducedMotion()
  return (
    <motion.article
      data-cursor="view"
      onClick={() => open(p)}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -4 }}
      aria-label={`${p.name} — ${p.full}`}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/70 p-6 transition-colors duration-300 hover:border-white/20 sm:p-8 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,.22), transparent)' }}
      />
      <div className="relative h-full">{children}</div>
    </motion.article>
  )
}

function HeroCard({ p, open }) {
  return (
    <CardShell p={p} open={open} className="md:col-span-12 !border-accent-blue/25 bg-gradient-to-br from-accent-blue/[0.07] via-ink-900/70 to-accent-violet/[0.06]">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <Meta p={p} />
          <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-5xl font-bold text-white sm:text-7xl">{p.name}</h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-blue">Featured</span>
          </div>
          <p className="mt-2 text-lg text-zinc-300">{p.full}</p>
          <div className="mt-4">
            <Status p={p} />
          </div>
          <p className="mt-5 max-w-xl leading-relaxed text-zinc-400">{p.description}</p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {p.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-zinc-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-6 max-w-sm" aria-hidden="true">
            <div className="mb-1.5 flex justify-between font-mono text-[11px] text-zinc-500">
              <span>PROGRESS</span>
              <span>{p.progress}%</span>
            </div>
            <div className="progress-track h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-violet"
                initial={{ width: 0 }}
                whileInView={{ width: `${p.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
              />
            </div>
          </div>

          <Tech list={p.tech} />
          <Actions p={p} open={open} />
        </div>

        <div className="flex items-center">
          <div className="hsde-flow-box w-full rounded-2xl border border-white/10 bg-ink-950/60 p-5 sm:p-6">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Donation flow</p>
            <div className="mx-auto max-w-[260px]">
              <Flow steps={hsdeSteps} layout="vertical" compact label="HSDE donation flow" />
            </div>
          </div>
        </div>
      </div>
    </CardShell>
  )
}

function StdCard({ p, open, span, preview }) {
  return (
    <CardShell p={p} open={open} className={span}>
      <div className="flex h-full flex-col">
        <Meta p={p} />
        <h3 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{p.name}</h3>
        <p className="mt-1 text-zinc-400">{p.full}</p>
        <div className="mt-4">
          <Status p={p} />
        </div>
        <p className="mt-5 leading-relaxed text-zinc-400">{p.description}</p>
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-zinc-300">
          {p.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent-violet" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-6">{preview}</div>
        <Tech list={p.tech} />
        <div className="mt-auto">
          <Actions p={p} open={open} />
        </div>
      </div>
    </CardShell>
  )
}

function WideCard({ p, open }) {
  return (
    <CardShell p={p} open={open} className="md:col-span-12">
      <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div className="order-2 lg:order-1">
          <HospireoPreview />
        </div>
        <div className="order-1 lg:order-2">
          <Meta p={p} />
          <h3 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{p.name}</h3>
          <p className="mt-1 text-zinc-400">{p.full}</p>
          <div className="mt-4">
            <Status p={p} />
          </div>
          <p className="mt-5 max-w-xl leading-relaxed text-zinc-400">{p.description}</p>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-zinc-300">
            {p.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-teal-300" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
          <Tech list={p.tech} />
          <Actions p={p} open={open} />
        </div>
      </div>
    </CardShell>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const open = useCallback((p) => setSelected(p), [])
  const close = useCallback(() => setSelected(null), [])
  const byId = Object.fromEntries(projects.map((p) => [p.id, p]))

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="Projects"
          id="projects-title"
          title="Things I've built."
          subtitle="From intelligent platforms to real-world digital systems."
        />
        <div className="grid gap-5 md:grid-cols-12 md:gap-6">
          <HeroCard p={byId.hsde} open={open} />
          <StdCard p={byId.embook} open={open} span="md:col-span-7" preview={<EMBookPreview p={byId.embook} />} />
          <StdCard p={byId.resume} open={open} span="md:col-span-5" preview={<ResumePreview p={byId.resume} />} />
          <WideCard p={byId.hospireo} open={open} />
        </div>
      </div>
      <ProjectModal project={selected} onClose={close} />
    </section>
  )
}
