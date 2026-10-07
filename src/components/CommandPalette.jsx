import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CornerDownLeft, Search } from 'lucide-react'
import { commands } from '../data/portfolioData'
import { scrollToId } from '../utils/scroll'

export default function CommandPalette({ open, onClose, onViewResume }) {
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const inputRef = useRef(null)

  const list = useMemo(() => {
    const s = q.trim().toLowerCase().replace(/^\//, '')
    return commands.filter((c) => !s || c.cmd.includes(s) || c.label.toLowerCase().includes(s))
  }, [q])

  useEffect(() => {
    if (open) {
      setQ('')
      setIdx(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  useEffect(() => setIdx(0), [q])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const run = (c) => {
    if (!c) return
    onClose()
    if (c.cmd === '/resume' && onViewResume) {
      onViewResume()
    } else if (c.href) {
      window.open(c.href, '_blank', 'noopener')
    } else {
      setTimeout(() => scrollToId(c.id), 120)
    }
  }

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIdx((i) => Math.min(i + 1, list.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIdx((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(list[idx])
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[18vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl"
            initial={{ y: -12, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search size={16} className="text-zinc-500" aria-hidden="true" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Type a command…"
                aria-label="Search commands"
                className="h-12 w-full bg-transparent font-mono text-sm text-white placeholder:text-zinc-600 focus:outline-none"
              />
              <kbd className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">ESC</kbd>
            </div>
            <ul className="max-h-72 overflow-auto p-2" role="listbox">
              {list.length === 0 && <li className="px-3 py-6 text-center text-sm text-zinc-500">No matching command</li>}
              {list.map((c, i) => (
                <li key={c.cmd} role="option" aria-selected={i === idx}>
                  <button
                    type="button"
                    onMouseEnter={() => setIdx(i)}
                    onClick={() => run(c)}
                    className={`flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
                      i === idx ? 'bg-white/[0.07]' : ''
                    }`}
                  >
                    <span className="font-mono text-sm text-accent-cyan">{c.cmd}</span>
                    <span className="flex items-center gap-2 text-sm text-zinc-400">
                      {c.label}
                      {i === idx && <CornerDownLeft size={13} aria-hidden="true" />}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
