# Abhinav Potdar — Diwali Landing Page (Template Responsive Edition)

This React + Vite project keeps the Diwali greeting and work-in-progress content while applying the responsive foundation and breakpoint strategy from the supplied AP Responsive Design System template.

## Responsive template conventions used
- Central design tokens in `src/styles/tokens.css`
- Global accessibility and responsive defaults in `src/styles/global.css`
- Content-first layout and fluid typography with `clamp()`
- Breakpoint system: 1100px, 900px, 760px, 540px and 360px
- Compact phone, phone, tablet, laptop and desktop layout adjustments
- Reduced-motion support, safe-area padding, keyboard focus defaults and minimum 320px viewport support

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```
Upload the generated `dist/` folder to Cloudflare Pages, or connect this repository to GitHub and use:
- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`

Keep your Zoho MX, SPF, DKIM and DMARC DNS records when configuring the domain.

## Responsive QA
Check at 320, 360, 390, 480, 540, 760, 768, 900, 1024, 1100, 1280, 1440 and 1920px. Also inspect breakpoint edges and confirm there is no horizontal overflow.
