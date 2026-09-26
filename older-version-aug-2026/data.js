/* ============================================================
   Investa — Full Course Content
   A structured beginner-to-confident investing curriculum.
   Numbers are illustrative for education, not live market data
   or financial advice.
   ============================================================ */

/* ---- Units group the modules into a curriculum ---- */
const UNITS = [
  { id:"u1", n:1, title:"Foundations", desc:"Mindset & money basics", modules:["why","foundation","markets"] },
  { id:"u2", n:2, title:"The Asset Classes", desc:"What you can actually buy", modules:["stocks","bonds","funds","alternatives"] },
  { id:"u3", n:3, title:"Strategy, Accounts & Risk", desc:"Building a real plan", modules:["risk","allocation","accounts","strategies"] },
  { id:"u4", n:4, title:"Analyzing Investments", desc:"Reading the numbers", modules:["fundamentals","analyze","technical"] },
  { id:"u5", n:5, title:"Crashes, Crises & the Global Economy", desc:"Learning from history", modules:["crashes","global","macro"] },
  { id:"u6", n:6, title:"Psychology & Your Plan", desc:"Behaving your way to wealth", modules:["psychology","mistakes","plan"] },
];

const MODULES = [
  /* ============ UNIT 1 — FOUNDATIONS ============ */
  {
    id:"why", emoji:"🌱", title:"Why Invest at All?", read:7,
    blurb:"The single most powerful idea in finance: making money work for you.",
    sections:[
      { h:"Saving vs. Investing", html:`
        <p class="lead">There's a crucial difference between storing money and growing it.</p>
        <p><b>Saving</b> means setting cash aside, usually in a bank account. It's safe and instantly available — perfect for emergencies and short-term goals. But it grows painfully slowly, and inflation quietly erodes its value.</p>
        <p><b>Investing</b> means buying assets — like stocks, bonds, or funds — that can grow in value and produce income over time. It carries more risk in the short term, but historically delivers far greater rewards over the long term.</p>
        <div class="def"><b>Inflation</b> — the gradual rise in prices over time. At 3% inflation, something costing $100 today costs about $134 in ten years. Cash sitting idle loses purchasing power every year.</div>
        <div class="callout key">💡 A typical savings account might pay 1–4% a year. The U.S. stock market has averaged roughly <b>~10% per year before inflation</b> (about 7% after) over the long run. Compounded across decades, that gap is the difference between comfort and struggle.</div>` },
      { h:"The Magic of Compound Growth", html:`
        <p>Compounding means earning returns <i>on your previous returns</i>. Your gains start generating their own gains. It feels slow at first, then becomes almost unbelievable.</p>
        <p>Suppose you invest <b>$1,000 once</b> and it grows at 10% per year:</p>
        <table class="data">
          <tr><th>Year</th><th>Value</th><th>What happened</th></tr>
          <tr><td>1</td><td>$1,100</td><td>Earned $100</td></tr>
          <tr><td>10</td><td>~$2,594</td><td>More than doubled</td></tr>
          <tr><td>30</td><td>~$17,449</td><td>Snowball accelerating</td></tr>
          <tr><td>40</td><td>~$45,259</td><td>45× your original deposit</td></tr>
        </table>
        <p>You contributed $1,000 — compounding did the other $44,000.</p>
        <div class="callout warn">⏳ <b>Time is the most important ingredient.</b> Someone who invests $200/month from age 25 to 35 and then stops often ends up with <i>more</i> than someone who starts at 35 and invests for 30 straight years. Starting early beats investing more later.</div>` },
      { h:"The Rule of 72", html:`
        <p>A handy mental shortcut: divide 72 by your annual return to estimate how many years it takes your money to <b>double</b>.</p>
        <ul>
          <li>At 8% a year → 72 ÷ 8 = <b>9 years</b> to double</li>
          <li>At 6% a year → 72 ÷ 6 = <b>12 years</b> to double</li>
          <li>At 2% (savings) → 72 ÷ 2 = <b>36 years</b> to double</li>
        </ul>
        <div class="callout">🧮 This one shortcut shows instantly why the return rate matters so much. Practice it in the <b>Compound Calculator</b> under Tools.</div>` },
      { h:"Risk Is Real — But Time Tames It", html:`
        <p>Markets rise and fall. In any single year, a stock index might drop 30% or surge 30%. That volatility is normal and expected — it's the "price of admission" for higher returns.</p>
        <p>But zoom out. Historically, over <b>any 20-year period</b>, a diversified U.S. stock portfolio has never lost money. Short-term it's a rollercoaster; long-term it's an escalator climbing upward.</p>
        <div class="callout key">🧠 The goal isn't to avoid risk — it's to take <b>smart, time-tested risk</b> and stay invested long enough for compounding to win.</div>` }
    ],
    quiz:[
      { q:"What is the main long-term advantage of investing over a basic savings account?", opts:["It carries zero risk","Higher growth that outpaces inflation","Money is more accessible","Banks guarantee the returns"], a:1, why:"Stocks have historically grown far faster than savings rates, helping you beat inflation over decades." },
      { q:"Compound growth means you earn returns on…", opts:["Only your original deposit","Your original money AND your accumulated past returns","The bank's profits","Inflation itself"], a:1, why:"Compounding stacks returns on top of prior returns — that snowball is the engine of wealth." },
      { q:"Using the Rule of 72, money growing at 9% per year doubles in roughly…", opts:["About 4 years","About 8 years","About 18 years","About 36 years"], a:1, why:"72 ÷ 9 = 8 years. The Rule of 72 is a quick doubling-time estimate." },
      { q:"Why does starting early matter so much?", opts:["Fees are lower when you're young","Each extra year gives compounding another cycle to multiply","Young people pay no tax","Stocks only rise for young investors"], a:1, why:"More time means more compounding cycles — the most valuable resource an investor has." },
      { q:"Over any 20-year period in history, a diversified U.S. stock portfolio has…", opts:["Always lost money","Never lost money","Stayed perfectly flat","Beaten every single stock"], a:1, why:"Time has historically smoothed out short-term volatility for diversified portfolios." }
    ]
  },
  {
    id:"foundation", emoji:"🧱", title:"Your Financial Foundation", read:8,
    blurb:"Before you invest a dollar: emergency fund, debt, and clear goals.",
    sections:[
      { h:"Step Zero: Don't Skip the Basics", html:`
        <p class="lead">Investing works best when it sits on a stable financial foundation. Rushing in without one is how beginners get forced to sell at the worst possible time.</p>
        <p>Think of it as a checklist you complete <i>before</i> putting serious money into the market:</p>
        <ol>
          <li>A small starter cash buffer</li>
          <li>High-interest debt under control</li>
          <li>A full emergency fund</li>
          <li>Clear, written goals</li>
        </ol>` },
      { h:"Build an Emergency Fund", html:`
        <div class="def"><b>Emergency fund</b> — 3 to 6 months of essential expenses kept in cash (a savings account), reserved for true emergencies like job loss, medical bills, or urgent repairs.</div>
        <p>Why it matters for investing: if your car dies and your only money is in stocks during a downturn, you're forced to sell at a loss. An emergency fund lets your investments stay invested and ride out storms.</p>
        <div class="callout">🛟 The emergency fund is <b>not</b> an investment — it's insurance. Keep it boring, safe, and accessible.</div>` },
      { h:"Crush High-Interest Debt First", html:`
        <p>Paying off a credit card charging 22% interest is effectively a <b>guaranteed 22% return</b> — better than almost any investment can reliably offer.</p>
        <table class="data">
          <tr><th>Debt type</th><th>Typical rate</th><th>Priority</th></tr>
          <tr><td>Credit cards</td><td>18–25%</td><td>🔴 Pay off before investing</td></tr>
          <tr><td>Personal / car loans</td><td>6–12%</td><td>🟡 Weigh case by case</td></tr>
          <tr><td>Mortgage / student (low)</td><td>3–6%</td><td>🟢 Usually OK to invest alongside</td></tr>
        </table>
        <div class="callout warn">⚠️ No investment reliably beats the interest on credit-card debt. Clearing it is one of the highest-return moves available.</div>` },
      { h:"Set Goals With Time Horizons", html:`
        <p>Every dollar you invest should have a job and a timeline. Your <b>time horizon</b> — when you'll need the money — determines how you should invest it.</p>
        <table class="data">
          <tr><th>Goal</th><th>Horizon</th><th>Suitable approach</th></tr>
          <tr><td>Vacation next year</td><td>&lt; 2 yrs</td><td>Cash / savings</td></tr>
          <tr><td>House deposit</td><td>3–5 yrs</td><td>Conservative mix</td></tr>
          <tr><td>Retirement at 65</td><td>20+ yrs</td><td>Growth-focused (stocks)</td></tr>
        </table>
        <div class="callout key">🎯 Golden rule: <b>never invest money in stocks that you'll need within ~3–5 years.</b> Short-term money belongs in safe, stable places.</div>` }
    ],
    quiz:[
      { q:"What should you generally do BEFORE investing seriously?", opts:["Buy a trending stock","Build an emergency fund and tackle high-interest debt","Open five brokerage accounts","Take out a loan to invest"], a:1, why:"A cash buffer and controlled debt keep you from being forced to sell investments at a bad time." },
      { q:"An emergency fund is best described as…", opts:["A high-growth investment","3–6 months of expenses kept safe in cash","Money in your hottest stock","A type of bond"], a:1, why:"It's insurance, not an investment — kept liquid and safe for true emergencies." },
      { q:"Paying off a 22% credit card is like earning…", opts:["A guaranteed ~22% return","Nothing useful","A 2% return","A tax refund"], a:0, why:"Eliminating that interest is a guaranteed return that beats typical market returns." },
      { q:"Money you'll need in under 3–5 years should mostly be…", opts:["In aggressive stocks","Kept safe in cash or conservative holdings","In a single growth stock","Borrowed and reinvested"], a:1, why:"Short horizons can't survive a crash, so that money stays safe." },
      { q:"Your time horizon mainly determines…", opts:["Which broker to use","How much risk is appropriate for that money","Your tax bracket","The fees you pay"], a:1, why:"The longer the horizon, the more short-term risk that money can absorb." }
    ]
  },
  {
    id:"markets", emoji:"🏛️", title:"How Markets Actually Work", read:7,
    blurb:"Exchanges, prices, and what really makes a stock move.",
    sections:[
      { h:"What Is a Stock Market?", html:`
        <p class="lead">A stock market is simply an organized place where buyers and sellers trade pieces of companies.</p>
        <p>When a company wants to raise money, it can sell shares to the public in an <b>IPO</b> (Initial Public Offering). After that, those shares trade between investors on exchanges like the NYSE or Nasdaq — the company itself usually isn't involved in everyday trades.</p>
        <div class="def"><b>Exchange</b> — a marketplace (like the NYSE or Nasdaq) where shares are bought and sold. <b>Index</b> — a basket that measures a slice of the market, e.g. the S&P 500 tracks 500 large U.S. companies.</div>` },
      { h:"How Prices Are Set", html:`
        <p>A stock's price is just the latest point where a buyer and seller agreed to trade. It moves constantly based on <b>supply and demand</b>.</p>
        <ul>
          <li>More buyers than sellers → price rises ⬆️</li>
          <li>More sellers than buyers → price falls ⬇️</li>
        </ul>
        <p>Underneath, demand is driven by expectations: earnings reports, interest rates, news, the economy, and plain human emotion. Markets are a voting machine in the short run and a weighing machine in the long run.</p>` },
      { h:"Bull Markets, Bear Markets & Corrections", html:`
        <table class="data">
          <tr><th>Term</th><th>Meaning</th></tr>
          <tr><td>📈 Bull market</td><td>A sustained rise; optimism dominates</td></tr>
          <tr><td>📉 Bear market</td><td>A drop of 20%+ from recent highs</td></tr>
          <tr><td>🌊 Correction</td><td>A drop of 10–20%; common and healthy</td></tr>
          <tr><td>💥 Crash</td><td>A sudden, sharp decline</td></tr>
        </table>
        <div class="callout">📚 Corrections happen roughly once a year on average. Bear markets are normal too — historically the market has recovered from every single one and gone on to new highs.</div>` },
      { h:"You Don't Need to Predict It", html:`
        <p>Here's the liberating truth: successful long-term investing does <b>not</b> require predicting the market's next move. It requires owning good assets and staying invested through the cycles.</p>
        <div class="callout key">🧭 The market's direction tomorrow is unknowable. Its direction over 20 years has reliably been up. Invest for the second fact, not the first.</div>` }
    ],
    quiz:[
      { q:"After a company's IPO, everyday trades of its shares mostly happen…", opts:["Directly with the company","Between investors on an exchange","With the government","Through the company's bank"], a:1, why:"Once public, shares trade investor-to-investor on exchanges; the company usually isn't part of each trade." },
      { q:"In the short term, a stock's price is mainly set by…", opts:["Government decree","Supply and demand among buyers and sellers","The company's CEO","A fixed formula"], a:1, why:"Price is wherever buyers and sellers currently agree, driven by supply and demand." },
      { q:"A 'bear market' is generally a decline of…", opts:["2% or more","5% or more","20% or more from recent highs","50% exactly"], a:2, why:"A bear market is conventionally a drop of 20% or more from recent highs." },
      { q:"A market 'correction' (10–20% drop) is…", opts:["Extremely rare and alarming","A fairly normal, roughly annual event","A sign to sell everything","Impossible in index funds"], a:1, why:"Corrections happen about once a year on average and are a normal part of investing." },
      { q:"Long-term investing success mainly requires…", opts:["Accurately predicting short-term moves","Owning good assets and staying invested through cycles","Trading every day","Avoiding the market in downturns"], a:1, why:"You can't reliably predict short-term moves, but staying invested captures the long-term uptrend." }
    ]
  },

  /* ============ UNIT 2 — ASSET CLASSES ============ */
  {
    id:"stocks", emoji:"📈", title:"Stocks, In Depth", read:8,
    blurb:"Owning slices of real companies — how returns and dividends work.",
    sections:[
      { h:"What a Share Really Is", html:`
        <p class="lead">A <b>stock</b> (or "share") is a unit of ownership in a real company. Own one share of a business and you own a genuine — if tiny — slice of it, including its future profits.</p>
        <p>If a company is divided into 1 billion shares and you own 1,000, you own one-millionth of the entire enterprise: its factories, brands, cash, and earnings.</p>` },
      { h:"The Two Ways Stocks Make You Money", html:`
        <h4>1. Capital gains (price appreciation)</h4>
        <p>If you buy at $50 and the price rises to $80, you have a $30 <b>unrealized gain</b>. It becomes <b>realized</b> (and usually taxable) when you sell.</p>
        <h4>2. Dividends</h4>
        <div class="def"><b>Dividend</b> — a portion of a company's profit paid out to shareholders, typically every quarter. Reinvesting dividends turbocharges compounding.</div>
        <p>Mature, stable companies tend to pay dividends; fast-growing companies often reinvest everything back into growth instead.</p>` },
      { h:"Common Stock Categories", html:`
        <table class="data">
          <tr><th>Type</th><th>Characteristics</th></tr>
          <tr><td>Growth stocks</td><td>Reinvest profits, fast revenue growth, rarely pay dividends, more volatile</td></tr>
          <tr><td>Value stocks</td><td>Trade cheaply vs fundamentals, often steadier, frequently pay dividends</td></tr>
          <tr><td>Dividend / income stocks</td><td>Mature firms paying reliable cash to shareholders</td></tr>
          <tr><td>Blue chips</td><td>Large, well-established, financially strong household names</td></tr>
        </table>
        <div class="def"><b>Market capitalization</b> — share price × number of shares. Large-cap (giant), mid-cap, and small-cap (smaller, riskier, higher growth potential).</div>` },
      { h:"The Risk of Single Stocks", html:`
        <p>Owning individual stocks can be rewarding but concentrated. A single company can stumble, get disrupted, or even go to zero — something a whole index essentially never does.</p>
        <div class="callout warn">⚠️ This is why most beginners are guided toward <b>funds</b> (next lesson) rather than betting their savings on a handful of individual stocks. Picking single winners consistently is extremely hard, even for professionals.</div>` }
    ],
    quiz:[
      { q:"Owning a share of stock means you…", opts:["Lent money to the company","Own a genuine slice of the company","Are guaranteed dividends","Hold a type of bond"], a:1, why:"A share is real partial ownership of the business and its future profits." },
      { q:"A gain you haven't sold yet is called…", opts:["A realized gain","An unrealized (paper) gain","A dividend","A capital loss"], a:1, why:"It's unrealized until you sell; selling makes it realized and usually taxable." },
      { q:"Fast-growing companies often pay no dividend because they…", opts:["Have no profit ever","Reinvest profits back into growth","Are legally banned from it","Are about to fail"], a:1, why:"Growth companies typically plow earnings back into expansion rather than paying them out." },
      { q:"Market capitalization is calculated as…", opts:["Revenue × profit","Share price × number of shares","Dividends × years","Cash in the bank"], a:1, why:"Market cap is the total market value of all the company's shares." },
      { q:"Compared with a broad index, a single stock…", opts:["Is always safer","Carries more concentrated, company-specific risk","Pays guaranteed returns","Cannot lose value"], a:1, why:"Individual companies can fail; a diversified index spreads that risk out." }
    ]
  },
  {
    id:"bonds", emoji:"🏦", title:"Bonds & Fixed Income", read:7,
    blurb:"Lending for steady interest — the calm anchor of a portfolio.",
    sections:[
      { h:"A Bond Is an IOU", html:`
        <p class="lead">A <b>bond</b> is a loan you make to a government or company. In return, they pay you regular interest and return your original amount at the end.</p>
        <div class="def"><b>Principal / face value</b> — the amount repaid at the end. <b>Coupon</b> — the interest rate the bond pays. <b>Maturity</b> — the date the principal is repaid.</div>
        <p>Example: a $1,000 bond with a 4% coupon and 10-year maturity pays you $40 a year for 10 years, then returns your $1,000.</p>` },
      { h:"Why Hold Bonds?", html:`
        <p>Bonds are generally <b>safer and steadier</b> than stocks. They produce predictable income and tend to hold up — or even rise — when stocks fall, cushioning your portfolio.</p>
        <div class="callout key">⚖️ Mental model: <b>stocks are the growth engine; bonds are the shock absorber.</b> Together they smooth the ride.</div>` },
      { h:"Types of Bonds", html:`
        <table class="data">
          <tr><th>Type</th><th>Issuer</th><th>Risk</th></tr>
          <tr><td>Government bonds</td><td>National governments (e.g. Treasuries)</td><td>Lowest</td></tr>
          <tr><td>Municipal bonds</td><td>States / cities</td><td>Low</td></tr>
          <tr><td>Investment-grade corporate</td><td>Strong companies</td><td>Moderate</td></tr>
          <tr><td>High-yield ("junk") bonds</td><td>Riskier companies</td><td>Higher (pay more)</td></tr>
        </table>` },
      { h:"The Key Risk: Interest Rates", html:`
        <p>Bond prices move <b>opposite</b> to interest rates. When rates rise, existing bonds paying lower rates become less attractive, so their prices fall — and vice versa.</p>
        <div class="callout warn">🔁 Rates up → bond prices down. Rates down → bond prices up. Longer-maturity bonds swing more. This is the single most important bond concept to remember.</div>` }
    ],
    quiz:[
      { q:"A bond is fundamentally…", opts:["Ownership of a company","A loan you make in exchange for interest","A savings account","A free share"], a:1, why:"Bonds are IOUs — you lend money and receive interest plus your principal back." },
      { q:"In a portfolio, bonds mainly act as…", opts:["The high-growth engine","A shock absorber that steadies returns","A way to avoid all taxes","A guaranteed way to beat stocks"], a:1, why:"Bonds add stability and income, cushioning stock volatility." },
      { q:"Which bond type is generally the safest?", opts:["High-yield 'junk' bonds","Government (e.g. Treasury) bonds","Startup corporate bonds","Foreign emerging-market bonds"], a:1, why:"Bonds from stable national governments carry the lowest default risk." },
      { q:"When interest rates RISE, existing bond prices generally…", opts:["Rise too","Fall","Stay exactly the same","Become worthless"], a:1, why:"Bond prices move opposite to rates — rising rates push existing bond prices down." },
      { q:"A bond's 'coupon' refers to its…", opts:["Maturity date","Interest rate paid to the holder","Issuer's credit score","Discount at purchase"], a:1, why:"The coupon is the interest rate the bond pays its holder." }
    ]
  },
  {
    id:"funds", emoji:"🧺", title:"Funds, Index Funds & ETFs", read:8,
    blurb:"Buy hundreds of investments in one click — the beginner's best friend.",
    sections:[
      { h:"One Purchase, Instant Diversification", html:`
        <p class="lead">A <b>fund</b> pools money from many investors to buy a basket of investments. Buy one share of the fund and you instantly own a slice of everything inside it.</p>
        <div class="def"><b>Diversification</b> — spreading money across many investments so no single failure can sink you. Funds make this effortless.</div>
        <p>Instead of researching and buying 500 individual stocks, you buy one S&P 500 fund and own a piece of all 500.</p>` },
      { h:"Index Funds vs. Active Funds", html:`
        <h4>Index funds (passive)</h4>
        <p>Automatically track a market index (like the S&P 500). No manager picking stocks, so fees are tiny. They simply aim to match the market.</p>
        <h4>Active funds</h4>
        <p>A manager tries to beat the market by picking investments. They charge higher fees — and the large majority <b>underperform</b> simple index funds over time after those fees.</p>
        <div class="callout key">📊 Decades of data show most active managers fail to beat a cheap index fund over the long run. This is why index investing is so widely recommended for beginners.</div>` },
      { h:"What Makes an ETF Special", html:`
        <div class="def"><b>ETF (Exchange-Traded Fund)</b> — an index fund that trades on an exchange like a stock, all day long. Usually low-cost, tax-efficient, and easy to buy in small amounts.</div>
        <table class="data">
          <tr><th></th><th>Mutual fund</th><th>ETF</th></tr>
          <tr><td>Trades</td><td>Once daily after close</td><td>All day like a stock</td></tr>
          <tr><td>Minimums</td><td>Often higher</td><td>Price of one share</td></tr>
          <tr><td>Typical cost</td><td>Varies, can be high</td><td>Often very low</td></tr>
        </table>` },
      { h:"The Tyranny of Fees", html:`
        <p>Fees are quoted as an <b>expense ratio</b> — an annual % of your money. They sound tiny but compound brutally.</p>
        <div class="def"><b>Expense ratio</b> — the yearly fee a fund charges, e.g. 0.05% vs 1.0%.</div>
        <table class="data">
          <tr><th>Fee</th><th>$10k invested, 30 yrs @ 7%</th><th>Lost to fees</th></tr>
          <tr><td>0.05%</td><td>~$75,400</td><td>~$1,000</td></tr>
          <tr><td>1.00%</td><td>~$57,400</td><td>~$19,000</td></tr>
        </table>
        <div class="callout warn">💸 A 1% fee quietly cost about <b>$18,000 more</b> than a 0.05% fund on the same money. Always check the expense ratio — low fees are one of the few guarantees in investing.</div>` }
    ],
    quiz:[
      { q:"The main benefit of a fund for a beginner is…", opts:["Guaranteed profits","Instant diversification in a single purchase","No risk at all","It's always tax-free"], a:1, why:"One fund spreads your money across many investments automatically." },
      { q:"An index fund aims to…", opts:["Beat the market through stock-picking","Match the performance of a market index at low cost","Avoid the stock market","Guarantee a fixed return"], a:1, why:"Index funds passively track an index, keeping fees very low." },
      { q:"Compared to most active funds, low-cost index funds have historically…", opts:["Badly underperformed","Outperformed the majority after fees","Performed identically with higher cost","Been illegal"], a:1, why:"Most active managers fail to beat cheap index funds over the long run after fees." },
      { q:"The key difference of an ETF is that it…", opts:["Can't be diversified","Trades on an exchange all day like a stock","Has no fees ever","Is guaranteed by the government"], a:1, why:"ETFs trade intraday like stocks, often with low costs and small minimums." },
      { q:"A fund's expense ratio is…", opts:["A one-time signup fee","The annual percentage fee it charges","A government tax","The fund's return"], a:1, why:"It's the yearly fee as a % of assets — small numbers compound into big differences." }
    ]
  },
  {
    id:"alternatives", emoji:"🏘️", title:"Beyond Stocks & Bonds", read:7,
    blurb:"Real estate, commodities, cash, and a clear-eyed look at crypto.",
    sections:[
      { h:"Real Estate & REITs", html:`
        <p class="lead">Property can produce rental income and appreciation, but buying a building takes a lot of capital and effort. <b>REITs</b> make real estate investing as easy as buying a stock.</p>
        <div class="def"><b>REIT (Real Estate Investment Trust)</b> — a company that owns income-producing property (apartments, malls, warehouses) and trades like a stock. REITs must pay out most of their income as dividends.</div>
        <p>REITs add diversification because real estate doesn't always move in lockstep with stocks.</p>` },
      { h:"Commodities & Gold", html:`
        <p><b>Commodities</b> are raw materials — oil, wheat, copper, and precious metals like gold. They produce no income (no dividends or interest); you're betting purely on price.</p>
        <p>Gold is often held as a <b>hedge</b> — something that may hold value when currencies or markets wobble. It can diversify, but over the very long run it has lagged stocks.</p>
        <div class="callout">🪙 Commodities can diversify, but because they generate no income, they're usually a small supporting role — not the core of a portfolio.</div>` },
      { h:"Cash & Cash Equivalents", html:`
        <p>Cash, savings accounts, money-market funds, and short-term government bills are the <b>safest</b> assets. They barely grow, but they don't fall — essential for emergencies and short-term goals.</p>
        <div class="callout warn">💵 Holding too much cash long-term is its own risk: inflation slowly erodes it. Cash is for safety and near-term needs, not long-term growth.</div>` },
      { h:"Cryptocurrency: A Sober Take", html:`
        <p><b>Crypto</b> (like Bitcoin) is a digital asset known for extreme volatility — it can swing 50%+ in weeks. It's young, speculative, and unpredictable.</p>
        <div class="callout warn">⚠️ A common, cautious guideline: if you choose to hold crypto at all, treat it as a <b>small, speculative</b> slice (often suggested as no more than ~5% of a portfolio) — money you can afford to lose. Never let it crowd out your diversified core. This is education, not a recommendation to buy.</div>` }
    ],
    quiz:[
      { q:"A REIT lets you invest in real estate by…", opts:["Buying a physical building","Buying a stock-like share of a property-owning company","Lending to a bank","Trading commodities"], a:1, why:"REITs trade like stocks and own income-producing property, paying out most income as dividends." },
      { q:"A defining feature of commodities like gold is that they…", opts:["Pay high dividends","Produce no income — returns come only from price changes","Are guaranteed to rise","Are risk-free"], a:1, why:"Commodities generate no interest or dividends; you profit only if the price rises." },
      { q:"The biggest long-term risk of holding too much CASH is…", opts:["It can crash 50%","Inflation slowly erodes its purchasing power","High trading fees","It pays no dividends ever"], a:1, why:"Cash is safe from crashes but loses real value to inflation over time." },
      { q:"A prudent approach to crypto for most investors is to…", opts:["Put most savings in it","Treat it as a small speculative slice of money you can lose","Avoid learning about it entirely","Borrow money to buy it"], a:1, why:"Its extreme volatility means it's commonly limited to a small, speculative portion at most." },
      { q:"Cash and cash equivalents are best used for…", opts:["Long-term growth","Emergencies and short-term goals","Beating inflation","Maximum returns"], a:1, why:"They're safe and stable — ideal for near-term needs, not long-term growth." }
    ]
  },

  /* ============ UNIT 3 — STRATEGY, ACCOUNTS & RISK ============ */
  {
    id:"risk", emoji:"⚖️", title:"Risk, Reward & Volatility", read:7,
    blurb:"Find the level of risk you can actually live with.",
    sections:[
      { h:"The Risk–Reward Tradeoff", html:`
        <p class="lead">There is no free lunch in investing. Higher potential returns always come bundled with bigger swings. Lower risk means lower expected returns.</p>
        <div class="def"><b>Volatility</b> — how much an investment's price bounces around. High volatility means a bumpier ride, not necessarily a worse investment.</div>
        <p>Your task isn't to find impossible "high return, no risk" deals — it's to find the risk level you can hold through the scary moments <b>without panic-selling</b>.</p>` },
      { h:"Types of Risk", html:`
        <table class="data">
          <tr><th>Risk</th><th>What it is</th><th>Defense</th></tr>
          <tr><td>Market risk</td><td>The whole market falls</td><td>Long time horizon</td></tr>
          <tr><td>Company risk</td><td>One business fails</td><td>Diversification</td></tr>
          <tr><td>Inflation risk</td><td>Money loses value</td><td>Owning growth assets</td></tr>
          <tr><td>Behavioral risk</td><td>You panic and sell</td><td>A written plan</td></tr>
        </table>` },
      { h:"Risk Capacity vs. Risk Tolerance", html:`
        <p>Two different questions:</p>
        <ul>
          <li><b>Risk capacity</b> — how much risk you can <i>financially afford</i> (driven by time horizon and stability).</li>
          <li><b>Risk tolerance</b> — how much volatility you can <i>emotionally stomach</i> without losing sleep or selling.</li>
        </ul>
        <p>A 25-year-old has high capacity but might have low tolerance. The right plan respects <b>both</b>.</p>` },
      { h:"Volatility Is the Price of Admission", html:`
        <p>The market's long-term ~10% average return isn't free — it's the reward for enduring gut-wrenching drops along the way. Investors who accept volatility get the return; those who flee in fear often lock in losses.</p>
        <div class="callout key">🎢 Reframe it: a market drop isn't your money "disappearing." If you don't sell, it's a temporary dip — and historically, a buying opportunity.</div>` }
    ],
    quiz:[
      { q:"Higher potential returns generally come with…", opts:["Zero risk","More volatility and bigger swings","A government guarantee","Lower fees"], a:1, why:"Risk and reward are linked — there's no high return without higher risk." },
      { q:"Diversification is the main defense against…", opts:["Inflation risk","Company-specific risk","Interest-rate risk","Currency risk"], a:1, why:"Spreading across many companies means one failure can't sink you." },
      { q:"'Risk tolerance' refers to…", opts:["How much risk you can financially afford","How much volatility you can emotionally handle","Your tax rate","The market's volatility"], a:1, why:"Tolerance is emotional — your ability to stay calm; capacity is financial." },
      { q:"For a long-term investor, a market drop is best viewed as…", opts:["Permanent loss of money","A temporary dip and potential buying opportunity","A reason to sell everything","Proof investing failed"], a:1, why:"If you don't sell, drops are temporary — historically followed by recovery." },
      { q:"Volatility is best described as…", opts:["A sign of a bad investment","The price of admission for higher long-term returns","Something to be avoided entirely","A type of fee"], a:1, why:"Enduring volatility is what earns the long-term return premium of stocks." }
    ]
  },
  {
    id:"allocation", emoji:"🥧", title:"Diversification & Allocation", read:8,
    blurb:"The recipe that drives most of your results: how to mix assets.",
    sections:[
      { h:"Asset Allocation Is the Big Decision", html:`
        <p class="lead">How you split money among stocks, bonds, and cash — your <b>asset allocation</b> — drives the majority of your long-term results. It matters more than which specific fund or stock you pick.</p>
        <div class="def"><b>Asset allocation</b> — your high-level recipe of stocks vs bonds vs cash, matched to your risk and time horizon.</div>` },
      { h:"Diversify on Every Level", html:`
        <p>Don't just own many stocks — spread across dimensions:</p>
        <ul>
          <li><b>Across asset classes</b> — stocks, bonds, real estate</li>
          <li><b>Across geographies</b> — domestic and international</li>
          <li><b>Across sectors</b> — tech, healthcare, energy, finance</li>
          <li><b>Across company sizes</b> — large, mid, small caps</li>
        </ul>
        <div class="callout">🌍 A "total world" stock fund plus a bond fund can give a beginner thousands of holdings across the globe in just two purchases.</div>` },
      { h:"Starter Allocation Recipes", html:`
        <table class="data">
          <tr><th>Profile</th><th>Stocks</th><th>Bonds</th><th>Fits</th></tr>
          <tr><td>Aggressive</td><td>90%</td><td>10%</td><td>Long horizon, high tolerance</td></tr>
          <tr><td>Balanced</td><td>60%</td><td>40%</td><td>The classic all-rounder</td></tr>
          <tr><td>Conservative</td><td>40%</td><td>60%</td><td>Nearing the goal</td></tr>
        </table>
        <p>A rough age guideline: hold a stock percentage near <b>110 minus your age</b>. A 30-year-old → ~80% stocks.</p>
        <div class="callout key">🥧 Try the <b>Portfolio Builder</b> tool to mix your own allocation and instantly see the expected return and risk.</div>` },
      { h:"Rebalancing Keeps You On Track", html:`
        <div class="def"><b>Rebalancing</b> — periodically restoring your target mix. If stocks surge from 60% to 70% of your portfolio, you sell a little and top up bonds to return to 60/40.</div>
        <p>Rebalancing quietly enforces "buy low, sell high" and keeps your risk from drifting higher than you intended. Once a year is plenty.</p>` }
    ],
    quiz:[
      { q:"Asset allocation refers to…", opts:["Which broker you use","How you split money across stocks/bonds/cash","Your account fees","The market's direction"], a:1, why:"It's your high-level recipe and the biggest driver of long-term results." },
      { q:"True diversification means spreading across…", opts:["Only many tech stocks","Asset classes, geographies, sectors, and sizes","A single index only","Just two stocks"], a:1, why:"Real diversification works on several dimensions, not just owning many similar things." },
      { q:"Using '110 minus your age,' a 40-year-old would hold roughly…", opts:["40% stocks","70% stocks","100% bonds","10% stocks"], a:1, why:"110 − 40 = 70% stocks as a rough starting guideline." },
      { q:"Rebalancing means…", opts:["Selling everything in a crash","Restoring your portfolio to its target mix","Buying only winners","Cashing out yearly"], a:1, why:"It nudges holdings back to target, enforcing buy-low/sell-high and controlling risk." },
      { q:"Compared to picking the perfect stock, asset allocation is…", opts:["Far less important","Usually the bigger driver of long-term results","Irrelevant","Only for professionals"], a:1, why:"Decades of research show allocation explains most of a portfolio's results." }
    ]
  },
  {
    id:"accounts", emoji:"🧾", title:"Accounts, Fees & Taxes", read:8,
    blurb:"Where to hold investments and how to keep more of your gains.",
    sections:[
      { h:"You Need a Brokerage Account", html:`
        <p class="lead">To invest, you open an account with a <b>broker</b> — a regulated firm that lets you buy and sell investments. Many now charge $0 commissions to trade stocks and ETFs.</p>
        <div class="def"><b>Brokerage account</b> — the account that holds your investments. A standard (taxable) one has no special tax perks but total flexibility.</div>
        <div class="callout">🔍 When choosing a broker, check: low/zero trading fees, low fund expense ratios offered, no account minimums, and strong security/regulation.</div>` },
      { h:"Tax-Advantaged Accounts", html:`
        <p>Many countries offer special accounts that supercharge investing by reducing taxes. The names differ by country, but the ideas are similar:</p>
        <table class="data">
          <tr><th>Idea</th><th>How it helps</th><th>Examples</th></tr>
          <tr><td>Pre-tax retirement</td><td>Deduct now, taxed on withdrawal</td><td>401(k), traditional IRA, pension</td></tr>
          <tr><td>After-tax retirement</td><td>Pay tax now, grow & withdraw tax-free</td><td>Roth IRA, ISA-style</td></tr>
        </table>
        <div class="callout key">🏆 Tax-advantaged accounts are often the <b>first place</b> to invest — especially if an employer matches contributions, which is essentially free money.</div>` },
      { h:"How Investment Gains Are Taxed", html:`
        <p>In a taxable account, you generally owe tax on:</p>
        <ul>
          <li><b>Capital gains</b> — profit when you sell. Holding longer often qualifies for lower <b>long-term</b> rates.</li>
          <li><b>Dividends & interest</b> — income you receive along the way.</li>
        </ul>
        <div class="callout">⏳ Holding investments longer can mean lower taxes <i>and</i> more compounding — another reason patience pays. (Tax rules vary by country; check your local rules.)</div>` },
      { h:"The Employer Match: Free Money", html:`
        <p>If an employer offers to match retirement contributions (e.g. matching the first 5% you put in), contributing at least enough to get the full match is one of the highest-return moves in all of personal finance.</p>
        <div class="callout warn">💼 Not capturing a full employer match is like declining a guaranteed 50–100% instant return on that money. Grab it first.</div>` }
    ],
    quiz:[
      { q:"To buy investments, you first open…", opts:["A bond","A brokerage account with a broker","A mutual fund company","An index"], a:1, why:"A brokerage account is the account through which you buy and hold investments." },
      { q:"Tax-advantaged retirement accounts are valuable because they…", opts:["Guarantee higher returns","Reduce taxes, letting more money compound","Remove all risk","Have no rules"], a:1, why:"Lower taxes mean more of your money stays invested and compounding." },
      { q:"Holding an investment longer before selling can result in…", opts:["Higher tax rates always","Potentially lower long-term capital-gains tax","No tax difference ever","Losing your gains"], a:1, why:"Many systems tax long-term gains at lower rates than short-term ones." },
      { q:"An employer 'match' on retirement contributions is best described as…", opts:["A loan you repay","Essentially free money / instant return","A tax penalty","A type of fee"], a:1, why:"Matching contributions are free money — capturing the full match is a top priority." },
      { q:"A standard taxable brokerage account offers…", opts:["Special tax breaks","Maximum flexibility but no special tax perks","Guaranteed returns","No ability to sell"], a:1, why:"Taxable accounts are flexible with no withdrawal rules, but lack tax advantages." }
    ]
  },
  {
    id:"strategies", emoji:"♟️", title:"Investing Strategies", read:8,
    blurb:"Time-tested approaches that actually work for normal people.",
    sections:[
      { h:"Buy and Hold", html:`
        <p class="lead">The simplest winning strategy: buy quality diversified assets and hold them for years or decades, ignoring the noise.</p>
        <p>It works because it captures the market's full long-term growth, minimizes fees and taxes from trading, and sidesteps the impossible task of timing the market.</p>
        <div class="callout key">🧘 "The stock market is a device for transferring money from the impatient to the patient." — widely attributed to Warren Buffett.</div>` },
      { h:"Dollar-Cost Averaging (DCA)", html:`
        <div class="def"><b>Dollar-cost averaging</b> — investing a fixed amount on a regular schedule (e.g. $300 every month), regardless of price.</div>
        <p>You automatically buy more shares when prices are low and fewer when high, smoothing your average cost. Best of all, it removes emotion and the need to "time" anything.</p>
        <table class="data">
          <tr><th>Month</th><th>Invest</th><th>Price</th><th>Shares bought</th></tr>
          <tr><td>1</td><td>$300</td><td>$30</td><td>10</td></tr>
          <tr><td>2</td><td>$300</td><td>$20</td><td>15</td></tr>
          <tr><td>3</td><td>$300</td><td>$25</td><td>12</td></tr>
        </table>
        <p>You bought the most shares when it was cheapest — automatically.</p>` },
      { h:"Passive vs. Active", html:`
        <p><b>Passive investing</b> = own the whole market cheaply via index funds and hold. <b>Active investing</b> = try to beat the market by picking and timing.</p>
        <p>For the vast majority of people, a passive, low-cost, automated approach wins — it's simpler, cheaper, and historically outperforms most active efforts after fees.</p>` },
      { h:"Value vs. Growth (and Why Total-Market Wins for Beginners)", html:`
        <p><b>Value investing</b> hunts for under-priced, established companies. <b>Growth investing</b> bets on fast-expanding firms at higher prices. Both have had their decades in the sun.</p>
        <div class="callout">🌐 Beginners don't have to choose: a <b>total-market index fund</b> owns both value and growth, large and small, automatically. Simplicity is a feature, not a compromise.</div>` }
    ],
    quiz:[
      { q:"'Buy and hold' works largely because it…", opts:["Times the market perfectly","Captures long-term growth while minimizing fees and timing mistakes","Avoids the market in downturns","Guarantees no losses"], a:1, why:"Staying invested captures the full uptrend and avoids costly trading and timing errors." },
      { q:"Dollar-cost averaging means…", opts:["Buying only at the bottom","Investing a fixed amount on a regular schedule","Selling a fixed amount monthly","Investing only when news is good"], a:1, why:"Regular fixed investing smooths your average price and removes emotion." },
      { q:"With DCA, when prices fall you automatically…", opts:["Buy fewer shares","Buy more shares for the same money","Stop investing","Sell shares"], a:1, why:"A fixed dollar amount buys more shares when prices are lower." },
      { q:"For most people, a passive index approach tends to…", opts:["Underperform badly","Beat most active strategies after fees, more simply","Be illegal","Require daily trading"], a:1, why:"Low-cost passive investing historically outperforms most active efforts net of fees." },
      { q:"A total-market index fund is appealing because it…", opts:["Only holds growth stocks","Automatically owns value and growth, large and small","Guarantees returns","Requires expert stock-picking"], a:1, why:"It captures the whole market in one holding, so beginners needn't choose styles." }
    ]
  },

  /* ============ UNIT 4 — ANALYSIS ============ */
  {
    id:"fundamentals", emoji:"🔬", title:"Fundamental Analysis", read:8,
    blurb:"How to judge a company's actual business and value.",
    sections:[
      { h:"What Fundamental Analysis Is", html:`
        <p class="lead"><b>Fundamental analysis</b> means studying a company's real business — its earnings, growth, debt, and value — to judge whether its stock is a good buy.</p>
        <p>It answers: Is this a healthy, growing business? And am I paying a fair price for it?</p>` },
      { h:"The Income Statement Basics", html:`
        <table class="data">
          <tr><th>Term</th><th>Meaning</th></tr>
          <tr><td>Revenue (sales)</td><td>Total money coming in</td></tr>
          <tr><td>Net income (profit)</td><td>What's left after all costs</td></tr>
          <tr><td>EPS (earnings per share)</td><td>Profit ÷ number of shares</td></tr>
          <tr><td>Profit margin</td><td>Profit ÷ revenue — efficiency</td></tr>
        </table>
        <p>Healthy signs: revenue and profit <b>growing</b> over time, with solid margins.</p>` },
      { h:"Key Valuation Ratios", html:`
        <div class="def"><b>P/E ratio (price ÷ earnings per share)</b> — roughly, how many dollars you pay for each $1 of annual profit. High P/E = high growth expectations (or overpricing); low P/E = modest expectations (or a bargain).</div>
        <div class="def"><b>Dividend yield</b> — annual dividend ÷ price. The cash return you get for holding.</div>
        <div class="def"><b>Debt-to-equity</b> — how much the company borrows vs owns. High debt adds risk.</div>` },
      { h:"Context Is Everything", html:`
        <p>No ratio means anything in isolation. A P/E of 30 is alarming for a sleepy utility but ordinary for a fast-growing tech firm. Always compare a company to:</p>
        <ul>
          <li>Its <b>own history</b> — improving or deteriorating?</li>
          <li>Its <b>competitors</b> — cheaper or pricier than peers?</li>
          <li>Its <b>story</b> — does the business make sense and have a durable edge?</li>
        </ul>
        <div class="callout key">🔍 Put this to work in the <b>Stock Analyzer</b> tool — read realistic company profiles and decide what the numbers are telling you.</div>` }
    ],
    quiz:[
      { q:"Fundamental analysis focuses on…", opts:["Chart patterns and price history","A company's actual business: earnings, growth, value","Predicting tomorrow's price","Market mood swings"], a:1, why:"It studies the underlying business to judge quality and fair value." },
      { q:"EPS (earnings per share) is…", opts:["Revenue ÷ price","Profit ÷ number of shares","Dividend ÷ price","Debt ÷ equity"], a:1, why:"EPS is the company's profit divided by its share count." },
      { q:"A high P/E ratio usually signals that investors…", opts:["Expect strong future growth (or it's overpriced)","Think it will go bankrupt","Receive no dividends","Pay no taxes"], a:0, why:"A high P/E reflects high growth expectations priced into the stock." },
      { q:"The best way to judge whether a P/E is 'high' is to…", opts:["Compare it to peers and its own history","Check if it's above 10","Ignore the sector","Always buy under 5"], a:0, why:"Ratios only have meaning in context — versus rivals and the company's past." },
      { q:"A high debt-to-equity ratio generally means…", opts:["Lower risk","More risk from heavy borrowing","Guaranteed dividends","A cheaper stock"], a:1, why:"Lots of debt adds financial risk, especially in downturns." }
    ]
  },
  {
    id:"analyze", emoji:"🧠", title:"Reading a Real Stock", read:9,
    blurb:"Apply your skills to realistic company profiles. Hands-on.",
    sections:[
      { h:"From Theory to Practice", html:`
        <p class="lead">You've learned the metrics — now let's read companies like an analyst. The same numbers tell totally different stories depending on the type of business.</p>
        <p>Below are four archetypes you'll meet constantly in the real world. Notice how identical-looking metrics mean different things for each.</p>` },
      { h:"The Four Archetypes", html:`
        <table class="data">
          <tr><th>Archetype</th><th>Profile</th><th>Investor appeal</th></tr>
          <tr><td>🏛️ The Steady Giant</td><td>Huge, profitable, slow growth, modest P/E</td><td>Stability & reliability</td></tr>
          <tr><td>🚀 The Hot Grower</td><td>Fast revenue, sky-high P/E, volatile</td><td>Big upside, big risk</td></tr>
          <tr><td>💡 The Income Payer</td><td>Slow, stable, fat dividend</td><td>Cash income</td></tr>
          <tr><td>☁️ The Quality Compounder</td><td>Strong growth + strong profits</td><td>Premium quality</td></tr>
        </table>` },
      { h:"A Repeatable Checklist", html:`
        <p>When you open any stock, run through this:</p>
        <ol>
          <li><b>What does it do?</b> Understand the business in one sentence.</li>
          <li><b>Is it growing?</b> Check revenue & profit trend.</li>
          <li><b>Is it profitable & healthy?</b> Margins and debt.</li>
          <li><b>What am I paying?</b> P/E vs peers and history.</li>
          <li><b>What's the story & risk?</b> Edge, competition, what could go wrong.</li>
        </ol>
        <div class="callout key">🧠 Open the <b>Stock Analyzer</b> tool now and work through all four archetypes. Answer the guided questions to lock it in.</div>` }
    ],
    quiz:[
      { q:"A company with a modest P/E, huge size, and slow growth is most likely…", opts:["A hot growth stock","A steady giant valued for reliability","About to go bankrupt","A penny stock"], a:1, why:"Large, profitable, slow-growing firms earn modest valuations and appeal to stability seekers." },
      { q:"A very high P/E (e.g. 75) combined with rapid growth signals…", opts:["A bargain","Investors betting heavily on big future growth","A safe income stock","A failing company"], a:1, why:"A high P/E prices in years of rapid future growth — exciting but risky if growth slows." },
      { q:"A stock with a flat price chart and a high dividend yield appeals most to…", opts:["Thrill-seekers","Income-focused, conservative investors","Day traders","People chasing 10× returns"], a:1, why:"Stable price plus high dividend is the classic income-investor profile." },
      { q:"The first step when reading any new stock is to…", opts:["Check the chart","Understand what the business actually does","Look at the dividend","Guess the price tomorrow"], a:1, why:"If you can't explain the business simply, you can't judge the investment." },
      { q:"Strong growth AND strong profit margins together describe a…", opts:["Junk stock","Quality compounder that often earns a premium valuation","Guaranteed loser","Risk-free bond"], a:1, why:"High growth plus high profitability is the hallmark of a quality business." }
    ]
  },
  {
    id:"technical", emoji:"📉", title:"Charts & Technical Analysis", read:7,
    blurb:"A balanced intro to price charts — and their real limits.",
    sections:[
      { h:"What Technical Analysis Is", html:`
        <p class="lead"><b>Technical analysis</b> studies price and volume <i>charts</i> to spot patterns and trends, rather than analyzing the underlying business.</p>
        <p>Where fundamental analysis asks "is this a good business at a fair price?", technical analysis asks "what is the price doing, and what might it do next?"</p>` },
      { h:"Common Chart Concepts", html:`
        <table class="data">
          <tr><th>Concept</th><th>Meaning</th></tr>
          <tr><td>Trend</td><td>The general direction (up, down, sideways)</td></tr>
          <tr><td>Support</td><td>A price level where buying tends to halt drops</td></tr>
          <tr><td>Resistance</td><td>A level where selling tends to cap rises</td></tr>
          <tr><td>Moving average</td><td>Smoothed average price over N days, shows trend</td></tr>
          <tr><td>Volume</td><td>How many shares traded — conviction behind a move</td></tr>
        </table>` },
      { h:"Use It With Healthy Skepticism", html:`
        <p>Technical analysis is popular with short-term traders, but it's controversial. Patterns that look obvious in hindsight are far harder to profit from in real time, and markets are noisy.</p>
        <div class="callout warn">⚠️ For long-term investors, charts are at most a minor tool. No pattern reliably predicts the future, and short-term trading based on charts often <b>underperforms</b> simple buy-and-hold after fees and taxes.</div>` },
      { h:"The Beginner's Takeaway", html:`
        <p>It's worth understanding the vocabulary so charts don't intimidate you. But don't let chart-reading lure you into frequent trading.</p>
        <div class="callout key">🧭 Know the language, respect the limits. For building wealth, your edge is <b>time and discipline</b> — not predicting squiggles.</div>` }
    ],
    quiz:[
      { q:"Technical analysis primarily studies…", opts:["A company's earnings and debt","Price and volume charts","Tax rules","Dividend policy"], a:1, why:"It focuses on price/volume patterns rather than the underlying business." },
      { q:"'Support' on a chart is a level where…", opts:["Selling tends to cap rises","Buying tends to halt declines","The company issues shares","Dividends are paid"], a:1, why:"Support is a price level where buyers historically step in to stop drops." },
      { q:"A moving average is used to…", opts:["Predict dividends","Smooth price data and reveal the trend","Calculate taxes","Measure debt"], a:1, why:"It averages recent prices to filter noise and show direction." },
      { q:"For long-term investors, technical analysis is…", opts:["The most important tool","At most a minor tool with real limits","A guaranteed money-maker","Required for index funds"], a:1, why:"No chart pattern reliably predicts the future; time and discipline matter far more." },
      { q:"Frequent trading based on chart patterns often…", opts:["Beats buy-and-hold easily","Underperforms buy-and-hold after fees and taxes","Eliminates risk","Is required by brokers"], a:1, why:"Costs, taxes, and timing errors usually make active chart-trading lag simple holding." }
    ]
  },

  /* ============ UNIT 5 — CRASHES, CRISES & THE GLOBAL ECONOMY ============ */
  {
    id:"crashes", emoji:"💥", title:"Crashes & Crises: A History", read:11,
    blurb:"The Great Depression, 2008, and why bubbles keep bursting.",
    sections:[
      { h:"Why Bubbles and Crashes Happen", html:`
        <p class="lead">Markets don't crash randomly. Crashes follow a recognizable pattern that has repeated for centuries — driven by human psychology, borrowed money, and herd behavior.</p>
        <p>The typical bubble life-cycle:</p>
        <ol>
          <li><b>A real story</b> — a genuine innovation or opportunity (railways, the internet, housing).</li>
          <li><b>Easy money</b> — cheap credit lets people borrow to buy in.</li>
          <li><b>Euphoria</b> — prices detach from reality; "this time is different"; everyone piles in via <b>leverage</b> (borrowed money).</li>
          <li><b>The trigger</b> — confidence cracks, the first sellers appear.</li>
          <li><b>Panic & deleveraging</b> — forced selling cascades; leverage that amplified gains now amplifies losses.</li>
        </ol>
        <div class="def"><b>Leverage</b> — investing with borrowed money. It magnifies gains <i>and</i> losses, and is the fuel behind almost every major crash.</div>
        <div class="example-box"><div class="ex-tag">The original bubble · Tulip Mania, 1637</div><p style="margin:0">In the Dutch Republic, a single tulip bulb once traded for more than a house. When confidence evaporated, prices collapsed almost overnight. Nearly 400 years later, the same psychology drives modern bubbles.</p></div>` },
      { h:"The Great Depression (1929)", html:`
        <p>The 1920s ("the Roaring Twenties") saw a booming U.S. stock market. Ordinary people bought shares <b>on margin</b> — putting down as little as 10% and borrowing the rest. Stocks only ever seemed to go up.</p>
        <p>On <b>"Black Tuesday," October 29, 1929</b>, the market collapsed. Because so many had borrowed, falling prices triggered <b>margin calls</b> — forced selling that drove prices down further, in a vicious spiral.</p>
        <h4>Why it became a decade-long depression</h4>
        <ul>
          <li><b>Bank runs & failures</b> — there was no deposit insurance, so panicked savers emptied banks; thousands of banks collapsed, wiping out savings.</li>
          <li><b>Policy mistakes</b> — the central bank tightened money instead of supporting the system.</li>
          <li><b>Global trade war</b> — the U.S. Smoot-Hawley tariffs (1930) triggered retaliation, choking world trade.</li>
        </ul>
        <p>The result: U.S. unemployment hit ~25%, output collapsed, and the pain lasted through the 1930s. It reshaped the world and led to safeguards like deposit insurance and securities regulation.</p>
        <div class="callout warn">⚠️ The Depression's lesson: excessive leverage + a fragile banking system + policy errors can turn a crash into a catastrophe.</div>` },
      { h:"Black Monday 1987 & the Dot-Com Bust (2000)", html:`
        <h4>Black Monday — October 19, 1987</h4>
        <p>The market fell <b>~22% in a single day</b> — its worst-ever one-day drop. A big culprit was <b>automated "program trading"</b> that mechanically sold as prices fell, accelerating the plunge. Notably, with no underlying economic collapse, markets recovered within about two years.</p>
        <h4>The Dot-Com Bubble — 1995–2002</h4>
        <p>The internet was revolutionary, so investors bid up any company with ".com" in its name — many with <b>no profits and no realistic business model</b>. Valuations (P/E ratios) reached absurd levels. When reality set in, the tech-heavy Nasdaq fell roughly <b>78%</b> from its 2000 peak, and countless companies vanished.</p>
        <div class="callout">🔍 Lesson: a great <i>technology</i> is not the same as a great <i>investment at any price</i>. Valuation always matters.</div>` },
      { h:"The 2008 Global Financial Crisis", html:`
        <p>The most severe crisis since the Depression — and a textbook case of how problems spread worldwide.</p>
        <h4>How it built up</h4>
        <ul>
          <li><b>A housing bubble</b> — years of cheap credit pushed U.S. home prices ever higher; "house prices never fall" became gospel.</li>
          <li><b>Subprime lending</b> — banks gave mortgages to borrowers who couldn't realistically repay.</li>
          <li><b>Financial engineering</b> — these risky loans were bundled into complex securities (<b>mortgage-backed securities</b> and <b>CDOs</b>) and sold worldwide, often stamped with top safety ratings they didn't deserve.</li>
          <li><b>Enormous leverage</b> — banks held tiny capital cushions against huge bets.</li>
        </ul>
        <h4>The collapse</h4>
        <p>When house prices finally fell, the securities became toxic. In September 2008, the giant investment bank <b>Lehman Brothers went bankrupt</b>, and trust between banks froze. Credit — the lifeblood of the economy — seized up. Governments launched massive bailouts to prevent a total collapse, and the world fell into the "Great Recession."</p>
        <div class="callout warn">🌍 Because those securities had been sold globally, a U.S. housing problem became a <b>worldwide</b> banking crisis — a preview of the contagion you'll study next.</div>
        <div class="callout key">📈 The investor's silver lining: a diversified investor who <b>stayed invested</b> through 2008 saw markets fully recover and reach new all-time highs in the years that followed. Those who panic-sold at the bottom locked in the losses.</div>` }
    ],
    quiz:[
      { q:"The fuel behind almost every major crash is…", opts:["Dividends","Leverage (borrowed money) magnifying losses","Index funds","Low interest rates alone"], a:1, why:"Leverage amplifies both gains and losses; forced selling of borrowed positions drives crashes." },
      { q:"Buying stocks 'on margin' in the 1920s meant…", opts:["Paying full price in cash","Borrowing most of the purchase price","Avoiding the stock market","Buying only bonds"], a:1, why:"Margin buying meant small down payments and heavy borrowing — which amplified the 1929 collapse." },
      { q:"A key reason the 1929 crash became a decade-long Depression was…", opts:["Too much deposit insurance","Bank failures, policy mistakes, and a global trade war","Excessive diversification","Index funds"], a:1, why:"Bank runs, tight monetary policy, and tariffs turned a crash into a prolonged catastrophe." },
      { q:"The main lesson of the Dot-Com bust is that…", opts:["The internet was a fad","A great technology isn't a great investment at any price","You should never buy tech","Valuation doesn't matter"], a:1, why:"Investors overpaid wildly for profitless companies — valuation always matters." },
      { q:"At the core of the 2008 crisis were…", opts:["Safe government bonds","Risky subprime mortgages bundled into complex, over-leveraged securities","Too many index funds","A currency collapse"], a:1, why:"Bad mortgages, financial engineering, and heavy leverage combined into a global banking crisis." },
      { q:"A diversified investor who stayed invested through 2008…", opts:["Lost everything permanently","Saw markets recover and reach new highs later","Was legally required to sell","Never recovered"], a:1, why:"Markets fully recovered; panic-sellers locked in losses, long-term holders did not." }
    ]
  },
  {
    id:"global", emoji:"🌍", title:"Global Crises & Currency Collapses", read:11,
    blurb:"When money itself fails — Weimar, Zimbabwe, Venezuela, Argentina & Asia.",
    sections:[
      { h:"Why Currencies Fail", html:`
        <p class="lead">A currency is built on <b>trust</b> — trust that the money will hold its value tomorrow. When that trust breaks, a currency can collapse with terrifying speed.</p>
        <p>The usual causes:</p>
        <ul>
          <li><b>Printing too much money</b> — when a government prints currency to pay its bills, each unit becomes worth less, causing <b>inflation</b>. Print enough and you get <b>hyperinflation</b>.</li>
          <li><b>Unsustainable debt</b> — borrowing more than a country can repay, especially in a foreign currency.</li>
          <li><b>Loss of confidence</b> — once people expect money to lose value, they spend or swap it instantly, which accelerates the collapse.</li>
          <li><b>Broken currency pegs</b> — when a country can no longer defend a fixed exchange rate.</li>
        </ul>
        <div class="def"><b>Hyperinflation</b> — extremely rapid inflation, often defined as prices rising more than 50% <i>per month</i>. Money can lose value by the hour.</div>` },
      { h:"Weimar Germany — Hyperinflation (1921–1923)", html:`
        <p>After losing World War I, Germany owed crushing <b>reparations</b> in foreign currency. To cope, the government simply printed money — enormous quantities of it.</p>
        <p>The result became legendary. Prices doubled every few days. People were paid twice a day and rushed to spend before their wages became worthless. A loaf of bread that cost ~1 mark in 1919 cost <b>hundreds of billions</b> of marks by late 1923. Photographs show people burning banknotes for heat because the paper was worth more than the money printed on it.</p>
        <div class="callout warn">🔥 The deeper damage was social: wiped-out savings and shattered trust contributed to the political chaos of the following decade. Hyperinflation isn't just an economic event — it's a societal one.</div>` },
      { h:"Zimbabwe & Venezuela — Modern Hyperinflations", html:`
        <h4>Zimbabwe (2000s)</h4>
        <p>Disastrous economic policies and money-printing led to staggering hyperinflation, peaking around 2008. The central bank issued a <b>100-trillion-dollar note</b>. People shopped with bags of cash, and the currency was eventually abandoned entirely in favor of the U.S. dollar.</p>
        <h4>Venezuela (2010s)</h4>
        <p>Despite vast oil reserves, Venezuela's economy was dangerously dependent on oil. When oil prices crashed and mismanagement and sanctions piled on, the government printed money to cover deficits. The <b>bolívar</b> collapsed into hyperinflation, prices rose by millions of percent, and millions of people emigrated.</p>
        <div class="callout">🛢️ Venezuela's lesson: over-reliance on a single commodity makes an entire nation fragile when that commodity's price falls — the same diversification principle, at a national scale.</div>` },
      { h:"Argentina & the Asian Financial Crisis (1997)", html:`
        <h4>Argentina — serial crises</h4>
        <p>Argentina has defaulted on its debt <b>multiple times</b>. In 2001, after pegging the peso 1-to-1 with the U.S. dollar proved unsustainable, the peg broke, savings were frozen, the currency plunged, and the country defaulted on ~$100 billion — then the largest sovereign default in history.</p>
        <h4>The Asian Financial Crisis — a contagion case study</h4>
        <p>In July 1997, Thailand could no longer defend the <b>baht's</b> peg to the dollar and was forced to let it float — it crashed. Foreign "hot money" that had flooded in now fled all at once. Crucially, the panic <b>spread</b>: investors yanked money from Indonesia, South Korea, Malaysia and beyond, assuming they faced the same risks. Currencies and stock markets across the region collapsed, requiring huge IMF bailouts.</p>
        <div class="def"><b>Currency peg</b> — fixing your currency's value to another (often the U.S. dollar). It offers stability — until the country can no longer defend it, at which point the break can be violent.</div>
        <div class="callout key">🌐 For investors, these stories explain why people flee to "safe havens" (the U.S. dollar, gold) in a crisis, and why <b>diversifying across countries and currencies</b> reduces the risk that any single nation's collapse wipes you out.</div>` }
    ],
    quiz:[
      { q:"The most common cause of hyperinflation is…", opts:["Too little government spending","A government printing far too much money","High interest rates","Owning gold"], a:1, why:"Printing money to cover bills devalues each unit, spiraling into hyperinflation." },
      { q:"Hyperinflation is often defined as prices rising more than…", opts:["2% per year","10% per year","50% per month","1% per decade"], a:2, why:"Hyperinflation means roughly 50%+ inflation per month — money can lose value by the hour." },
      { q:"Weimar Germany's hyperinflation was largely triggered by…", opts:["Too much gold","Printing money to pay crushing war reparations","Foreign investment","A stock market crash"], a:1, why:"Germany printed enormous amounts of money to cope with post-WWI reparations." },
      { q:"Venezuela's collapse highlights the danger of…", opts:["Holding too many bonds","A nation over-relying on a single commodity (oil)","Diversifying too much","Using index funds"], a:1, why:"Heavy dependence on oil left the whole economy fragile when prices fell." },
      { q:"The 1997 Asian Financial Crisis is a key example of…", opts:["A safe-haven rally","Contagion — panic spreading from one country to its neighbors","Hyperinflation","A commodity boom"], a:1, why:"Thailand's crash spread as investors fled similar economies across the region." },
      { q:"In a currency crisis, investors often flee to…", opts:["The local collapsing currency","Safe havens like the U.S. dollar and gold","Real estate in that country","High-yield local bonds"], a:1, why:"Safe havens hold value when a local currency and markets are collapsing." }
    ]
  },
  {
    id:"macro", emoji:"🧭", title:"Macroeconomics & Global Contagion", read:11,
    blurb:"Interest rates, inflation, and how one country shakes the whole world.",
    sections:[
      { h:"The Big Macro Forces", html:`
        <p class="lead"><b>Macroeconomics</b> is the study of the whole economy — and these forces shape every investment, everywhere.</p>
        <table class="data">
          <tr><th>Force</th><th>What it is</th><th>Why investors care</th></tr>
          <tr><td>Inflation</td><td>Rising prices</td><td>Erodes savings; pushes central banks to act</td></tr>
          <tr><td>Interest rates</td><td>The price of borrowing money</td><td>Drive markets, bonds, currencies, the economy</td></tr>
          <tr><td>GDP growth</td><td>Total economic output</td><td>Signals expansion or recession</td></tr>
          <tr><td>Unemployment</td><td>Share of people without jobs</td><td>Gauges economic health</td></tr>
        </table>
        <div class="def"><b>Recession</b> — a significant, sustained decline in economic activity (often roughly two consecutive quarters of shrinking GDP).</div>` },
      { h:"Central Banks: The Most Powerful Players", html:`
        <p>A <b>central bank</b> (like the U.S. Federal Reserve, the European Central Bank, or the Bank of Japan) manages a nation's money supply and interest rates. By moving rates, it tries to balance growth against inflation.</p>
        <ul>
          <li><b>Cutting rates</b> → cheaper borrowing → stimulates spending, investing, and the economy (and often lifts markets).</li>
          <li><b>Raising rates</b> → costlier borrowing → cools inflation, but slows growth (and often pressures markets).</li>
        </ul>
        <div class="callout">🏦 This is the single biggest lever in markets. When investors obsess over "what will the Fed do?", this is why — rate changes ripple into stocks, bonds, and currencies instantly.</div>` },
      { h:"How the U.S. Affects the Whole World", html:`
        <p>Because the U.S. dollar is the world's <b>reserve currency</b> — used for global trade, oil, and debt — decisions in Washington ripple everywhere.</p>
        <div class="example-box"><div class="ex-tag">The chain reaction</div><p style="margin:0">When the U.S. Federal Reserve <b>raises interest rates</b>, investors move money into higher-yielding U.S. assets. The dollar strengthens, and money flows <i>out</i> of emerging markets. Countries that borrowed in dollars suddenly find their debts far more expensive, their currencies weaker, and their economies strained — all from a decision made abroad.</p></div>
        <p>It's often said: <b>"When the U.S. sneezes, the world catches a cold."</b> A strong dollar can quietly trigger crises in countries thousands of miles away.</p>` },
      { h:"Contagion: How Crises Spread Between Countries", html:`
        <p>The global economy is deeply interconnected through trade, banks, and investor sentiment. So trouble rarely stays in one place — it spreads, a phenomenon called <b>contagion</b>.</p>
        <div class="def"><b>Contagion</b> — when an economic crisis in one country or market spreads to others, through trade links, shared lenders, or simple panic.</div>
        <ul>
          <li><b>2008</b> — U.S. mortgage securities sold worldwide turned an American problem into a global banking crisis.</li>
          <li><b>1997 Asia</b> — Thailand's crash spread to Indonesia, Korea, and beyond as investors fled the whole region.</li>
          <li><b>Eurozone debt crisis (2010–2012)</b> — Greece's near-bankruptcy threatened the entire <b>euro</b>, because many European banks held Greek debt and 19 countries shared one currency. "Will Greece bring down the euro?" gripped markets for years.</li>
          <li><b>Oil shocks (1973)</b> — when oil exporters cut supply, prices quadrupled, igniting inflation and recession across the West at once.</li>
        </ul>
        <p>Countries also pull each other <i>up</i>: booming Chinese demand lifts commodity exporters like Brazil and Australia, while a Chinese slowdown drags them down.</p>
        <div class="callout key">🧭 The takeaway for you: no economy is an island, and no single country is "safe." This is the deepest argument for <b>global diversification</b> — spreading your investments across many countries and currencies so that one nation's crisis can't sink your whole portfolio. You can't predict the next crisis, but you can be built to survive it.</div>` }
    ],
    quiz:[
      { q:"When a central bank RAISES interest rates, it usually…", opts:["Stimulates growth and lifts markets","Cools inflation but slows growth and pressures markets","Has no effect","Causes hyperinflation"], a:1, why:"Higher rates make borrowing costlier, cooling inflation but slowing the economy and often markets." },
      { q:"The U.S. dollar's role as the world's 'reserve currency' means…", opts:["It's only used in America","U.S. monetary decisions ripple across the entire world","It can't lose value","It's backed by gold"], a:1, why:"Because global trade and debt run on dollars, U.S. policy affects economies everywhere." },
      { q:"When the Fed raises rates, emerging markets often suffer because…", opts:["Their exports rise","Money flows out to U.S. assets and their dollar debts get costlier","Inflation disappears","Their currencies strengthen"], a:1, why:"Capital exits to higher U.S. yields, weakening their currencies and raising dollar-debt burdens." },
      { q:"'Contagion' in economics refers to…", opts:["A medical illness","A crisis spreading from one country/market to others","A type of bond","Rising dividends"], a:1, why:"Through trade, shared lenders, and panic, crises spread across borders." },
      { q:"The Eurozone debt crisis (2010–2012) was dangerous because…", opts:["Greece used the U.S. dollar","Many banks held Greek debt and 19 countries shared one currency","Greece had no debt","It only affected Greece"], a:1, why:"Shared exposure and a shared currency meant Greece's troubles threatened all of Europe." },
      { q:"The deepest argument for GLOBAL diversification is that…", opts:["One country is always safe","No economy is an island, so spreading across countries reduces risk","Foreign stocks always beat domestic","Crises never spread"], a:1, why:"Since crises spread and no nation is immune, global spread protects your portfolio." }
    ]
  },

  /* ============ UNIT 6 — PSYCHOLOGY & PLAN ============ */
  {
    id:"psychology", emoji:"🧩", title:"Investor Psychology", read:8,
    blurb:"Your brain is the biggest threat to your returns. Here's the defense.",
    sections:[
      { h:"You Are Your Own Worst Enemy", html:`
        <p class="lead">Studies repeatedly show the average investor earns far less than the funds they own — because they buy high in excitement and sell low in fear. The gap is caused by behavior, not the market.</p>
        <div class="callout key">🧠 Investing is maybe 20% knowledge and 80% temperament. Mastering your emotions is the real skill.</div>` },
      { h:"The Big Behavioral Biases", html:`
        <table class="data">
          <tr><th>Bias</th><th>What it does</th></tr>
          <tr><td>Loss aversion</td><td>Losses hurt ~2× as much as gains feel good → panic-selling</td></tr>
          <tr><td>Herding</td><td>Following the crowd into bubbles and out at bottoms</td></tr>
          <tr><td>Overconfidence</td><td>Over-trading, thinking you can time the market</td></tr>
          <tr><td>Recency bias</td><td>Assuming the recent trend continues forever</td></tr>
          <tr><td>FOMO</td><td>Chasing whatever just skyrocketed</td></tr>
        </table>` },
      { h:"Fear & Greed Cycle", html:`
        <p>Markets swing between euphoria and despair. The dangerous instinct is to feel most excited at the top (everyone's getting rich!) and most terrified at the bottom (it's all collapsing!).</p>
        <div class="callout warn">😱 The best market days and worst market days cluster together. Investors who panic-sell often miss the sharp rebounds — and missing just a handful of the best days can devastate long-term returns.</div>` },
      { h:"Building Emotional Discipline", html:`
        <ul>
          <li><b>Automate</b> — set up automatic monthly investing so emotion never decides.</li>
          <li><b>Write a plan</b> — decide your rules in calm times; follow them in scary ones.</li>
          <li><b>Stop checking daily</b> — less monitoring, less panic.</li>
          <li><b>Zoom out</b> — view decades, not days.</li>
        </ul>
        <div class="callout key">🛡️ The <b>Market Simulator</b> tool lets you feel these emotions safely and see why staying the course usually wins.</div>` }
    ],
    quiz:[
      { q:"The average investor often underperforms the very funds they own because of…", opts:["High taxes only","Emotional buying high and selling low","Bad luck","Government rules"], a:1, why:"Behavior — buying in excitement, selling in fear — creates the gap, not the funds." },
      { q:"'Loss aversion' means…", opts:["Losses feel about twice as painful as equal gains feel good","You never take losses","You love losing money","Gains hurt more than losses"], a:0, why:"Losses sting roughly twice as much, driving panic-selling at the worst times." },
      { q:"Chasing an asset because it just skyrocketed is an example of…", opts:["Patience","FOMO / herding","Diversification","Rebalancing"], a:1, why:"Fear of missing out and herding push people to buy high after a run-up." },
      { q:"Because the best and worst market days cluster together, panic-selling risks…", opts:["Locking in gains","Missing the sharp rebounds that drive long-term returns","Lowering your taxes","Nothing at all"], a:1, why:"Missing a handful of the best days can devastate long-term returns." },
      { q:"A powerful defense against emotional mistakes is to…", opts:["Check prices hourly","Automate investing and follow a written plan","Trade on every headline","Invest based on gut feeling"], a:1, why:"Automation and a pre-written plan remove emotion from the decision." }
    ]
  },
  {
    id:"mistakes", emoji:"🛡️", title:"Avoiding Rookie Mistakes", read:7,
    blurb:"The traps that wreck beginners — and how to sidestep them.",
    sections:[
      { h:"The Classic Blunders", html:`
        <p class="lead">Most beginner losses come from a short list of avoidable mistakes. Know them and you're ahead of most.</p>
        <ul>
          <li><b>Timing the market</b> — even pros fail at this; time <i>in</i> the market beats timing it.</li>
          <li><b>Chasing hype</b> — buying whatever's trending after it already soared.</li>
          <li><b>Panic-selling</b> — locking in losses at the first dip.</li>
          <li><b>Ignoring fees</b> — a 1–2% annual fee can quietly eat a third of your wealth over decades.</li>
          <li><b>Under-diversifying</b> — betting too much on one stock, sector, or crypto.</li>
          <li><b>Investing money you'll need soon</b> — forced to sell at the worst time.</li>
        </ul>` },
      { h:"Get-Rich-Quick & Scams", html:`
        <p>If something promises high returns with little or no risk, it's a lie. Watch for:</p>
        <ul>
          <li>"Guaranteed" returns or "can't lose" pitches</li>
          <li>Pressure to act <b>right now</b></li>
          <li>Hot tips from strangers or social media influencers</li>
          <li>Complex products you can't explain</li>
        </ul>
        <div class="callout warn">🚨 Real investing is slow and boring. Anyone promising fast, guaranteed riches is selling something — often a scam.</div>` },
      { h:"The Beginner's Playbook", html:`
        <p>The whole course distilled into a checklist:</p>
        <ol>
          <li>Build a 3–6 month <b>emergency fund</b> in cash.</li>
          <li>Pay off <b>high-interest debt</b>.</li>
          <li>Capture any <b>employer match</b>.</li>
          <li>Use <b>tax-advantaged accounts</b> where available.</li>
          <li>Buy <b>low-cost, broad index funds</b>.</li>
          <li>Invest <b>regularly &amp; automatically</b> (DCA).</li>
          <li><b>Don't peek daily.</b> Rebalance ~yearly. Let time compound.</li>
        </ol>
        <div class="callout key">🏆 Follow these seven steps and you'll be investing better than the large majority of people. Simple, boring, and effective.</div>` }
    ],
    quiz:[
      { q:"'Time in the market beats timing the market' means…", opts:["Trade as often as possible","Staying invested long-term beats guessing tops and bottoms","Only invest at lows","Sell every December"], a:1, why:"Consistently staying invested beats trying to predict short-term moves." },
      { q:"Why are high fees so damaging over time?", opts:["They're illegal","They compound against you, eroding a big share of returns","They raise your taxes","They lower your principal upfront"], a:1, why:"Even 1–2% a year compounds into a huge loss over decades." },
      { q:"A reliable sign of a scam is…", opts:["Boring, modest expected returns","Promises of high returns with little or no risk","Low fees","Long time horizons"], a:1, why:"Guaranteed high returns with no risk don't exist — it's a red flag for fraud." },
      { q:"According to the playbook, you should buy index funds AFTER…", opts:["Spending your emergency fund","Building an emergency fund and clearing high-interest debt","Borrowing to invest","Picking ten hot stocks"], a:1, why:"The foundation (emergency fund, debt, match) comes before buying investments." },
      { q:"Panic-selling during a dip usually…", opts:["Protects your gains","Locks in losses and misses the recovery","Is recommended by experts","Removes all risk"], a:1, why:"Selling low turns a temporary dip into a permanent loss and misses the rebound." }
    ]
  },
  {
    id:"plan", emoji:"🗺️", title:"Building Your Lifelong Plan", read:8,
    blurb:"Put it all together into a simple plan you'll actually follow.",
    sections:[
      { h:"A Plan Beats Predictions", html:`
        <p class="lead">You don't need to predict the future. You need a simple, written plan and the discipline to stick with it through good times and bad. That's what separates wealthy investors from the rest.</p>` },
      { h:"Your One-Page Investment Plan", html:`
        <p>Answer these and you have a real plan:</p>
        <ol>
          <li><b>Goals & horizons</b> — what am I investing for, and when do I need it?</li>
          <li><b>Foundation</b> — emergency fund set, high-interest debt handled?</li>
          <li><b>Allocation</b> — my target stock/bond/cash mix.</li>
          <li><b>Accounts</b> — which accounts (tax-advantaged first).</li>
          <li><b>Holdings</b> — which low-cost funds.</li>
          <li><b>Contributions</b> — how much, how often, automated.</li>
          <li><b>Rules</b> — rebalance yearly; never panic-sell.</li>
        </ol>
        <div class="callout key">📝 Write it down. A plan on paper is one you can return to when markets get scary.</div>` },
      { h:"A Realistic Sample Plan", html:`
        <div class="example-box">
          <div class="ex-tag">Example · 28-year-old, retirement focus</div>
          <p style="margin:0"><b>Goal:</b> Retirement (35+ yrs). <b>Foundation:</b> 4-month emergency fund ✓, no high-interest debt ✓. <b>Allocation:</b> 85% stocks / 15% bonds. <b>Accounts:</b> Employer plan up to the full match, then a tax-advantaged account. <b>Holdings:</b> Total world stock index + a bond index. <b>Contribution:</b> $500/month, automatic on payday. <b>Rules:</b> Rebalance each January; ignore the headlines; review once a year.</p>
        </div>
        <p>Notice how unexciting it is. That's the point — boring plans, faithfully followed, build real wealth.</p>` },
      { h:"Your Journey Starts Now", html:`
        <p>You've covered the foundations, the asset classes, strategy, analysis, and psychology. You now know more than most people ever learn about investing.</p>
        <ul>
          <li>Start <b>small</b> — even a modest automatic amount builds the habit.</li>
          <li>Stay <b>consistent</b> — contributions plus time do the heavy lifting.</li>
          <li>Keep <b>learning</b> — revisit modules and the glossary anytime.</li>
        </ul>
        <div class="callout key">🎓 Finish strong: take the <b>Market Simulator</b> to test your discipline, then build a portfolio in the <b>Portfolio Builder</b>. The best time to start was years ago. The second-best time is today.</div>` }
    ],
    quiz:[
      { q:"The foundation of successful long-term investing is…", opts:["Accurately predicting the market","A simple written plan followed with discipline","Trading frequently","Finding secret tips"], a:1, why:"A clear plan plus discipline beats prediction every time." },
      { q:"Which belongs in a one-page investment plan?", opts:["A daily price target","Goals, allocation, accounts, contributions, and rules","A list of hot tips","Tomorrow's market forecast"], a:1, why:"A real plan covers goals, allocation, accounts, holdings, contributions, and rules." },
      { q:"In the sample plan, contributions are…", opts:["Random and occasional","A fixed amount, automatic on payday","Only made when markets rise","Whatever is left over"], a:1, why:"Automated, regular contributions remove emotion and build consistency." },
      { q:"A good investment plan tends to be…", opts:["Complex and exciting","Simple and 'boring' but faithfully followed","Changed constantly","Based on predictions"], a:1, why:"Boring, consistent plans followed over time build real wealth." },
      { q:"The best general advice on when to start investing is…", opts:["Wait for the perfect moment","Start small and consistent as early as possible","Only after becoming an expert","Only in a bull market"], a:1, why:"Time in the market is precious — starting early and consistently matters most." }
    ]
  }
];

