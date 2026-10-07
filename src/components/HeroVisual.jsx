import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { heroNodes } from '../data/portfolioData'

const C = 200 // center
const R = 138

export default function HeroVisual() {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState(null)

  const nodes = heroNodes.map((label, i) => {
    const a = (-90 + (360 / heroNodes.length) * i) * (Math.PI / 180)
    return { label, x: C + R * Math.cos(a), y: C + R * Math.sin(a), i }
  })

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[520px]">
      <div
        aria-hidden="true"
        className="absolute inset-[12%] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,.28), transparent)' }}
      />
      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-label="Architecture diagram: K.P at the centre connected to React, Node.js, MongoDB, Python, AI, Computer Vision and FastAPI"
        className="relative h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="hv-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4f8cff" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
          <radialGradient id="hv-core" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#1b1b33" />
            <stop offset="1" stopColor="#0d0d18" />
          </radialGradient>
        </defs>

        <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,.05)" />
        <circle cx={C} cy={C} r={R + 38} fill="none" stroke="rgba(255,255,255,.03)" strokeDasharray="2 6" />

        {/* ring links between neighbours */}
        {nodes.map((n, i) => {
          const m = nodes[(i + 1) % nodes.length]
          return (
            <line
              key={'r' + i}
              x1={n.x}
              y1={n.y}
              x2={m.x}
              y2={m.y}
              stroke="rgba(130,140,255,.12)"
              strokeWidth="1"
            />
          )
        })}

        {/* spokes */}
        {nodes.map((n) => (
          <line
            key={'s' + n.label}
            x1={C}
            y1={C}
            x2={n.x}
            y2={n.y}
            stroke={hover === n.label ? '#8b9dff' : 'url(#hv-g)'}
            strokeOpacity={hover === n.label ? 0.95 : 0.4}
            strokeWidth={hover === n.label ? 1.6 : 1}
            className={reduce ? '' : 'flow-line'}
            style={{ transition: 'stroke-opacity .2s' }}
          />
        ))}

        {/* core */}
        <g>
          <circle cx={C} cy={C} r="46" fill="url(#hv-core)" stroke="url(#hv-g)" strokeWidth="1.5" />
          {!reduce && (
            <motion.circle
              cx={C}
              cy={C}
              r="46"
              fill="none"
              stroke="#6d7bff"
              strokeOpacity="0.5"
              initial={{ r: 46, opacity: 0.5 }}
              animate={{ r: 78, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <text
            x={C}
            y={C + 7}
            textAnchor="middle"
            fill="#fff"
            fontFamily="Space Grotesk, Inter, sans-serif"
            fontSize="22"
            fontWeight="700"
            letterSpacing="1"
          >
            K.P
          </text>
        </g>

        {/* satellites */}
        {nodes.map((n) => {
          const w = n.label.length * 6.4 + 22
          return (
            <motion.g
              key={n.label}
              onMouseEnter={() => setHover(n.label)}
              onMouseLeave={() => setHover(null)}
              animate={reduce ? undefined : { y: [0, n.i % 2 ? -4 : 4, 0] }}
              transition={{ duration: 5 + n.i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ cursor: 'default' }}
            >
              <rect
                x={n.x - w / 2}
                y={n.y - 13}
                width={w}
                height="26"
                rx="13"
                className="hero-node-bg"
                fill="#0e0e18"
                stroke={hover === n.label ? '#8b9dff' : 'rgba(255,255,255,.14)'}
                style={{ transition: 'stroke .2s' }}
              />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                className="hero-node-text"
                fill={hover === n.label ? '#fff' : '#c4c4d4'}
                fontFamily="JetBrains Mono, monospace"
                fontSize="10.5"
              >
                {n.label}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
