> **Archived on 2026-09-28.** This project is no longer maintained here. Florian keeps its copy in the private repository `florianrolke/client-resources` (folder `careernextpivot`). This repository stays online read-only so existing links keep working.

# CareerNextPivot — Website Redesign

Live demo of the full redesign, ready for your development team to take over.

- **Main site:** https://careernextpivot-demo.pages.dev/
- **Ads landing page:** https://careernextpivot-demo.pages.dev/lp/

The substance of the original site is unchanged — every claim, statistic, pricing tier, and program
carried over. What changed is legibility, accessibility, and structure. `redesign-notes.md` in this
repo is the full walkthrough: design direction, the before/after accessibility table, the
everything-is-preserved inventory, and suggested next steps.

## What's in this repo

```
site/               The deployable website (static HTML, no build step)
  index.html        Main site — the deployed design (serif editorial, self-contained)
  lp/index.html     Focused landing page for Facebook/Instagram ad traffic
  v2/               Alternative design variant (Bootstrap-based, own theme CSS)
  v3/               Newest alternative variant ("CareerNextPivot by ExperienceBypass")
functions/          Cloudflare Pages Functions (serverless API)
  api/leads.js      Lead capture endpoint + CSV export
  api/subscribe.js  Newsletter signup endpoint
wrangler.toml       Cloudflare Pages configuration
redesign-notes.md   Client-facing walkthrough of the redesign
```

`site/index.html` and `site/lp/` are what is deployed today. `v2/` and `v3/` are additional design
directions built during the project — included so you have every design, as promised. They are not
linked from the main site; open their `index.html` files directly to view them.

## Running locally

No build step. Serve the `site/` folder with any static server:

```bash
cd site
python -m http.server 8080
# or: npx serve .
```

The lead-capture forms call `/api/*` endpoints which only exist when deployed to Cloudflare Pages
(or run via `npx wrangler pages dev site`). The pages themselves render fine without them.

## Deploying to Cloudflare Pages

```bash
npx wrangler@latest pages deploy site --project-name <your-project-name>
```

The `functions/` directory is picked up automatically — no build configuration needed.

### One open item: lead storage (KV)

The lead-capture endpoints store submissions in a Cloudflare KV namespace that **has not been
created yet** — until it exists, form submissions return a 500 ("storage") error. To finish the
wiring:

1. `npx wrangler@latest kv namespace create CNP_LEADS`
2. Paste the returned namespace id into `wrangler.toml` (replacing `REPLACE_WITH_NAMESPACE_ID`)
3. Set the CSV-export secret: `npx wrangler@latest pages secret put LEADS_EXPORT_KEY --project-name <your-project-name>`
4. Redeploy

## What plugs in at go-live

- The full **1,000-role database** loads into the Explorer
- **Live checkout links** for the four pricing tiers
- **Meta Dataset ID** to activate the ad-pixel wiring (already in place on both pages)
- **Custom domain** (e.g. careernextpivot.com)
- **Product deep links** for the toolkit, assessment, and other purchases
