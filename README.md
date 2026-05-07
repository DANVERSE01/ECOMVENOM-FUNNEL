# ECOMVENOM Funnel

Production funnel for ECOMVENOM. Built in Next.js 15 / React 18 / Tailwind 3.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Script              | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Local dev server (port 3000)     |
| `npm run build`     | Production build                 |
| `npm run start`     | Serve the production build       |
| `npm run lint`      | ESLint (next/core-web-vitals)    |
| `npm run typecheck` | TypeScript without emit          |

## Environment

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_FORM_ENDPOINT=          # POST endpoint that accepts the apply form
NEXT_PUBLIC_SCHEDULE_PROVIDER_URL=  # Calendar provider (Calendly / TidyCal / GHL)
NEXT_PUBLIC_WHATSAPP_HANDLE=        # WhatsApp link/handle for confirmation copy
```

If these are absent, the app degrades gracefully — the form short-circuits to `/schedule`, and the calendar shows a labelled placeholder.

## Routes

| Path             | Notes                                                    |
| ---------------- | -------------------------------------------------------- |
| `/`              | Landing page (11 sections)                               |
| `/apply`         | Application form (POST → `NEXT_PUBLIC_FORM_ENDPOINT`)    |
| `/schedule`      | Booking with countdown + calendar mount point            |
| `/confirmation`  | Real Youssef video + 4 pre-call steps + repeated trust   |

## What this app does NOT do

- Doesn't fabricate testimonials, metrics, dashboards, or social proof.
- Doesn't ship LeadConnector raw fonts or Wistia `.bin` chunks.
- Doesn't load reCAPTCHA, marketing pixels, or analytics by default.
- Doesn't autoplay video.
