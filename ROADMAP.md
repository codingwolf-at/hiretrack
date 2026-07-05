# HireTrack Roadmap

A phased plan to take HireTrack from its current state (working login + dashboard + create/edit loop) to a complete product. Each item is tied to a concrete gap in the codebase. Phases are ordered by priority; items within a phase are roughly independent.

## Current state

**Working:** Supabase auth (login, demo login, logout), protected dashboard with metric cards, create/edit applications via slide-over (Server Actions), recent-applications table, reusable UI kit.

**Not yet built:** delete flow, the `/applications`, `/interviews`, `/settings`, `/signup` routes (all linked in the UI today), interviews module, auth middleware, tests/CI, version-controlled DB schema.

---

## Phase 1 — Finish the core loop

Everything here is already linked or half-wired in the UI; finishing it removes all dead ends.

1. **Delete application** — add `deleteApplicationAction` to `src/actions/applicationActions.ts`, a confirm dialog, and wire the existing `TABLE_ACTIONS.DELETE` case in `RecentApplicationsTable.tsx` (currently a no-op).
2. **`/applications` page** — full list view backing the sidebar link and the table's "View all" link: pagination, status filter, text search, column sort. Reuse the table, `StatusBadge`, and `Dropdown` primitives.
3. **Signup** — `/signup` route reusing the login UI with a mode flag (per the TODO in `login/page.tsx`), via `supabase.auth.signUp` with email confirmation.
4. **Auth hardening** — add `middleware.ts` with the standard `@supabase/ssr` session-refresh pattern; redirect already-authenticated users from `/login` to `/dashboard` (existing TODO).
5. **Empty states & loading** — empty state for the applications table, full-page loader for protected pages (existing TODOs in `dashboard/page.tsx` and `RecentApplicationsTable.tsx`).

## Phase 2 — Interviews module

The second entity the product implies; the sidebar link and dashboard panel already reserve space for it.

6. **Data model** — `interviews` table (FK → `applications.id`, RLS mirroring `applications`): round/type, `scheduled_at`, location/link, notes, outcome. Types in `src/types/`, CRUD Server Actions in `src/actions/`, read helpers in `src/lib/db/`.
7. **`/interviews` page + dashboard panel** — upcoming-interviews list replacing the placeholder text in `dashboard/page.tsx`, full page with past/upcoming grouping.
8. **Pipeline integration** — surface an application's interviews in the edit slide-over; optionally prompt to schedule an interview when status moves to an interview stage.

## Phase 3 — Settings & account

9. **`/settings` page** — profile (display name, avatar image — `Avatar.tsx` TODO), password change, sign out, and account deletion / data export.

## Phase 4 — Engineering foundation

Parallel-friendly; can be done alongside any feature phase.

10. **Version-controlled schema** — `supabase/migrations/` with DDL + RLS policies for `applications` (and `interviews`), plus a committed `.env.example`.
11. **Tests** — Vitest + React Testing Library for `src/lib/` helpers and UI primitives; a Playwright smoke test covering login → create → edit → delete.
12. **CI** — GitHub Actions running lint, typecheck (`tsc --noEmit`), build, and tests on PRs.
13. **Cleanup** — remove the stale `tailwind.config.ts`, set proper metadata/favicon (`app/layout.tsx` TODO), move demo creds out of source into env.

## Phase 5 — Polish & differentiation

14. **Responsive + accessible** — mobile layout for sidebar/table/slide-over; keyboard navigation and ARIA pass (README goals).
15. **Kanban pipeline view** — drag-and-drop board of applications by status; natural fit for the existing stage model.
16. **Insights** — conversion funnel per stage, time-in-stage, applications-over-time chart.
17. **Follow-up nudges** — highlight stale applications (no status change in N days) on the dashboard.

## Later / ideas (from README roadmap)

Calendar integration for interviews, resume/document manager, activity history per application, CSV/JSON export.
