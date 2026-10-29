import { CARD_IDS, CASE_STUDIES, type CardId, type CaseStudyId } from './oracleData'

export type Role = 'diagnosis' | 'intervention' | 'outcome'
export const ROLES: Role[] = ['diagnosis', 'intervention', 'outcome']
export const ROLE_LABEL: Record<Role, string> = {
  diagnosis: 'Diagnosis',
  intervention: 'Intervention',
  outcome: 'Outcome',
}

export type ReadingCard = { cardId: CardId; role: Role; advice: string }

export type OracleReading = {
  cards: [ReadingCard, ReadingCard, ReadingCard]
  synthesis: string
  caseStudyId?: CaseStudyId
  // Where the reading came from. Keyword readings are matched, not generated, and the page says so.
  mode?: 'curated' | 'keyword' | 'general'
}

export const DEFAULT_QUESTION = 'How do you turn a complex product problem into measurable business impact?'

// The curated first reading: stored locally, rendered on load, never fetched.
export const DEFAULT_READING: OracleReading = {
  mode: 'curated',
  cards: [
    {
      cardId: 'architect',
      role: 'diagnosis',
      advice: 'Connect user needs, commercial goals and the wider product ecosystem before jumping into solutions.',
    },
    {
      cardId: 'maker',
      role: 'intervention',
      advice:
        'Turn ambiguous product challenges into tangible, well-crafted experiences, from discovery and research through to engineering collaboration and delivery.',
    },
    {
      cardId: 'alchemist',
      role: 'outcome',
      advice:
        'Use experimentation and behavioural insights to turn better user experiences into measurable commercial impact.',
    },
  ],
  synthesis:
    'Great product design connects user needs, technical complexity and commercial outcomes. My approach combines systems thinking, hands-on execution and experimentation to turn ambiguity into measurable impact.',
}

// ---------- Validation: any reading, from any source, is checked before it is rendered ----------

export function isValidReading(r: unknown): r is OracleReading {
  if (!r || typeof r !== 'object') return false
  const { cards, synthesis, caseStudyId } = r as OracleReading
  if (!Array.isArray(cards) || cards.length !== 3 || typeof synthesis !== 'string' || !synthesis.trim()) return false
  if (new Set(cards.map((c) => c?.cardId)).size !== 3) return false
  const ok = cards.every(
    (c, i) =>
      c &&
      CARD_IDS.includes(c.cardId) &&
      c.role === ROLES[i] &&
      typeof c.advice === 'string' &&
      c.advice.trim().length > 0 &&
      c.advice.length <= 400,
  )
  return ok && (caseStudyId === undefined || caseStudyId in CASE_STUDIES)
}

// ---------- Deterministic reader ----------
// A keyword matcher, not a generative model. Each intent names three cards (diagnosis, intervention, outcome), the advice
// for each, a synthesis and, where one really applies, a case study. To use an AI instead, have consultOracle() call a
// server endpoint that returns an OracleReading; isValidReading() already guards what comes back.

type Intent = {
  id: string
  keywords: RegExp[]
  cards: [CardId, CardId, CardId]
  advice: [string, string, string]
  synthesis: string
  caseStudyId?: CaseStudyId
}

const k = (...words: string[]) => words.map((w) => new RegExp(w, 'i'))

