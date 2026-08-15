# Career Next Pivot — Redesign Demo

## 1. What this is

Here is a live, working redesign of Career Next Pivot that you can open and click through right now:

- **Main site:** https://careernextpivot-demo.pages.dev/
- **Landing page (for ads):** https://careernextpivot-demo.pages.dev/lp/

*(If the web address changes when we go live, these two links update accordingly — the pages themselves stay the same.)*

The substance of your site is unchanged. Every claim, statistic, pricing tier, and program is still here. What changed is how it reads and how it holds up to scrutiny: I rebuilt it for clean legibility, full accessibility, and the kind of quiet authority that matches your standing. Nothing was removed.

## 2. Design direction

The look is serif editorial — classic, book-like typography on a warm paper background — chosen to speak to your executive audience with calm authority rather than noise. For a leader of your record, this restrained, print-quality feel is the strongest way to look exactly like the professional you are.

## 3. Legibility and accessibility fixes

These are the specific readability and accessibility issues on the current site, and how the redesign resolves each one. (WCAG is the international standard for accessible websites; "AA" is the required level, "AAA" is the highest.)

| Before (current site) | After (redesign) |
|---|---|
| Light green/cyan text failing contrast on light backgrounds | Navy on cream at 13:1; all text meets WCAG AA, body text AAA |
| Gradient headline text over busy background | Solid high-contrast serif headlines |
| Emoji as bullets and sole affordances | Semantic lists, typographic numerals, text labels |
| Missing alt text | Meaningful alt text everywhere; decoration hidden from screen readers |
| No visible keyboard focus | Visible focus states on every control, plus a skip-to-content link |
| Modal without focus management | Full dialog semantics: focus trap, Escape to close, focus return |
| Placeholder-only form fields | A visible label on every input |
| No h1 / broken heading order | Strict h1 to h2 to h3 document outline |
| Status conveyed by color alone | Score plus written tier on every role; filter states in text |

## 4. Everything is preserved

Every part of your current site carries over. Here is where each piece now lives in the redesign:

- **Hero claims and headline** — top of the main page, in solid high-contrast type.
- **Your headline stats — 1,000 / 30 / 623 / 29** — a dedicated stats band directly below the hero.
- **All four pricing tiers, with every bullet** — the pricing section, each tier laid out in full.
- **The assessment** — its own clearly labeled section with a call to begin.
- **The role directory / explorer** — the directory section (with tiers shown as a score plus written words, not color alone).
- **The expert panel** — the expert panel section.
- **The toolkit** — the toolkit section.
- **H.A. (your AI assistant)** — its own introduction section.
- **The podcast** — the podcast section.
- **The reading list** — the reading list section.
- **Pivot stories** — the stories section.
- **Free training** — the free-training section.
- **Newsletter** — an inline newsletter sign-up (see below).
- **Your methodology** — the methodology section.

## 5. New capabilities

The redesign also adds a few things the current site does not have — all optional, all quietly built in:

- **The Pivot Brief email capture** — a gentle pop-up invitation plus an inline newsletter box, so visitors can subscribe without leaving the page.
- **A dedicated ads landing page at `/lp/`** — a focused, distraction-free page built to receive Facebook / Instagram ad traffic.
- **Lead storage with one-click CSV export** — every sign-up is saved securely, and you can download the full list as a spreadsheet at any time.
- **Meta-pixel-ready wiring on both pages** — the tracking hooks are already in place; we just drop in your ad account's ID when you're ready.

## 6. What plugs in at handoff

A handful of items connect at go-live, once you provide them:

- The full **1,000-role database** loads into the Explorer.
- **Live checkout links** connect to the four pricing tiers.
- Your **Meta Dataset ID** activates ad tracking.
- A **custom domain** (e.g. careernextpivot.com) points at the site.
- **Product deep links** connect the toolkit, assessment, and other purchases.

## 7. Suggested next steps

1. **Install the ad pixel** — grant partner access and share your Meta Dataset ID so we can turn on tracking.
2. **Launch a first ad set** — a simple static-image ad pointing at the `/lp/` landing page, to test the waters.
3. **Connect a custom domain** — so visitors see your own web address.
4. **Add Conversions API later** — a more robust, server-side way to measure results, once the basics are running.

---

*This is a demonstration build. I'm glad to walk you through any part of it, and to adjust the direction to your taste before anything goes live.*
