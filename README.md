# Investa

A free, self-paced course that takes a complete beginner to a confident investor —
built to be usable by kids with no background in finance and no money to risk.

20 lessons across 6 units, each with a real-world case study and a quiz. Practice
drills, a glossary, cheat sheets, a capstone plan and a certificate. Plus a
**$100,000 paper-trading Arena** running on real market data.

Available in **English and Hindi** (the हिं button in the top bar).

---

## What's in this folder

| File | What it is |
|---|---|
| **`index.html`** | **The whole site in one file.** Double-click it to open in any browser. No install, no server, no internet needed. |
| `refresh-prices.py` | Updates the real stock prices baked into `index.html`. See below. |
| `older-version-aug-2026/` | The earlier version, split across separate files. Kept for reference — see the note at the bottom. |

---

## Running it

Double-click `index.html`. That's it.

Everything a student does — lessons finished, XP, badges, their portfolio and every
trade — is saved in that browser on that computer. Several students can share one
computer: each makes their own account on the sign-in screen and keeps their own
progress.

To move an account to a different computer, open **Invest → 📜 History** and copy the
account code, then paste it into the same screen on the other machine.

---

## Updating the stock prices

Prices are **real**, and they are **baked into the page** rather than fetched while it
runs. The Arena, the Stock Analyzer and the company panels all read from one block of
data near the top of `index.html`.

```bash
python3 refresh-prices.py                # prices for all 18 tickers   (18 API calls)
python3 refresh-prices.py --fundamentals # + Analyzer profiles          (+4)
python3 refresh-prices.py --profiles     # + company & analyst panels   (+15)
python3 refresh-prices.py --spark        # + 10-week price charts       (+4)
```

Data comes from [Alpha Vantage](https://www.alphavantage.co). The script needs your API
key. Copy the example file and paste your key in:

```bash
cp .env.example .env
```

`.env` is gitignored, so your key stays on your machine. If you'd rather not use a
`.env`, the script checks four places in order and takes the first it finds:

1. `.env` next to the script
2. the `ALPHAVANTAGE_API_KEY` environment variable
3. `alphavantage-key.txt` next to the script
4. `~/.investa/key`

**Your key is deliberately not in this folder.** A key is a password — if this folder
ever gets shared, emailed or pushed somewhere public, the key goes with it. It stays at
`~/.investa/key` on your machine. If you move this folder to another computer, make a
new `alphavantage-key.txt` there and paste the key into it.

The free Alpha Vantage tier allows **25 calls a day**, so a full price refresh is a
once-a-day job. That is why the Arena is a buy-and-hold competition rather than a
day-trading game — which suits what the course actually teaches.

After running the script, the page is updated on disk. Re-publishing it to the web is a
separate step.

---

## Things worth knowing

**The published link shows an old version.** Investa is published at
<https://claude.ai/artifact/5MbXVdmTgQHmRfQcBdb69i> and shared with anyone who has the
link — but viewers are pinned to an earlier version and are *not* seeing the current
page. That has to be changed from the artifact's own share menu.

**Prices carry their own date.** The page always states which market close it is
showing, so a stale price is visible as stale rather than passed off as live.

**Analyst targets are labelled as opinions.** The company panels show analyst price
targets and buy/hold/sell spreads, with a note explaining that analysts are frequently
wrong and that "buy" ratings vastly outnumber "sell" across the industry. Students
should not read a target as a forecast.

**This is education, not financial advice.** Nothing here recommends buying anything,
and no real money is ever involved.

---

## About `older-version-aug-2026/`

The first build, before everything was combined into a single file. It splits into
`app.js`, `data.js`, `styles.css`, the Hindi and plain-English content packs, and an
`index.html` that loads them. `build-standalone.py` was the script that merged them into
one file.

**It has none of the September work** — no real market prices, no company panels, no
trade history, no student accounts. It is here for reference only. `index.html` in the
folder above is the real one.
