# MADR: Vainilla & Canela Webapp

## Purpose

Vainilla & Canela is a local-demo webapp for a bakery/cafe in Melgar, Tolima. V1.1 is designed to show the owner how a public catalog and simple admin flow would work before deploying or connecting a real backend.

This document is the main handoff file for future LLMs, agents, and developers. Read it before making changes.

## Current Version

V1.1: local demo.

The app intentionally uses local browser storage instead of Supabase for the admin demo. The goal is to validate user feedback with the owner first. Supabase is kept in the codebase for V2 preparation, not as the active data source.

## Product Scope

Current goals:

- Public landing page with bakery branding.
- Responsive catalog with category filters.
- WhatsApp-first contact and ordering.
- Local admin demo for categories and products.
- Section for companies, meetings, and celebrations.
- Tests that verify catalog data, text quality, critical flows, and local CRUD behavior.

Out of scope for V1.1:

- Real admin login.
- Supabase persistence.
- Real image uploads.
- Checkout, cart, or structured order tracking.
- Production deployment.

## Architecture

Framework:

- Next.js App Router.
- React client components for the interactive landing/admin demo.
- Tailwind CSS v4 styling through `src/app/globals.css`.

Main folders:

- `src/app`: routes and app shell.
- `src/components`: shared UI components, currently the public landing.
- `src/lib`: data access helpers and future Supabase adapter.
- `src/types`: shared TypeScript interfaces.
- `supabase`: V2 database migration preparation.
- `tests`: lightweight validation scripts.
- `docs`: architecture, decisions, and handoff notes for humans/LLMs.
- `.agents`: future project-specific agent and skill coordination.

Active data flow in V1.1:

1. `src/lib/constants.ts` defines default demo categories/products.
2. `src/lib/localCatalog.ts` reads/writes the demo catalog in `localStorage`.
3. `src/components/LandingPage.tsx` reads local catalog data and renders filters/products.
4. `/admin/categories` and `/admin/products` write to the same local catalog.

Important limitation:

- `localStorage` is browser-local. Admin changes only appear in the same browser/profile. This is acceptable for V1.1 demos.

## Routes

- `/`: public landing page.
- `/admin`: admin demo entry. It explicitly states there is no login in V1.1.
- `/admin/categories`: create/delete categories locally.
- `/admin/products`: create/delete products locally.

## Copy Rules

- Use Spanish for user-facing text.
- Avoid internal roadmap language in the public UI.
- Use "Pan de Masa Madre" in product names and calls to action.
- WhatsApp CTAs should be direct and user-friendly.
- Business/events language should focus on: "empresas, reuniones y celebraciones".
- Do not expose internal roadmap or validation language in public UI.

## Testing Plan

Run before committing:

```bash
npm.cmd run test:v1
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

Known lint warnings:

- Next.js warns about raw `<img>` tags. This is tolerated in V1.1 because images are external placeholders. V2 should move to `next/image` with configured remote patterns.

What `npm.cmd run test:v1` checks:

- Catalog has enough demo products/categories.
- Product data has valid prices, categories, and HTTPS image URLs.
- Source files do not contain common mojibake/encoding artifacts.
- Landing/admin flows reference the expected local data helpers.
- Local CRUD simulation can create/read/delete categories and products.

## V2 Direction

Next likely steps:

- Replace `localCatalog.ts` with a repository/data-provider abstraction backed by Supabase.
- Add real admin authentication.
- Add image upload through Supabase Storage or Vercel-compatible storage.
- Convert raw images to `next/image`.
- Deploy to Vercel after MCP/OAuth setup is confirmed.
- Keep V1.1 demo behavior available behind fixtures or seeded data for sales demos.

## Agent Guidance

Agents should:

- Preserve the V1.1 local demo unless explicitly moving to V2.
- Keep changes small and testable.
- Avoid adding backend assumptions without updating this MADR.
- Run the testing plan before commits.
- Update this file when changing architecture, routes, data flow, or V2 direction.
