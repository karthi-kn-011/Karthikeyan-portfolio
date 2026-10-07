import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/portfolioData'

// GitHub is only rendered once a URL is provided in portfolioData.js
export function socialList() {
  const list = []
  if (profile.github) list.push({ label: 'GitHub', href: profile.github, Icon: Github, ext: true })
  list.push({ label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin, ext: true })
  list.push({ label: 'Email', href: `mailto:${profile.email}`, Icon: Mail })
  return list
}

export default function SocialLinks({ withLabels = false, className = '' }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {socialList().map(({ label, href, Icon, ext }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            data-magnetic
            {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-zinc-300 transition-colors hover:border-white/25 hover:text-white ${
              withLabels ? 'px-4' : 'w-11 justify-center'
            }`}
          >
            <Icon size={18} aria-hidden="true" />
            {withLabels && label}
          </a>
        </li>
      ))}
    </ul>
  )
}
