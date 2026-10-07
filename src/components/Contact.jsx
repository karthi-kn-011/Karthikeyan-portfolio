import { useState } from 'react'
import { Download, FileText, Mail, MapPin, Phone, Send } from 'lucide-react'
import { profile } from '../data/portfolioData'
import Reveal from './Reveal'
import SocialLinks from './SocialLinks'

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your name.'
  if (!v.email.trim()) {
    e.email = 'Please enter your email address.'
  } else if (!emailRx.test(v.email.trim())) {
    e.email = 'Please enter a valid email address.'
  }
  if (!v.subject.trim()) e.subject = 'Please enter a subject.'
  if (!v.message.trim()) e.message = 'Please enter your message.'
  return e
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-zinc-300">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-xs text-rose-400">
          {error}
        </p>
      )}
    </div>
  )
}

const inputCls =
  'w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-base text-white placeholder:text-zinc-600 transition-colors focus:border-accent-blue/60 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 aria-[invalid=true]:border-rose-400/60'

export default function Contact({ onViewResume }) {
  const [v, setV] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | opened

  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }))
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate(v)
    setErrors(errs)
    if (Object.keys(errs).length) return

    const recipient = 'pkarthikeyan553@gmail.com'
    const subject = encodeURIComponent(v.subject.trim())
    const bodyContent = `${v.message.trim()}\n\n---\nSender Name: ${v.name.trim()}\nSender Email: ${v.email.trim()}`
    const body = encodeURIComponent(bodyContent)

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`
    setState('opened')
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container-x">
        <Reveal className="contact-card relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-accent-blue/[0.08] via-ink-900/80 to-accent-violet/[0.08] p-6 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 id="contact-title" className="h2">
                Let&apos;s build something <span className="gradient-text">meaningful.</span>
              </h2>
              <p className="sub">Have an idea, opportunity, collaboration or technical challenge? Let&apos;s talk.</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={`mailto:${profile.email}`} className="btn-primary" data-magnetic>
                  <Mail size={16} aria-hidden="true" /> Email Me
                </a>
                <button
                  type="button"
                  onClick={onViewResume}
                  className="btn-ghost"
                  data-magnetic
                >
                  <FileText size={16} aria-hidden="true" /> View Resume
                </button>
                <a
                  href={profile.resume}
                  download="Karthikeyan_P_Resume.pdf"
                  className="btn-ghost"
                  data-magnetic
                >
                  <Download size={16} aria-hidden="true" /> Download Resume
                </a>
              </div>
              <SocialLinks withLabels className="mt-3" />

              <ul className="mt-8 space-y-3 text-sm text-zinc-300">
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-zinc-500" aria-hidden="true" /> {profile.location}
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-zinc-500" aria-hidden="true" />
                  <a href={`mailto:${profile.email}`} className="break-all hover:text-white">
                    {profile.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-zinc-500" aria-hidden="true" />
                  <a href={profile.phoneHref} className="hover:text-white" aria-label={`Call ${profile.phone}`}>
                    <span className="sm:hidden">Call me</span>
                    <span className="hidden sm:inline">{profile.phone}</span>
                  </a>
                </li>
              </ul>
            </div>

            <form onSubmit={submit} noValidate className="grid gap-4" aria-label="Contact form">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="cf-name" label="Name" error={errors.name}>
                  <input
                    id="cf-name"
                    name="name"
                    autoComplete="name"
                    value={v.name}
                    onChange={set('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'cf-name-err' : undefined}
                    className={inputCls}
                    placeholder="Your name"
                  />
                </Field>
                <Field id="cf-email" label="Email" error={errors.email}>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={v.email}
                    onChange={set('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'cf-email-err' : undefined}
                    className={inputCls}
                    placeholder="you@example.com"
                  />
                </Field>
              </div>
              <Field id="cf-subject" label="Subject" error={errors.subject}>
                <input
                  id="cf-subject"
                  name="subject"
                  value={v.subject}
                  onChange={set('subject')}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'cf-subject-err' : undefined}
                  className={inputCls}
                  placeholder="Portfolio Contact / Opportunity / Inquiry"
                />
              </Field>
              <Field id="cf-msg" label="Message" error={errors.message}>
                <textarea
                  id="cf-msg"
                  name="message"
                  rows={5}
                  value={v.message}
                  onChange={set('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'cf-msg-err' : undefined}
                  className={`${inputCls} resize-y`}
                  placeholder="Tell me about your idea or opportunity…"
                />
              </Field>
              <button type="submit" className="btn-primary w-full sm:w-auto sm:self-start">
                <Send size={16} aria-hidden="true" /> Send Mail
              </button>
              <p className="text-xs leading-relaxed text-zinc-500" role="status">
                {state === 'opened'
                  ? 'Your email app should now be open with the recipient, subject and message prefilled. Nothing is sent until you press send there.'
                  : 'This opens your email app with the recipient, subject and message prefilled — nothing is sent until you press send.'}
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
