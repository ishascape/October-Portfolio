# Voice and copy

The site should read like a senior designer explaining her work across a table: plain, specific, confident, and never inflated.

## Calibration

Copy, claims and case study depth are pitched at **a Senior Product Designer at a startup or scaleup, or a strong Mid at big tech**. Don't overclaim seniority. "I led" only where she led; "I proposed" where she proposed and it was descoped.

## Facts and figures

- **The CV is the source of truth** for every number, title, date and company. If the CV and anything else disagree, the CV wins.
- **Never invent** an achievement, metric, quote or screenshot. If a figure isn't in the CV or a case study page, it doesn't go on the site.
- Figures as they stand: Venue Finder **+30%** qualified inbound enquiries (not +33%); **38 countries** (not 39); the **-28% churn** belongs to the guest booking journeys work, not HostHQ. Never use a match-rate figure.
- Every AI principle and expertise point must trace to a case study page or the CV (there's a comment in `AiPrinciples.tsx` saying so).
- Never mention visa sponsorship anywhere: site, metadata or `llms.txt`.

## Mechanics

| Rule | Example |
|---|---|
| **No em dashes.** Use a normal hyphen, a comma, a colon or a full stop. | "Merged four host tools: 55+ new clients in 3 months." |
| **Sentence case** for everything: headings, buttons, labels, nav | "Read case study", not "Read Case Study" |
| **British spelling** | synthesise, optimisation, colour, programme |
| **Numbers as numerals**, with the unit attached | 3 months, 200+ venues, £50k, 2 to 30 seconds |
| **Percentages** with a sign when they're a change | +30%, -23%, 28% less churn |
| **Currency** in pounds, symbol first | £500k+ |
| **Lists** use box bullets, never dashes | |
| **Even sizes** for any text you style | 14, 16, 18px |
| **"I"**, not "we", for Ashni's own decisions; name the team when it was shared | |

## Tone

- **Specific over general.** "Briefs over £50k went to a human concierge" beats "I designed for edge cases".
- **Outcome first.** Lead with the change, then how. Card titles state the result; summaries say how.
- **Short sentences.** One idea each. The About heading is one sentence per line.
- **Warm, not cute.** The hand-lettered "Hi! I'm Ashni" and the wink are the personality. Copy doesn't need jokes on top.
- **No generic compliments or filler**: no "passionate", "rockstar", "pixel-perfect", "delightful experiences".

## Patterns

| Pattern | Format | Live example |
|---|---|---|
| Button | Verb + object, then an arrow glyph for direction | "Explore my work ↓", "View resume ↗" |
| Card CTA | "Read case study →" | |
| Section intro | One line, outcome-led | "Designing for conversion, supply growth and activation." |
| Principle title | An imperative or a stance, with a full stop | "Always define the guardrails." |
| Expertise point | Result first, then mechanism, under 70 characters | "+30% qualified inbound enquiries from better lead quality." |
| Placeholder | What's coming, not "Lorem ipsum" | "Key screens to come" |
| Status message | What happened, with a tick | "Copied ✓" |
| Availability | As set by Ashni | "Open to permanent and contract Senior Product Designer, Product Manager or operator roles." "Currently based in Sydney, Australia." |

## Accessibility in copy

- Link text makes sense on its own ("Venue Finder edge cases →", not "here").
- Buttons that only show a glyph get an `aria-label` ("Previous page").
- State changes are announced: the copy-email button updates a polite live region ("Email address copied").