/* ---- Real-world style stock profiles for the Analyzer ---- */
const STOCKS = [
  {
    sym:"APLX", name:"Applecore Tech", emoji:"🏛️", sector:"Consumer Tech · The Steady Giant",
    price:182, mcap:"$2.8T", pe:29, revenue:"$385B", netInc:"$97B", growth:"+8%/yr", yield:"0.5%",
    spark:[120,128,124,140,150,146,160,172,168,182],
    story:"A massive, hugely profitable maker of phones and devices with a fiercely loyal customer base. Growth is slow but dependable, with a fortress balance sheet and steady buybacks.",
    questions:[
      { q:"With a P/E of 29 but only +8% growth, this stock is…", opts:["Dirt cheap","Priced for quality and stability, not explosive growth","About to go bankrupt","A penny stock"], a:1, why:"Investors pay a premium for its reliability and profits, not for fast growth." },
      { q:"Its 0.5% dividend yield tells you…", opts:["It pays a small cash return; price appreciation is the main draw","It pays huge dividends","It's secretly a bond","It has no profit"], a:0, why:"A small yield means most of your expected return comes from the share price, not dividends." }
    ]
  },
  {
    sym:"NOVA", name:"NovaDrive EV", emoji:"🚀", sector:"Electric Vehicles · The Hot Grower",
    price:240, mcap:"$760B", pe:75, revenue:"$96B", netInc:"$11B", growth:"+35%/yr", yield:"0%",
    spark:[60,90,75,140,120,180,160,220,200,240],
    story:"A fast-growing, headline-grabbing EV maker. Explosive revenue growth and big ambitions — but a sky-high valuation, thin profits, and a wild, volatile share price.",
    questions:[
      { q:"A P/E of 75 means investors are…", opts:["Expecting little growth","Betting heavily on huge future growth","Getting a bargain","Buying a safe bond"], a:1, why:"A very high P/E prices in years of rapid future growth — thrilling, but risky if growth slows." },
      { q:"The jagged chart and 0% dividend suggest this is…", opts:["A calm income stock","A volatile growth stock for risk-tolerant investors","Risk-free","Equivalent to cash"], a:1, why:"High volatility plus no dividend signals a growth bet, not a stability play." }
    ]
  },
  {
    sym:"STED", name:"SteadyPower Utility", emoji:"💡", sector:"Utilities · The Income Payer",
    price:64, mcap:"$48B", pe:17, revenue:"$22B", netInc:"$3.1B", growth:"+3%/yr", yield:"4.2%",
    spark:[58,59,57,60,61,60,62,63,62,64],
    story:"A boring-but-beautiful electric utility. It barely grows, but it pays a large, reliable dividend and its price hardly budges — the definition of defensive.",
    questions:[
      { q:"Its flat chart plus a 4.2% yield make it most attractive to…", opts:["Thrill-seekers","Income-focused, conservative investors","Day traders","People chasing 10× gains"], a:1, why:"A stable price and high dividend appeal to investors who want steady income." },
      { q:"The low P/E of 17 and +3% growth reflect…", opts:["A risky startup","A mature, slow, stable business","An imminent bankruptcy","A meme stock"], a:1, why:"Low growth with a low P/E is typical of established, dependable utilities." }
    ]
  },
  {
    sym:"BYTE", name:"ByteForge Cloud", emoji:"☁️", sector:"Software · The Quality Compounder",
    price:410, mcap:"$1.1T", pe:48, revenue:"$210B", netInc:"$68B", growth:"+18%/yr", yield:"0.8%",
    spark:[200,240,230,280,300,290,340,360,380,410],
    story:"A profitable software and cloud giant growing steadily with fat profit margins. A premium valuation, but backed by genuine quality and a wide competitive moat.",
    questions:[
      { q:"High net income on $210B revenue signals…", opts:["Weak margins","Strong, profitable operations","Heavy debt","No customers"], a:1, why:"Turning lots of revenue into profit shows an efficient, healthy business." },
      { q:"A P/E of 48 with +18% growth is best described as…", opts:["A cheap value stock","A premium-priced quality grower","A failing company","A dividend bond"], a:1, why:"Solid growth plus high quality earns a higher-than-average valuation." }
    ]
  }
];

