import { aboutTech, aboutText, profileCard } from '../data/portfolioData'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import Terminal from './Terminal'

function ProfileCard() {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div
      onMouseMove={onMove}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 p-6 sm:p-7"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(99,102,241,.14), transparent 70%)',
        }}
      />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Developer Profile</p>
          <span className="flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-2.5 py-1 font-mono text-[11px] text-amber-300">
            <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-amber-400" aria-hidden="true" />
            currently building
          </span>
        </div>
        <dl className="divide-y divide-white/[0.06]">
          {profileCard.map((r) => (
            <div key={r.k} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">{r.k}</dt>
              <dd className="text-sm font-medium text-zinc-100 sm:text-right">{r.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container-x">
        <SectionHeader eyebrow="About" id="about-title" title="Engineering with curiosity." />
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal className="space-y-5">
            {aboutText.map((t) => (
              <p key={t} className="text-base leading-relaxed text-zinc-300 sm:text-lg">
                {t}
              </p>
            ))}
            <ul className="flex flex-wrap gap-2 pt-2" aria-label="Technologies">
              {aboutTech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
            <Terminal className="mt-6 max-w-xl" />
          </Reveal>
          <Reveal delay={0.1}>
            <ProfileCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
