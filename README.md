# dyktig_web

Monorepo for Dyktig Regnskapfører AS.

## Stack

| Layer | Verktøy |
|-------|---------|
| Monorepo | NX 23 · pnpm · module boundaries |
| Frontend | Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 · shadcn/ui |
| Backend | Supabase |
| Hosting | Vercel |
| CI | GitHub Actions |

## Struktur

```
apps/web/            Next.js (App Router)
packages/supabase/   Supabase-klienter og typer
```

## Kom i gang

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Scripts

| Kommando | Beskrivelse |
|----------|-------------|
| `pnpm dev` | Dev-server |
| `pnpm build` | Produksjonsbygg |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript-sjekk |

## Miljøvariabler

Se [.env.example](.env.example).

## Vercel

- **Root Directory:** `apps/web`
- Aktiver «Include source files outside of the Root Directory»

## Supabase-typer

```bash
supabase gen types typescript --project-id <ref> > packages/supabase/src/lib/database.types.ts
```