/* ---- Glossary ---- */
const GLOSSARY = [
  ["Asset allocation","How you split your money among stocks, bonds, and cash — the biggest driver of long-term results."],
  ["Bear market","A market decline of 20% or more from recent highs."],
  ["Bond","A loan you make to a government or company in exchange for interest and repayment of principal."],
  ["Brokerage account","The account, opened with a broker, through which you buy and hold investments."],
  ["Bull market","A sustained period of rising prices and optimism."],
  ["Capital gain","Profit from selling an investment for more than you paid."],
  ["Compound growth","Earning returns on your previous returns, causing wealth to snowball over time."],
  ["Coupon","The interest rate a bond pays its holder."],
  ["Correction","A market decline of 10–20%, a fairly normal and roughly annual event."],
  ["Diversification","Spreading money across many investments so no single failure can sink you."],
  ["Dividend","A share of a company's profit paid out to shareholders, often quarterly."],
  ["Dividend yield","Annual dividend divided by share price — the cash return for holding."],
  ["Dollar-cost averaging","Investing a fixed amount on a regular schedule, smoothing your average purchase price."],
  ["ETF","An Exchange-Traded Fund — an index fund that trades like a stock, usually low-cost."],
  ["EPS","Earnings per share — a company's profit divided by its number of shares."],
  ["Expense ratio","The annual percentage fee a fund charges; lower is better."],
  ["Fundamental analysis","Judging an investment by studying the underlying business — earnings, growth, value."],
  ["Index","A basket measuring part of the market, e.g. the S&P 500 of 500 large U.S. firms."],
  ["Index fund","A fund that passively tracks a market index at very low cost."],
  ["Inflation","The gradual rise in prices that erodes the purchasing power of money."],
  ["IPO","Initial Public Offering — when a company first sells shares to the public."],
  ["Liquidity","How easily an asset can be turned into cash without moving its price."],
  ["Market capitalization","Share price × number of shares — the total value of a company."],
  ["Maturity","The date a bond repays its principal."],
  ["P/E ratio","Price ÷ earnings per share — roughly, the price paid per $1 of annual profit."],
  ["Principal","The original amount invested or the face value repaid by a bond."],
  ["REIT","Real Estate Investment Trust — a stock-like way to own income-producing property."],
  ["Rebalancing","Periodically restoring your portfolio to its target asset mix."],
  ["Risk tolerance","How much volatility you can emotionally handle without panic-selling."],
  ["Time horizon","How long until you'll need the money — it sets how much risk is appropriate."],
  ["Volatility","How much an investment's price fluctuates up and down."],
  ["Yield","The income an investment produces, expressed as a percentage of its price."],
  ["Bubble","A period when prices rise far above true value, driven by hype and leverage, before crashing."],
  ["Central bank","An institution (e.g. the Federal Reserve) that manages a nation's money supply and interest rates."],
  ["Contagion","When an economic crisis spreads from one country or market to others."],
  ["Currency peg","Fixing a currency's value to another (often the U.S. dollar) for stability — until it breaks."],
  ["Default","Failing to repay debt as promised; a 'sovereign default' is when a country does so."],
  ["Hyperinflation","Extremely rapid inflation, often 50%+ per month, that can destroy a currency."],
  ["Leverage","Investing with borrowed money, which magnifies both gains and losses."],
  ["Margin","Borrowing from a broker to buy investments; it amplifies risk and fueled the 1929 crash."],
  ["Recession","A significant, sustained decline in economic activity across the economy."],
  ["Reserve currency","A currency (notably the U.S. dollar) widely held and used for global trade and debt."]
];

