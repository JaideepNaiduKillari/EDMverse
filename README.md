# EDMVerse

Pre-launch landing page for EDMVerse, built with Next.js 14 (App Router),
TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- One fixed `TopBar` (`components/TopBar.tsx`) shared across the whole page —
  logo, nav (Index / FAQ), and a "Request Access" button that jumps to the
  waitlist form from anywhere on the site.
- Full-viewport, scroll-snapped sections in `app/page.tsx`, in this order:
  1. `Hero` — main landing section (`#hero`)
  2. `About` — "What it does" module grid (`#about`)
  3. `FeatureCards` — placeholder, to be designed later (`#features`)
  4. `Waitlist` — the request-access form (`#waitlist`)
  5. `FAQ` — placeholder, to be designed later (`#faq`)
- "Request Access" (top bar, hero, waitlist heading) smooth-scrolls to the
  waitlist section via `lib/scrollTo.ts`. "View The Index" (hero) is a
  local toggle — it expands/collapses the Artists/Events/Festivals/
  Releases/News list in place (no scroll), animated with a CSS grid-rows
  transition so there's no layout jump and no JS height measuring.

## Waitlist storage — Google Sheets

`POST /api/waitlist` (`app/api/waitlist/route.ts`) validates name, country,
and email, then appends a row to a Google Sheet via `lib/googleSheets.ts`
(deduping by email — it reads the existing Email column before appending).
Each signup becomes one row: `Name | Country | Email | Created At`.

This works from a serverless deployment (Vercel, etc.) because it writes to
Google's servers, not your app's local disk — unlike a local file, it
survives redeploys and cold starts, and anyone with sheet access can open
it directly to see signups without a custom admin dashboard.

### Google Sheets setup

1. **Create a Google Cloud project** (or reuse one) at
   https://console.cloud.google.com.
2. **Enable the Google Sheets API**: APIs & Services → Library → search
   "Google Sheets API" → Enable.
3. **Create a service account**: APIs & Services → Credentials → Create
   Credentials → Service Account. No project roles are needed — it only
   needs access to the one sheet you share with it.
4. **Create a key** for that service account: open it → Keys → Add Key →
   Create new key → JSON. This downloads a JSON file containing
   `client_email` and `private_key`.
5. **Create the Google Sheet**: a new spreadsheet with a tab (default name
   expected: `Waitlist`) with a header row:
   `Name | Country | Email | Created At`.
6. **Share the sheet** with the service account's `client_email` (found in
   the JSON key) as **Editor**.
7. **Copy the spreadsheet ID** from its URL:
   `https://docs.google.com/spreadsheets/d/THIS_PART/edit`.
8. Copy `.env.example` to `.env.local` and fill in:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` — the `client_email` from the JSON key.
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` — the `private_key` from the JSON
     key, kept in quotes with its `\n` sequences intact (don't convert them
     to real line breaks).
   - `GOOGLE_SHEETS_SPREADSHEET_ID` — from step 7.
   - `GOOGLE_SHEETS_TAB_NAME` — only needed if your tab isn't named
     `Waitlist`.

If any of these env vars are missing, submissions fail with a clear
server-side log message (`console.error`) rather than a silent failure —
the person submitting the form just sees "Something went wrong."

When deploying (e.g. to Vercel), add the same four variables in your
hosting provider's environment variable settings — `.env.local` is never
committed to git.

**If you'd rather use a real database later** (e.g. once this needs to
scale, or you want SQL queries), Supabase is a natural next step since
you're already using it on the couples app — swap `lib/googleSheets.ts`
for Supabase client calls with the same `appendWaitlistRow` signature, and
neither `app/api/waitlist/route.ts` nor `components/Waitlist.tsx` need to
change.

## Design tokens

Defined in `tailwind.config.ts`:

- Background `ink-950 #0a0a0a`, hairline borders at 8–14% white opacity.
- Accent `#f97316` (orange) for numerals, dividers, CTAs, and the status dot.
- Display type: Inter (800/900 weight, tight tracking) for headings.
- Utility type: JetBrains Mono, uppercase, wide letter-spacing, for
  eyebrows, numerals, and nav labels.
