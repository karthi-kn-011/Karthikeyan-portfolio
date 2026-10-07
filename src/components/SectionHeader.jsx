import Reveal from './Reveal'

export default function SectionHeader({ eyebrow, title, subtitle, id }) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="h2">
        {title}
      </h2>
      {subtitle && <p className="sub">{subtitle}</p>}
    </Reveal>
  )
}