const BADGES = [
  { id:"first", emoji:"🎓", name:"First Steps", desc:"Finish your first module" },
  { id:"unit", emoji:"📦", name:"Unit Cleared", desc:"Complete a full unit" },
  { id:"half", emoji:"⚡", name:"Halfway Hero", desc:"Complete 9 modules" },
  { id:"grad", emoji:"🏆", name:"Graduate", desc:"Complete all 20 lessons" },
  { id:"historian", emoji:"📜", name:"Market Historian", desc:"Finish the history & global economy unit" },
  { id:"calc", emoji:"🧮", name:"Number Cruncher", desc:"Use the Compound Calculator" },
  { id:"builder", emoji:"🥧", name:"Portfolio Architect", desc:"Build a balanced portfolio" },
  { id:"analyst", emoji:"🔬", name:"Stock Analyst", desc:"Analyze a stock" },
  { id:"trader", emoji:"📊", name:"Survived the Market", desc:"Finish the Market Simulator" },
  { id:"perfect", emoji:"💎", name:"Perfect Score", desc:"Ace a quiz with no mistakes" },
  { id:"scholar", emoji:"📚", name:"Scholar", desc:"Open the glossary" },
  { id:"investor", emoji:"💼", name:"First Trade", desc:"Make your first investment in the arena" },
  { id:"top", emoji:"👑", name:"Top of the Class", desc:"Reach #1 on the class leaderboard" },
  { id:"mastery", emoji:"🌟", name:"Mastery", desc:"Master a practice activity" },
  { id:"reviewer", emoji:"🔁", name:"Memory Athlete", desc:"Complete a spaced-review session" },
  { id:"mythbuster", emoji:"🧨", name:"Myth Buster", desc:"Master the Myth vs Reality challenge" },
  { id:"planner", emoji:"🗺️", name:"Plan Architect", desc:"Build your capstone investment plan" },
  { id:"missions", emoji:"🎯", name:"Mission Accomplished", desc:"Complete an Arena mission" },
  { id:"certified", emoji:"📜", name:"Certified Investor", desc:"Earn your certificate of completion" },
  { id:"streak3", emoji:"🔥", name:"On a Roll", desc:"Reach a 3-day streak" },
  { id:"streak7", emoji:"⚡", name:"Week Warrior", desc:"Reach a 7-day streak" },
  { id:"checkup", emoji:"🩺", name:"Healthy Portfolio", desc:"Run a portfolio check-up" },
  { id:"timetraveler", emoji:"⏳", name:"Time Traveler", desc:"Run a historical backtest" }
];

