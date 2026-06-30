# Design System — Arash Youzefnia Portfolio

Documents the design as currently built (`styles.css`). This was written before the impeccable skill was set up, so it follows general clean-minimal conventions rather than impeccable's brand-register playbook — see "Known gaps" below.

## Tokens (CSS custom properties, `:root`)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#fafaf9` | Page background |
| `--bg-alt` | `#f1f1ef` | Alternating section background (Journey, Contact) |
| `--surface` | `#ffffff` | Cards, panels |
| `--text` | `#1c1c1a` | Primary text |
| `--text-muted` | `#6b6b66` | Secondary/body copy |
| `--border` | `#e4e3df` | Hairline borders |
| `--accent` | `#2563eb` | Links, badges, hover states |
| `--accent-soft` | `#eaf0fe` | "In Progress" badge background |
| `--radius` | `14px` | Card corner radius |
| `--max-width` | `1040px` | Content container width |
| `--font` | Inter (Google Fonts) → system sans fallback | All text |

Colors are plain hex, not OKLCH — a gap against impeccable's "new projects" guidance (not retrofitted since the palette predates this skill setup).

## Type scale
- H1 (hero): `clamp(2.4rem, 6vw, 3.6rem)`, weight 800, letter-spacing -0.02em
- H2 (section): `clamp(1.7rem, 3vw, 2.2rem)`, weight 800
- H3 (card titles): `1.2rem`, weight 800
- Body: `1rem`, line-height 1.6, `--text-muted`
- Eyebrow ("Portfolio" over hero only): uppercase, 0.78rem, letter-spacing 0.12em — used once, not repeated per-section

## Components
- **Buttons**: pill-shaped (`border-radius: 999px`), two variants — `.btn-primary` (solid dark, accent on hover) and `.btn-ghost` (outlined)
- **Course rows** (`.course-row`, Journey section): editorial list, not cards — no surface/border/radius, just a hairline `border-top` divider between rows, title + badge on one baseline-aligned row
- **Project cards** (`.project-card`, Projects section): white surface, 1px border, 14px radius, lift + shadow on hover — kept as cards here specifically because each one is an external GitHub link, where the card affordance earns its keep
- **Badges**: pill labels — `.badge-progress` (`#1d4ed8` on accent-soft) for "In Progress", `.badge-soon` (`#8a5a06` on soft amber) for "Coming Soon" — colors darkened from initial build for contrast margin (~5.4–5.9:1, was borderline ~4.52:1)
- **About facts panel**: bordered surface block with label/value rows

## Motion
- Scroll-reveal via `IntersectionObserver`: `.reveal` elements fade + translateY(16px→0) on first intersect, `threshold: 0.1`, unobserves after firing (one-shot)
- **Visible-by-default architecture**: `.reveal` is `opacity: 1` unless both `.js` is present on `<html>` (added by a synchronous inline script in `<head>`, so it's absent if JS fails/is blocked) and `prefers-reduced-motion: no-preference` matches. No-JS and reduced-motion users always get full content immediately, never a gated/blank state.
- `scroll-behavior: smooth` is likewise gated behind `prefers-reduced-motion: no-preference`.
- **Staggered reveals**: items within `.course-row` and `.project-card` groups get incremental `transition-delay` (0/90/180ms via `nth-child`) instead of the whole group fading in as one block — avoids the "uniform reflex" of identical simultaneous entrances.
- Easing uses `cubic-bezier(0.25, 1, 0.5, 1)` (ease-out-quart-ish), not the bare `ease` keyword.
- Hover states: button lift (`translateY(-2px)`), card lift (`translateY(-4px)` + shadow), all on `transform`/simple properties

## Layout
- Single `.container` (max-width 1040px) reused across all sections
- Sticky header with blur backdrop
- `.card-grid` (Projects only): `repeat(auto-fit, minmax(260px, 1fr))` — responsive without explicit breakpoints
- `.course-list` (Journey): flex column, hairline dividers, no grid — deliberately distinct from `.card-grid` so the two sections don't read as the same repeated widget
- Section padding varies per section instead of one repeated value: hero 96/72, About 88/96, Journey 96, Projects 80/96, Contact 104/112 (top/bottom)
- One explicit breakpoint at 760px: collapses nav to hamburger, About grid to single column
- Mobile nav toggle is a 44×44px tap target (was 32×32px)

## Known gaps vs. impeccable guidance
1. **Colors in hex, not OKLCH** — fine functionally, but not following the "new projects" OKLCH guidance. Low priority: would be a non-visual refactor since the palette is already committed/live.
2. **Generic SaaS aesthetic at the token level** — light theme, Inter, blue accent, pill buttons. The `audit`/`polish` passes broke up the repeated card-grid structure and added rhythm/stagger, but the underlying color/type choices are still a safe default rather than something distinctly *Arash's*. Candidate for a `bolder` pass if he wants more identity.
3. Photo/headshot still a placeholder gap (no image yet) — noted in PRODUCT.md next steps too.

Resolved by the `audit` pass (2026-06-30): reveal-gating blank-content bug, missing `prefers-reduced-motion`, borderline badge contrast, undersized mobile nav-toggle tap target.
Resolved by this `polish` pass (2026-06-30): identical card grids across Journey/Projects, uniform-block (non-staggered) reveals, flat section-padding rhythm, missing `text-wrap: balance`/`pretty`.

## Live
- https://youzefnia.github.io/
- Repo: https://github.com/Youzefnia/Youzefnia.github.io (auto-deploys from `main` via GitHub Pages)
