# Design System — Arash Youzefnia Portfolio

"Field notes" — a hybrid of a scientist's lab notebook and a builder's terminal log, reflecting the actual pivot the site describes (medical writing/research → building software with AI). Redesigned 2026-07-01 as a bolder pass off the original generic-SaaS build (light theme, Inter, blue accent, pill buttons — see "Superseded" below).

## Tokens (CSS custom properties, `:root`, OKLCH)

| Token | Value | Use |
|---|---|---|
| `--ink` | `oklch(0.17 0.02 55)` | Page background — warm dark ink, not navy-tech |
| `--ink-alt` | `oklch(0.205 0.022 55)` | Alternating section background (Journey, Contact) |
| `--surface` | `oklch(0.23 0.024 55)` | Cards, panels |
| `--surface-2` | `oklch(0.28 0.026 55)` | Reserved for nested/hover surfaces |
| `--border` | `oklch(0.34 0.02 55)` | Hairline borders |
| `--text` | `oklch(0.92 0.014 75)` | Primary text — warm paper-white |
| `--text-muted` | `oklch(0.72 0.02 70)` | Secondary/body copy |
| `--amber` | `oklch(0.78 0.15 85)` | Active-state signal: links, primary buttons, hover, "In Progress" |
| `--amber-soft-bg` / `--amber-soft-text` | `oklch(0.30 0.05 85)` / `oklch(0.86 0.13 88)` | "In Progress" badge |
| `--teal` | `oklch(0.75 0.12 190)` | Dormant-state signal: "Coming Soon", completed-cert marker |
| `--teal-soft-bg` / `--teal-soft-text` | `oklch(0.28 0.045 190)` / `oklch(0.84 0.10 190)` | "Coming Soon" badge |
| `--radius` | `6px` | Card corner radius (was 14px — sharper, less "generic SaaS pill") |
| `--radius-sm` | `4px` | Button/badge corner radius |
| `--max-width` | `1040px` | Content container width (unchanged) |
| `--font-display` | Fraunces (serif, opsz/ital axes) | H1–H3, logo |
| `--font-body` | IBM Plex Sans | Body copy |
| `--font-mono` | IBM Plex Mono | Nav labels aren't mono, but buttons, badges, meta lines, footer, terminal-tag, repo-path, fact labels |

Color strategy: **full palette** (ink neutral + amber + teal, 3 named roles) — earns it because the content itself has two real status states (in-progress vs. coming-soon) that the two accents map onto directly, not decoration for its own sake.

All contrast pairs verified ≥7:1 (body/muted text, both badge variants, both accent-on-ink uses) — see verification method note at bottom.

## Type scale
- H1 (hero): `clamp(2.6rem, 6.4vw, 4.2rem)`, Fraunces weight 600, letter-spacing -0.01em (serif needs less negative tracking than the old grotesk sans did)
- H2 (section): `clamp(1.8rem, 3.2vw, 2.4rem)`, Fraunces 600
- H3 (card/row titles): `1.2–1.35rem`, Fraunces 600
- Body: `1rem`, IBM Plex Sans, line-height 1.6, `--text-muted`
- Terminal-tag (hero, replaces old generic "Portfolio" eyebrow): IBM Plex Mono, `> status: building with AI` — used once, meaningful text rather than a placeholder label, not repeated per-section (avoids the eyebrow-on-every-section tell)
- `.about-text em` (wraps "vibe coding") set in Fraunces italic, amber — reuses existing markup, no HTML restructuring needed

## Components
- **Buttons**: sharp `--radius-sm` (4px) rectangles, IBM Plex Mono label — `.btn-primary` (amber fill, ink text) and `.btn-ghost` (outlined) — deliberately not pill-shaped, per the prior design's own "Known gaps" note
- **Badges**: `[ bracketed ]` mono tags via `::before`/`::after` content (decorative, not in accessible text) — amber for "In Progress" (active), teal for "Coming Soon" (dormant); colors chosen to map onto the content's actual two-state model
- **Course rows** (`.course-row`, Journey): unchanged structure — editorial list, hairline divider, no card/surface
- **Project cards** (`.project-card`, Projects): unchanged structure (white→dark surface swap), now each carries a `.repo-path` mono caption showing the real GitHub path — functional, not decorative
- **About facts panel**: unchanged structure, labels now mono uppercase

## Motion
Unchanged from the prior audit/polish passes — same architecture, just re-themed:
- Scroll-reveal via `IntersectionObserver`, visible-by-default architecture (`.reveal` opacity:1 unless `.js` + `prefers-reduced-motion: no-preference` both hold)
- Staggered reveals within `.course-row`/`.project-card` groups
- `scroll-behavior: smooth` gated behind `prefers-reduced-motion: no-preference`
- Easing switched to `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) from the previous ease-out-quart-ish curve
- No new animated elements added (the terminal-tag cursor is a static `>` glyph, not an animated blink, to avoid any blinking-content concern)

## Layout
Unchanged from prior passes: single `.container` (1040px), sticky blurred header, `.card-grid` auto-fit grid for Projects, `.course-list` flex column for Journey, per-section padding rhythm, one breakpoint at 760px collapsing nav to hamburger. A subtle 48px repeating-linear-gradient grid texture (graph-paper feel, ~3% opacity) was added to the body background — decorative only, doesn't affect any text contrast since it sits behind, not through, text.

## Known gaps vs. impeccable guidance (resolved by this pass)
1. ~~Colors in hex, not OKLCH~~ — now fully OKLCH.
2. ~~Generic SaaS aesthetic~~ — replaced with a palette/type/component system tied to the site's own subject matter (science → code pivot) rather than a safe default.
3. Photo/headshot still a placeholder gap — unchanged, still open (see PRODUCT.md next steps).

## Superseded
The pre-2026-07-01 build used Inter, a light `#fafaf9` background, a flat blue `#2563eb` accent, and pill-shaped (`border-radius: 999px`) buttons/badges. That version's own DESIGN.md flagged itself as a "generic SaaS aesthetic... candidate for a bolder pass" — this redesign is that pass.

## Contrast verification method
Pairs were checked with a standalone OKLCH→sRGB→WCAG-relative-luminance script (Björn Ottosson's OKLab matrices + standard WCAG contrast formula), not by eye. All text pairs landed between 7.2:1 and 15.1:1 against their backgrounds — comfortably above the 4.5:1 body-text floor with margin for future tweaks.

## Live
- https://youzefnia.github.io/
- Repo: https://github.com/Youzefnia/Youzefnia.github.io (auto-deploys from `main` via GitHub Pages)
