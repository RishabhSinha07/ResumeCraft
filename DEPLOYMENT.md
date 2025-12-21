# Deployment Guide for ResumeCraft

This guide covers deploying ResumeCraft to various platforms.

## Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest and most popular option for React/Vite apps.

### Steps:

1. **Install Vercel CLI** (optional, but recommended):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via CLI**:
   ```bash
   vercel
   ```
   Follow the prompts to link your project to Vercel.

3. **OR Deploy via GitHub** (Recommended):
   - Push your code to GitHub (if not already done)
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Import your `ResumeCraft` repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

4. **Configure Settings** (if needed):
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

That's it! Your site will be live at `https://your-project-name.vercel.app`

**Advantages:**
- Free tier with generous limits
- Automatic HTTPS
- Global CDN
- Auto-deploy on every git push
- Preview deployments for PRs

---

## Option 2: Netlify

Netlify is another excellent option with a great free tier.

### Steps:

1. **Deploy via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

2. **OR Deploy via GitHub** (Recommended):
   - Push your code to GitHub
   - Go to https://app.netlify.com
   - Sign in with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Netlify will auto-detect settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Configure Redirects** (already done in `netlify.toml`):
   The `netlify.toml` file is already configured for React Router.

Your site will be live at `https://your-project-name.netlify.app`

**Advantages:**
- Free tier with good limits
- Automatic HTTPS
- Global CDN
- Form handling (if needed later)
- Split testing support

---

## Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

### Steps:

1. **Install gh-pages package**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   Add these scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Update vite.config.ts**:
   Add base path:
   ```ts
   export default defineConfig({
     base: '/ResumeCraft/', // Replace with your repo name
     plugins: [react()],
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repo Settings → Pages
   - Source: Select `gh-pages` branch
   - Save

Your site will be at `https://rishabhsinha07.github.io/ResumeCraft/`

**Note:** GitHub Pages uses HTTP/2, which is great for static sites.

---

## Option 4: Cloudflare Pages

Fast, free, and great for static sites.

### Steps:

1. **Push code to GitHub**

2. **Deploy via Cloudflare Dashboard**:
   - Go to https://dash.cloudflare.com
   - Select "Pages" → "Create a project"
   - Connect your GitHub account
   - Select your `ResumeCraft` repository
   - Build settings:
     - Framework preset: Vite
     - Build command: `npm run build`
     - Build output directory: `dist`
   - Click "Save and Deploy"

Your site will be at `https://your-project-name.pages.dev`

**Advantages:**
- Free unlimited bandwidth
- Very fast CDN
- Automatic HTTPS
- Fast builds

---

## Pre-Deployment Checklist

Before deploying, make sure:

- ✅ Build runs successfully: `npm run build`
- ✅ All environment variables are set (if any)
- ✅ `.gitignore` excludes `node_modules` and `dist`
- ✅ Repository is pushed to GitHub (for CI/CD)
- ✅ `package.json` has correct project name

---

## Recommended: Vercel or Netlify

For ResumeCraft, I recommend **Vercel** or **Netlify** because:
- Zero configuration needed
- Automatic deployments on git push
- Preview deployments for pull requests
- Free tier is more than enough
- Excellent performance

Both are equally good choices - pick whichever you prefer!

---

## Post-Deployment

After deployment:

1. Test all features (especially PDF export)
2. Check mobile responsiveness
3. Test all routes work correctly
4. Verify PDF export works in production
5. Set up custom domain (optional, in platform settings)

