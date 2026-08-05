# Althexus — React Version

This is a pixel-for-pixel React (Vite) port of the original static HTML/CSS/JS
Althexus website. Same look, same animations, same content — just rebuilt as
reusable React components.

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  assets/            logo & about images
  components/        one component per section (Navbar, Hero, Stats, About,
                      Mission, WhyChooseUs, Services, Technology, Process,
                      Inquiry, Contact, CTA, Footer, BackToTop)
  hooks/useReveal.js  IntersectionObserver hook that replaces the old
                      script.js scroll-reveal logic
  data.js            all repeated content (stats, services, tech tags,
                      process steps, contact cards, socials) as arrays,
                      so components stay declarative
  App.jsx            assembles all sections
  App.css            the original style.css, unchanged, plus a small
                      `.reveal` / `.in-view` addition for the scroll animation
```

## What changed vs. the original vanilla version

- `script.js` DOM logic (smooth scroll, navbar background on scroll, active
  nav-link highlighting, animated counters, reveal-on-scroll, back-to-top
  button, footer year) was rewritten as React hooks/state instead of direct
  DOM manipulation.
- Repeated markup (service cards, why-choose-us cards, tech pills, process
  steps, contact cards, social links) was extracted into `data.js` and
  rendered with `.map()`.
- Everything else — class names, layout, colors, fonts, Font Awesome icons,
  Google Fonts — is identical to the original so the site looks and feels
  exactly the same.
