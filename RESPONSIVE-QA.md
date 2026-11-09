# AP Responsive QA Standard

Use this checklist for every website before release.

## 1. Viewport matrix

Test at these exact CSS viewport widths. These are test points, not universal device categories.

| Width | Typical scenario | Expected behavior |
|---:|---|---|
| 320px | Compact phone | No horizontal scroll; content remains usable |
| 360px | Android phone | Single-column layout; readable type |
| 390px | Modern phone | Balanced spacing and controls |
| 480px | Large phone | Mobile layout remains intentional |
| 768px | Tablet portrait | Layout changes only where needed |
| 1024px | Tablet landscape / small laptop | Navigation and columns have enough room |
| 1280px | Laptop | Comfortable content width |
| 1440px | Desktop | No excessive line lengths |
| 1920px | Large desktop | Content stays constrained and centered |

Also test at intermediate widths around every CSS breakpoint (for example 759px, 761px, 519px and 521px).

## 2. Visual checks

- [ ] No horizontal page-level scrolling.
- [ ] Overflow is not hidden globally to mask layout defects.
- [ ] No text clipped, overlapped or hidden.
- [ ] Headings wrap naturally; no orphaned single words where avoidable.
- [ ] Paragraph line length stays readable.
- [ ] Navigation does not collide with logos or actions.
- [ ] Cards reflow without awkward gaps.
- [ ] Images preserve aspect ratio and focal point.
- [ ] Backgrounds and decorative elements do not cover content.
- [ ] Footer stacks cleanly on narrow screens.
- [ ] No fixed-width element causes overflow.

## 3. Interaction checks

- [ ] Mobile menu opens, closes and navigates.
- [ ] Mobile menu exposes `aria-expanded` and `aria-controls` and closes with Escape.
- [ ] Current navigation item is exposed with `aria-current`.
- [ ] Theme and viewport controls expose accessible names and pressed state.
- [ ] Reusable buttons inside forms use the correct `type`.
- [ ] All buttons and links work.
- [ ] Controls have visible keyboard focus.
- [ ] Touch targets are ideally at least 44 × 44 CSS pixels.
- [ ] Keyboard-only navigation is possible.
- [ ] Reduced-motion preference is respected.
- [ ] Theme toggle does not reduce contrast or hide content.

## 4. Browser and device checks

Minimum browser pass:
- [ ] Chrome (desktop and Android where available)
- [ ] Safari (iPhone/iPad or WebKit)
- [ ] Firefox desktop
- [ ] Edge desktop

Minimum physical-device pass:
- [ ] One real iPhone or iOS Safari device
- [ ] One real Android device
- [ ] One tablet, if tablet use is important to the audience

Emulation is useful for layout checks but does not fully reproduce touch behavior, font rendering, browser chrome, safe areas, performance or hardware constraints.

## 5. Chrome DevTools procedure

1. Run `npm run dev`.
2. Open the local URL in Chrome.
3. Open DevTools → Toggle device toolbar.
4. Choose Responsive and enter the viewport widths above.
5. Keep zoom at 100% for baseline testing.
6. Inspect the page at breakpoint edges, not only popular presets.
7. In the Console, resolve errors and warnings.
8. In Network, throttle to Fast 4G or Slow 4G and inspect image loading.
9. Test keyboard navigation and touch emulation.
10. Repeat against the deployed site.

## 6. Useful console checks

Run in the browser DevTools console:

```js
// Detect document-level horizontal overflow.
document.documentElement.scrollWidth > document.documentElement.clientWidth

// List elements extending beyond the viewport.
[...document.querySelectorAll('body *')].filter((el) => {
  const r = el.getBoundingClientRect()
  return r.width > 0 && (r.left < 0 || r.right > window.innerWidth + 1)
})

// Inspect the current viewport.
({
  width: window.innerWidth,
  height: window.innerHeight,
  dpr: window.devicePixelRatio,
})
```

Investigate intentional full-bleed decorative elements separately; do not blindly hide overflow to conceal layout defects.

## 7. Performance and accessibility

- [ ] Images use modern formats where possible (AVIF/WebP) and appropriate dimensions.
- [ ] Below-the-fold images use lazy loading.
- [ ] Hero/LCP image is not unnecessarily lazy-loaded.
- [ ] Images have meaningful alt text (or empty alt for decoration).
- [ ] Text/background contrast is sufficient.
- [ ] Heading levels follow a logical hierarchy.
- [ ] Page has a viewport meta tag.
- [ ] Layout remains usable at 200% zoom.
- [ ] Forms have labels and useful error messages.

## 8. Release gate

A page is ready only when:
- `npm run build` succeeds.
- No critical console errors remain.
- No unintended horizontal overflow at 320px–1920px.
- Main journeys work with keyboard and touch.
- At least one real phone and one desktop browser have been checked.


## Premium UI and content checks

- [ ] Navbar remains readable and usable at desktop, laptop, tablet and phone widths.
- [ ] Sticky header does not cover section headings when navigating to anchors.
- [ ] Active navigation state follows the visible section.
- [ ] Mobile menu opens below the header, closes after navigation and closes with Escape.
- [ ] Content is easy to scan: headings, paragraphs, labels and supporting notes have clear hierarchy.
- [ ] Theme toggle preserves contrast in both themes.
- [ ] Text is edited in `src/siteConfig.js` rather than hard-coded in layout markup.
- [ ] Design tokens are edited in `src/styles/tokens.css` rather than scattering one-off colors and spacing values.


## Persistent footer verification
- Footer is portaled to `document.body` to avoid ancestor clipping/containing-block issues.
- Footer background spans the full viewport width; inner content remains aligned to the site content width.
- Verify desktop, tablet, mobile, light theme, and bottom safe-area in a real browser before release.