const INTENTS: Intent[] = [
  {
    id: 'retention',
    keywords: k(
      '\\bretain',
      '\\bretention',
      '\\bchurn',
      '\\bonboard',
      '\\bactivat',
      'come back',
      'coming back',
      '\\breturn',
      '\\bengagement',
      'sign.?up',
      '\\bdormant',
      '\\blapsed',
      '\\bhabit',
    ),
    cards: ['seer', 'experimenter', 'alchemist'],
    advice: [
      'Look at activation and retention cohorts to see where people lose momentum, and what returning users do in their first sessions that churned users never do.',
      'Test removing friction between sign-up and the first valuable action, one change at a time, so you learn which step is really holding people back.',
      'Track activation, 14-day retention and conversion together, so you can tell whether the changes create lasting value or only a short-term bump.',
    ],
    synthesis:
      'Your retention problem may not need another redesign. First find what predicts activation, then experiment with removing friction. I tackled a similar challenge at Findmypast, where onboarding improvements increased 14-day retention by 25%.',
    caseStudyId: 'treeassist',
  },
  {
    id: 'conversion',
    keywords: k(
      '\\bconver',
      '\\brevenue',
      '\\bpric',
      '\\bcheckout',
      '\\btrial',
      '\\bsubscri',
      '\\bupgrad',
      '\\bpaywall',
      '\\bmonetis',
      '\\bmonetiz',
      '\\bpayment',
      '\\bsales',
      '\\bfunnel',
      '\\babandon',
      '\\bbasket',
      '\\bcart\\b',
    ),
    cards: ['seer', 'alchemist', 'experimenter'],
    advice: [
      'Map the funnel step by step and find the biggest drop. Then talk to people who left at that step to learn whether the cause is price, trust or effort.',
      'Redesign the moment where value is shown, so people understand what they get before they are asked to pay. Tie the change to one commercial measure.',
      'Run it as an A/B test with the success measure agreed up front, and watch downstream metrics too, so a conversion win is not a retention loss.',
    ],
    synthesis:
      'Revenue problems usually hide a clarity problem. Find where people stall, show the value sooner, and let experiments decide what stays. At Findmypast this approach improved free-trial conversion 5× and reduced checkout drop-off by 23%.',
    caseStudyId: 'treeassist',
  },
  {
    id: 'workflow',
    keywords: k(
      '\\bworkflow',
      '\\bcomplex',
      '\\bsaas\\b',
      '\\bb2b',
      '\\badmin',
      '\\bdashboard',
      '\\benterprise',
      'internal tool',
      '\\btools\\b',
      'back.?office',
      '\\boperations',
      '\\bmanual',
      '\\bspreadsheet',
      '\\bcrm\\b',
      '\\bplatform',
      'too many',
    ),
    cards: ['architect', 'weaver', 'maker'],
    advice: [
      'Map the whole workflow end to end: who does what, which tools they switch between, and where work is re-entered, lost or waiting on someone else.',
      'Merge the overlapping tools into one structure with a single place to start, so people stop carrying the complexity around in their heads.',
      'Build the smallest version that covers the core job, put it in front of real users early and keep refining it alongside engineering.',
    ],
    synthesis:
      'Complex workflows are usually several simple ones that never got joined up. Understand the whole system, weave it into one product, then ship the core job first. I redesigned HostHQ this way, merging four host tools into one.',
    caseStudyId: 'hosthq',
  },
  {
    id: 'marketplace',
    keywords: k(
      '\\bmarketplace',
      '\\bsupply',
      '\\bdemand',
      '\\bliquidity',
      'two.?sided',
      '\\blisting',
      '\\bbuyers',
      '\\bsellers',
      '\\bmatch',
      '\\bsearch',
      '\\bdiscover',
      '\\bvendors',
      '\\bproviders',
      '\\bvenues',
    ),
    cards: ['seer', 'connector', 'alchemist'],
    advice: [
      'Find where searches fail on each side: demand that finds nothing suitable, and supply that is never shown. Look at what people do after a poor result.',
      'Design for both sides together, so each search or listing improves the next match, and make the moment of matching as clear and low effort as possible.',
      'Measure qualified enquiries and completed matches on each side, not just traffic, so you can see whether the marketplace is truly getting healthier.',
    ],
    synthesis:
      'A marketplace is only as strong as its matches. Diagnose where each side gets stuck, then design the match moment for both at once. At HeadBox, improved venue discovery contributed to a 30% rise in qualified inbound enquiries.',
    caseStudyId: 'venue-finder',
  },
  {
    id: 'strategy',
    keywords: k(
      '\\bstrateg',
      '\\broadmap',
      '\\bvision',
      '\\bprioriti',
      '\\becosystem',
      '\\balignment',
      '\\bdirection',
      'north star',
      '\\bportfolio',
      '\\bunclear',
      'where to start',
      'what to build',
      'big picture',
      '\\bpivot',
      'new product',
    ),
    cards: ['architect', 'seer', 'alchemist'],
    advice: [
      'Frame the problem before choosing a solution: who it is for, what the business needs from it and how it connects to the rest of the product.',
      'Back the framing with evidence from research and usage data, then agree a small set of bets that the evidence supports, in priority order.',
      'Choose the commercial measures that show whether each bet worked, and agree them with the team before anything is built.',
    ],
    synthesis:
      "Strategy gets clearer when it is connected to evidence and to outcomes. Frame the whole system, test the framing against real behaviour, and agree how success will be measured. I helped shape HeadBox's One Platform this way.",
  },
  {
    id: 'system',
    keywords: k(
      'design system',
      '\\bconsisten',
      '\\binconsisten',
      '\\bcomponent',
      '\\btokens?\\b',
      'hand.?off',
      '\\bscalab',
      'style guide',
      'pattern library',
      '\\bduplicat',
      '\\bfigma',
    ),
    cards: ['weaver', 'foundation', 'maker'],
    advice: [
      'Audit the product for where the same thing is built several ways. Group the variants, and note which differences are deliberate and which are accidents.',
      'Write the shared parts down once, as components, tokens and rules, and make them the easiest way to build anything new.',
      'Ship through the system and track adoption and delivery speed, so you can see that design and engineering are genuinely moving faster.',
    ],
    synthesis:
      "Consistency is a product decision, not a polish pass. Find where the product diverges, build the shared foundations once, and ship everything new through them. I supported Findmypast's migration from Sketch to Figma.",
  },
  {
    id: 'research',
    keywords: k(
      '\\bresearch',
      '\\bunderstand',
      '\\binsight',
      '\\banalytic',
      '\\bdata\\b',
      'user feedback',
      '\\binterview',
      '\\bsurvey',
      'why do',
      'why are',
      'why is',
      '\\bassumption',
      '\\bvalidate',
    ),
    cards: ['seer', 'architect', 'experimenter'],
    advice: [
      'Start with what people actually do in the product, then interview a handful of them about those moments, so the numbers and the stories explain each other.',
      'Place the findings in the wider picture: which parts of the journey and which business goals they touch, so the team acts on the right thing first.',
      'Turn the strongest finding into a test with a clear success measure, so the research changes the product and not just a slide deck.',
    ],
    synthesis:
      'Research earns its keep when it changes a decision. Watch behaviour, ask why, and turn the clearest finding into an experiment. At HeadBox, research and funnel analysis led me to rethink the AI Venue Finder.',
    caseStudyId: 'venue-finder',
  },
  {
    id: 'ai',
    keywords: k(
      '\\bai\\b',
      '\\bllm',
      '\\bchatbot',
      '\\brecommend',
      '\\bpersonalis',
      '\\bpersonaliz',
      'machine learning',
      '\\bassistant',
      '\\bcopilot',
      '\\bgenerative',
    ),
    cards: ['seer', 'maker', 'experimenter'],
    advice: [
      'Find the job people are really trying to do, and where a recommendation or suggestion would save them effort, before deciding where AI belongs in the flow.',
      'Prototype the experience with real outputs, including the weak ones, and design how people can correct, refine or ignore what the system suggests.',
      'Test trust and usefulness with a small group first: do people accept the suggestions, edit them or abandon the flow? Let that decide the rollout.',
    ],
    synthesis:
      "AI features succeed when they fit a real job and earn trust. Start from the behaviour, prototype with real outputs, and measure whether people accept what is suggested. I did this reworking HeadBox's AI Venue Finder.",
    caseStudyId: 'venue-finder',
  },
  {
    id: 'build',
    keywords: k(
      '\\bux\\b',
      '\\bui\\b',
      '\\bprototype',
      '\\bmvp',
      '\\blaunch',
      '\\bship',
      '\\bbuild',
      '\\binterface',
      '\\busability',
      '\\bredesign',
      '\\bconfus',
      'hard to use',
      '\\bdifficult',
      'user flow',
    ),
    cards: ['architect', 'maker', 'experimenter'],
    advice: [
      'Frame the job the product has to do and for whom, so the first version is aimed at one clear problem instead of a long list of features.',
      'Get to something real quickly: sketch, prototype and test with people, then keep working with engineering so what ships matches what was tested.',
      'Release it as an experiment with a clear success measure, then keep what moves it and drop what does not.',
    ],
    synthesis:
      'Shipping well is mostly about scope and learning. Aim the first version at one clear problem, test it early with real people, and measure it once it is live. I took HostHQ from research to a scoped MVP this way.',
    caseStudyId: 'hosthq',
  },
]

