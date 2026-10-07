import { useEffect, useState } from 'react'

// Active section = the last one whose top has passed ~40% of the viewport.
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    let raf = 0
    const compute = () => {
      raf = 0
      const line = window.innerHeight * 0.4
      let cur = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) cur = id
      }
      setActive((p) => (p === cur ? p : cur))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
