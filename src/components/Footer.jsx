import { profile } from '../data/portfolioData'
import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-x flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-white">{profile.name}</p>
          <p className="mt-1 text-sm text-zinc-400">Building intelligent systems, one problem at a time.</p>
        </div>
        <SocialLinks />
      </div>
      <div className="container-x mt-8 flex flex-col gap-1 border-t border-white/[0.06] pt-6 text-xs text-zinc-500 sm:flex-row sm:justify-between">
        <p>© 2026 Karthikeyan P</p>
        <p>Designed &amp; Built with React</p>
      </div>
    </footer>
  )
}