const GENERAL: Omit<Intent, 'id' | 'keywords'> = {
  cards: ['seer', 'architect', 'alchemist'],
  advice: [
    'Before designing anything, look at how people behave today and listen to why. The real problem is often one step away from the one you were handed.',
    'Place that problem in the wider product and the business around it, then choose a focused change that fixes the cause rather than the symptom.',
    'Agree how success will be measured before building, so the team can see whether the change created real value for users and the business.',
  ],
  synthesis:
    'I could not match that to one of my areas, so this is how I would start with almost any product problem: understand behaviour, frame the system, and agree the measure. Add a few more details for a more specific reading.',
}

const norm = (s: string) => s.toLowerCase().replace(/['']/g, "'")

export function readLocally(question: string): OracleReading {
  const text = norm(question)
  let best: Intent | undefined
  let bestScore = 0
  for (const intent of INTENTS) {
    const score = intent.keywords.filter((re) => re.test(text)).length
    if (score > bestScore) {
      best = intent
      bestScore = score
    }
  }
  const pick = best ?? { ...GENERAL, id: 'general', keywords: [] }
  const [a, b, c] = pick.cards
  return {
    mode: best ? 'keyword' : 'general',
    cards: [
      { cardId: a, role: 'diagnosis', advice: pick.advice[0] },
      { cardId: b, role: 'intervention', advice: pick.advice[1] },
      { cardId: c, role: 'outcome', advice: pick.advice[2] },
    ],
    synthesis: pick.synthesis,
    caseStudyId: pick.caseStudyId,
  }
}

export const MAX_QUESTION = 280

// The one place the page asks for a reading. Swap the body for a fetch to a secure server endpoint to use an AI model;
// never call a model from the browser, and keep factual claims in local data rather than in the model's output.
export async function consultOracle(question: string): Promise<OracleReading> {
  const reading = readLocally(question.slice(0, MAX_QUESTION))
  if (!isValidReading(reading)) throw new Error('Invalid reading')
  return reading
}