/* ---- Khan-style practice activities ---- */
const ACTIVITIES = [
  {
    id:"vocab", emoji:"📖", name:"Vocabulary Match", skill:"Unit 1–5 · Key terms",
    desc:"Match the term to its correct meaning.",
    pool:[
      { q:"What does <b>diversification</b> mean?", opts:["Putting all money in one stock","Spreading money across many investments to reduce risk","Buying only bonds","Timing the market"], a:1, hint:"Think 'don't put all your eggs in one basket.'", why:"Diversification spreads risk so one failure can't sink you." },
      { q:"<b>Compound growth</b> is…", opts:["A one-time bonus","Earning returns on your previous returns","A type of fee","A government tax"], a:1, hint:"It's why wealth snowballs over time.", why:"Returns generate their own returns, accelerating growth." },
      { q:"A <b>dividend</b> is…", opts:["A loan to a company","A share of profit paid to shareholders","A trading fee","A stock's price"], a:1, hint:"Companies share profit with owners.", why:"It's a portion of profit paid out, often quarterly." },
      { q:"The <b>P/E ratio</b> compares price to…", opts:["Dividends","Earnings per share","Debt","Revenue growth"], a:1, hint:"E stands for earnings.", why:"P/E = price ÷ earnings per share, roughly the price per $1 of profit." },
      { q:"An <b>ETF</b> is…", opts:["A single risky stock","A low-cost fund that trades like a stock","A savings account","A type of bond"], a:1, hint:"It bundles many investments and trades all day.", why:"An ETF is an exchange-traded, usually low-cost, diversified fund." },
      { q:"<b>Inflation</b> causes money to…", opts:["Grow automatically","Lose purchasing power over time","Become tax-free","Double every year"], a:1, hint:"Prices tend to rise each year.", why:"Rising prices erode what each dollar can buy." },
      { q:"<b>Volatility</b> measures…", opts:["A company's profit","How much a price bounces around","The dividend yield","The fee level"], a:1, hint:"Bumpier ride = more of this.", why:"Volatility is the size of an investment's price swings." },
      { q:"<b>Asset allocation</b> is…", opts:["Your broker's fee","How you split money across stocks/bonds/cash","A single stock pick","A tax form"], a:1, hint:"It's your big-picture recipe.", why:"It's the mix of asset classes that drives most of your results." }
    ]
  },
  {
    id:"rule72", emoji:"🧮", name:"Rule of 72 Drills", skill:"Unit 1 · Compounding",
    desc:"Estimate doubling time. Type the number of years.",
    numeric:true,
    gen:()=>{ const rates=[2,3,4,6,8,9,12]; const r=rates[Math.floor(Math.random()*rates.length)];
      return { q:`At <b>${r}% per year</b>, about how many years does money take to double? (Rule of 72)`, answer:72/r, tol:0.6, hint:`Divide 72 by the annual return (${r}).`, why:`72 ÷ ${r} = ${(72/r).toFixed(0)} years.` }; }
  },
  {
    id:"classify", emoji:"🗂️", name:"Asset Classifier", skill:"Unit 2 · Asset classes",
    desc:"Read the description and pick the asset type.",
    pool:[
      { q:"You lend money to a government and receive fixed interest, with principal repaid later.", opts:["Stock","Bond","REIT","Commodity"], a:1, hint:"An IOU that pays interest.", why:"That's a bond — a loan paying interest." },
      { q:"You own a tiny slice of a company and may receive dividends.", opts:["Stock","Bond","Cash","Commodity"], a:0, hint:"Ownership of a business.", why:"Owning part of a company is a stock." },
      { q:"One purchase gives you a slice of 500 companies at once, very cheaply.", opts:["Single stock","Index fund / ETF","Bond","Gold"], a:1, hint:"Instant diversification.", why:"That's an index fund/ETF." },
      { q:"A stock-like investment that owns apartments and malls and pays big dividends.", opts:["REIT","Bond","Commodity","Cash"], a:0, hint:"Real estate you can buy like a share.", why:"That's a REIT." },
      { q:"A raw material like gold or oil that pays no income.", opts:["Commodity","Bond","Stock","Index fund"], a:0, hint:"No dividends or interest — price only.", why:"That's a commodity." },
      { q:"The safest place for your emergency fund, earning little but never crashing.", opts:["Stocks","Cash / savings","Crypto","REIT"], a:1, hint:"Safety and quick access.", why:"Cash and savings are safest for short-term needs." },
      { q:"An extremely volatile digital asset best limited to a small, speculative slice.", opts:["Government bond","Cryptocurrency","Index fund","Cash"], a:1, hint:"Can swing 50% in weeks.", why:"That describes cryptocurrency." }
    ]
  },
  {
    id:"ratio", emoji:"🔍", name:"Read the Ratio", skill:"Unit 4 · Analysis",
    desc:"Interpret what the numbers are telling you.",
    pool:[
      { q:"A company has a <b>P/E of 80</b> and revenue growing <b>40%/yr</b>. This is most likely…", opts:["A cheap value stock","A high-growth stock with lofty expectations","A safe income stock","About to go bankrupt"], a:1, hint:"High P/E + fast growth = ?", why:"A very high P/E prices in years of rapid growth — exciting but risky." },
      { q:"A utility has a <b>P/E of 16</b>, <b>+3% growth</b>, and a <b>4.5% dividend</b>. It best suits…", opts:["Aggressive growth seekers","Conservative income investors","Day traders","Crypto fans"], a:1, hint:"Stable + big dividend.", why:"Low growth, low P/E, high yield = a defensive income stock." },
      { q:"Two rivals: A has P/E 22, B has P/E 45, similar growth. All else equal, A is…", opts:["More expensive","Cheaper relative to earnings","Guaranteed better","Riskier"], a:1, hint:"Lower P/E = paying less per $1 of profit.", why:"A lower P/E means you pay less for each dollar of earnings." },
      { q:"A firm turns <b>$200B revenue</b> into <b>$60B profit</b>. Its margins are…", opts:["Weak","Strong and healthy","Negative","Irrelevant"], a:1, hint:"30% of sales becomes profit.", why:"Converting lots of revenue to profit shows strong margins." },
      { q:"A <b>0% dividend yield</b> on a fast grower usually means the company…", opts:["Has no profit","Reinvests profits into growth instead of paying out","Is a scam","Must be failing"], a:1, hint:"Growth firms plow money back in.", why:"Many growth companies reinvest rather than pay dividends." }
    ]
  },
  {
    id:"match-risk", emoji:"⚖️", name:"Match the Investor", skill:"Unit 3 · Allocation",
    desc:"Pick the most appropriate plan for each person.",
    pool:[
      { q:"A 25-year-old investing for retirement in 40 years should lean toward…", opts:["Mostly cash","Mostly stocks","Only bonds","One single stock"], a:1, hint:"Long horizon = ride out volatility.", why:"A long horizon supports a growth-heavy, stock-focused mix." },
      { q:"Someone needs a house deposit in 18 months. That money should be…", opts:["All in stocks","Kept safe in cash/bonds","In crypto","Borrowed and invested"], a:1, hint:"Short horizon can't survive a crash.", why:"Money needed soon belongs in safe, stable holdings." },
      { q:"A nervous investor who panic-sells in every dip should probably…", opts:["Go 100% stocks","Hold a more balanced mix and automate it","Day-trade","Use leverage"], a:1, hint:"Match the plan to emotions, not just age.", why:"A calmer, balanced, automated plan suits low risk tolerance." },
      { q:"Best first move for a beginner with an employer 401(k) match?", opts:["Ignore it","Contribute at least enough to get the full match","Put it all in crypto","Pay only the minimum on the mortgage"], a:1, hint:"It's free money.", why:"Capturing the full employer match is a top-priority, instant return." },
      { q:"To control risk drifting over time, you should periodically…", opts:["Sell everything","Rebalance to your target mix","Buy only winners","Stop investing"], a:1, hint:"Restore the original recipe.", why:"Rebalancing keeps your allocation (and risk) on target." }
    ]
  },
  {
    id:"mistake", emoji:"🚨", name:"Spot the Mistake", skill:"Unit 5 · Behavior",
    desc:"Identify the investing error in each scenario.",
    pool:[
      { q:"Sam sells all his funds the moment the market drops 12%. This is…", opts:["Smart risk control","Panic-selling — locking in losses","Rebalancing","Diversifying"], a:1, hint:"A 12% drop is a normal correction.", why:"Selling in a dip locks in losses and misses the recovery." },
      { q:"Mia puts her whole savings into one trending meme stock. The error is…", opts:["Too much diversification","Lack of diversification / chasing hype","Investing too little","Holding too long"], a:1, hint:"All eggs, one basket.", why:"Concentrating in one hyped stock is dangerously undiversified." },
      { q:"Leo picks a fund charging 2% a year over a 0.05% index fund. Over decades this…", opts:["Barely matters","Quietly costs a huge share of his returns","Increases returns","Lowers his taxes"], a:1, hint:"Fees compound against you.", why:"High fees compound into large losses over time." },
      { q:"Ana invests money she needs for rent next month. The mistake is…", opts:["Investing short-term money she can't risk","Diversifying too much","Holding bonds","Using an index fund"], a:0, hint:"Time horizon!", why:"Money needed soon shouldn't be exposed to market swings." },
      { q:"Raj keeps buying whatever skyrocketed last week. This bias is…", opts:["Patience","FOMO / performance chasing","Rebalancing","Value investing"], a:1, hint:"Buying high after a run-up.", why:"Chasing recent winners is classic FOMO and usually backfires." },
      { q:"An ad promises 'guaranteed 30% monthly returns, zero risk.' You should…", opts:["Invest immediately","Recognize a scam and walk away","Borrow to invest more","Tell all your friends to buy"], a:1, hint:"High return + no risk = impossible.", why:"Guaranteed high returns with no risk is a hallmark of fraud." }
    ]
  },
  {
    id:"myths", emoji:"🧨", name:"Myth vs Reality", skill:"Bust common beliefs",
    desc:"Decide whether each common belief is a myth or reality.",
    pool:[
      { q:"“You need a lot of money to start investing.”", opts:["🚫 Myth","✅ Reality"], a:0, hint:"Think fractional shares and index funds.", why:"Many brokers let you start with just a few dollars via fractional shares and low-cost index funds." },
      { q:"“Investing is basically gambling.”", opts:["🚫 Myth","✅ Reality"], a:0, hint:"Gambling is negative-sum luck.", why:"Long-term, diversified investing grows with the real economy — unlike gambling, which is luck and negative-sum." },
      { q:"“You should wait for the perfect time to start.”", opts:["🚫 Myth","✅ Reality"], a:0, hint:"Time IN the market…", why:"No one reliably times the market. Time in the market beats timing it — start early and invest regularly." },
      { q:"“A $500 stock is automatically 'better' than a $50 stock.”", opts:["🚫 Myth","✅ Reality"], a:0, hint:"Price per share alone tells you little.", why:"Share price alone means nothing — value depends on the whole company (market cap, earnings, growth)." },
      { q:"“Past performance guarantees future returns.”", opts:["🚫 Myth","✅ Reality"], a:0, hint:"Why does every disclaimer say otherwise?", why:"It doesn't — yesterday's winners can be tomorrow's losers. That's why every prospectus warns about it." },
      { q:"“Index funds are too boring to build real wealth.”", opts:["🚫 Myth","✅ Reality"], a:0, hint:"Recall Buffett's bet.", why:"Low-cost index funds beat the majority of professional managers over the long run." },
      { q:"“Diversification reduces your risk.”", opts:["🚫 Myth","✅ Reality"], a:1, hint:"Don't put all eggs in one basket.", why:"Spreading across many investments means no single failure can sink you — that's real risk reduction." },
      { q:"“Even a 1% annual fee can cost you a lot over decades.”", opts:["🚫 Myth","✅ Reality"], a:1, hint:"Fees compound too.", why:"Small fees compound against you, often costing tens of thousands over a lifetime." },
      { q:"“Reinvesting dividends boosts long-term compounding.”", opts:["🚫 Myth","✅ Reality"], a:1, hint:"More shares → more dividends.", why:"Reinvested dividends buy more shares, which themselves earn — accelerating the snowball." },
      { q:"“Guaranteed high returns with no risk usually means a scam.”", opts:["🚫 Myth","✅ Reality"], a:1, hint:"If it sounds too good to be true…", why:"Risk and reward are linked. 'Guaranteed, high, no-risk' is the classic signature of fraud." },
      { q:"“Trying to time the market usually hurts your returns.”", opts:["🚫 Myth","✅ Reality"], a:1, hint:"Best days cluster near worst days.", why:"Most timing attempts miss the best days and lag simple buy-and-hold." },
      { q:"“A market crash means your money is gone for good.”", opts:["🚫 Myth","✅ Reality"], a:0, hint:"Only if you sell.", why:"If you don't sell, a drop is temporary — diversified markets have recovered from every crash in history." }
    ]
  },
  {
    id:"returns_math", emoji:"➗", name:"Returns Math", skill:"Numeracy · % returns", numeric:true, unit:"%",
    desc:"Calculate the percentage return on a trade.",
    gen:()=>{ const buys=[25,40,50,100,200], pcts=[10,20,25,50,-10,-20,-25,100];
      const b=buys[Math.floor(Math.random()*buys.length)], p=pcts[Math.floor(Math.random()*pcts.length)];
      const s=Math.round(b*(1+p/100));
      return { q:`You buy a stock at <b>$${b}</b> and later sell at <b>$${s}</b>. What is your return? (use a negative number for a loss)`, answer:p, tol:0.6, hint:"Return % = (sell − buy) ÷ buy × 100.", why:`(${s} − ${b}) ÷ ${b} × 100 = ${p}%.` }; }
  },
  {
    id:"pe_math", emoji:"🧮", name:"Valuation Math", skill:"Numeracy · P/E", numeric:true, unit:"P/E",
    desc:"Compute price-to-earnings ratios.",
    gen:()=>{ const prices=[40,50,100,120,150,200,300], epss=[2,4,5,8,10];
      const e=epss[Math.floor(Math.random()*epss.length)]; const mult=[8,10,12,15,20,25,30][Math.floor(Math.random()*7)];
      const pr=e*mult;
      return { q:`A stock trades at <b>$${pr}</b> with earnings per share of <b>$${e}</b>. What is its P/E ratio?`, answer:pr/e, tol:0.3, hint:"P/E = price ÷ earnings per share.", why:`${pr} ÷ ${e} = ${(pr/e).toFixed(0)}.` }; }
  },
  {
    id:"real_math", emoji:"📉", name:"Real Return Math", skill:"Numeracy · inflation", numeric:true, unit:"%",
    desc:"Find the real (after-inflation) return.",
    gen:()=>{ const noms=[5,6,7,8,10,12], infs=[2,3,4];
      const n=noms[Math.floor(Math.random()*noms.length)], i=infs[Math.floor(Math.random()*infs.length)];
      return { q:`Your investment returns <b>${n}%</b> in a year while inflation is <b>${i}%</b>. Roughly what is your <i>real</i> return?`, answer:n-i, tol:0.3, hint:"Real return ≈ nominal return − inflation.", why:`${n}% − ${i}% ≈ ${n-i}% in real (purchasing-power) terms.` }; }
  }
];

/* ---- Simulated classmates for the Investing Arena leaderboard ---- */
const CLASSMATES = [
  { name:"Ava 🦊", style:"Index investor", mean:0.0006, vol:0.011 },
  { name:"Ben 🐢", style:"Cautious saver", mean:0.0004, vol:0.006 },
  { name:"Chloe 🚀", style:"Growth chaser", mean:0.0008, vol:0.025 },
  { name:"Diego 🎯", style:"Balanced", mean:0.00055, vol:0.013 },
  { name:"Emma 💎", style:"Dividend lover", mean:0.0005, vol:0.009 },
  { name:"Finn 🎲", style:"Day trader", mean:0.0003, vol:0.032 },
  { name:"Grace 🧠", style:"Value hunter", mean:0.00058, vol:0.014 }
];

/* ---- Investable assets in the Arena ---- */
const ARENA_ASSETS = [
  { sym:"WRLD", name:"Total World Index ETF", emoji:"🌍", price:100, drift:0.0006, vol:0.010, kind:"Broad index fund — diversified & steady" },
  { sym:"AGGB", name:"Aggregate Bond Fund", emoji:"🏦", price:50, drift:0.0002, vol:0.004, kind:"Bonds — low risk, low return" },
  { sym:"APLX", name:"Applecore Tech", emoji:"🏛️", price:182, drift:0.0006, vol:0.018, kind:"Steady giant — large, stable" },
  { sym:"NOVA", name:"NovaDrive EV", emoji:"🚀", price:240, drift:0.0009, vol:0.040, kind:"Hot grower — high risk/reward" },
  { sym:"STED", name:"SteadyPower Utility", emoji:"💡", price:64, drift:0.0003, vol:0.008, kind:"Income payer — defensive" },
  { sym:"BYTE", name:"ByteForge Cloud", emoji:"☁️", price:410, drift:0.0008, vol:0.022, kind:"Quality compounder" }
];

/* ============================================================
   Investing Arena — real-ticker data
   Seed prices are fallbacks used only when live data isn't
   connected (they let the simulator run out of the box).
   ============================================================ */
const DEFAULT_WATCHLIST = ["AAPL","MSFT","NVDA","AMZN","GOOGL","TSLA","META","SPY","QQQ","BND"];

const SEED_PRICES = {
  AAPL:225, MSFT:430, NVDA:125, AMZN:185, GOOGL:175, TSLA:250, META:560,
  SPY:560, QQQ:480, AMD:150, KO:62, JPM:215, DIS:95, VOO:510, COST:880,
  NFLX:680, V:280, JNJ:150, WMT:80, XOM:115, BRKB:450, DIA:430,
  BND:73, AGG:98
};

/* Simulated competitors hold real tickers, valued at the same live/sim
   prices as the user, so the leaderboard tracks the real market. */
const COMPETITORS = [
  { name:"Ava R.",   style:"S&P 500 index",     weights:{ SPY:1.0 } },
  { name:"Ben T.",   style:"Big Tech",          weights:{ AAPL:.25, MSFT:.25, NVDA:.25, GOOGL:.25 } },
  { name:"Chloe M.", style:"Aggressive growth", weights:{ NVDA:.40, TSLA:.30, AMD:.30 } },
  { name:"Diego S.", style:"Balanced ETF",      weights:{ SPY:.50, QQQ:.30, KO:.20 } },
  { name:"Emma K.",  style:"Dividend & value",  weights:{ JPM:.35, KO:.35, JNJ:.30 } },
  { name:"Finn O.",  style:"Nasdaq 100",        weights:{ QQQ:1.0 } },
  { name:"Grace L.", style:"FAANG",             weights:{ META:.34, AMZN:.33, GOOGL:.33 } },
  { name:"Hugo P.",  style:"Stock picker",      weights:{ AAPL:.30, COST:.25, NFLX:.25, V:.20 } }
];

/* ============================================================
   LESSON_EXTRAS — per-lesson video + hands-on tasks/assignments.
   `video` becomes a YouTube search link; `tasks` are do-it
   activities shown BEFORE the quiz.
   ============================================================ */
const LESSON_EXTRAS = {
  why:{ video:"compound interest explained for beginners", tasks:[
    "Open the <b>Compound Calculator</b> (Tools) and set $0 start, $150/month, 40 years. Note how much of the total is <i>growth</i> vs. what you put in.",
    "Use the Rule of 72: estimate the doubling time at 6% vs 9%. Check yourself in the <b>Rule of 72</b> practice activity."] },
  foundation:{ video:"emergency fund and paying off debt before investing", tasks:[
    "Add up roughly 3 months of your essential expenses — that's your emergency-fund target.",
    "List any debts you (or your family) have and rank them by interest rate. Which would you attack first?"] },
  markets:{ video:"how the stock market works for beginners", tasks:[
    "Look up today's level of a major index (e.g., the S&P 500) and whether it's up or down.",
    "In your own words, define: bull market, bear market, and correction."] },
  stocks:{ video:"what is a stock explained simply", tasks:[
    "Pick a company you love as a customer. Is it publicly traded? What would owning one share mean?",
    "Open the <b>Stock Analyzer</b> (Tools) and compare a 'steady giant' with a 'hot grower.'"] },
  bonds:{ video:"how do bonds work explained", tasks:[
    "Explain to a friend (or out loud) why bond prices fall when interest rates rise.",
    "Decide: for money you need in 2 years, would you choose stocks or bonds? Why?"] },
  funds:{ video:"index funds and ETFs explained for beginners", tasks:[
    "Find the expense ratio of any real ETF online. Is it closer to 0.05% or 1%?",
    "Using the lesson's fee table, estimate the 30-year cost gap between a 1% and a 0.05% fund."] },
  alternatives:{ video:"REITs commodities and crypto explained", tasks:[
    "List which (if any) you'd consider: REIT, gold, crypto — and what % feels right for you.",
    "Explain why holding 100% cash for decades is actually risky."] },
  risk:{ video:"risk versus reward investing explained", tasks:[
    "Rate your own risk tolerance 1–10. Would you sleep fine if your portfolio fell 30%?",
    "Try the <b>Match the Investor</b> practice activity to test matching risk to people."] },
  allocation:{ video:"asset allocation and diversification explained", tasks:[
    "Open the <b>Portfolio Builder</b> (Tools) and build a mix using '110 minus your age.'",
    "Write your target stock / bond / cash split in a single sentence."] },
  accounts:{ video:"investment accounts and taxes explained for beginners", tasks:[
    "Find out if your (or a parent's) employer offers a retirement match — that's free money.",
    "Name one tax-advantaged account available where you live."] },
  strategies:{ video:"dollar cost averaging and buy and hold explained", tasks:[
    "Design a pretend DCA plan: a fixed amount on a fixed day each month. What would you pick?",
    "Explain why a total-market index fund means you don't have to choose value vs. growth."] },
  fundamentals:{ video:"how to read a stock P E ratio explained", tasks:[
    "In the <b>Stock Analyzer</b>, read each company's P/E and growth — which is 'priced for growth'?",
    "Look up a real company's P/E online. Is it higher or lower than a competitor's?"] },
  analyze:{ video:"how to analyze a stock for beginners", tasks:[
    "In the <b>Stock Analyzer</b>, run the 5-step checklist on all four companies.",
    "Classify a real stock you know into one of the four archetypes."] },
  technical:{ video:"technical analysis basics explained", tasks:[
    "Pull up a 1-year price chart of any stock. Can you spot the trend and any support/resistance?",
    "Explain why, for a long-term investor, charts are only a minor tool."] },
  crashes:{ video:"2008 financial crisis explained simply", tasks:[
    "Pick one crash (1929, 2000, or 2008). In two sentences, explain what caused it.",
    "Find a long-term S&P 500 chart, locate 2008, and notice what happened afterward."] },
  global:{ video:"hyperinflation and currency collapse explained", tasks:[
    "Research one currency collapse (Weimar, Zimbabwe, Venezuela, or Argentina). What triggered it?",
    "Explain why people rush to buy U.S. dollars or gold during a crisis."] },
  macro:{ video:"how interest rates affect the economy explained", tasks:[
    "Find your central bank's current interest rate. Is it rising or falling?",
    "Explain in one sentence how a U.S. rate hike can hurt an emerging-market country."] },
  psychology:{ video:"investing psychology and behavioral biases explained", tasks:[
    "Recall a time you (or someone) made an emotional money decision. Which bias was it?",
    "Play the <b>Market Simulator</b> (Tools) and notice your urge to react to headlines."] },
  mistakes:{ video:"common investing mistakes beginners make", tasks:[
    "Write out the 7-step beginner playbook from memory, then check it against the lesson.",
    "Honestly check: are you investing any money you'll need within 3 years? Should you be?"] },
  plan:{ video:"how to build an investment plan for beginners", tasks:[
    "Draft your own one-page plan: goals, allocation, accounts, contribution, and rules.",
    "Pick a single realistic automatic monthly amount you could invest."] }
};

