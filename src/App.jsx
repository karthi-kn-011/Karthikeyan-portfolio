import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react'
import Background from './components/Background'
import Cursor from './components/Cursor'
import CommandPalette from './components/CommandPalette'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Experience from './components/Experience'
import useActiveSection from './hooks/useActiveSection'
import useTheme from './hooks/useTheme'
import ResumeModal from './components/ResumeModal'
import { nav } from './data/portfolioData'

// Below-the-fold sections load after the first viewport is interactive.
const loaders = {
  Projects: () => import('./components/Projects'),
  Building: () => import('./components/Building'),
  Skills: () => import('./components/Skills'),
  Approach: () => import('./components/Approach'),
  Achievements: () => import('./components/Achievements'),
  Certifications: () => import('./components/Certifications'),
  Education: () => import('./components/Education'),
  Contact: () => import('./components/Contact'),
  Footer: () => import('./components/Footer'),
}
const L = Object.fromEntries(Object.entries(loaders).map(([k, f]) => [k, lazy(f)]))

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [palette, setPalette] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const ids = useMemo(() => nav.map((n) => n.id), [])
  const active = useActiveSection(ids)

  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 400))
    const h = idle(() => Object.values(loaders).forEach((f) => f()))
    return () => (window.cancelIdleCallback ? window.cancelIdleCallback(h) : clearTimeout(h))
  }, [])

  // Ctrl/Cmd + K opens the command palette
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Honour deep links once lazy sections have rendered
  useEffect(() => {
    if (!window.location.hash) return
    const id = window.location.hash.slice(1)
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 900)
    return () => clearTimeout(t)
  }, [])

  const closePalette = useCallback(() => setPalette(false), [])

  return (
    <>
      <a
        href="#about"
        className="sr-only z-[200] rounded-lg bg-white px-4 py-2 text-sm font-medium text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Background />
      <Cursor />
      <Navbar
        active={active}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenPalette={() => setPalette(true)}
        onViewResume={() => setResumeOpen(true)}
      />
      <CommandPalette
        open={palette}
        onClose={closePalette}
        onViewResume={() => setResumeOpen(true)}
      />

      <main>
        <Hero onViewResume={() => setResumeOpen(true)} />
        <About />
        <Stats />
        <Experience />
        <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
          <L.Projects />
          <L.Building />
          <L.Skills />
          <L.Approach />
          <L.Achievements />
          <L.Certifications />
          <L.Education />
          <L.Contact onViewResume={() => setResumeOpen(true)} />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <L.Footer />
      </Suspense>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  )
}
