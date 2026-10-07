import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import Flow from './Flow'

function Block({ title, children }) {
  return (
    <section className="border-t border-white/10 py-7">
      <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-blue">{title}</h3>
      {children}
    </section>
  )
}

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    if (!project) return
    lastFocus.current = document.activeElement
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setTimeout(() => closeRef.current?.focus(), 50)

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        // keep focus inside the dialog
        const root = document.getElementById('project-modal')
        const f = root?.querySelectorAll('a[href], button:not([disabled])')
        if (!f || !f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      lastFocus.current?.focus?.()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          id="project-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pm-title"
          className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-ink-950/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="mx-auto min-h-full w-full max-w-4xl px-5 pb-16 pt-5 sm:px-8"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-0 z-10 -mx-5 flex items-center justify-between bg-gradient-to-b from-ink-950 to-transparent px-5 py-3 sm:-mx-8 sm:px-8">
              <span className="font-mono text-xs text-zinc-500">CASE STUDY · {project.num}</span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/15 bg-ink-900 px-4 text-sm text-zinc-200 transition-colors hover:border-white/30"
              >
                <X size={16} aria-hidden="true" /> Close
              </button>
            </div>

            <header className="pb-8 pt-4">
              <p className="font-mono text-xs text-accent-cyan">{project.category}</p>
              <h2 id="pm-title" className="mt-3 text-4xl font-bold text-white sm:text-6xl">
                {project.name}
              </h2>
              <p className="mt-2 text-lg text-zinc-400">{project.full}</p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <Github size={16} aria-hidden="true" /> GitHub
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <ExternalLink size={16} aria-hidden="true" /> Live
                  </a>
                )}
              </div>
            </header>

            <Block title="Problem">
              <p className="leading-relaxed text-zinc-300">{project.case.problem}</p>
            </Block>
            <Block title="Solution">
              <p className="leading-relaxed text-zinc-300">{project.case.solution}</p>
            </Block>
            <Block title="Architecture">
              <div className="rounded-xl border border-white/10 bg-ink-900/70 p-4 sm:p-6">
                <Flow steps={project.arch} label={`${project.name} architecture`} />
              </div>
            </Block>
            <Block title="Key features">
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.case.features.map((f) => (
                  <li key={f} className="flex gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-sm leading-relaxed text-zinc-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-violet" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Technology stack">
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Current status">
              <p className="text-zinc-300">{project.status}</p>
              {project.progress != null && (
                <div className="mt-3 h-1.5 max-w-sm overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-violet"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              )}
            </Block>
            <Block title="My contribution">
              <p className="leading-relaxed text-zinc-300">{project.case.contribution}</p>
            </Block>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
