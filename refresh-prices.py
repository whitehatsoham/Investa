#!/usr/bin/env python3
"""
Investa daily market refresh.

Re-fetches real prices from Alpha Vantage and rewrites the MARKET block
inside ~/.investa/investa.html. Republish that file to the artifact
afterwards (Claude Code does this via the Artifact tool with the
artifact's URL).

  python3 ~/.investa/refresh.py                # prices only  (18 calls)
  python3 ~/.investa/refresh.py --fundamentals # + the 4 analyzer profiles (+4)
  python3 ~/.investa/refresh.py --spark        # + 10-week price history (+4)
  python3 ~/.investa/refresh.py --profiles     # + company/analyst panels (+15)

--profiles refreshes P/E, EPS, beta, 52-week range, analyst target and the
rating spread for all 15 individual stocks. The hand-written plain-English
company descriptions are always preserved; only the numbers are replaced.
Because that alone is 15 of the 25 daily calls, run it on its own day.

Alpha Vantage's free tier allows 25 calls/day, so prices-only is the
daily job; add --fundamentals about monthly (they only move when a
company reports) and --spark when you want the Analyzer charts refreshed.
"""
import json, time, sys, os, re, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))

def _load_key():
    """Key file sitting next to this script wins; otherwise fall back to ~/.investa/key."""
    for path in (os.path.join(HERE, "alphavantage-key.txt"),
                 os.path.expanduser("~/.investa/key")):
        if os.path.exists(path):
            return open(path).read().strip()
    sys.exit("No Alpha Vantage key found.\n"
             "  Put it in alphavantage-key.txt next to this script, or at ~/.investa/key.\n"
             "  Free key: https://www.alphavantage.co/support/#api-key")

KEY  = _load_key()
PAGE = os.path.join(HERE, "investa.html")

QUOTES    = ["AAPL","MSFT","NVDA","AMZN","GOOGL","TSLA","META","SPY","QQQ","BND",
             "AMD","KO","JPM","JNJ","COST","NFLX","V","SO"]
ANALYZER  = ["AAPL","TSLA","SO","MSFT"]

want_fund  = "--fundamentals" in sys.argv
want_spark = "--spark" in sys.argv
want_prof  = "--profiles" in sys.argv

def get(url, tries=3):
    for n in range(tries):
        try:
            with urllib.request.urlopen(url, timeout=25) as r:
                return json.loads(r.read().decode())
        except Exception as e:
            if n == tries - 1: raise
            time.sleep(2 * (n + 1))

def capped(d):
    return isinstance(d, dict) and ("Information" in d or "Note" in d)

def money(v):
    try: v = float(v)
    except (TypeError, ValueError): return "—"
    for cut, suf in ((1e12,"T"), (1e9,"B"), (1e6,"M")):
        if abs(v) >= cut:
            return f"${v/cut:.3g}{suf}" if v/cut < 10 else f"${v/cut:.0f}{suf}"
    return f"${v:,.0f}"

def pct(v, digits=2):
    try: return f"{float(v)*100:.{digits}f}%"
    except (TypeError, ValueError): return "—"

def num(v):
    try: return round(float(v), 2)
    except (TypeError, ValueError): return None

# ---- start from whatever the page already carries, so a prices-only run
# ---- keeps the existing fundamentals and sparklines ------------------------
page = open(PAGE, encoding="utf-8").read()
m = re.search(r"const MARKET = (\{.*?\n\});\n", page, re.S)
if not m:
    sys.exit("Could not find the MARKET block in " + PAGE)
market = json.loads(m.group(1))

used, errors = 0, []

