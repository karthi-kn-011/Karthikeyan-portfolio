import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, Download, FileText } from 'lucide-react'
import { profile } from '../data/portfolioData'
import { scrollToId } from '../utils/scroll'
import HeroVisual from './HeroVisual'
import SocialLinks from './SocialLinks'

export default function Hero({ onViewResume }) {
  const reduce = useReducedMotion()
  const item = (d) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section id="top" aria-label="Introduction" className="relative flex min-h-[100svh] items-center pb-24 pt-28 sm:pt-32">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <motion.div {...item(0.05)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 font-mono text-xs text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for opportunities
            </span>
          </motion.div>

          {/* Primary Name Headline with High Prominence & Visibility */}
          <motion.h1
            {...item(0.12)}
            className="mt-6 font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-7xl"
          >
            Karthikeyan P
          </motion.h1>

          {/* Subheading / Value Proposition */}
          <motion.p
            {...item(0.2)}
            className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight text-zinc-100 sm:text-3xl lg:text-[2.5rem]"
          >
            Building <span className="gradient-text">intelligent systems</span> that solve real problems.
          </motion.p>

          <motion.p
            {...item(0.3)}
            className="mt-3 flex flex-col gap-0.5 font-mono text-[13px] text-accent-cyan sm:flex-row sm:flex-wrap sm:gap-2 sm:text-xs"
          >
            {profile.roles.map((r) => (
              <span key={r} className="sm:rounded-full sm:border sm:border-accent-cyan/20 sm:bg-accent-cyan/[0.05] sm:px-3 sm:py-1">
                {r}
              </span>
            ))}
          </motion.p>

          <motion.p {...item(0.38)} className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400">
            {profile.intro}
          </motion.p>

          <motion.div {...item(0.46)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button type="button" onClick={() => scrollToId('projects')} data-magnetic className="btn-primary">
              <span className="sm:hidden">View Projects</span>
              <span className="hidden sm:inline">View My Work</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onViewResume}
              data-magnetic
              className="btn-ghost"
            >
              <FileText size={16} aria-hidden="true" />
              <span className="sm:hidden">Resume</span>
              <span className="hidden sm:inline">View Resume</span>
            </button>
            <a
              href={profile.resume}
              download="Karthikeyan_P_Resume.pdf"
              data-magnetic
              className="btn-ghost"
            >
              <Download size={16} aria-hidden="true" />
              <span className="sm:hidden">Download</span>
              <span className="hidden sm:inline">Download Resume</span>
            </a>
          </motion.div>

          <motion.div {...item(0.54)} className="mt-6">
            <SocialLinks />
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-4 lg:mt-0"
        >
          <HeroVisual />
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => scrollToId('about')}
        aria-label="Scroll to explore"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-zinc-300 sm:flex"
      >
        Scroll to explore
        <ArrowDown size={16} className="animate-bounceY" aria-hidden="true" />
      </button>
    </section>
  )
}
