import type { EducationCategory, EducationCategoryOption, EducationLesson } from "@/types/education";

export const EDUCATION_CATEGORIES: EducationCategoryOption[] = [
  { value: "all", label: "All Topics" },
  { value: "fundamentals", label: "Fundamentals" },
  { value: "islamic-finance", label: "Islamic Finance" },
  { value: "products", label: "Products" },
  { value: "strategy", label: "Strategy" },
  { value: "analysis", label: "Analysis" },
];

export const EDUCATION_LESSONS: EducationLesson[] = [
  {
    slug: "beginner-investing",
    title: "Beginner Investing",
    description:
      "Learn the core concepts every new investor needs — markets, accounts, orders, and building your first halal portfolio.",
    category: "fundamentals",
    readingTimeMinutes: 8,
    featured: false,
    content: `## What Is Investing?

Investing means putting your money to work in assets that may grow in value over time — such as stocks, ETFs, or sukuk — rather than leaving cash idle in a bank account.

Unlike saving, investing carries **risk**. Prices can fall as well as rise. The goal is to earn returns that outpace inflation while staying within your risk tolerance and Shariah boundaries.

## Opening a Brokerage Account

To buy stocks or ETFs you need a **brokerage account**. Look for:

- **Commission-free trading** on US equities
- **Shariah screening tools** or integration with halal stock lists
- **Fractional shares** if you are starting with a smaller amount
- **Clear fee disclosure** — avoid hidden charges

Most beginners start with a taxable brokerage account. Retirement accounts (401k, IRA) have tax advantages but may offer limited halal fund choices.

## How Orders Work

- **Market order** — buys or sells immediately at the current price
- **Limit order** — only executes at your chosen price or better
- **Stop-loss** — triggers a sale if price falls to a set level (use carefully)

For long-term halal investing, limit orders on quality companies you have researched are often preferable to chasing price spikes.

## Your First Steps

1. Define a **goal** (education fund, home, retirement)
2. Build an **emergency fund** (3–6 months of expenses) before investing heavily
3. Learn **Shariah screening basics** before picking individual stocks
4. Start **small**, diversify, and invest consistently over time

> **HalalVest tip:** Use our Stock Checker and Screener to verify compliance before your first purchase.`,
  },
  {
    slug: "what-is-halal-investing",
    title: "What is Halal Investing?",
    description:
      "Understand Shariah-compliant investing principles, permissible assets, and how halal portfolios differ from conventional finance.",
    category: "islamic-finance",
    readingTimeMinutes: 10,
    featured: true,
    content: `## Defining Halal Investing

**Halal investing** is the practice of growing wealth through financial activities that comply with Islamic law (Shariah). It seeks profit through **real economic activity** while avoiding prohibited (haram) elements.

The three pillars most relevant to equity investors are:

1. **Avoiding riba** (interest)
2. **Avoiding gharar** (excessive uncertainty or deception)
3. **Avoiding haram industries** (alcohol, gambling, conventional banking, etc.)

## Permissible Asset Classes

Common Shariah-compliant options include:

- **Halal-screened stocks** — companies passing business activity and financial ratio tests
- **Shariah-compliant ETFs** — diversified baskets pre-screened by scholars
- **Sukuk** — Islamic bonds structured on asset-backed profit sharing, not interest
- **Real estate & commodities** — when structured without riba or prohibited leverage

## How Screening Works

Institutions like **AAOIFI** publish standards used by halal index providers. Typical equity screens check:

| Screen | What It Checks |
|--------|----------------|
| Business activity | Revenue from haram sectors below thresholds (often 5%) |
| Debt ratio | Interest-bearing debt vs. market cap (often max 33%) |
| Impure income | Non-compliant revenue vs. total revenue (often max 5%) |

A company may be **halal**, **questionable** (needs purification), or **non-compliant** depending on these metrics.

## Purification (Tazkiyah)

If you hold shares in a company with a small amount of impure income, scholars often require donating that portion of dividends to charity. HalalVest highlights purification estimates in our compliance reports.

## Halal vs. ESG

ESG investing focuses on environmental and social factors. **Halal screening is religious compliance** — a stock can be ESG-friendly but still fail Shariah tests due to debt or revenue mix.

> **Remember:** Halal investing is not about avoiding profit — it is about earning profit through ethical, permissible means.`,
  },
  {
    slug: "understanding-riba",
    title: "Understanding Riba (Interest)",
    description:
      "Explore why interest is prohibited in Islam, how riba appears in modern finance, and practical ways to avoid it as an investor.",
    category: "islamic-finance",
    readingTimeMinutes: 9,
    featured: false,
    content: `## What Is Riba?

**Riba** literally means increase, excess, or growth. In Islamic finance it refers to **unjust enrichment through predetermined returns on money**, most commonly **interest on loans**.

The Qur'an prohibits riba because it can exploit borrowers and disconnect wealth from productive economic activity.

## Riba in Modern Finance

Riba appears in many forms investors encounter daily:

- **Bank savings interest** — returns tied to lending your deposit
- **Conventional bonds** — fixed coupon payments from interest
- **Margin loans** — borrowing to buy securities with interest charges
- **Interest-bearing corporate debt** — held by companies you may invest in

## Why It Matters for Stock Investors

Even if you never take a loan, you can indirectly benefit from riba through:

1. **Dividends** sourced partly from interest income at the company level
2. **Companies** whose primary business is conventional lending
3. **ETFs** holding bonds or highly leveraged firms

Shariah screening filters address these exposures through business activity and financial ratio tests.

## Avoiding Riba Practically

- Choose **Shariah-compliant brokers** and cash sweep options where available
- Prefer **halal ETFs or screened stocks** over broad market index funds
- Avoid **margin trading** and leveraged products
- Purify impure income from otherwise acceptable holdings

## Riba vs. Profit (Ribh)

Islam permits **trade and profit sharing** where both parties share risk. Buying a stock at $100 and selling at $120 reflects **price appreciation from business value** — not riba — when the underlying business is halal.

> **Key distinction:** Riba is a guaranteed return on money alone; halal investment returns come from shared business risk and real assets.`,
  },
  {
    slug: "stocks-vs-etfs",
    title: "Stocks vs ETFs",
    description:
      "Compare individual stocks and exchange-traded funds for halal investors — costs, diversification, and screening trade-offs.",
    category: "products",
    readingTimeMinutes: 7,
    featured: false,
    content: `## Individual Stocks

Buying a **stock** means owning a share of one company. You participate directly in its growth and risks.

**Pros:**
- Full control over each holding
- No ongoing fund management fee
- Ability to exclude specific companies

**Cons:**
- Concentrated risk if you own few names
- Requires ongoing Shariah and financial research per company
- More time-intensive to maintain

## Exchange-Traded Funds (ETFs)

An **ETF** is a basket of securities traded like a single stock. Halal ETFs apply Shariah screens at the fund level.

**Pros:**
- Instant diversification across dozens or hundreds of stocks
- Professional screening and rebalancing
- Lower effort for beginners

**Cons:**
- Expense ratio (annual fee, often 0.25%–0.50% for halal funds)
- Less control — you inherit all fund holdings
- Some halal ETFs have geographic or sector concentration

## Which Should You Choose?

| Profile | Recommendation |
|---------|----------------|
| Beginner, limited time | Start with a halal ETF + 2–3 researched stocks |
| Active learner | Core ETF + satellite individual picks |
| Experienced, high conviction | Individual portfolio with strict screening |

## Screening Differences

For **individual stocks**, use HalalVest's checker for AAOIFI-style analysis. For **ETFs**, verify the fund's Shariah board, methodology, and holdings list — not all "ethical" ETFs are halal.

## Cost Comparison Example

Investing $10,000:
- **10 stocks** at $0 commission = $0 trading cost, but spread across research time
- **1 halal ETF** at 0.49% expense ratio = ~$49/year in fees, broad exposure immediately

> **HalalVest tip:** Many investors use a "core-satellite" approach — halal ETF as the core, individual halal stocks for themes they understand deeply.`,
  },
  {
    slug: "risk-management",
    title: "Risk Management",
    description:
      "Learn how to measure, control, and live with investment risk while staying aligned with Islamic principles.",
    category: "strategy",
    readingTimeMinutes: 8,
    featured: false,
    content: `## What Is Investment Risk?

**Risk** is the possibility that your investment returns differ from expectations — including losing principal. All investing involves risk; halal investing does not eliminate it.

Common risk types:

- **Market risk** — broad downturns affecting most stocks
- **Company risk** — one firm underperforming or failing
- **Sector risk** — entire industries declining (e.g., tech corrections)
- **Currency risk** — foreign holdings affected by exchange rates
- **Liquidity risk** — difficulty selling quickly at fair prices

## Risk Tolerance vs. Risk Capacity

- **Tolerance** — how much volatility you can handle emotionally
- **Capacity** — how much loss your financial situation can absorb

A young professional may tolerate more volatility than someone nearing retirement. Both should avoid **excessive leverage**, which is generally incompatible with Shariah anyway.

## Practical Risk Controls

1. **Position sizing** — limit any single stock to a % of portfolio (e.g., 5–10%)
2. **Diversification** — spread across sectors and geographies
3. **Time horizon** — longer horizons smooth short-term volatility
4. **Regular review** — re-check Shariah status when company fundamentals change
5. **Avoid speculation** — gharar-heavy products (penny stocks, complex derivatives)

## The Role of Cash

Keeping some cash is not failure — it is **dry powder** for opportunities and a buffer during downturns. Islamic accounts may use non-interest cash management; plan accordingly.

## Measuring Risk

Simple metrics investors use:

- **Beta** — sensitivity to market moves (available on most research sites)
- **Maximum drawdown** — largest peak-to-trough decline
- **Volatility** — how much prices swing over time

> **Islamic perspective:** Excessive speculation (maysir/qimar) differs from calculated business risk. Halal investing embraces prudent risk-taking in real assets, not gambling on uncertainty.`,
  },
  {
    slug: "portfolio-diversification",
    title: "Portfolio Diversification",
    description:
      "Build a balanced halal portfolio across sectors, regions, and asset types to reduce concentration risk.",
    category: "strategy",
    readingTimeMinutes: 7,
    featured: false,
    content: `## Why Diversify?

**Diversification** reduces the impact of any single investment failing. If one stock drops 40%, a diversified portfolio may fall much less because other holdings perform differently.

The Prophet ﷺ encouraged trade and spreading risk across transactions — modern portfolio theory aligns with not putting all resources in one venture.

## Dimensions of Diversification

### By Sector
Spread across technology, healthcare, consumer goods, industrials, and other **halal-permissible** sectors. Avoid overloading one trendy sector.

### By Geography
US markets dominate many halal ETFs, but consider:
- Developed markets (Europe, parts of Asia)
- Select emerging markets with halal index options

Verify each market's screening standards — they may differ from AAOIFI.

### By Company Size
Blend **large-cap** stability with selective **mid-cap** growth. Small caps carry higher volatility.

### By Asset Type
Within Shariah bounds, combine:
- Halal equities
- Sukuk or sukuk funds
- Real estate (direct or REITs if Shariah-compliant)

## Sample Allocation Frameworks

**Conservative (capital preservation focus):**
- 50% halal large-cap ETF
- 20% sukuk / short-term Islamic fixed income
- 20% dividend-focused halal stocks
- 10% cash

**Moderate (balanced growth):**
- 60% diversified halal equity ETF
- 25% individual halal stocks
- 10% sukuk
- 5% cash

**Growth (long horizon):**
- 70% equities (ETF + individual)
- 20% thematic halal growth stocks
- 10% cash

Adjust based on your goals — these are educational examples, not personal advice.

## Rebalancing

Over time, winners grow and shift your allocation. **Rebalancing** (trimming winners, adding to underweights) maintains your target risk. Review quarterly or when any position drifts more than 5% from target.

> **HalalVest tip:** Use the portfolio simulator on your dashboard to practice allocation before committing real capital.`,
  },
  {
    slug: "zakat-on-investments",
    title: "Zakat on Investments",
    description:
      "A practical guide to calculating zakat on stocks, ETFs, and investment accounts according to common scholarly approaches.",
    category: "islamic-finance",
    readingTimeMinutes: 9,
    featured: false,
    content: `## Zakat Basics

**Zakat** is an obligatory charity (typically **2.5%**) on qualifying wealth held for one **lunar year** (hawl) above the **nisab** threshold. Investment holdings may be zakatable depending on your scholar's view.

Always consult a qualified scholar for your specific situation — this lesson outlines common frameworks.

## Approaches to Stock Zakat

### 1. Full Market Value Method
Treat halal stocks like trade goods (**amwal al-tijarah**). Pay **2.5% on total market value** at zakat date if held for a year and above nisab.

**Example:** Portfolio worth $20,000 → zakat = $500

### 2. Underlying Assets Method
For companies, zakat applies only to the **zakatable assets** portion of each share (cash, receivables, inventory) — not goodwill or fixed assets. This requires company balance sheet data and is more complex.

Many scholars simplify with the **full market value** method for individual investors.

## ETFs and Mutual Funds

Apply the same method as underlying intent:
- If the fund holds tradeable equities, **market value** zakat is common
- Some funds publish zakatable asset ratios — use if available

## Sukuk and Cash

- **Cash** in brokerage accounts counts toward zakat at full value
- **Sukuk** treatment varies — some scholars zakatable on face value, others on profit component only

## Dividends Received

Dividends spent before zakat date are not double-counted. Dividends still held in cash on zakat date are included in your cash calculation.

## Step-by-Step Checklist

1. Determine your **zakat date** (often Ramadan)
2. List all **halal investments** at current market prices
3. Add **cash** in investment accounts
4. Subtract **short-term debts** due within the year (per your madhab)
5. If total ≥ nisab for one lunar year, pay **2.5%**

## Using HalalVest

Our Zakat calculator (coming enhancements) helps track investment values. Export portfolio holdings from your dashboard for accurate totals.

> **Important:** Purification of impure income is separate from zakat. Both may apply to the same portfolio.`,
  },
  {
    slug: "reading-financial-statements",
    title: "Reading Financial Statements",
    description:
      "Decode income statements, balance sheets, and cash flow reports to evaluate companies for halal and financial quality.",
    category: "analysis",
    readingTimeMinutes: 11,
    featured: false,
    content: `## The Three Core Statements

Public companies publish quarterly and annual reports. Three statements form the foundation of fundamental analysis:

1. **Income Statement** — revenue, expenses, and profit over a period
2. **Balance Sheet** — assets, liabilities, and equity at a point in time
3. **Cash Flow Statement** — actual cash moving in and out

Halal investors use these to assess both **business quality** and **Shariah compliance inputs** (debt levels, interest income).

## Income Statement Highlights

Key lines:
- **Revenue** — total sales
- **Gross profit** — revenue minus cost of goods sold
- **Operating income** — profit from core business
- **Net income** — bottom-line profit after all expenses

**Watch for:** "Other income" lines that may include **interest income** — relevant for impure income screening.

## Balance Sheet Highlights

- **Total assets** — what the company owns
- **Total liabilities** — what it owes (includes **interest-bearing debt**)
- **Shareholders' equity** — assets minus liabilities

**Debt ratio for Shariah screening** often uses:
\`\`\`
Interest-bearing debt ÷ Market capitalization
\`\`\`
Or debt ÷ total assets, depending on the standard. HalalVest applies AAOIFI-style thresholds automatically.

## Cash Flow Statement

Three sections:
- **Operating** — cash from core business (most important)
- **Investing** — capital expenditures, acquisitions
- **Financing** — debt issuance, repayments, dividends

Strong companies generate positive **operating cash flow** consistently. Heavy reliance on financing cash flow may signal dependency on borrowing.

## Key Ratios to Know

| Ratio | Formula | Why It Matters |
|-------|---------|----------------|
| P/E | Price ÷ Earnings | Valuation vs. profits |
| Debt/Equity | Total debt ÷ Equity | Leverage and riba exposure |
| Current ratio | Current assets ÷ Current liabilities | Short-term health |
| ROE | Net income ÷ Equity | Profitability efficiency |

## Halal-Specific Review

When reading filings (10-K, 10-Q on SEC.gov):

1. Scan **business description** for haram activities
2. Check **Note on debt** for interest-bearing instruments
3. Review **segment revenue** for mixed activities
4. Compare ratios to HalalVest screening output

> **Practice:** Pick a halal-rated stock in our screener, find its latest 10-K, and locate the debt footnote — build familiarity over time.`,
  },
  {
    slug: "technical-analysis-basics",
    title: "Technical Analysis Basics",
    description:
      "Introduction to charts, trends, and indicators — what they show, their limits, and how halal investors should use them.",
    category: "analysis",
    readingTimeMinutes: 8,
    featured: false,
    content: `## What Is Technical Analysis?

**Technical analysis (TA)** studies price charts, volume, and patterns to forecast future price movements. It contrasts with **fundamental analysis**, which evaluates business value and financials.

Many halal investors use TA for **timing entries and exits** on stocks already cleared for Shariah compliance — not as a substitute for screening.

## Core Concepts

### Price Trends
- **Uptrend** — higher highs and higher lows
- **Downtrend** — lower highs and lower lows
- **Support** — price level where buying often emerges
- **Resistance** — price level where selling often appears

### Volume
Rising prices on **increasing volume** suggest stronger conviction. Weak volume rallies may reverse more easily.

## Common Indicators

| Indicator | Purpose |
|-----------|---------|
| Moving averages (50/200 day) | Trend direction and crossovers |
| RSI | Overbought (>70) or oversold (<30) conditions |
| MACD | Momentum shifts |
| Bollinger Bands | Volatility and mean reversion |

HalalVest's screener includes TradingView charts where you can explore these tools visually.

## Candlestick Charts

Each candle shows **open, high, low, close** for a period. Green (or white) candles close higher; red candles close lower. Patterns like "hammer" or "engulfing" are watched by TA traders — reliability varies.

## Limitations

- TA does not assess **Shariah compliance** — always screen first
- Patterns are **probabilistic**, not guaranteed
- Short-term trading increases **costs and taxes**
- Excessive day-trading can resemble **speculation (maysir)** if done without discipline

## Sensible Use for Halal Investors

1. Screen for compliance **before** chart analysis
2. Use TA to improve **buy zones** on long-term convictions
3. Prefer **weekly/monthly** charts for investing vs. day-trading
4. Combine with **fundamental halal thesis** — never charts alone

> **Bottom line:** Technical analysis is a tool for timing and risk management, not a replacement for Islamic ethics or business fundamentals.`,
  },
  {
    slug: "long-term-investing",
    title: "Long-Term Investing",
    description:
      "Why patient, disciplined investing aligns with Islamic values and how to build wealth through compounding halal returns.",
    category: "strategy",
    readingTimeMinutes: 8,
    featured: false,
    content: `## The Case for Long-Term Investing

**Long-term investing** means holding quality assets for years, not days. It aligns with:

- **Patience (sabr)** — trusting the process through market cycles
- **Real economic participation** — owning businesses that create value
- **Reduced costs** — fewer trades mean lower fees and taxes

Historical data shows broad equity markets tend to rise over decades despite recessions — though past performance never guarantees future results.

## Power of Compounding

Compounding means your returns generate their own returns. A halal portfolio growing **8% annually** (hypothetical):

| Starting | After 10 yrs | After 20 yrs | After 30 yrs |
|----------|--------------|--------------|--------------|
| $10,000 | ~$21,600 | ~$46,600 | ~$100,600 |

Regular **monthly contributions** accelerate this further. Consistency beats trying to time the market.

## Dollar-Cost Averaging (DCA)

Investing a **fixed amount on a schedule** (e.g., $200/month) buys more shares when prices are low and fewer when high. DCA reduces the stress of picking the "perfect" entry and suits salaried investors.

## What to Hold Long Term

Focus on companies or ETFs with:

- **Durable halal business models**
- **Strong balance sheets** (manageable debt)
- **Competitive advantages** (brand, network, cost)
- **Consistent cash flow** and reasonable valuations

Re-screen holdings **quarterly** — compliance status can change when companies take on debt or shift revenue mix.

## Avoiding Common Mistakes

- **Panic selling** during downturns
- **Chasing hype** (meme stocks, unverified "halal" claims)
- **Overconcentration** in one winner
- **Ignoring zakat** and purification obligations
- **Checking prices daily** — behavior that leads to emotional decisions

## Building Your System

1. Automate contributions where possible
2. Maintain a **written investment policy** (goals, allocation, rules)
3. Review portfolio **quarterly**, not hourly
4. Continue **education** — you are already on the right path

> **Final thought:** Halal long-term investing is a marathon grounded in faith, knowledge, and discipline. HalalVest exists to support every step of that journey.`,
  },
];

export function getAllLessons(): EducationLesson[] {
  return EDUCATION_LESSONS;
}

export function getLessonBySlug(slug: string): EducationLesson | undefined {
  return EDUCATION_LESSONS.find((lesson) => lesson.slug === slug);
}

export function getFeaturedLesson(): EducationLesson {
  return EDUCATION_LESSONS.find((lesson) => lesson.featured) ?? EDUCATION_LESSONS[0];
}

export function filterLessons(
  query: string,
  category: EducationCategory
): EducationLesson[] {
  const normalizedQuery = query.trim().toLowerCase();

  return EDUCATION_LESSONS.filter((lesson) => {
    if (category !== "all" && lesson.category !== category) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return (
      lesson.title.toLowerCase().includes(normalizedQuery) ||
      lesson.description.toLowerCase().includes(normalizedQuery) ||
      lesson.slug.replace(/-/g, " ").includes(normalizedQuery)
    );
  });
}

export function getLessonSlugs(): string[] {
  return EDUCATION_LESSONS.map((lesson) => lesson.slug);
}
