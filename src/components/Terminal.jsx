import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const OUTPUT = {
  whoami: 'karthikeyan — full stack developer',
  focus: 'Full Stack + AI Systems',
  current_project: 'HSDE — Hyperlocal Smart Donation Engine',
  status: 'Building...',
}
const INTRO = ['whoami', 'focus', 'current_project', 'status']

export default function Terminal({ className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const [lines, setLines] = useState([])
  const [typing, setTyping] = useState('')
  const [val, setVal] = useState('')
  const started = useRef(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    if (reduce) {
      setLines(INTRO.map((c) => ({ cmd: c, out: OUTPUT[c] })))
      return
    }
    let cancelled = false
    const wait = (ms) => new Promise((r) => setTimeout(r, ms))
    ;(async () => {
      for (const c of INTRO) {
        for (let i = 1; i <= c.length; i++) {
          if (cancelled) return
          setTyping(c.slice(0, i))
          await wait(45)
        }
        await wait(220)
        if (cancelled) return
        setTyping('')
        setLines((l) => [...l, { cmd: c, out: OUTPUT[c] }])
        await wait(280)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [inView, reduce])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines, typing])

  const run = (raw) => {
    const c = raw.trim().toLowerCase()
    if (!c) return
    if (c === 'clear') return setLines([])
    if (c === 'help')
      return setLines((l) => [...l, { cmd: c, out: 'commands: ' + [...Object.keys(OUTPUT), 'clear'].join(', ') }])
    setLines((l) => [...l, { cmd: c, out: OUTPUT[c] ?? `command not found: ${c} (try "help")` }])
  }

  return (
    <div ref={ref} className={`terminal-box overflow-hidden rounded-xl border border-white/10 bg-ink-900/90 ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="ml-2 font-mono text-[11px] text-zinc-500">karthikeyan@developer:~</span>
      </div>
      <div ref={bodyRef} className="h-48 overflow-auto p-4 font-mono text-[13px] leading-6" aria-live="polite">
        {lines.map((l, i) => (
          <div key={i}>
            <div>
              <span className="text-accent-cyan">$</span> <span className="text-zinc-200">{l.cmd}</span>
            </div>
            <div className="mb-1 text-zinc-400">{l.out}</div>
          </div>
        ))}
        {typing && (
          <div>
            <span className="text-accent-cyan">$</span> <span className="text-zinc-200">{typing}</span>
            <span className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulseDot bg-zinc-300" />
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            run(val)
            setVal('')
          }}
          className="flex items-center gap-2"
        >
          <label htmlFor="term-in" className="text-accent-cyan">
            $
          </label>
          <input
            id="term-in"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="try: help"
            autoComplete="off"
            spellCheck="false"
            className="w-full bg-transparent text-zinc-200 placeholder:text-zinc-700 focus:outline-none"
          />
        </form>
      </div>
    </div>
  )
}
