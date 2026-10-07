import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, ExternalLink, FileText, X } from 'lucide-react'
import { profile } from '../data/portfolioData'

export default function ResumeModal({ open, onClose }) {
  const closeRef = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setTimeout(() => closeRef.current?.focus(), 50)

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const root = document.getElementById('resume-modal-dialog')
        const focusable = root?.querySelectorAll('a[href], button:not([disabled])')
        if (!focusable || !focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
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
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      lastFocus.current?.focus?.()
    }
  }, [open, onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = profile.resume
    link.download = 'Karthikeyan_P_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="resume-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          className="fixed inset-0 z-[85] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            id="resume-modal-dialog"
            className="flex h-[82vh] max-h-[850px] w-full max-w-[840px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-ink-900 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-accent-blue">
                  <FileText size={16} aria-hidden="true" />
                </span>
                <div>
                  <h2 id="resume-modal-title" className="font-display text-sm font-semibold text-white sm:text-base">
                    {profile.name} — Resume
                  </h2>
                  <p className="font-mono text-[10px] text-zinc-400 sm:text-[11px]">PDF Document Viewer</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="btn-primary !min-h-[36px] !px-3 !py-1.5 !text-xs"
                  aria-label="Download resume PDF"
                >
                  <Download size={14} aria-hidden="true" />
                  <span className="hidden sm:inline">Download</span>
                </button>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !min-h-[36px] !px-3 !py-1.5 !text-xs"
                  aria-label="Open resume in new tab"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  <span className="hidden sm:inline">Open</span>
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
                  aria-label="Close resume viewer"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="relative flex-1 bg-zinc-950/50 p-2 sm:p-3">
              <iframe
                src={`${profile.resume}#view=FitH`}
                title={`${profile.name} Resume`}
                className="h-full w-full rounded-xl border border-white/10 bg-white"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