/* ============================================================
   QUIZ_EXTRA — extra APPLICATION / reasoning questions per lesson.
   Merged with each lesson's base quiz to form a larger bank, so
   retries draw fresh questions. These reward logic over memory.
   ============================================================ */
const QUIZ_EXTRA = {
  why:[
    { q:"You invest $5,000 once at 8%. Using the Rule of 72, about what is it worth in ~9 years?", opts:["~$5,400","~$10,000 — it doubles","~$40,000","~$5,000"], a:1, why:"At 8%, 72÷8≈9 years to double, so roughly $10,000." },
    { q:"Aisha invests from age 22, Ben the same amount from 32, same return. At 62, who likely has more?", opts:["Ben, he invests later","Aisha — 10 extra years of compounding","They tie","Can't tell"], a:1, why:"Those extra early years of compounding usually win." },
    { q:"Inflation is 3% and your savings pays 1%. In real terms your money is…", opts:["Growing 1%","Losing ~2% of purchasing power","Keeping up","Growing 4%"], a:1, why:"Earning 1% while prices rise 3% is a ~2% real loss." }],
  foundation:[
    { q:"You have $2,000 spare and a $2,000 balance on a 24% credit card. Best move?", opts:["Invest it for ~8%","Pay off the 24% card","Buy crypto","Hold as cash"], a:1, why:"Clearing 24% debt is a guaranteed 24% — better than expected market returns." },
    { q:"You need $10,000 for tuition in 8 months. Where should it go?", opts:["Aggressive stocks","A safe savings account","One growth stock","An EV startup"], a:1, why:"Money needed within months must stay safe from a crash." },
    { q:"No emergency fund yet, but you want to invest. Smarter first step?", opts:["Invest everything anyway","Build 3–6 months of expenses in cash first","Borrow to invest","Buy options"], a:1, why:"A buffer stops an emergency from forcing you to sell at a loss." }],
  markets:[
    { q:"Your stock falls 4% on a day the whole market fell 4%. This is mostly…", opts:["A company-specific problem","Broad market movement","A reason to panic-sell","A guaranteed permanent loss"], a:1, why:"When everything falls together, it's market-wide, not company-specific." },
    { q:"The market just entered a 'correction.' Historically this is…", opts:["Extremely rare","A fairly normal, roughly yearly event","A signal to sell all","The end of investing"], a:1, why:"Corrections of 10–20% happen about once a year." },
    { q:"More buyers than sellers for a stock tends to push its price…", opts:["Down","Up","Nowhere","To zero"], a:1, why:"Excess demand pushes prices up." }],
  stocks:[
    { q:"Company X grows fast and pays no dividend; Company Y is mature and pays 4%. The 'growth' stock is…", opts:["Company X","Company Y","Both","Neither"], a:0, why:"Reinvesting profits with no dividend is typical of growth companies." },
    { q:"You own 1 share of a company split into 1 billion shares. You own…", opts:["1% of it","One-billionth of it","Nothing","Half"], a:1, why:"One of a billion shares is one-billionth ownership." },
    { q:"One stock you own falls 90% on fraud news; your index fund barely moves. This shows…", opts:["Indexes are riskier","Single stocks carry concentrated risk diversification avoids","Never invest","Funds are guaranteed"], a:1, why:"A diversified index spreads out single-company risk." }],
  bonds:[
    { q:"You hold a 2% bond; new bonds now pay 5%. Your bond's market price will likely…", opts:["Rise","Fall","Stay the same","Double"], a:1, why:"When rates rise, existing lower-rate bonds lose value." },
    { q:"To calm the swings of a stock-heavy portfolio, you'd add…", opts:["More of the same stock","Bonds","Leverage","Crypto"], a:1, why:"Bonds are steadier and cushion stock volatility." },
    { q:"Which pays more interest because it's riskier?", opts:["A government Treasury","A high-yield 'junk' bond","A savings account","Cash"], a:1, why:"Higher default risk forces junk bonds to pay more." }],
  funds:[
    { q:"Fund A charges 1.0%/yr, Fund B 0.05%/yr, same holdings. Over decades, B will likely…", opts:["Lag A","Beat A by a wide margin","Match A exactly","Be riskier"], a:1, why:"Lower fees compound into much more money over time." },
    { q:"You want 'the whole U.S. market' in one cheap buy. Best fit?", opts:["A single tech stock","A broad index ETF","A junk bond","Gold"], a:1, why:"A broad index ETF gives instant low-cost diversification." },
    { q:"An active fund beat the market last year. Over the long run, most active funds…", opts:["Beat cheap index funds after fees","Underperform cheap index funds after fees","Have no fees","Always win"], a:1, why:"Most active funds lag low-cost index funds over time." }],
  alternatives:[
    { q:"You hold 100% cash for 20 years at 3% inflation. The main risk is…", opts:["A sudden 50% crash","Slowly losing purchasing power","Margin calls","Dividend cuts"], a:1, why:"Cash can't crash but inflation erodes its real value." },
    { q:"You want real-estate exposure without buying a building. Use a…", opts:["Commodity","REIT","Treasury bond","Savings account"], a:1, why:"A REIT gives stock-like access to income property." },
    { q:"A friend puts all their savings into crypto. A prudent view is…", opts:["Smart, it only rises","Too risky — crypto is a small speculative slice at most","Risk-free","Required for all"], a:1, why:"Crypto's volatility means it shouldn't be a whole portfolio." }],
  risk:[
    { q:"You'd panic-sell if your portfolio dropped 30%. The right response is to…", opts:["Go 100% stocks anyway","Pick a calmer mix you can actually hold","Use leverage","Day-trade"], a:1, why:"A plan only works if you can stick to it — match risk to tolerance." },
    { q:"A: steady 4%. B: averages 9% but swings hard. This reflects…", opts:["A free lunch in B","The risk–reward tradeoff","No real difference","Guaranteed loss in B"], a:1, why:"Higher expected return comes with more volatility." },
    { q:"A 25-year-old has high risk capacity mainly because…", opts:["They earn the most","Their long horizon can ride out crashes","Stocks can't fall for them","They pay no tax"], a:1, why:"A long horizon allows recovery from downturns." }],
  allocation:[
    { q:"Using '110 minus age,' a 30-year-old's rough stock allocation is about…", opts:["30%","80%","100% bonds","10%"], a:1, why:"110 − 30 = 80% stocks as a starting point." },
    { q:"Stocks surged to 75% of your 60/40 portfolio. Rebalancing means you…", opts:["Buy more stocks","Sell some stocks, add bonds to return to 60/40","Sell everything","Never act"], a:1, why:"Rebalancing trims what grew too large back to target." },
    { q:"The single biggest driver of long-term results is usually…", opts:["Picking one perfect stock","Your overall asset allocation","Your broker's brand","Timing each trade"], a:1, why:"Allocation explains most of a portfolio's outcome." }],
  accounts:[
    { q:"Your employer matches 100% of your first 5%. Skipping it is like…", opts:["Saving on taxes","Turning down free money / an instant 100% return","Reducing risk","A smart move"], a:1, why:"A match is free money — grab it first." },
    { q:"Holding a stock 2 years vs 2 weeks before selling can mean…", opts:["Higher tax","Potentially lower long-term capital-gains tax","No difference","Losing the shares"], a:1, why:"Long-term gains are often taxed at lower rates." },
    { q:"Where should a beginner usually invest FIRST?", opts:["A taxable account only","Tax-advantaged accounts, especially with a match","Under the mattress","One single stock"], a:1, why:"Tax breaks and matches make these the top priority." }],
  strategies:[
    { q:"You invest $300 monthly regardless of price. When prices drop you…", opts:["Buy fewer shares","Buy more shares for the same $300","Stop buying","Sell"], a:1, why:"Fixed dollars buy more shares when prices fall — that's DCA." },
    { q:"You can't choose between value and growth stocks. A simple fix is…", opts:["Pick one and hope","Buy a total-market index fund holding both","Avoid investing","Only buy bonds"], a:1, why:"A total-market fund owns both styles automatically." },
    { q:"Jumping in and out to catch tops and bottoms usually…", opts:["Beats staying invested","Underperforms simply staying invested","Removes risk","Is easy for pros"], a:1, why:"Time in the market beats timing it." }],
  fundamentals:[
    { q:"Stock A: P/E 12, slow growth. Stock B: P/E 60, fast growth. B's high P/E reflects…", opts:["Bankruptcy risk","High expected growth priced in","No profits","A bargain"], a:1, why:"A high P/E means investors pay up for expected growth." },
    { q:"A rival's P/E is 20; this firm's is 45 with similar growth. This firm looks…", opts:["Cheaper","More expensive per $1 of earnings","Safer","Guaranteed better"], a:1, why:"Higher P/E for similar growth means paying more per dollar of profit." },
    { q:"A company turns $100B revenue into $30B profit. Its margins are…", opts:["Weak","Strong (30%)","Negative","Irrelevant"], a:1, why:"Converting 30% of revenue to profit signals strong margins." }],
  analyze:[
    { q:"Huge, profitable, slow-growing, modest P/E, pays a dividend. This is a…", opts:["Hot grower","Steady giant","Failing firm","Penny stock"], a:1, why:"That profile is the classic steady giant." },
    { q:"Before judging any stock's numbers, the first step is to…", opts:["Check the chart","Understand what the business does","Look at the dividend","Guess tomorrow's price"], a:1, why:"Understand the business before the numbers can mean anything." },
    { q:"A flat price with a 5% dividend best suits an investor wanting…", opts:["Maximum growth","Steady income","10× gains","Daily trading"], a:1, why:"Stable price + high dividend = an income profile." }],
  technical:[
    { q:"A long-term index investor spends hours daily on chart patterns. This is…", opts:["Essential","Largely unnecessary — discipline matters more","Guaranteed profit","Required by law"], a:1, why:"For long-term investors, charts are minor compared to consistency." },
    { q:"A chart level where buying repeatedly halts declines is called…", opts:["Resistance","Support","A dividend","A split"], a:1, why:"Support is where buyers tend to stop drops." },
    { q:"Active trading on chart signals, after fees and taxes, often…", opts:["Beats buy-and-hold","Lags buy-and-hold","Removes risk","Is free"], a:1, why:"Costs and timing errors usually make it underperform holding." }],
  crashes:[
    { q:"In both 1929 and 2008, the ingredient that amplified the crash was…", opts:["Too much diversification","Excessive leverage (borrowed money)","Index funds","Low rates only"], a:1, why:"Heavy borrowing magnified losses and forced selling." },
    { q:"A diversified investor who HELD through 2008 instead of selling…", opts:["Lost everything","Recovered and reached new highs later","Was forced out","Never recovered"], a:1, why:"Markets fully recovered; only sellers locked in the losses." },
    { q:"Investors overpaid for profitless '.com' firms in 2000. The lesson is…", opts:["Avoid all tech","A great technology isn't a great investment at any price","Valuation is irrelevant","Always buy hype"], a:1, why:"Even real innovation can be a bad investment if you overpay." }],
  global:[
    { q:"A government prints money rapidly to pay its bills. Likely result?", opts:["A stronger currency","Inflation, possibly hyperinflation","Falling prices","No effect"], a:1, why:"Flooding the money supply devalues each unit." },
    { q:"Thailand's 1997 crash spreading to Korea and Indonesia is an example of…", opts:["A safe haven","Contagion across similar economies","Hyperinflation","A commodity boom"], a:1, why:"Panic spread to economies investors saw as similar." },
    { q:"During a local currency collapse, people often rush to hold…", opts:["More of the failing currency","U.S. dollars or gold","Only local real estate","Nothing"], a:1, why:"Safe havens hold value when a currency fails." }],
  macro:[
    { q:"The U.S. Fed raises rates sharply. A likely effect on emerging markets?", opts:["Money flows in, they strengthen","Money flows out; their currencies and dollar debts strain","No effect","Guaranteed boom"], a:1, why:"Capital chases higher U.S. yields, pressuring those economies." },
    { q:"A central bank cuts rates mainly to…", opts:["Cool an overheating economy","Stimulate borrowing, spending and growth","Cause a recession","End all inflation"], a:1, why:"Lower rates make borrowing cheaper, boosting activity." },
    { q:"Greece's debt troubles threatened the whole euro because…", opts:["Greece used dollars","Many banks held Greek debt and 19 nations shared the currency","Greece had no debt","It only affected Greece"], a:1, why:"A shared currency and exposure spread the risk Europe-wide." }],
  psychology:[
    { q:"Markets drop 15% and your gut screams 'sell.' The disciplined move is to…", opts:["Sell immediately","Stick to your plan — corrections are normal","Buy on margin","Check prices hourly"], a:1, why:"Fear-selling locks in losses; a plan keeps you steady." },
    { q:"Buying a coin only because it 'jumped 300% last week' is…", opts:["Value investing","FOMO / performance chasing","Diversification","Rebalancing"], a:1, why:"Chasing recent winners usually backfires." },
    { q:"The average investor often underperforms their own funds due to…", opts:["High taxes only","Emotional timing — buying high, selling low","Bad luck","Government rules"], a:1, why:"Behavior, not the funds, creates the gap." }],
  mistakes:[
    { q:"An ad guarantees '40% monthly returns, zero risk.' You should…", opts:["Invest fast","Recognize a scam and walk away","Borrow to invest","Tell friends to buy"], a:1, why:"Guaranteed high returns with no risk signals fraud." },
    { q:"Per the playbook, you buy index funds AFTER…", opts:["Spending your emergency fund","Securing an emergency fund and clearing high-interest debt","Borrowing money","Picking 10 hot stocks"], a:1, why:"The foundation comes before buying investments." },
    { q:"A 1.5% annual fee vs 0.1% over 30 years will…", opts:["Barely matter","Cost a large share of your returns","Increase returns","Lower taxes"], a:1, why:"Fees compound against you over decades." }],
  plan:[
    { q:"Markets crash a year after you write your plan, which says 'never panic-sell, rebalance yearly.' You should…", opts:["Ignore it and sell","Follow the plan you wrote in calm times","Cash out fully","Quit investing forever"], a:1, why:"A written plan exists to guide you through scary moments." },
    { q:"Which makes contributions most reliable?", opts:["Investing leftover money when you remember","A fixed automatic amount each payday","Only after good news","Random lump sums"], a:1, why:"Automation removes emotion and builds consistency." },
    { q:"The best time to start a simple, consistent plan is generally…", opts:["After becoming an expert","As early as possible, even if small","Only in a bull market","Never"], a:1, why:"Time in the market is precious — start early." }]
};

/* ============================================================
   CASES — interactive real-world case studies per lesson.
   Each case has steps; a step shows context, asks the student
   to predict WHY, then reveals what actually happened.
   ============================================================ */
