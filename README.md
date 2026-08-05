<h1 align="center">
  Supun N Gunarathna — Developer Portfolio
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-7c5cfc?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/React-19-00d4ff?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-f0b429?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-e040fb?style=for-the-badge" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<p align="center">
  A dark, cinematic personal portfolio built with <strong>React 19 + Vite 8 + Framer Motion</strong>.
  Showcasing mobile app development, web engineering, AI/ML work, and filmmaking — all in one immersive experience.
</p>

<p align="center">
  <a href="https://github.com/supunngunarathna93/supun-dev-portfolio">
    <strong>View on GitHub →</strong>
  </a>
</p>

---

## ✨ Features

- 🌑 **Full dark mode** — deep glassmorphism design throughout, no light mode
- 🎞️ **Cinematic aesthetic** — film-strip ticker, ambient orb glows, smooth scroll animations
- ⚡ **Framer Motion** — scroll-triggered reveals, hover micro-interactions, staggered entries
- 📱 **Fully responsive** — mobile-first layout with fluid typography
- 🗂️ **6 modular sections** — Hero, About, Projects, Skills, Contact, Navbar
- 🎬 **Video project modal** — showcase reels directly within the portfolio
- 🌐 **SEO-optimised** — meta tags, Open Graph, Twitter Card, semantic HTML
- 🚀 **Auto-deploy pipeline** — GitHub Actions workflow → Vercel / GitHub Pages

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Animation | Framer Motion 12 |
| Styling | Pure CSS custom properties (no Tailwind) |
| Typography | Space Grotesk + Outfit + Inter (Google Fonts) |
| Deployment | Vercel (primary) / GitHub Pages (via gh-pages) |
| CI/CD | GitHub Actions |

---

## 📁 Project Structure

```
supun-portfolio/
├── .github/
│   └── workflows/         # GitHub Actions auto-deploy
├── public/                # Static assets (favicon, images)
├── src/
│   ├── assets/            # Icons and media assets
│   ├── components/
│   │   ├── About.jsx      # Bio, stats, info panel
│   │   ├── Contact.jsx    # Contact form & social links
│   │   ├── Hero.jsx       # Landing hero section
│   │   ├── Navbar.jsx     # Sticky navigation bar
│   │   ├── Projects.jsx   # Project cards + video modal
│   │   └── Skills.jsx     # Service / skills grid
│   ├── App.jsx            # Root component
│   ├── index.css          # Global design tokens & styles
│   ├── main.jsx           # React entry point
│   └── ThemeContext.jsx   # Theme context provider
├── index.html             # HTML entry (SEO meta tags, OG, Twitter)
├── vite.config.js         # Vite build configuration
├── package.json           # Project manifest (v1.0.0)
└── eslint.config.js       # ESLint configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/supunngunarathna93/supun-dev-portfolio.git
cd supun-dev-portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The dev server will start at `http://localhost:5173`.

---

## 🌐 Deployment

### Option A — Vercel (Recommended)

1. Import the repository at [vercel.com/new](https://vercel.com/new)
2. Framework preset → **Vite**
3. Build command → `npm run build`
4. Output directory → `dist`
5. Click **Deploy** — done.

Every push to `main` triggers an automatic re-deploy.

### Option B — GitHub Pages

```bash
# Build and publish to the gh-pages branch
npm run deploy
```

Then go to **Repo → Settings → Pages → Source → gh-pages branch**.

> **Note:** If deploying to GitHub Pages, update `vite.config.js` to set `base: '/your-repo-name/'`.

---

## ⚙️ Configuration

Before going live, update the following:

| File | What to change |
|---|---|
| `src/components/Contact.jsx` | Your email address and social links (GitHub, LinkedIn, Instagram) |
| `src/components/About.jsx` | Bio text, stats, and personal info rows |
| `src/components/Projects.jsx` | Your real projects, descriptions, and video URLs |
| `src/components/Hero.jsx` | Hero headline, tagline, and CTA links |
| `package.json` | `homepage` URL → your deployed domain |
| `index.html` | OG image URL once you have a live preview image |

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server (hot-reload) |
| `npm run build` | Build production bundle to `/dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the codebase |
| `npm run deploy` | Build + publish to GitHub Pages |

---

## 🗺️ Sections Overview

| # | Section | Description |
|---|---|---|
| 01 | **Hero** | Full-screen landing with animated headline, role ticker, and CTA buttons |
| 02 | **About** | Stats cards, bio paragraph, and personal info glass panel |
| 03 | **Skills** | Six service cards covering Mobile, Web, AI/ML, Filmmaking, AI Visuals, and i18n |
| 04 | **Projects** | Interactive project cards with video modal for reel playback |
| 05 | **Contact** | Contact form with social links and availability status |

---

## 📸 Credits

- **Fonts:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Outfit](https://fonts.google.com/specimen/Outfit), [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Build:** [Vite](https://vitejs.dev/) + [React](https://react.dev/)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to fork and adapt it for your own portfolio.

---

<p align="center">
  Built with ☕ and 🎬 by <strong>Supun N Gunarathna</strong>
</p>
