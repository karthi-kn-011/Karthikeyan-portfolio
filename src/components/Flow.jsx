import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'

// Cycles an "active" index to give diagrams a gentle, low-cost sense of flow.
export function useCycle(length, ms = 1300, enabled = true) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!enabled || reduce || length < 2) return
    const t = setInterval(() => setI((v) => (v + 1) % length), ms)
    return () => clearInterval(t)
  }, [length, ms, enabled, reduce])
  return reduce ? -1 : i
}

function Connector({ vertical, lit }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center ${vertical ? 'h-6 w-full' : 'w-6'} ${
        lit ? 'text-accent-blue' : 'text-zinc-700 flow-connector-line'
      } transition-colors duration-500`}
    >
      {vertical ? (
        <svg width="12" height="24" viewBox="0 0 12 24" className="overflow-visible">
          <line x1="6" y1="0" x2="6" y2="24" stroke="currentColor" strokeWidth="1.4" className="flow-line" />
        </svg>
      ) : (
        <svg width="24" height="12" viewBox="0 0 24 12" className="overflow-visible">
          <line x1="0" y1="6" x2="24" y2="6" stroke="currentColor" strokeWidth="1.4" className="flow-line" />
        </svg>
      )}
    </span>
  )
}

/**
 * steps: string[]  — or { label, icon: Component }[]
 * layout: 'vertical' | 'horizontal' | 'responsive' (vertical on mobile, horizontal from md)
 */
export default function Flow({ steps, layout = 'responsive', compact = false, label = 'Flow diagram' }) {
  const active = useCycle(steps.length)
  const norm = steps.map((s) => (typeof s === 'string' ? { label: s } : s))
  const dir =
    layout === 'vertical'
      ? 'flex-col items-stretch'
      : layout === 'horizontal'
        ? 'flex-row flex-wrap items-center'
        : 'flex-col items-stretch md:flex-row md:flex-wrap md:items-center'

  const isVertical = (md) => (layout === 'vertical' ? true : layout === 'horizontal' ? false : md)

  return (
    <ol className={`flex ${dir} gap-y-0`} aria-label={label}>
      {norm.map((s, i) => {
        const on = active === i
        const Icon = s.icon
        return (
          <li key={s.label} className={`flex ${layout === 'vertical' ? 'flex-col' : 'flex-col md:flex-row'} items-center`}>
            <span
              className={`flex w-full items-center justify-center gap-2 rounded-lg border px-3 font-mono text-[11px] transition-all duration-500 sm:text-xs ${
                compact ? 'py-1.5' : 'py-2.5'
              } ${
                on
                  ? 'border-accent-blue/60 bg-accent-blue/10 text-white shadow-[0_0_24px_-6px_rgba(79,140,255,.6)] flow-step-active'
                  : 'border-white/10 bg-white/[0.02] text-zinc-300 flow-step-inactive'
              }`}
            >
              {Icon && <Icon size={14} className={on ? 'text-accent-blue' : 'text-zinc-500 flow-icon'} aria-hidden="true" />}
              {s.label}
            </span>
            {i < norm.length - 1 && (
              <>
                {layout === 'responsive' ? (
                  <>
                    <span className="md:hidden">
                      <Connector vertical lit={on} />
                    </span>
                    <span className="hidden md:block">
                      <Connector lit={on} />
                    </span>
                  </>
                ) : (
                  <Connector vertical={isVertical(false)} lit={on} />
                )}
              </>
            )}
          </li>
        )
      })}
    </ol>
  )
}

export { ChevronDown, ChevronRight }
