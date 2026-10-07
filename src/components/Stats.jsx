import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { stats } from '../data/portfolioData'
import Reveal from './Reveal'

function Counter({ value, suffix, plain }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(plain || reduce ? value : 0)

  useEffect(() => {
    if (!inView || plain || reduce) return
    const c = animate(0, value, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value, plain, reduce])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section aria-label="Engineering stats" className="pb-8">
      <div className="container-x">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.08] lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="bg-ink-900 px-5 py-7 sm:px-7">
              <dd className="font-display text-4xl font-semibold text-white sm:text-5xl">
                <Counter {...s} />
              </dd>
              <dt className="mt-2 text-sm leading-snug text-zinc-400">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
