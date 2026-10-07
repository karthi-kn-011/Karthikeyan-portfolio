import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Command, Menu, Moon, Sun, X } from 'lucide-react'
import { nav, profile } from '../data/portfolioData'
import { scrollToId } from '../utils/scroll'

export default function Navbar({ active, onOpenPalette, theme = 'light', toggleTheme, onViewResume }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    setTimeout(() => scrollToId(id), open ? 220 : 0)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border px-3 pl-4 transition-all duration-300 sm:px-4 ${
          scrolled || open
            ? 'border-white/10 bg-ink-950/70 shadow-[0_8px_30px_rgba(0,0,0,.35)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setOpen(false)
          }}
          aria-label="Karthikeyan P — back to top"
          className="font-display text-lg font-bold tracking-tight text-white"
        >
          K<span className="gradient-text">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => go(n.id)}
                aria-current={active === n.id ? 'true' : undefined}
                className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                  active === n.id ? 'text-white' : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {n.label}
                {active === n.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-accent-blue to-accent-violet"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Theme Switcher Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
          >
            {theme === 'dark' ? (
              <Sun size={17} aria-hidden="true" />
            ) : (
              <Moon size={17} aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette (Ctrl+K)"
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 font-mono text-[11px] text-zinc-500 transition-colors hover:text-zinc-200 lg:inline-flex"
          >
            <Command size={12} aria-hidden="true" /> K
          </button>
          <button
            type="button"
            onClick={onViewResume}
            data-magnetic
            className="btn-primary hidden h-9 !min-h-[36px] items-center rounded-lg px-4 text-sm font-medium sm:inline-flex"
          >
            Resume
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-zinc-200 hover:bg-white/5 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-ink-950/95 shadow-2xl backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.22 }}
          >
            <ul className="p-2">
              {nav.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <button
                    type="button"
                    onClick={() => go(n.id)}
                    className={`flex min-h-[48px] w-full items-center rounded-xl px-4 text-left text-base ${
                      active === n.id ? 'bg-white/[0.06] text-white' : 'text-zinc-300'
                    }`}
                  >
                    {n.label}
                  </button>
                </motion.li>
              ))}
              <li className="flex flex-col gap-2 p-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    onViewResume?.()
                  }}
                  className="btn-primary w-full"
                >
                  View Resume
                </button>
                <a
                  href={profile.resume}
                  download="Karthikeyan_P_Resume.pdf"
                  className="btn-ghost w-full"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
