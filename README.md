# Karthikeyan P — Portfolio

React + Vite + Tailwind CSS + Framer Motion + Lucide.

    npm install
    npm run dev       # local dev
    npm run build     # production build in dist/

## Edit content
All content lives in `src/data/portfolioData.js`.
- Add your GitHub URL to `profile.github` — GitHub buttons appear automatically everywhere.
- Add `github` / `link` per project to show repo / live buttons.
- Resume PDF: `public/resume/Karthikeyan-P-Resume.pdf` (already included from your upload).

## Contact form
No backend is configured, so the form validates and opens the visitor's email app (mailto) — it never fakes delivery. To use a service (Formspree, EmailJS…), replace `submit` in `src/components/Contact.jsx`.

## Shortcuts
Ctrl/Cmd + K opens the command palette (/about /projects /skills /contact /resume).
