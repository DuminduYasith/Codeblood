# Mora Hiking Club — Next.js Frontend

Responsive website frontend for the University of Moratuwa's **Mora Hiking Club**, following the supplied MHC UI references and official green branding. Uses the technology stack chosen by the project team.

> **Scope:** This is an independently runnable **frontend starter**, not a production-ready authenticated service. Figma direct design-context access was rate-limited during preparation, so the implementation follows the available earlier responsive Figma-derived HTML, latest approved Media UI, club branding, and supplied hiking photographs. It is not a verified pixel-perfect export of all 29+ Figma frames.

## Stack

- **Frontend:** Next.js App Router + React + TypeScript
- **Styling:** Responsive vanilla CSS and Lato typography
- **Icons:** lucide-react
- **Backend integration prepared for:** Python FastAPI + REST API
- **Database:** PostgreSQL (**backend owns database access**)
- **Deployment:** Vercel or containerized Node.js, with separate FastAPI service
- **Version control / CI:** GitHub + GitHub Actions

## Requirements

- Node.js **20.9+** (Node.js 22 LTS recommended)
- npm and internet access for first dependency installation

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open **http://localhost:3000**. On Windows PowerShell, copy the environment file using:

```powershell
Copy-Item .env.example .env.local
```

Production build and start:

```bash
npm run typecheck
npm run build
npm start
```

The first `npm install` creates `package-lock.json`; **commit it** to GitHub to make CI/deploy builds reproducible.

## Included routes

| Path | Screen |
| --- | --- |
| `/` | Home landing page |
| `/events` | Hiking events, filters, clickable sample calendar |
| `/events/[slug]` | Trail details (6 demo events) |
| `/membership` | Membership overview and join instructions |
| `/achievements` | Leaderboard and awards overview |
| `/awards` | Recognition workflow |
| `/media` | Event albums, image upload preview, advanced gallery search & tags, photo modal, analytics |
| `/competitions` | Photography challenge UI |
| `/about` | Club overview and core brand values |
| `/login`, `/register`, `/reset` | Auth **UI only**, not connected |
| `/dashboard`, `/profile` | Sample member workspace and editable form UI |

The approved newer Media design **does not include QR-based upload or automatic recap generation**. There is no actual image storage, automatic quality scoring, sharing permission system, or secure authentication yet.

## Club content vs demo content

- **Club-provided assets:** actual MHC logos and hiking photographs under `public/images/`.
- **Demo-only data:** future hike dates, sample album statistics/years, member names and points, example quality percentages, and analytics trends in `src/lib/data.ts` and the Media UI. Replace these with official approved data from the backend before publishing.
- **Photo uploader:** locally checks JPG/PNG/WebP, max 10 MB per file, min 1200×800 px; creates **browser-only previews** and does not send photos to a server.
- **Forms:** show explanatory UI notices, do not store passwords or authenticate users. Do not rely on `/dashboard` for access control.

## FastAPI connection

1. Build your FastAPI service with PostgreSQL models, auth, authorization, uploads and pagination.
2. Provide REST routes using a versioned prefix such as `/api/v1/`.
3. Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local` and on the deployment provider (e.g. `https://api.example.org`).
4. Replace fixture imports from `src/lib/data.ts` with async REST queries using `src/lib/api.ts`.
5. Wire `PhotoUpload` to `mediaApi.uploadPhotos(...)` after server-side validation and auth are implemented.
6. Configure FastAPI CORS for the exact deployed frontend origin and choose a secure session/cookie or token scheme.

### Suggested backend endpoints (proposed, not implemented)

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/v1/events` | Public upcoming events |
| GET | `/api/v1/events/{id}` | Event details |
| POST | `/api/v1/auth/login` | Secure login |
| POST | `/api/v1/auth/register` | Member registration |
| GET | `/api/v1/media/albums` | Media albums |
| GET | `/api/v1/media/photos` | Searchable gallery (filter/pagination) |
| POST | `/api/v1/events/{id}/photos` | Authenticated image uploads |
| GET | `/api/v1/media/analytics` | Admin-authorized analytics |
| GET | `/api/v1/achievements/leaderboard` | Verified leaderboard |

Never expose DB passwords or FastAPI secrets through `NEXT_PUBLIC_*` variables; Next.js embeds those variables in frontend bundles.

## Hosting option A — Vercel (recommended for frontend)

1. Push this project to GitHub (root contains `package.json`).
2. Import repository into Vercel and select the **Next.js** framework.
3. Add `NEXT_PUBLIC_API_BASE_URL` as a **build-time environment variable** when FastAPI is ready.
4. Deploy; Vercel creates a URL for the frontend.
5. Host FastAPI separately (a suitable Python host or Docker environment), PostgreSQL separately, and configure CORS/session domain settings.

## Hosting option B — Docker

```bash
docker build -t mhc-frontend \
  --build-arg NEXT_PUBLIC_API_BASE_URL=https://api.example.org .
docker run --rm -p 3000:3000 mhc-frontend
```

Visit `http://localhost:3000`. `NEXT_PUBLIC_API_BASE_URL` is baked in **during the build**, not picked up from a container runtime variable.

## Project layout

```
src/
  app/                 Next.js routes and responsive global styling
  components/          Shared navigation, cards, forms, media and event tools
  lib/data.ts          Typed demonstration content (swap for API)
  lib/api.ts           Typed FastAPI REST request helpers
public/images/         Official club logo and user-provided hiking photos
.github/workflows/      Basic GitHub Actions typecheck/build workflow
Dockerfile              Multi-stage Next.js standalone container
```

## Current verification

- TypeScript/TSX source syntax: checked via the TypeScript parser.
- All referenced local static image paths: checked.
- CSS syntax: parsed successfully.
- **Not verified:** complete `npm run build` or browser automation of the Next.js app. This build environment cannot access npm packages; your team should run `npm install && npm run build` locally and fix any dependency/version issues found.

## Design references

Figma: https://www.figma.com/design/Vszx4l00rTCdkQ6NwJG7Iy

The latest approved Media page omits QR upload and automatic recap generation. The original Figma project itself has **not been modified** by producing this source code.
