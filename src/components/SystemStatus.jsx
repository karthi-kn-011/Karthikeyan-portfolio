const rows = [
  { k: 'Portfolio', v: 'ONLINE', c: 'bg-emerald-400', t: 'text-emerald-300' },
  { k: 'HSDE', v: 'BUILDING', c: 'bg-amber-400', t: 'text-amber-300' },
  { k: 'AI Pipeline', v: 'ACTIVE', c: 'bg-accent-cyan', t: 'text-cyan-300' },
  { k: 'Developer', v: 'AVAILABLE', c: 'bg-emerald-400', t: 'text-emerald-300' },
]

export default function SystemStatus({ className = '' }) {
  return (
    <div
      className={`status-card rounded-xl border border-white/10 bg-ink-900/80 p-4 font-mono text-xs ${className}`}
      role="status"
      aria-label="System status"
    >
      <p className="mb-3 tracking-[0.2em] text-zinc-500">SYSTEM STATUS</p>
      <ul className="space-y-2">
        {rows.map((r, i) => (
          <li key={r.k} className="flex items-center justify-between gap-6">
            <span className="text-zinc-400">{r.k}</span>
            <span className={`flex items-center gap-2 ${r.t}`}>
              <span
                className={`h-1.5 w-1.5 animate-pulseDot rounded-full ${r.c}`}
                style={{ animationDelay: `${i * 0.35}s` }}
                aria-hidden="true"
              />
              {r.v}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
