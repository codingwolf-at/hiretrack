# HireTrack

A modern job application tracking dashboard built with Next.js, TypeScript, Supabase, and Tailwind.

HireTrack helps organize applications, monitor progress, and prepare for interviews — all from a clean, focused workspace designed to feel like a real product rather than a demo toy.

⚠️ **Work in Progress** — active development ongoing.

---

## Live Demo

Coming soon

---

## What It Does

* Secure authentication with Supabase Auth
* Cloud-stored applications tied to user accounts
* Dashboard with live application metrics
* Create and edit applications via slide-over workflow
* Status tracking across hiring pipeline stages
* Server-side data fetching with React Server Components
* Server Actions for database mutations
* Structured validation and sanitized database writes
* Modular component architecture and reusable UI primitives

This project focuses on real product patterns:

* Separation of UI state and data state
* Server-driven rendering where appropriate
* Centralized UI orchestration via context
* Clean mutation flows with optimistic refresh
* Scalable data modeling for future interview tracking

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* TailwindCSS

### Backend / Infra

* Supabase (Auth + Postgres)
* Supabase Row Level Security
* Server Actions (Next.js)

### Architecture Patterns

* React Server Components
* Client UI Context orchestration
* Database access helpers
* Reusable UI component system

---

## Features In Progress

* Application deletion workflow
* Interview tracking module
* Upcoming interviews dashboard panel
* Global search
* Pagination / filtering
* Accessibility refinements
* UI polish & visual design pass
* Mobile responsiveness

---

## Project Goals

HireTrack is not intended as a quick tutorial build.

This project exists to demonstrate:

* Production-style architecture decisions
* Scalable component structure
* Data ownership boundaries
* Realistic dashboard UX flows
* Full-stack integration ability
* Maintainable TypeScript patterns

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Required Environment Variables

Create `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

---

## Screenshots

*Add screenshots or GIF here*

---

## Roadmap

* Interviews lifecycle
* Calendar integrations
* Resume/document manager
* Activity history
* Application insights
* Export functionality