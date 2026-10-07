import { useEffect, useRef, useState } from 'react'
import { isFinePointer } from '../utils/scroll'

// Desktop-only custom cursor: dot, expands on interactives,
// shows "VIEW" on project cards, magnetic pull on [data-magnetic].
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState('default') // default | hover | view

  useEffect(() => {
    if (!isFinePointer()) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor')
    return () => document.documentElement.classList.remove('custom-cursor')
  }, [])

  useEffect(() => {
    if (!enabled) return
    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let raf = 0
    let magnet = null

    const resetMagnet = () => {
      if (magnet) {
        magnet.style.transform = ''
        magnet = null
      }
    }

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      const t = e.target instanceof Element ? e.target : null
      if (!t) return
      if (t.closest('[data-cursor="view"]')) setMode('view')
      else if (t.closest('a, button, input, textarea, [role="button"], summary')) setMode('hover')
      else setMode('default')

      const m = t.closest('[data-magnetic]')
      if (m !== magnet) resetMagnet()
      if (m) {
        const r = m.getBoundingClientRect()
        const dx = (x - (r.left + r.width / 2)) * 0.22
        const dy = (y - (r.top + r.height / 2)) * 0.22
        m.style.transform = `translate(${dx}px, ${dy}px)`
        magnet = m
      }
    }

    const tick = () => {
      rx += (x - rx) * 0.2
      ry += (y - ry) * 0.2
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    const onLeave = () => {
      resetMagnet()
      setMode('default')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      resetMagnet()
    }
  }, [enabled])

  if (!enabled) return null

  const size = mode === 'view' ? 76 : mode === 'hover' ? 44 : 0

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100]">
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 will-change-transform">
        <div className="cursor-dot -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full transition-colors duration-200" />
      </div>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 will-change-transform">
        <div
          className="cursor-ring pointer-events-none flex items-center justify-center rounded-full border font-mono text-[10px] tracking-widest transition-[width,height,opacity,border-color,background-color,color] duration-200"
          style={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
            opacity: size ? 1 : 0,
          }}
        >
          {mode === 'view' ? 'VIEW' : ''}
        </div>
      </div>
    </div>
  )
}
