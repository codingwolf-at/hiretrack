# CLAUDE.md

Guidance for Claude Code (and other AI agents) working in this repository.

## What HireTrack is

HireTrack is a job-application tracking dashboard for job seekers. Users record each application (company, role, location, job URL, salary range, notes), move it through hiring-pipeline stages (`applied → hr → technical → final → offer / accepted / rejected / withdrawn`), and see aggregate metrics on a dashboard. The project is intentionally built as a production-style product, not a tutorial demo — architecture decisions (RSC-first rendering, Server Actions, RLS-based data ownership, UI/data-state separation) matter as much as features. See `ROADMAP.md` for what's planned next.

## Commands

```bash
npm run dev     # start dev server (Next.js)
npm run build   # production build
npm run lint    # ESLint (flat config, eslint-config-next)
```

There is no test runner or CI yet (planned — see roadmap Phase 4).

### Environment

Requires a Supabase project (Auth + Postgres). Create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

The DB schema is not yet version-controlled: the `applications` table and its RLS policies exist only in the Supabase project. A demo user matching `DEMO_LOGIN_CREDS` (`src/constants/ui.ts`) must exist for the demo-login button to work.

## Tech stack

- Next.js 16 (App Router) with the **React Compiler enabled** (`next.config.ts`) — avoid manual `useMemo`/`useCallback` micro-optimizations the compiler already handles
- React 19, TypeScript 5 (strict)
- Supabase via `@supabase/ssr` — Auth + Postgres with Row Level Security
- Tailwind CSS **v4** (via `@tailwindcss/postcss`; styles/tokens live in `src/app/globals.css`). The root `tailwind.config.ts` is a stale v2-era leftover — ignore it, don't extend it
- Icons: `lucide-react`

## Architecture

Data flows one way: RSC fetch → client UI state → Server Action mutation → `router.refresh()`.

- **Reads** happen in React Server Components via helpers in `src/lib/db/` (e.g. `getUserApplications` in `src/lib/db/applications.ts`). Queries deliberately do **not** filter by `user_id` — Supabase RLS is the data-ownership boundary. Keep it that way; don't add manual user filters without a reason.
- **Mutations** go exclusively through Server Actions in `src/actions/` (`applicationActions.ts`). Actions build a server Supabase client from cookies, sanitize input with `mapFormToDB` (`src/lib/ui.ts`), and throw on Supabase errors. Clients call the action, then `closeSlideOver()` + `router.refresh()`.
- **Supabase clients**: `src/lib/supabase/supabaseClient.ts` (browser) vs `supabaseServer.ts` (server, cookie-backed). Never import the browser client in server code or vice versa.
- **Auth gating**: the `(protected)` route group's `src/app/(protected)/layout.tsx` checks `getUser()` server-side and redirects to `/login`. There is **no `middleware.ts`** yet (session refresh is a known gap — roadmap Phase 1).
- **UI orchestration**: the create/edit slide-over is driven by `ApplicationUIContext` (`src/context/ApplicationUIContext.tsx`) + the `useApplicationUI` hook — mode (`create`/`edit`), selected application, open/close. UI state lives here; data state stays server-side.

## Layout & conventions

```
src/
  actions/       Server Actions (all DB mutations)
  app/           App Router: login/, (protected)/dashboard/
  components/
    ui/          Reusable primitives: Button, Input, Label, TextArea,
                 Dropdown, StatusBadge, Card, Avatar, Spinner
    dashboard/   Feature components (ApplicationForm, RecentApplicationsTable)
    layout/      Shell: Sidebar, Topbar, SlideOver
  constants/ui.ts  ALL app constants: status enums + labels, sidebar items,
                   table columns, form strings, demo creds
  context/ hooks/  UI context + its consumer hook
  lib/           db/ helpers, supabase/ clients, ui.ts utilities
  types/application.ts  Application entity + form/mode types
```

- New enums, labels, option lists, and UI strings go in `src/constants/ui.ts`; types in `src/types/`.
- Compose Tailwind classes with `mergeClass` from `src/lib/ui.ts` (clsx + tailwind-merge); reuse the `src/components/ui/` primitives rather than styling raw elements.
- The single entity today is `Application` (`src/types/application.ts`). Status buckets for metrics: `IN_PROGRESS_STATUS`, `OFFER_STATUS`, `CLOSED_STATUS` in constants.

## Known gaps (don't be surprised by these)

- Sidebar links `/applications`, `/interviews`, `/settings` and login's `/signup` link point at routes that don't exist yet; the dashboard "Interviews" panel is placeholder text; the table's "Delete" action is unwired (no delete Server Action). These are all tracked in `ROADMAP.md` — check it before building so work lands in the intended order.
