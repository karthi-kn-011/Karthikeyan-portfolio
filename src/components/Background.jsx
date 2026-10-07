import { useEffect, useRef } from 'react'
import { isFinePointer } from '../utils/scroll'

// Fixed, low-contrast backdrop: faint grid, soft gradients, noise,
// a slow network of particles and a cursor-following glow.
export default function Background() {
  const canvasRef = useRef(null)
  const glowRef = useRef(null)

  // Network particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let running = true
    let pts = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(18, Math.min(55, Math.floor((w * h) / 32000)))
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        if (!reduce) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
      }
      const maxD = 150
      const isDark = document.documentElement.classList.contains('dark')
      const strokeRgb = isDark ? '120,140,255' : '79,110,247'
      const strokeBaseAlpha = isDark ? 0.12 : 0.28
      const fillStyle = isDark ? 'rgba(160,175,255,0.40)' : 'rgba(67,97,238,0.70)'
      const ptRadius = isDark ? 1.1 : 1.4

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.hypot(dx, dy)
          if (d < maxD) {
            ctx.strokeStyle = `rgba(${strokeRgb},${strokeBaseAlpha * (1 - d / maxD)})`
            ctx.lineWidth = isDark ? 1 : 1.15
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.fillStyle = fillStyle
      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, ptRadius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      if (!running) return
      draw()
      raf = requestAnimationFrame(loop)
    }

    const onVis = () => {
      running = !document.hidden
      if (running && !reduce) loop()
    }

    resize()
    draw()
    if (!reduce) loop()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  // Smooth cursor glow (desktop only)
  useEffect(() => {
    const el = glowRef.current
    if (!el || !isFinePointer()) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 3
    let x = tx
    let y = ty
    let raf = 0
    const move = (e) => {
      tx = e.clientX
      ty = e.clientY
    }
    const tick = () => {
      x += (tx - x) * 0.06
      y += (ty - y) * 0.06
      el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    el.style.opacity = '1'
    window.addEventListener('mousemove', move, { passive: true })
    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <div aria-hidden="true" className="bg-canvas pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="bg-grid absolute inset-0" />
      <div
        className="bg-blob bg-blob-blue absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(79,140,255,.28), transparent)' }}
      />
      <div
        className="bg-blob bg-blob-violet absolute -right-40 top-1/3 h-[480px] w-[480px] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(139,92,246,.25), transparent)' }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        ref={glowRef}
        className="cursor-bg-glow pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-0 will-change-transform"
        style={{ background: 'var(--cursor-bg-glow-gradient, radial-gradient(closest-side, rgba(79,140,255,.10), transparent))' }}
      />
      <div className="noise absolute inset-0" />
    </div>
  )
}