const CASES = {
  why:[{ emoji:"📈", title:"How Warren Buffett really got rich", real:true,
    lesson:"Time in the market is the most powerful force a beginner has.", steps:[
    { context:"Warren Buffett is one of the richest people alive, worth over $100 billion. He is a brilliant investor — but here is the surprising part: the <b>overwhelming majority of his wealth was built late in life</b> (by one widely-cited estimate, the great bulk of it came after his early 60s).",
      q:"Why did the vast majority of his fortune appear so late in life?",
      opts:["He only learned to invest when he got older","Compounding — his returns kept earning returns over 80+ years","He inherited it at age 60","He got lucky once"], a:1,
      reveal:"Buffett started investing as a child and never stopped. His ~20%/year returns compounded for over 80 years, and because compounding snowballs, the gigantic gains arrive at the <i>end</i> of a long runway — not the start. Time was his real superpower." },
    { context:"Buffett himself credits his wealth to 'living in America, some lucky genes, and <b>compound interest</b>.'",
      q:"What is the key takeaway for a beginner?",
      opts:["Wait until you are 50 to start","Start as early as possible and stay invested for decades","Only invest if you are a genius","Try to get rich within a year"], a:1,
      reveal:"The earlier you start, the more compounding cycles you get. Even small amounts invested young can outgrow large amounts invested later. Starting early beats trying to be brilliant." }]}],
  foundation:[{ emoji:"🧱", title:"Forced to sell at the worst possible time", real:false,
    lesson:"Build your safety net before you invest a dollar.", steps:[
    { context:"Meet Sam, an eager new investor. Excited to grow his money, he put <b>every spare dollar into stocks</b> — with no emergency savings. Then his car's engine died: a $3,000 repair bill, right as the market had dropped 20%.",
      q:"What was Sam forced to do, and why was it so damaging?",
      opts:["Nothing — he had a backup fund","Sell his stocks at a 20% loss to pay the bill","Ignore the repair","Ask for a raise"], a:1,
      reveal:"With no cash cushion, Sam had to sell investments while they were down 20% — turning a temporary paper loss into a permanent, real one, and missing the eventual recovery." },
    { context:"Months later, the market had fully recovered and climbed to new highs.",
      q:"What one step would have prevented Sam's mistake?",
      opts:["Investing even more aggressively","Holding 3–6 months of expenses in cash first","Never investing again","Buying a newer car"], a:1,
      reveal:"A 3–6 month emergency fund absorbs life's surprises so your investments can stay invested and ride out downturns. Foundation first, then invest." }]}],
  markets:[{ emoji:"🎮", title:"GameStop: a dying retailer's stock explodes", real:true,
    lesson:"Supply and demand move prices short-term; real value wins long-term.", steps:[
    { context:"In January 2021, GameStop — a struggling video-game store many expected to go bankrupt — saw its stock rocket from about <b>$20 to a high of $347.51</b> in days (per the SEC's report; it briefly traded even higher intraday).",
      q:"What drove the price up so violently, despite the weak business?",
      opts:["GameStop suddenly became very profitable","A flood of buyers overwhelmed sellers — pure supply and demand","The government set the price","A new product launch"], a:1,
      reveal:"A wave of retail traders (many from Reddit) bought together, while hedge funds betting against it were forced to buy back too (a 'short squeeze'). Massive demand plus limited shares spiked the price — even though the business hadn't changed." },
    { context:"Within weeks the price collapsed back toward $40–50, and many late buyers lost heavily.",
      q:"What does this teach about short-term prices?",
      opts:["Prices always reflect true value","Short-term prices can detach wildly from a business's real worth","Buying hype is safe","The market is always rational"], a:1,
      reveal:"In the short run the market is a 'voting machine' driven by emotion and demand; in the long run it is a 'weighing machine' driven by real value. Chasing the frenzy is how late buyers got burned." }]}],
  stocks:[{ emoji:"📉", title:"Enron: employees lose everything in one stock", real:true,
    lesson:"Don't bet your future on a single stock — diversify.", steps:[
    { context:"Enron was a celebrated energy giant, named 'America's Most Innovative Company' six years running. Many employees held <b>most or all of their retirement savings in Enron stock</b>. In 2001, it emerged the company had hidden massive losses through accounting fraud.",
      q:"What happened to those employees' savings?",
      opts:["They were protected by insurance","The stock fell ~99% to near zero, wiping out their retirements","They received a government refund","Nothing changed"], a:1,
      reveal:"Enron collapsed into bankruptcy; the stock fell from ~$90 to under $1. Employees with everything in Enron lost both their jobs and their life savings at once." },
    { context:"A worker holding a diversified mix of many companies would have barely felt Enron's collapse.",
      q:"What is the core lesson?",
      opts:["Never invest at all","Never put too much in any single company — diversify","Only work for innovative companies","Stocks are guaranteed"], a:1,
      reveal:"Any single company — even a famous, 'safe'-looking one — can go to zero. Diversifying across many companies (e.g., via an index fund) means no single failure can ruin you." }]}],
  bonds:[{ emoji:"🏦", title:"Silicon Valley Bank: how 'safe' bonds sank a bank", real:true,
    lesson:"Rates up → bond prices down. Even safe bonds carry interest-rate risk.", steps:[
    { context:"SVB was a large, respected bank. It parked billions in <b>long-term U.S. government bonds</b> — about the 'safest' asset there is. Then, in 2022–2023, the Federal Reserve raised interest rates rapidly.",
      q:"What happened to the value of SVB's existing bonds?",
      opts:["They rose in value","They fell, because new bonds now paid higher rates","Nothing — bonds never lose value","They were unaffected"], a:1,
      reveal:"Bond prices move opposite to interest rates. As rates jumped, SVB's older low-rate bonds lost significant market value — even though they were 'safe' government bonds with no default risk." },
    { context:"When customers got nervous and rushed to withdraw, SVB had to sell those bonds at a loss to raise cash. Word spread, withdrawals snowballed, and in March 2023 SVB collapsed in days.",
      q:"What is the key bond lesson here?",
      opts:["Government bonds carry no risk of any kind","Even safe bonds carry interest-rate risk — they fall when rates rise","Banks should hold only stocks","Bonds always lose money"], a:1,
      reveal:"'Safe from default' is not 'safe from everything.' Rising rates cut the market value of existing bonds, especially long-term ones. That interest-rate risk, plus a bank run, brought down SVB." }]}],
  funds:[{ emoji:"🤝", title:"Buffett's $1 million bet against the experts", real:true,
    lesson:"Low-cost index funds beat most expensive experts over the long run.", steps:[
    { context:"In 2007, Warren Buffett made a public $1 million bet: that a simple, low-cost <b>S&P 500 index fund</b> would beat a basket of elite hedge funds (run by highly-paid pros) over 10 years.",
      q:"Who do you think won?",
      opts:["The expert hedge funds, easily","The simple index fund, by a wide margin","It was an exact tie","The bet was cancelled"], a:1,
      reveal:"The index fund won decisively — roughly 125% versus about 36% for the hedge funds. The pros' high fees and constant trading dragged them far behind a fund that just quietly tracked the market." },
    { context:"Buffett donated the winnings to charity and called it a lesson for ordinary investors.",
      q:"Why did the cheap index fund beat the expensive experts?",
      opts:["Pure luck","Low fees plus broad diversification beat high-fee active management over time","The experts didn't try","Index funds win every single year"], a:1,
      reveal:"Most active managers fail to beat the market after their high fees. A low-cost index fund keeps costs tiny and captures the whole market — which is why it is the go-to for beginners." }]}],
  alternatives:[{ emoji:"🪙", title:"FTX: a $32 billion crypto empire vanishes", real:true,
    lesson:"Speculative assets can go to zero — keep them small.", steps:[
    { context:"FTX was one of the world's biggest crypto exchanges, valued at <b>$32 billion</b>, endorsed by celebrities and seen as a safe place to hold crypto. In November 2022 it collapsed almost overnight, and customers couldn't withdraw their money.",
      q:"Why did it collapse so fast?",
      opts:["A normal market dip","Misuse of customer funds plus a sudden loss of confidence (a run)","Too much diversification","Excessive regulation"], a:1,
      reveal:"FTX had secretly used customer deposits for risky bets. When confidence cracked, everyone tried to withdraw at once — a classic run — and the money wasn't there. Billions in customer funds evaporated." },
    { context:"Many people had far more tied up in FTX and crypto tokens than they could afford to lose.",
      q:"What is the prudent takeaway about speculative assets like crypto?",
      opts:["Put all your savings in crypto","Treat crypto as a small, speculative slice you can afford to lose","Crypto is risk-free","Avoid learning about it entirely"], a:1,
      reveal:"Crypto is young, volatile, and sometimes outright fraudulent. If you hold it at all, keep it to a small slice — never let a speculative bet hold money you can't afford to lose." }]}],
  risk:[{ emoji:"⚖️", title:"The genius fund that nearly broke the world", real:true,
    lesson:"No one is smart enough to escape risk — especially with leverage.", steps:[
    { context:"Long-Term Capital Management was a 1990s hedge fund run by Wall Street stars and <b>two Nobel Prize-winning economists</b>. Their models were brilliant, and for years they earned huge returns — by borrowing enormous sums to amplify small gains (leverage).",
      q:"What is the hidden danger of using heavy leverage?",
      opts:["None, if you are smart enough","It magnifies losses just as much as gains","It removes all risk","It only ever helps"], a:1,
      reveal:"Leverage cuts both ways. LTCM had borrowed so heavily that even a small adverse move could wipe out everything. Brilliance does not cancel the math of leverage." },
    { context:"In 1998, unexpected events (a Russian debt default) moved against them. Their massive leverage turned losses catastrophic, and the fund nearly took the whole financial system down with it.",
      q:"What is the lesson about risk?",
      opts:["Smart people can't lose money","No model eliminates risk; leverage and overconfidence are dangerous","Always use maximum leverage","Risk isn't real"], a:1,
      reveal:"Even Nobel laureates couldn't out-think risk. Markets do the 'impossible,' and leverage punishes it severely. Take only risk you can survive — there is no free lunch." }]}],
  allocation:[{ emoji:"🥧", title:"All eggs in one basket: the dot-com crash", real:true,
    lesson:"Diversify across the board so one crash can't sink you.", steps:[
    { context:"By early 2000, technology stocks had soared for years. Many investors put <b>nearly everything into hot tech and internet stocks</b>, sure they couldn't lose. Then the dot-com bubble burst.",
      q:"What happened to an all-tech portfolio?",
      opts:["It kept rising","The tech-heavy Nasdaq fell ~78%, devastating concentrated investors","It was unaffected","It doubled"], a:1,
      reveal:"The Nasdaq lost about 78% from its 2000 peak and took 15 years to fully recover. Investors with everything in tech were crushed." },
    { context:"Meanwhile, an investor diversified across many sectors — and holding some bonds — fell far less and recovered much faster.",
      q:"What protected the diversified investor?",
      opts:["Pure luck","Spreading across asset classes and sectors cushioned the blow","Owning even more tech","Selling everything"], a:1,
      reveal:"Diversification means when one area collapses, others hold up. Mixing sectors, company sizes, and bonds smooths the ride and speeds recovery. Allocation is your shock absorber." }]}],
  accounts:[{ emoji:"🧾", title:"The 1% fee that quietly ate a retirement", real:false,
    lesson:"Small fees compound into huge losses — keep them low.", steps:[
    { context:"Two friends each invest $200/month for 40 years and earn the same 7% before fees. Alex picks a fund charging <b>1% per year</b>; Jordan picks one charging <b>0.05%</b>.",
      q:"Roughly how different are their final balances?",
      opts:["Almost identical","Jordan ends up with well over $100,000 more","Alex ends up with more","Fees don't affect totals"], a:1,
      reveal:"That tiny-sounding 0.95% gap compounds for 40 years, leaving Jordan with well over $100,000 more — purely from lower fees. The fee silently siphons a huge chunk of returns." },
    { context:"Alex never noticed, because the fee was deducted automatically every year.",
      q:"What should you always check before buying a fund?",
      opts:["The logo","The expense ratio (its annual fee)","The app's color","Nothing"], a:1,
      reveal:"Always check the expense ratio. Low fees are one of the only near-guarantees in investing. Prefer cheap index funds, and capture tax-advantaged accounts and any employer match too." }]}],
  strategies:[{ emoji:"♟️", title:"The investors who missed the rebound", real:true,
    lesson:"Stay invested — the best days cluster right after the worst.", steps:[
    { context:"In March 2020, COVID fear crashed the market about 34% in weeks. Terrified, many investors <b>sold everything</b> to 'wait until things calm down.'",
      q:"What happened next?",
      opts:["The market kept falling for years","It rebounded sharply and hit new highs within months","Nothing changed for a decade","Stocks were banned"], a:1,
      reveal:"The market bottomed in late March 2020 and roared back to new all-time highs by that August. Those who sold locked in losses and often had to buy back higher — or missed the recovery entirely." },
    { context:"Studies show that missing just the market's <b>10 best days</b> over decades can cut your returns in half — and the best days often come right after the worst.",
      q:"What strategy avoids this trap?",
      opts:["Trying to time the exact bottom","Staying invested and contributing steadily (dollar-cost averaging)","Selling at every dip","Only investing once a crash is over"], a:1,
      reveal:"No one can reliably time the market. Staying invested and contributing on a schedule captures the rebounds. Time in the market beats timing the market." }]}],
  fundamentals:[{ emoji:"🔬", title:"Cisco: a great company at a terrible price", real:true,
    lesson:"A great company isn't a great investment at any price.", steps:[
    { context:"In 2000, Cisco was briefly the most valuable company in the world and a genuinely excellent, profitable business. But its stock traded at an <b>extreme price-to-earnings (P/E) ratio of around 200</b> at its March 2000 peak — investors paid roughly $200 for every $1 of annual profit.",
      q:"What does such an extreme P/E imply?",
      opts:["The stock is cheap","Investors were pricing in wildly optimistic future growth","The company was failing","P/E doesn't matter"], a:1,
      reveal:"A P/E of 150 assumes enormous growth for years. Even for a great company, that left no room for error — the stock was priced for perfection." },
    { context:"Cisco the business kept growing for the next 20 years. But the stock <b>still hasn't returned to its 2000 high</b> over two decades later.",
      q:"What is the lesson?",
      opts:["Never buy good companies","A great company can be a bad investment if you overpay","Always buy the most popular stock","Valuation is irrelevant"], a:1,
      reveal:"Price matters as much as quality. Overpaying — even for a wonderful business — can mean years of poor returns. Always weigh valuation, not just the story." }]}],
  analyze:[{ emoji:"🧠", title:"Sears: the cheap stock that kept getting cheaper", real:true,
    lesson:"Cheap isn't the same as good value — check the business.", steps:[
    { context:"Sears was once America's biggest retailer. As it declined, its stock looked <b>'cheap'</b> by some measures, and bargain hunters kept buying, betting on a turnaround.",
      q:"Why can a 'cheap'-looking stock still be a bad buy?",
      opts:["Cheap always means good value","The business itself may be deteriorating — a 'value trap'","Cheap stocks always bounce back","Price never reflects problems"], a:1,
      reveal:"Sears was cheap for a reason: its sales, stores, and profits were shrinking year after year. A low price on a dying business is not a bargain — it is a value trap." },
    { context:"Online competition (like Amazon) and weak management kept eroding Sears. In 2018 it filed for bankruptcy.",
      q:"What should an analyst check beyond a low price?",
      opts:["Only the share price","Whether the underlying business is healthy and growing","The CEO's wardrobe","Nothing else"], a:1,
      reveal:"Always look at the trend of revenue, profit, and competitive position — not just whether a stock 'looks cheap.' A shrinking business can get cheaper all the way to zero." }]}],
  technical:[{ emoji:"📉", title:"The Flash Crash: a trillion dollars gone in minutes", real:true,
    lesson:"Short-term price moves are often noise — don't react to them.", steps:[
    { context:"On May 6, 2010, the U.S. stock market suddenly plunged about <b>9% and then mostly recovered — all within roughly 20 minutes</b>. Some stocks briefly traded for a single penny.",
      q:"What largely caused this bizarre, lightning-fast crash?",
      opts:["A war","Automated high-speed trading programs cascading sell orders","A company bankruptcy","A public holiday"], a:1,
      reveal:"Automated algorithms rapidly sold into each other in a feedback loop, with no human judgment, briefly vaporizing prices. It was not driven by any real change in company values." },
    { context:"A long-term investor who was asleep that afternoon barely noticed anything by the next day.",
      q:"What does this teach a long-term investor about charts and short-term moves?",
      opts:["Watch every tick and react instantly","Short-term price action can be noise; don't let it drive long-term decisions","Day-trading is safe","Charts predict the future perfectly"], a:1,
      reveal:"Short-term prices can be chaotic and meaningless. For long-term investors, reacting to every squiggle is harmful. Charts are a minor tool — discipline and time matter far more." }]}],
  crashes:[{ emoji:"💥", title:"Lehman Brothers: the day the world froze", real:true,
    lesson:"Leverage plus interconnection turns one failure into a global crisis.", steps:[
    { context:"Lehman Brothers was a 158-year-old Wall Street giant. It had borrowed heavily to bet on <b>subprime mortgages</b> — loans to home-buyers who often couldn't repay. When U.S. house prices fell, those bets turned toxic.",
      q:"Why was Lehman so vulnerable when housing dropped?",
      opts:["It held only cash","It was massively leveraged, with tiny reserves against huge risky bets","It had no investments","It was too diversified"], a:1,
      reveal:"The big investment banks ran leverage ratios as high as ~40-to-1 (per the U.S. Financial Crisis Inquiry Commission) — meaning a drop of under 3% in asset values could wipe out their capital. With reserves that thin, Lehman's mortgage bets sank it." },
    { context:"In September 2008, Lehman went bankrupt. Banks suddenly stopped trusting each other, credit froze worldwide, and the global economy plunged into the Great Recession.",
      q:"Why did one bank's failure threaten the whole world?",
      opts:["It didn't — it was isolated","Banks were deeply interconnected, so panic and frozen credit spread globally","Only Lehman's staff were affected","Other countries were immune"], a:1,
      reveal:"The financial system is interconnected. Lehman's collapse shattered trust between banks everywhere, freezing the credit economies run on — a vivid example of contagion. Yet a diversified investor who stayed invested recovered as markets later hit new highs." }]}],
  global:[{ emoji:"🌍", title:"Zimbabwe: the 100-trillion-dollar note", real:true,
    lesson:"Printing money can destroy a currency — and people's savings.", steps:[
    { context:"In the 2000s, Zimbabwe's government, short of money, began <b>printing currency</b> to pay its bills on a massive scale.",
      q:"What does printing huge amounts of money typically cause?",
      opts:["A stronger currency","Severe inflation, as each unit becomes worth less","Falling prices","No effect at all"], a:1,
      reveal:"Flooding the economy with money makes each unit worth less, so prices soar. Zimbabwe spiraled into hyperinflation — at its peak, prices roughly doubled every day." },
    { context:"It became so extreme that the central bank printed a <b>100-trillion-dollar note</b>, and people carried cash in bags to buy bread. Eventually the currency was abandoned entirely.",
      q:"What is the deeper lesson about money and trust?",
      opts:["Printing money creates real wealth","A currency relies on trust and discipline; destroy them and it can collapse","Hyperinflation helps savers","Cash is always safe"], a:1,
      reveal:"Money has value only while people trust it will hold value. Reckless printing destroys that trust and can wipe out citizens' savings — which is why people in unstable economies flee to assets like the U.S. dollar or gold." }]}],
  macro:[{ emoji:"🧭", title:"1997: how Thailand's crisis spread across Asia", real:true,
    lesson:"Crises spread between countries — diversify globally.", steps:[
    { context:"In the 1990s, foreign money poured into fast-growing Asian economies. Thailand pegged its currency, the baht, to the U.S. dollar. In 1997 it could no longer defend that peg and was forced to let the baht <b>crash</b>.",
      q:"What did foreign investors do when Thailand's currency collapsed?",
      opts:["Invested even more","Panicked and pulled money out of the whole region","Ignored it","Bought more baht"], a:1,
      reveal:"Spooked investors yanked money not just from Thailand but from neighbors they saw as similar — Indonesia, South Korea, Malaysia. The panic spread far beyond where it began." },
    { context:"Currencies and stock markets collapsed across Asia, requiring massive international (IMF) bailouts.",
      q:"What is this rapid spread between countries called?",
      opts:["Diversification","Contagion","Compounding","Inflation"], a:1,
      reveal:"This is contagion — a crisis spreading across borders through trade links, shared lenders, and investor panic. It is why no economy is an island, and why diversifying globally reduces risk." }]}],
  psychology:[{ emoji:"🧩", title:"How Isaac Newton lost a fortune", real:true,
    lesson:"Discipline beats brilliance — don't let FOMO drive you.", steps:[
    { context:"In 1720, shares of the South Sea Company were soaring. Sir Isaac Newton — one of history's greatest geniuses — invested, made a quick profit, and sold. But then the stock kept climbing, and everyone around him was getting rich.",
      q:"What do you think Newton did next?",
      opts:["Stayed out, content with his profit","Jumped back in at much higher prices, driven by FOMO","Bet against the stock","Bought bonds instead"], a:1,
      reveal:"Unable to bear watching others get richer, Newton bought back in near the top — far above where he had sold. Even a genius was not immune to the fear of missing out." },
    { context:"The bubble burst. Newton lost around £20,000 — a fortune then. He reportedly said he 'could calculate the motions of the heavenly bodies, but not the madness of people.'",
      q:"What is the lesson for every investor?",
      opts:["Only geniuses should invest","Emotions like FOMO can wreck anyone — discipline beats intelligence","Always chase rising stocks","Bubbles never pop"], a:1,
      reveal:"Investing is more about temperament than IQ. FOMO, greed, and herd behavior trap even brilliant people. A calm, rules-based plan is your best defense against your own emotions." }]}],
  mistakes:[{ emoji:"🚨", title:"Bernie Madoff: the $65 billion 'sure thing'", real:true,
    lesson:"Guaranteed, too-smooth returns are a scam warning sign.", steps:[
    { context:"For decades, Bernie Madoff delivered investors smooth, <b>steady returns of about 10% every year</b> — up markets or down, almost never a losing month. Thousands of smart, wealthy people lined up to invest.",
      q:"What should that suspiciously smooth, 'guaranteed' return have signaled?",
      opts:["A genius — invest more","A red flag: real investing is never that smooth or certain","Nothing unusual","Proof it was risk-free"], a:1,
      reveal:"No legitimate strategy produces steady high returns with virtually no down months. That impossible consistency was the giant red flag — markets simply do not behave that way." },
    { context:"It was a <b>Ponzi scheme</b> — Madoff paid old investors with new investors' money. When it unravelled in 2008, about $65 billion vanished and lives were ruined.",
      q:"How can you protect yourself from scams like this?",
      opts:["Trust anyone promising steady high returns","Be skeptical of 'guaranteed,' too-good-to-be-true returns; if you can't explain it, avoid it","Invest based on hype","Never ask questions"], a:1,
      reveal:"If it sounds too good to be true, it is. Guaranteed high returns, secrecy, and pressure to act are hallmarks of fraud. Stick to transparent, low-cost, regulated investments." }]}],
  plan:[{ emoji:"🗺️", title:"The janitor who left behind $8 million", real:true,
    lesson:"A simple plan, followed for decades, builds real wealth.", steps:[
    { context:"Ronald Read was a gas-station attendant and janitor in Vermont. He never earned a high salary. Yet when he died in 2014 at age 92, he left an estate worth about <b>$8 million</b>.",
      q:"How did an ordinary worker build such wealth?",
      opts:["He won the lottery","He quietly invested small amounts in diversified stocks and held for decades","He inherited it","He day-traded crypto"], a:1,
      reveal:"Read lived frugally, bought shares of solid, diversified companies, reinvested the dividends, and simply held for 50+ years. No tricks — just consistency and time letting compounding work." },
    { context:"He never panic-sold, never chased fads, and stuck to a simple plan through every crash.",
      q:"What is the ultimate takeaway from his story?",
      opts:["You need a big salary to get rich","A simple, consistent, long-term plan can build real wealth for anyone","Investing only works for experts","Timing the market is the key"], a:1,
      reveal:"Wealth-building is not about big income or genius — it is about a simple plan followed for decades: invest regularly, diversify, keep costs low, and never panic-sell. Anyone can do it." }]}]
};

/* ============================================================
   WIDGETS — inline interactive calculators per lesson.
   ============================================================ */
const WIDGETS = {
  why:["compound","rule72","inflation"],
  fundamentals:["pe"],
  analyze:["pe"],
  allocation:["compound"],
  alternatives:["inflation"]
};

/* ============================================================
   SOURCES — credible free "learn more" links per lesson.
   ============================================================ */
/* Helpers: link() = direct URL to a trusted institution/publication;
   cite() = an authored, published work (book or peer-reviewed paper),
   linked to a search so it always resolves to the real work. */
const _q = s => "https://www.google.com/search?q=" + encodeURIComponent(s);
const gbooks = s => "https://www.google.com/search?tbm=bks&q=" + encodeURIComponent(s); // Google Books: the published edition w/ publisher & ISBN
const link = (label, url) => ({ label, url, kind:"link" });
const cite = (label, query) => ({ label, url:gbooks(query), kind:"cite" });

