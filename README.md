# Supun Peiris — Portfolio

Dark & cinematic personal portfolio built with React + Vite + Framer Motion.

## Stack
- React 19 + Vite 8
- Framer Motion (scroll animations, film-strip ticker)
- Space Grotesk + Inter fonts (Google Fonts)
- Pure CSS custom properties — no Tailwind needed

## Local Development

```bash
npm install
npm run dev
```

## 🚀 Deploy to GitHub Pages (Free)

### Step 1 — Create a GitHub repo

1. Go to https://github.com/new
2. Name it `supun-portfolio` (or whatever you like)
3. Set it to **Public**
4. Do NOT initialize with README

### Step 2 — Push your code

```bash
cd supun-portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/supun-portfolio.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

After pushing, GitHub Actions will automatically build and deploy.
Then go to:
**Repo → Settings → Pages → Source → Deploy from branch → gh-pages**

Your site will be live at:
`https://YOUR_USERNAME.github.io/supun-portfolio/`

### Step 4 — Update your username in the config

1. In `vite.config.js` → change `base: '/supun-portfolio/'` to your actual repo name if different
2. In `package.json` → update `homepage` to your actual GitHub username
3. In `src/components/Contact.jsx` → update email and social links

## Customization Checklist

- [ ] Update email in `src/components/Contact.jsx`
- [ ] Update GitHub / LinkedIn links in `src/components/Contact.jsx`
- [ ] Add your real projects in `src/components/Projects.jsx`
- [ ] Update bio text in `src/components/About.jsx`
- [ ] Replace `supun-portfolio` with your actual GitHub repo name in `vite.config.js`
- [ ] Replace `yourusername` in `package.json` homepage URL

## Auto-Deploy

Every `git push` to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`) which builds and deploys automatically. No manual steps needed after setup.
