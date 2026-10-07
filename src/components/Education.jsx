import { education } from '../data/portfolioData'
import Reveal from './Reveal'

export default function Education() {
  return (
    <section id="education" className="py-14 sm:py-20" aria-labelledby="edu-title">
      <div className="container-x">
        <Reveal>
          <h2 id="edu-title" className="font-mono text-xs uppercase tracking-[0.2em] text-accent-blue">
            Education
          </h2>
          <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {education.map((e) => (
              <li key={e.title} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white">{e.title}</h3>
                  <p className="text-sm text-zinc-400">{e.org}</p>
                </div>
                <div className="text-sm sm:text-right">
                  <p className="font-mono text-zinc-300">{e.score}</p>
                  <p className="text-zinc-500">{e.meta}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