const SOURCES = {
  _default:[
    link("U.S. SEC — Investor.gov: Introduction to Investing", "https://www.investor.gov/introduction-investing"),
    cite("Burton G. Malkiel — A Random Walk Down Wall Street (W. W. Norton)", "Burton Malkiel A Random Walk Down Wall Street book")
  ],
  why:[
    link("U.S. SEC — Investor.gov: Compound interest calculator", "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator"),
    cite("John C. Bogle — The Little Book of Common Sense Investing (Wiley, 2007)", "John Bogle The Little Book of Common Sense Investing"),
    cite("Burton G. Malkiel — A Random Walk Down Wall Street (W. W. Norton)", "Burton Malkiel A Random Walk Down Wall Street")
  ],
  foundation:[
    link("U.S. Consumer Financial Protection Bureau — Building an emergency fund", "https://www.consumerfinance.gov/start-small-save-up/"),
    cite("Ramit Sethi — I Will Teach You to Be Rich (Workman, 2009)", "Ramit Sethi I Will Teach You to Be Rich book")
  ],
  markets:[
    link("U.S. SEC — Investor.gov: How stock markets work", "https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work"),
    cite("Burton G. Malkiel — A Random Walk Down Wall Street (W. W. Norton)", "Burton Malkiel A Random Walk Down Wall Street")
  ],
  stocks:[
    link("U.S. SEC — Investor.gov: Stocks", "https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks"),
    cite("Peter Lynch — One Up on Wall Street (Simon & Schuster, 1989)", "Peter Lynch One Up on Wall Street book"),
    cite("Benjamin Graham — The Intelligent Investor (1949; rev. Jason Zweig)", "Benjamin Graham The Intelligent Investor book")
  ],
  bonds:[
    link("U.S. SEC — Investor.gov: Bonds", "https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products"),
    cite("Jeremy J. Siegel — Stocks for the Long Run (McGraw-Hill)", "Jeremy Siegel Stocks for the Long Run book")
  ],
  funds:[
    link("S&P Dow Jones Indices — SPIVA: active vs. index performance", "https://www.spglobal.com/spdji/en/research-insights/spiva/"),
    cite("John C. Bogle — The Little Book of Common Sense Investing (Wiley, 2007)", "John Bogle The Little Book of Common Sense Investing"),
    link("Warren E. Buffett — Berkshire Hathaway Shareholder Letters (the $1M index-fund bet)", "https://www.berkshirehathaway.com/letters/letters.html")
  ],
  alternatives:[
    link("U.S. SEC — Investor.gov: Real Estate Investment Trusts (REITs)", "https://www.investor.gov/introduction-investing/investing-basics/investment-products/real-estate-investment-trusts-reits"),
    link("U.S. SEC — Crypto asset investor education", "https://www.investor.gov/introduction-investing/investing-basics/glossary/crypto-assets"),
    cite("Burton G. Malkiel — A Random Walk Down Wall Street (on gold & alternatives)", "Burton Malkiel A Random Walk Down Wall Street")
  ],
  risk:[
    link("FINRA — Understanding investment risk", "https://www.finra.org/investors/investing/investing-basics/risk"),
    cite("Howard Marks — The Most Important Thing (Columbia Business School Publishing, 2011)", "Howard Marks The Most Important Thing book"),
    cite("Nassim Nicholas Taleb — Fooled by Randomness (2001)", "Nassim Taleb Fooled by Randomness book")
  ],
  allocation:[
    link("U.S. SEC — Investor.gov: Asset allocation & diversification", "https://www.investor.gov/introduction-investing/getting-started/asset-allocation"),
    link("Brinson, Hood & Beebower — 'Determinants of Portfolio Performance,' Financial Analysts Journal (1986)", "https://www.tandfonline.com/doi/abs/10.2469/faj.v42.n4.39"),
    cite("Taylor Larimore et al. — The Bogleheads' Guide to Investing (Wiley)", "Bogleheads Guide to Investing book")
  ],
  accounts:[
    link("U.S. SEC — Investor.gov: Mutual fund fee analyzer", "https://www.investor.gov/financial-tools-calculators/calculators/mutual-fund-analyzer"),
    cite("John C. Bogle — Common Sense on Mutual Funds (Wiley)", "John Bogle Common Sense on Mutual Funds book")
  ],
  strategies:[
    link("U.S. SEC — Investor.gov: Dollar-cost averaging", "https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging"),
    link("Eugene F. Fama — 'Efficient Capital Markets,' Journal of Finance (1970)", "https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.1970.tb00518.x"),
    cite("Burton G. Malkiel — A Random Walk Down Wall Street (W. W. Norton)", "Burton Malkiel A Random Walk Down Wall Street")
  ],
  fundamentals:[
    link("U.S. SEC — How to read a 10-K (annual report)", "https://www.sec.gov/oiea/investor-alerts-and-bulletins/how-read-10-k"),
    cite("Benjamin Graham & David Dodd — Security Analysis (McGraw-Hill, 1934)", "Graham Dodd Security Analysis book"),
    cite("Benjamin Graham — The Intelligent Investor (1949)", "Benjamin Graham The Intelligent Investor book")
  ],
  analyze:[
    link("Warren E. Buffett — 'The Superinvestors of Graham-and-Doddsville' (1984, Columbia)", "https://www8.gsb.columbia.edu/sites/valueinvesting/files/files/Buffett1984.pdf"),
    cite("Peter Lynch — One Up on Wall Street (Simon & Schuster, 1989)", "Peter Lynch One Up on Wall Street"),
    link("U.S. SEC — EDGAR: research real company filings", "https://www.sec.gov/edgar/search/")
  ],
  technical:[
    link("Barber & Odean — 'Trading Is Hazardous to Your Wealth,' Journal of Finance (2000)", "https://onlinelibrary.wiley.com/doi/abs/10.1111/0022-1082.00226"),
    cite("Burton G. Malkiel — A Random Walk Down Wall Street (on charting)", "Burton Malkiel A Random Walk Down Wall Street"),
    link("FINRA — The risks of trying to time the market", "https://www.finra.org/investors/insights/timing-market")
  ],
  crashes:[
    cite("John Kenneth Galbraith — The Great Crash, 1929 (1955)", "John Kenneth Galbraith The Great Crash 1929 book"),
    cite("Michael Lewis — The Big Short (W. W. Norton, 2010)", "Michael Lewis The Big Short book"),
    cite("Robert J. Shiller — Irrational Exuberance (Princeton, 2000)", "Robert Shiller Irrational Exuberance book"),
    link("Federal Reserve History — The Great Depression", "https://www.federalreservehistory.org/essays/great-depression")
  ],
  global:[
    cite("Adam Fergusson — When Money Dies (1975; Weimar hyperinflation)", "Adam Fergusson When Money Dies book"),
    cite("Carmen M. Reinhart & Kenneth S. Rogoff — This Time Is Different (Princeton, 2009)", "Reinhart Rogoff This Time Is Different book"),
    link("IMF — Finance & Development: currency-crisis explainers", "https://www.imf.org/en/Publications/fandd")
  ],
  macro:[
    link("U.S. Federal Reserve — What the Federal Reserve does", "https://www.federalreserve.gov/aboutthefed.htm"),
    cite("Carmen M. Reinhart & Kenneth S. Rogoff — This Time Is Different (2009)", "Reinhart Rogoff This Time Is Different"),
    link("Federal Reserve History — The Asian Financial Crisis (1997)", "https://www.federalreservehistory.org/essays/asian-financial-crisis")
  ],
  psychology:[
    cite("Daniel Kahneman — Thinking, Fast and Slow (FSG, 2011)", "Daniel Kahneman Thinking Fast and Slow book"),
    cite("Morgan Housel — The Psychology of Money (Harriman House, 2020)", "Morgan Housel The Psychology of Money book"),
    cite("Charles Mackay — Extraordinary Popular Delusions & the Madness of Crowds (1841)", "Charles Mackay Extraordinary Popular Delusions and the Madness of Crowds")
  ],
  mistakes:[
    link("U.S. SEC — Investor.gov: Protect your investments from fraud", "https://www.investor.gov/protect-your-investments"),
    link("FINRA — Avoiding investment scams", "https://www.finra.org/investors/protect-your-money"),
    cite("Morgan Housel — The Psychology of Money (Harriman House, 2020)", "Morgan Housel The Psychology of Money")
  ],
  plan:[
    link("U.S. SEC — Investor.gov: Getting started & financial planning", "https://www.investor.gov/introduction-investing/getting-started"),
    cite("John C. Bogle — The Little Book of Common Sense Investing (Wiley, 2007)", "John Bogle Little Book of Common Sense Investing"),
    cite("Taylor Larimore et al. — The Bogleheads' Guide to Investing (Wiley)", "Bogleheads Guide to Investing book")
  ]
};

/* ============================================================
   REFERENCES — the full bibliography behind this course, with
   named authors and published works, grouped by category.
   ============================================================ */
const REFERENCES = [
  { cat:"Foundational books on investing", items:[
    { who:"Benjamin Graham", title:"The Intelligent Investor", year:1949, where:"Harper (rev. ed. w/ Jason Zweig)", url:gbooks("The Intelligent Investor Benjamin Graham") },
    { who:"Burton G. Malkiel", title:"A Random Walk Down Wall Street", year:1973, where:"W. W. Norton", url:gbooks("A Random Walk Down Wall Street Burton Malkiel") },
    { who:"John C. Bogle", title:"The Little Book of Common Sense Investing", year:2007, where:"Wiley", url:gbooks("The Little Book of Common Sense Investing John Bogle") },
    { who:"John C. Bogle", title:"Common Sense on Mutual Funds", year:1999, where:"Wiley", url:gbooks("Common Sense on Mutual Funds John Bogle") },
    { who:"Jeremy J. Siegel", title:"Stocks for the Long Run", year:1994, where:"McGraw-Hill", url:gbooks("Stocks for the Long Run Jeremy Siegel") },
    { who:"Peter Lynch", title:"One Up on Wall Street", year:1989, where:"Simon & Schuster", url:gbooks("One Up on Wall Street Peter Lynch") },
    { who:"Benjamin Graham & David Dodd", title:"Security Analysis", year:1934, where:"McGraw-Hill", url:gbooks("Security Analysis Graham Dodd") },
    { who:"Taylor Larimore, Mel Lindauer & Michael LeBoeuf", title:"The Bogleheads' Guide to Investing", year:2006, where:"Wiley", url:gbooks("The Bogleheads Guide to Investing Larimore") },
    { who:"Ramit Sethi", title:"I Will Teach You to Be Rich", year:2009, where:"Workman", url:gbooks("I Will Teach You to Be Rich Ramit Sethi") }
  ]},
  { cat:"Risk, behavior & psychology", items:[
    { who:"Daniel Kahneman", title:"Thinking, Fast and Slow", year:2011, where:"Farrar, Straus and Giroux", url:gbooks("Thinking Fast and Slow Daniel Kahneman") },
    { who:"Morgan Housel", title:"The Psychology of Money", year:2020, where:"Harriman House", url:gbooks("The Psychology of Money Morgan Housel") },
    { who:"Howard Marks", title:"The Most Important Thing", year:2011, where:"Columbia University Press", url:gbooks("The Most Important Thing Howard Marks") },
    { who:"Nassim Nicholas Taleb", title:"Fooled by Randomness", year:2001, where:"Random House", url:gbooks("Fooled by Randomness Nassim Taleb") },
    { who:"Charles Mackay", title:"Extraordinary Popular Delusions and the Madness of Crowds", year:1841, where:"public domain — full text", url:"https://www.gutenberg.org/ebooks/search/?query=Extraordinary+Popular+Delusions" }
  ]},
  { cat:"Market history & financial crises", items:[
    { who:"John Kenneth Galbraith", title:"The Great Crash, 1929", year:1955, where:"Houghton Mifflin", url:gbooks("The Great Crash 1929 Galbraith") },
    { who:"Robert J. Shiller", title:"Irrational Exuberance", year:2000, where:"Princeton University Press", url:gbooks("Irrational Exuberance Robert Shiller") },
    { who:"Roger Lowenstein", title:"When Genius Failed (the LTCM collapse)", year:2000, where:"Random House", url:gbooks("When Genius Failed Roger Lowenstein") },
    { who:"Michael Lewis", title:"The Big Short (the 2008 crisis)", year:2010, where:"W. W. Norton", url:gbooks("The Big Short Michael Lewis") },
    { who:"Bethany McLean & Peter Elkind", title:"The Smartest Guys in the Room (Enron)", year:2003, where:"Portfolio / Penguin", url:gbooks("The Smartest Guys in the Room McLean Elkind") },
    { who:"Adam Fergusson", title:"When Money Dies (Weimar hyperinflation)", year:1975, where:"William Kimber", url:gbooks("When Money Dies Adam Fergusson") },
    { who:"Carmen M. Reinhart & Kenneth S. Rogoff", title:"This Time Is Different: Eight Centuries of Financial Folly", year:2009, where:"Princeton University Press", url:gbooks("This Time Is Different Reinhart Rogoff") },
    { who:"Charles P. Kindleberger", title:"Manias, Panics, and Crashes", year:1978, where:"Basic Books", url:gbooks("Manias Panics and Crashes Kindleberger") }
  ]},
  { cat:"Academic papers & studies", items:[
    { who:"Eugene F. Fama", title:"Efficient Capital Markets: A Review of Theory and Empirical Work", year:1970, where:"The Journal of Finance", url:"https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.1970.tb00518.x" },
    { who:"Brad M. Barber & Terrance Odean", title:"Trading Is Hazardous to Your Wealth", year:2000, where:"The Journal of Finance", url:"https://onlinelibrary.wiley.com/doi/abs/10.1111/0022-1082.00226" },
    { who:"Gary P. Brinson, L. Randolph Hood & Gilbert L. Beebower", title:"Determinants of Portfolio Performance", year:1986, where:"Financial Analysts Journal", url:"https://www.tandfonline.com/doi/abs/10.2469/faj.v42.n4.39" },
    { who:"Warren E. Buffett", title:"The Superinvestors of Graham-and-Doddsville", year:1984, where:"Hermes (Columbia Business School)", url:"https://www8.gsb.columbia.edu/sites/valueinvesting/files/files/Buffett1984.pdf" },
    { who:"S&P Dow Jones Indices", title:"SPIVA Scorecards (active vs. index funds)", year:0, where:"published periodically", url:"https://www.spglobal.com/spdji/en/research-insights/spiva/" },
    { who:"Warren E. Buffett", title:"Berkshire Hathaway Annual Shareholder Letters", year:0, where:"berkshirehathaway.com", url:"https://www.berkshirehathaway.com/letters/letters.html" }
  ]},
  { cat:"Trusted institutions & regulators", items:[
    { who:"U.S. Securities and Exchange Commission", title:"Investor.gov — investor education", year:0, where:"investor.gov", url:"https://www.investor.gov/" },
    { who:"FINRA", title:"Investor education & alerts", year:0, where:"finra.org", url:"https://www.finra.org/investors" },
    { who:"U.S. Federal Reserve", title:"About the Fed; Federal Reserve History essays", year:0, where:"federalreserve.gov", url:"https://www.federalreservehistory.org/" },
    { who:"U.S. Consumer Financial Protection Bureau", title:"Saving & emergency-fund guidance", year:0, where:"consumerfinance.gov", url:"https://www.consumerfinance.gov/start-small-save-up/" },
    { who:"International Monetary Fund", title:"Finance & Development (currency & crisis explainers)", year:0, where:"imf.org", url:"https://www.imf.org/en/Publications/fandd" },
    { who:"Bogleheads community", title:"Bogleheads wiki (index-investing reference)", year:0, where:"bogleheads.org", url:"https://www.bogleheads.org/wiki/Main_Page" }
  ]}
];

/* ============================================================
   CASE_SOURCES — primary/authoritative sources for the factual
   claims in each lesson's case study (verified June 2026).
   ============================================================ */
const CASE_SOURCES = {
  why:[
    link("Berkshire Hathaway — Warren Buffett's shareholder letters", "https://www.berkshirehathaway.com/letters/letters.html"),
    link("Morgan Housel — The Psychology of Money (the 'wealth built late' point)", "https://www.google.com/search?tbm=bks&q=The%20Psychology%20of%20Money%20Morgan%20Housel")
  ],
  foundation:[
    link("U.S. CFPB — Building an emergency fund (why a cash buffer matters)", "https://www.consumerfinance.gov/start-small-save-up/")
  ],
  markets:[
    link("U.S. SEC — Staff Report on Equity & Options Market Structure, Early 2021 (GameStop) [PDF]", "https://www.sec.gov/files/staff-report-equity-options-market-struction-conditions-early-2021.pdf"),
    link("U.S. SEC — Press release on the meme-stock report (Oct 2021)", "https://www.sec.gov/newsroom/press-releases/2021-212")
  ],
  stocks:[
    link("U.S. SEC — Charges against Enron CEO Kenneth Lay (fraud)", "https://www.sec.gov/news/press/2004-94.htm"),
    link("U.S. SEC — Charges against Enron's Jeffrey Skilling (fraud)", "https://www.sec.gov/news/press/2004-18.htm")
  ],
  bonds:[
    link("U.S. Federal Reserve — Review of its Supervision & Regulation of Silicon Valley Bank (Barr report, Apr 2023)", "https://www.federalreserve.gov/publications/review-of-the-federal-reserves-supervision-and-regulation-of-silicon-valley-bank.htm"),
    link("Federal Reserve — full SVB review [PDF]", "https://www.federalreserve.gov/publications/files/svb-review-20230428.pdf")
  ],
  funds:[
    link("Berkshire Hathaway — 2017 shareholder letter (the $1M index-fund bet results)", "https://www.berkshirehathaway.com/letters/2017ltr.pdf"),
    link("Fortune — Buffett wins his $1M bet vs. hedge funds (2017)", "https://fortune.com/2017/12/30/warren-buffett-million-dollar-bet/")
  ],
  alternatives:[
    link("U.S. Dept. of Justice — Charges against FTX founder Samuel Bankman-Fried", "https://www.justice.gov/usao-sdny/pr/united-states-attorney-announces-charges-against-ftx-founder-samuel-bankman-fried"),
    link("U.S. DOJ — Bankman-Fried sentenced to 25 years for fraud", "https://www.justice.gov/archives/opa/pr/samuel-bankman-fried-sentenced-25-years-his-orchestration-multiple-fraudulent-schemes")
  ],
  risk:[
    link("Federal Reserve History — Near Failure of Long-Term Capital Management (1998)", "https://www.federalreservehistory.org/essays/ltcm-near-failure"),
    link("U.S. Federal Reserve — Greenspan testimony on the LTCM rescue (Oct 1998)", "https://www.federalreserve.gov/boarddocs/testimony/1998/19981001.htm")
  ],
  allocation:[
    link("Goldman Sachs — The 2000 dot-com bubble (firm history)", "https://www.goldmansachs.com/our-firm/history/moments/2000-dot-com-bubble"),
    link("Brinson, Hood & Beebower — 'Determinants of Portfolio Performance,' Financial Analysts Journal (1986)", "https://www.tandfonline.com/doi/abs/10.2469/faj.v42.n4.39")
  ],
  accounts:[
    link("U.S. SEC — Mutual fund fee analyzer (how fees compound)", "https://www.investor.gov/financial-tools-calculators/calculators/mutual-fund-analyzer")
  ],
  strategies:[
    link("Hartford Funds — 'Timing the Market Is Impossible' (cost of missing the best days) [PDF]", "https://www.hartfordfunds.com/dam/en/docs/pub/whitepapers/CCWP073.pdf")
  ],
  fundamentals:[
    link("Harding Loevner — NVIDIA and the Cautionary Tale of Cisco Systems (2000 peak P/E)", "https://www.hardingloevner.com/insights/nvidia-and-the-cautionary-tale-of-cisco-systems/"),
    link("Benjamin Graham — The Intelligent Investor (valuation discipline)", "https://www.google.com/search?tbm=bks&q=The%20Intelligent%20Investor%20Benjamin%20Graham")
  ],
  analyze:[
    link("NPR — Sears files for Chapter 11 bankruptcy (Oct 15, 2018)", "https://www.npr.org/2018/10/15/657395298/sears-drowning-in-red-ink-finally-files-for-chapter-11-bankruptcy"),
    link("CNBC — Sears files for bankruptcy", "https://www.cnbc.com/2018/10/15/sears-files-for-bankruptcy.html")
  ],
  technical:[
    link("U.S. SEC & CFTC — Findings Regarding the Market Events of May 6, 2010 (Flash Crash) [PDF]", "https://www.sec.gov/news/studies/2010/marketevents-report.pdf")
  ],
  crashes:[
    link("Financial Crisis Inquiry Commission — Final Report (2011): leverage up to 40:1 [PDF]", "https://www.govinfo.gov/content/pkg/GPO-FCIC/pdf/GPO-FCIC.pdf"),
    link("Federal Reserve History — The Great Depression", "https://www.federalreservehistory.org/essays/great-depression")
  ],
  global:[
    link("Steve H. Hanke & Alex Kwok — 'On the Measurement of Zimbabwe's Hyperinflation,' Cato Journal (2009) [PDF]", "https://www.cato.org/sites/cato.org/files/serials/files/cato-journal/2009/5/cj29n2-8.pdf"),
    link("Smithsonian — Zimbabwe 100-trillion-dollar note (2008)", "https://www.si.edu/object/100000000000000-dollars-zimbabwe-2008:nmah_1694052")
  ],
  macro:[
    link("Federal Reserve History — The Asian Financial Crisis (1997)", "https://www.federalreservehistory.org/essays/asian-financial-crisis"),
    link("IMF — Finance & Development (currency crises)", "https://www.imf.org/en/Publications/fandd")
  ],
  psychology:[
    link("Andrew Odlyzko — 'Newton's financial misadventures in the South Sea Bubble,' Notes & Records of the Royal Society (2019)", "https://royalsocietypublishing.org/doi/10.1098/rsnr.2018.0018"),
    link("Daniel Kahneman — Thinking, Fast and Slow (behavioral biases)", "https://www.google.com/search?tbm=bks&q=Thinking%20Fast%20and%20Slow%20Kahneman")
  ],
  mistakes:[
    link("U.S. SEC — Charges Bernard Madoff for a multi-billion-dollar Ponzi scheme (Dec 2008)", "https://www.sec.gov/news/press/2008/2008-293.htm"),
    link("U.S. SEC OIG — Investigation of the failure to uncover Madoff's scheme [PDF]", "https://www.sec.gov/news/studies/2009/oig-509.pdf")
  ],
  plan:[
    link("CNBC — Janitor secretly amassed an $8 million fortune (Ronald Read)", "https://www.cnbc.com/2016/08/29/janitor-secretly-amassed-an-8-million-fortune.html"),
    link("NBC News — Vermont ex-janitor bequeaths secret millions", "https://www.nbcnews.com/news/us-news/vermont-ex-janitor-bequeaths-secret-millions-library-hospital-n301396")
  ]
};

/* Source for the Time Machine historical-returns dataset */
const HIST_SOURCE = link("Aswath Damodaran (NYU Stern) — Historical Returns on Stocks, Bonds & Bills, 1928–present", "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html");

/* ============================================================
   SIMPLE — one-sentence "in a nutshell" summary per lesson.
   ============================================================ */
const SIMPLE = {
  why:"Investing grows your money faster than saving thanks to compounding — and starting early matters most.",
  foundation:"Before investing, build a 3–6 month emergency fund and clear high-interest debt.",
  markets:"Stock prices move on supply and demand; over the long run, markets trend upward.",
  stocks:"A stock is part-ownership of a company — you earn from price growth and dividends.",
  bonds:"A bond is a loan that pays you interest — safer and steadier than stocks.",
  funds:"Index funds and ETFs give instant diversification at very low cost — ideal for beginners.",
  alternatives:"Real estate (REITs), commodities, cash, and crypto each play small, specific roles.",
  risk:"Higher returns require accepting bigger swings — match risk to your timeline and temperament.",
  allocation:"How you split stocks, bonds, and cash drives most of your results, so diversify widely.",
  accounts:"Use tax-advantaged accounts, grab any employer match, and keep fees low.",
  strategies:"Buy and hold, invest a fixed amount regularly, and stay patient and passive.",
  fundamentals:"Judge a company by its earnings, growth, and value (like the P/E ratio) — always in context.",
  analyze:"To read a stock, understand the business first, then its numbers and its story.",
  technical:"Charts show price trends, but for long-term investors they're only a minor tool.",
  crashes:"Bubbles and crashes come from leverage and panic — but diversified markets have always recovered.",
  global:"Currencies collapse from over-printing and lost trust, and crises can spread between countries.",
  macro:"Interest rates and central banks move everything, and economies are deeply interconnected.",
  psychology:"Your own emotions are the biggest risk — discipline and a plan beat fear and FOMO.",
  mistakes:"Avoid market-timing, hype, panic-selling, high fees, and investing money you'll need soon.",
  plan:"A simple written plan, followed consistently for years, is what builds real wealth."
};

/* ---- Sector map for portfolio check-up ---- */
const SECTORS = {
  AAPL:"Technology", MSFT:"Technology", NVDA:"Technology", AMD:"Technology",
  GOOGL:"Communication", META:"Communication", NFLX:"Communication", DIS:"Communication",
  AMZN:"Consumer", TSLA:"Consumer", COST:"Consumer", WMT:"Consumer",
  KO:"Consumer Staples", JNJ:"Healthcare", JPM:"Financials", V:"Financials", BRKB:"Financials",
  XOM:"Energy", SPY:"Broad Index", QQQ:"Broad Index", VOO:"Broad Index", DIA:"Broad Index",
  BND:"Bonds", AGG:"Bonds"
};

/* ---- Approx S&P 500 total returns (%) by year for the backtester ---- */
const HIST_RETURNS = [
  [1995,37.6],[1996,23.0],[1997,33.4],[1998,28.6],[1999,21.0],
  [2000,-9.1],[2001,-11.9],[2002,-22.1],[2003,28.7],[2004,10.9],
  [2005,4.9],[2006,15.8],[2007,5.5],[2008,-37.0],[2009,26.5],
  [2010,15.1],[2011,2.1],[2012,16.0],[2013,32.4],[2014,13.7],
  [2015,1.4],[2016,12.0],[2017,21.8],[2018,-4.4],[2019,31.5],
  [2020,18.4],[2021,28.7],[2022,-18.1],[2023,26.3]
];
const HIST_EVENTS = { 2000:"Dot-com bubble bursts", 2008:"Global Financial Crisis", 2020:"COVID crash & rebound", 2022:"Rate-hike selloff" };
