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
- **Cards**: `.course-card` / `.project-card`, white surface, 1px border, 14px radius, lift + shadow on hover
- **Badges**: pill labels — `.badge-progress` (blue/accent-soft) for "In Progress", `.badge-soon` (amber) for "Coming Soon"
- **About facts panel**: bordered surface block with label/value rows

## Motion
- Scroll-reveal via `IntersectionObserver`: `.reveal` elements fade + translateY(16px→0) on first intersect, `threshold: 0.1`, unobserves after firing (one-shot)
- No `prefers-reduced-motion` handling yet — gap, see below
- Hover states: button lift (`translateY(-2px)`), card lift (`translateY(-4px)` + shadow), all on `transform`/simple properties

## Layout
- Single `.container` (max-width 1040px) reused across all sections
- Sticky header with blur backdrop
- `.card-grid`: `repeat(auto-fit, minmax(260px, 1fr))` — responsive without explicit breakpoints
- One explicit breakpoint at 760px: collapses nav to hamburger, About grid to single column

## Known gaps vs. impeccable guidance (candidates for a future `audit` or `polish` pass)
1. **Identical card grids** — Journey and Projects sections both use same-sized cards with heading+badge+text, which is on impeccable's banned-pattern list ("Identical card grids... repeated endlessly"). Worth varying treatment between the two sections.
2. **No `prefers-reduced-motion` fallback** for the reveal animation.
3. **Colors in hex, not OKLCH** — fine functionally, but not following the "new projects" OKLCH guidance.
4. **Generic SaaS-card aesthetic** — light, Inter, blue accent, pill buttons is a safe but fairly default "AI portfolio" look. Since this is a brand-register site (design IS the product, per PRODUCT.md), there's room to make it feel more like *Arash's* site specifically rather than a template.
5. Photo/headshot still a placeholder gap (no image yet) — noted in PRODUCT.md next steps too.

## Live
- https://youzefnia.github.io/
- Repo: https://github.com/Youzefnia/Youzefnia.github.io (auto-deploys from `main` via GitHub Pages)