# ---- prices ---------------------------------------------------------------
for sym in QUOTES:
    try:
        d = get(f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={sym}&apikey={KEY}")
        used += 1
        if capped(d):
            errors.append(f"{sym}: daily call cap reached"); break
        q = d.get("Global Quote") or {}
        if not q.get("05. price"):
            errors.append(f"{sym}: empty quote"); continue
        market["quotes"][sym] = {
            "c":  round(float(q["05. price"]), 2),
            "pc": round(float(q["08. previous close"]), 2),
            "d":  round(float(q["09. change"]), 2),
            "dp": round(float(q["10. change percent"].rstrip("%")), 4),
        }
        market["tradingDay"] = q["07. latest trading day"]
    except Exception as e:
        errors.append(f"{sym}: {e}")
    time.sleep(1.0)

# ---- fundamentals (quarterly data; refresh occasionally) ------------------
if want_fund:
    for sym in ANALYZER:
        try:
            d = get(f"https://www.alphavantage.co/query?function=OVERVIEW&symbol={sym}&apikey={KEY}")
            used += 1
            if capped(d) or len(d) < 5:
                errors.append(f"OVERVIEW {sym}: capped or empty"); break
            rev  = float(d.get("RevenueTTM") or 0)
            marg = float(d.get("ProfitMargin") or 0)
            g    = float(d.get("QuarterlyRevenueGrowthYOY") or 0)
            market["fundamentals"][sym] = {
                "name": d.get("Name"), "sector": (d.get("Sector") or "").title(),
                "mcap": money(d.get("MarketCapitalization")), "pe": num(d.get("PERatio")),
                "revenue": money(rev), "netInc": money(rev * marg), "margin": pct(marg, 1),
                "growth": ("+" if g >= 0 else "") + pct(g, 1), "yield": pct(d.get("DividendYield")),
                "eps": num(d.get("EPS")), "hi52": num(d.get("52WeekHigh")), "lo52": num(d.get("52WeekLow")),
            }
        except Exception as e:
            errors.append(f"OVERVIEW {sym}: {e}")
        time.sleep(1.0)

# ---- sparklines: 10 weekly closes for the Analyzer charts -----------------
if want_spark:
    for sym in ANALYZER:
        try:
            d = get(f"https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol={sym}&apikey={KEY}")
            used += 1
            if capped(d):
                errors.append(f"WEEKLY {sym}: capped"); break
            ser = d.get("Weekly Time Series") or {}
            if not ser:
                errors.append(f"WEEKLY {sym}: empty series"); continue
            closes = [round(float(ser[k]["4. close"]), 2) for k in sorted(ser)[-10:]]
            market["spark"][sym] = closes
        except Exception as e:
            errors.append(f"WEEKLY {sym}: {e}")
        time.sleep(1.0)

# ---- company + analyst panels (quarterly data; descriptions are kept) -----
if want_prof:
    for sym in [s for s in QUOTES if market.get("profiles", {}).get(s, {}).get("kind") != "fund"]:
        try:
            d = get(f"https://www.alphavantage.co/query?function=OVERVIEW&symbol={sym}&apikey={KEY}")
            used += 1
            if capped(d) or len(d) < 5:
                errors.append(f"PROFILE {sym}: capped or empty"); break
            prev = market.setdefault("profiles", {}).get(sym, {})
            r = {k: int(float(d.get("AnalystRating" + a) or 0))
                 for k, a in (("sb","StrongBuy"),("b","Buy"),("h","Hold"),("s","Sell"),("ss","StrongSell"))}
            market["profiles"][sym] = {
                "name": d.get("Name"), "kind": "stock", "exchange": d.get("Exchange"),
                "sector": (d.get("Sector") or "").title(), "industry": (d.get("Industry") or "").title(),
                # written by hand for a beginner audience - never overwritten by the feed
                "desc": prev.get("desc", ""),
                "eps": num(d.get("EPS")), "fpe": num(d.get("ForwardPE")), "peg": num(d.get("PEGRatio")),
                "beta": num(d.get("Beta")), "hi52": num(d.get("52WeekHigh")), "lo52": num(d.get("52WeekLow")),
                "target": num(d.get("AnalystTargetPrice")), "ratings": r, "analysts": sum(r.values()),
            }
        except Exception as e:
            errors.append(f"PROFILE {sym}: {e}")
        time.sleep(1.0)

market["asOf"]   = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
market["source"] = "Alpha Vantage"

block = "const MARKET = " + json.dumps(market, indent=2, ensure_ascii=False) + ";\n"
open(PAGE, "w", encoding="utf-8").write(page[:m.start()] + block + page[m.end():])

print(f"trading day : {market['tradingDay']}")
print(f"quotes      : {len(market['quotes'])}")
print(f"fundamentals: {len(market['fundamentals'])}   sparklines: {len(market['spark'])}   profiles: {len(market.get('profiles', {}))}")
print(f"API calls   : {used} of 25/day")
if errors:
    print("issues:")
    for e in errors[:8]: print("  !", e)
else:
    print("no errors")
print("\nUpdated " + PAGE + " — republish it to the artifact to go live.")
