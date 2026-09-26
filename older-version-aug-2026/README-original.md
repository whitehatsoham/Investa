# Investa — Learn to Invest

A complete, dependency-free investing course for total beginners: 20 lessons across 6 units, interactive real-world case studies, Khan-style practice, spaced review, a live-price trading arena, and lots of gamification.

Just open **`index.html`** in any modern browser — no build step, no install.

```
invest-academy/
├── index.html   — shell (top bar, theme/sound/search controls)
├── styles.css   — design system (light + dark themes)
├── data.js      — all content (lessons, cases, quizzes, glossary, market data)
└── app.js       — all logic (routing, quizzes, arena, gamification)
```

Everything is stored locally in your browser (`localStorage`) — progress, XP, streak, notes, portfolio, and settings.

---

## Live market prices

The Investing Arena shows **real prices** out of the box (≈15-min delayed, via Yahoo Finance through a public CORS proxy). Because free no-key feeds are occasionally flaky, some tickers may briefly show sample values — hit **↻** to refresh.

For **reliable real-time** prices, click **"Go real-time"** in the arena and paste a free [Finnhub](https://finnhub.io/register) API key (30-second signup). It's stored only in your browser.

---

## Optional: a real shared leaderboard (classroom mode)

Out of the box, competitors on the leaderboard are simulated AI traders (holding real tickers, valued at the same live prices you trade at). To run a **real competition where students compete across devices**, add a tiny backend:

### Quick setup with Supabase (free tier)
1. Create a project at [supabase.com](https://supabase.com) and a table:
   ```sql
   create table scores (
     id uuid primary key default gen_random_uuid(),
     name text,
     class_code text,
     value numeric,
     updated_at timestamptz default now()
   );
   ```
2. In `app.js`, set the config near the top of the `App` module:
   ```js
   const LEADERBOARD = {
     url: "https://YOUR-PROJECT.supabase.co/rest/v1/scores",
     key: "YOUR-ANON-KEY",
     classCode: "MATH101"   // students share a class code
   };
   ```
3. The arena will then `POST` each student's account value and `GET` the class leaderboard instead of using simulated peers. (Hook points are marked `// LEADERBOARD:` in `renderInvest`.)

> A serverless function (Vercel/Netlify) proxying a paid market-data API is the most robust option for a real classroom — ask if you'd like that wired up.

---

## Roadmap ideas not yet built
- **Full internationalization (i18n).** The app is structured so UI strings and lesson content could be translated, but it ships English-only — translating all 20 lessons + cases is a sizeable content effort best done per target language.
- **Native mobile wrapper** (the web app is already fully responsive).

---

*Investa is an educational project — not financial advice.*
