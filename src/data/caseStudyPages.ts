// Case-study pages, rebuilt from the live ashnidave.com pages (read 14 Oct 2026).
// The CV is the source of truth (Ashni, 15 Oct 2026). Venue Finder match-rate claims are left out, and
// the CV's "-28% churn" belongs to the guest booking journeys work, so it is not shown on HostHQ.
import type { CaseStudyId } from './content'
import hosthqHero from '../assets/hosthq-hero.webp'
import hosthqBeforeAfter from '../assets/hosthq-before-after.webp'
import vfCardDesigns from '../assets/venue-finder-card-designs.webp'
import vfHero from '../assets/venue-finder-hero.webp'
import vfV1Disruptive from '../assets/vf-v1-disruptive.webp'
import vfBriefLifecycle from '../assets/venue-finder-brief-lifecycle.webp'
import hosthqProposalAccepted from '../assets/hosthq-proposal-accepted.webp'
import hosthqFilterEvents from '../assets/hosthq-filter-events.webp'
import hosthqRequestsDashboard from '../assets/hosthq-requests-dashboard.webp'
import treeassistHero from '../assets/treeassist-hero.webp'
import treeassistExp1 from '../assets/treeassist-exp1.webp'
import treeassistExp2 from '../assets/treeassist-exp2.webp'
import treeassistWait from '../assets/treeassist-wait.webp'
import treeassistExp3 from '../assets/treeassist-exp3.webp'
import treeassistDesktop from '../assets/treeassist-desktop.webp'

export interface Metric {
  value: string
  label: string
}

export interface Experiment {
  name: string
  intent: string
  change: string
  result: string
  verdict?: string
  image?: { src: string; alt: string; width: number; height: number } // a real screen, shown beside the text
  prototype?: 'vf-v2' | 'legacy' // a clickable prototype, shown below the text
}

export interface Decision {
  title: string
  problem: string
  options: string
  decision: string
  why: string
  shipped: string
}

// A real screen with what it solves, the interaction decision and the reason for it.
export interface Moment {
  title: string
  image: { src: string; alt: string; width: number; height: number; bordered?: boolean }
  problem: string
  decision: string
  why: string
  widget?: 'booking-status'
}

export interface Section {
  label: string // small kicker, like a drawing title
  heading: string
  eyebrow?: string // hand-lettered note above the heading, with a line-drawn light bulb
  eyebrowIcon?: 'bulb' | 'sword' // line-drawn icon before the note (default: bulb)
  body?: string[]
  list?: { title?: string; text: string }[]
  experiments?: Experiment[]
  quotes?: { name: string; role: string; lines: string[]; dark?: boolean }[] // pull quotes from interviews, as cards
  quotesCaption?: string // hand-lettered line under the quote cards
  figure?: string // placeholder caption until real images arrive
  figures?: string[] // several placeholder frames, one per selected screen
  image?: { src: string; alt: string; caption: string; width: number; height: number; bordered?: boolean } // a real screenshot
  planImage?: { src: string; alt: string; width: number; height: number; bordered?: boolean; transparent?: boolean } // a full-width image under this section
  planImageTop?: { src: string; alt: string; caption: string; width: number; height: number; bordered?: boolean } // above the third, with a handwritten caption below
  planImage3?: { src: string; alt: string; caption: string; width: number; height: number; bordered?: boolean } // a third, below the second
  planImage4?: { src: string; alt: string; title?: string; width: number; height: number } // a fourth, below the third
  bookingStatus?: { callout: { title: string; text: string }[] } // the animated booking status widget, below the fourth image
  planImage2?: { src: string; alt: string; caption?: string; width: number; height: number } // a second one, below it
  diagram?: 'vf-shift' | 'vf-ranking' | 'vf-problem' | 'vf-experience' | 'vf-gaps' | 'vf-prototype' // a compact native diagram for the Venue Finder story
  dayDiagram?: { caption: string } // a day in the life of a venue host, drawn in the scope flow style, in place of an image
  planDiagram?: 'mvp-scope' // the HostHQ MVP scope, drawn in the TreeAssist flow style, shown under this section
  plan?: 'parti' | 'flow' // the existing/proposed drawing (parti) or the TreeAssist two-lane flow, shown under this section
  decisions?: Decision[] // problem, options, decision, why and what shipped
  moments?: Moment[] // key product moments: real screens with short annotations
}

export interface CaseStudyPage {
  id: CaseStudyId
  // A real product image for the page header. When set, the existing/proposed plan drawing moves to sit
  // under the first section instead of the header.
  heroImage?: { src: string; alt: string; width: number; height: number }
  kicker: string
  subtitle: string
  meta: { label: string; value: string }[]
  problem: string
  solution: string
  impact: Metric[]
  // Discreet line under the impact figures saying how far to trust them.
  impactNote?: string
  sections: Section[]
}

export const caseStudyPages: Record<CaseStudyId, CaseStudyPage> = {
  'venue-finder': {
    id: 'venue-finder',
    heroImage: {
      src: vfHero,
      alt: "A hand holding a phone and tapping a Venue Finder venue card. The card shows a Spotlight tag, Responds fast, a photo of Junsei, a yakitori restaurant in Marylebone, a short description, and I'm interested and Not for me buttons.",
      width: 1536,
      height: 1024,
    },
    kicker: 'HeadBox · Demand side',
    subtitle:
      'HeadBox is a two-sided marketplace connecting event planners (demand) with venue hosts (supply). As the sole Product Designer, I redesigned how planners submitted event briefs and discovered venues, introducing AI-powered recommendations to improve matching quality, reduce low-quality enquiries for hosts, and help planners find the right venue faster.',
    meta: [
      { label: 'Role', value: 'Sole product designer' },
      { label: 'Team', value: '4 engineers' },
      { label: 'Timescale', value: '2 months, 2-week experiment cycles' },
      { label: 'Marketplace', value: 'Guests planning events (demand) · venue hosts (supply)' },
    ],
    problem:
      'Guests filled in 13 steps without seeing a single venue, then waited for venues to get in touch. Early replies often missed the brief, and 83% of users dropped off the builder. Hosts were left with unqualified briefs and Lead Feed churn hit 55%. I argued for judging Venue Finder on lead quality, not volume.',
    solution:
      'Guests share their event, see matched venues straight away, shortlist, then connect. A vector database ranks the inventory against what they need, boosting best-fit, active and premium venues, plus Spotlight Partner, a paid placement model.',
    impact: [
      { value: '+30%', label: 'Qualified inbound enquiries' },
      { value: '40%', label: 'Shorter journey than the 13-step builder' },
      { value: 'New', label: 'Revenue from paid Spotlight placement' },
    ],
    impactNote:
      'Qualified enquiries is the measured V2 result against the control. Spotlight is a new revenue line; no revenue figure is claimed.',
    sections: [
      {
        label: '01 · The problem',
        heading: 'Guests waited for venues instead of discovering them.',
        body: [
          'Guests spent 13 steps describing their event and saw no venues. Then they waited, with little say over who got in touch, and early replies were often a poor fit.',
          'Marketing measured briefs submitted, not bookings. Hosts often needed 27+ messages to close one.',
        ],
        diagram: 'vf-problem',
      },
      {
        label: '02 · Research',
        heading: 'Every brief hinged on one non-negotiable.',
        eyebrow: 'Interview insight',
        body: [
          'HeadBox had done no guest research in over four years, so I interviewed 10 event bookers. Every brief had one fixed requirement, and venues that missed it were rejected at once.',
          'Hypothesis: capturing intent and encouraging shortlisting before submission means fewer, more valuable briefs for hosts.',
        ],
        quotes: [
          {
            name: 'Stephanie',
            role: 'Corporate booker',
            lines: [
              'Once I found my venue, I ignored the rest of the emails. There were so many. I felt bad, but it was too much.',
              'If there’s no natural light and outdoor space, I don’t care. I won’t book the venue for my event even if everything else is fine.',
            ],
          },
          {
            name: 'Barney',
            role: 'Social booker',
            dark: true,
            lines: [
              'All of you - Tagvenue, HeadBox - you’re a nightmare. Too many emails. It’s just so much. I want a venue that allows me to bring my own catering, not to negotiate or be stuck with the set menu.',
              'All I need is one: a confirmation that it’s received, and then one to confirm the meeting. That’s it. Less is more.',
              'I have to read and delete every one just in case it’s important. That’s wasting my time.',
            ],
          },
        ],
        quotesCaption: 'Quotes from guest user interviews - 5 corporate bookers, 5 social bookers',
      },
      {
        label: '03 · The shift',
        heading: 'From venue-led to guest-led discovery.',
        body: [
          'The decision: stop making guests wait for venues, and let them discover venues instead. It gave guests value earlier and more control.',
          'Hypothesis: better matching earlier means less abandonment and more qualified enquiries.',
        ],
        diagram: 'vf-shift',
        planImage3: {
          src: vfBriefLifecycle,
          alt: 'Diagram of the life-cycle of an event brief, from event brief to direct enquiry or lead, proposals to review and confirmed booking. It compares the Venue Finder experiment, the Host HQ MVP rolled out, the currently legacy guest home and Host HQ steps, and the legacy Brief builder and Lead Feed flow, with friction notes in red.',
          caption: 'Life-cycle of an event brief',
          width: 2048,
          height: 794,
        },
      },
      {
        label: '04 · Key product moments',
        heading: 'Intent in, relevant venues out.',
        diagram: 'vf-prototype',
      },
      {
        label: '05 · Matching',
        heading: 'Semantic matching, not just filters.',
        body: [
          'Guests describe their event in their own words, or the system writes a prompt from their capacity, location, event type and vibe. That intent is compared with every venue in the inventory.',
          'The aim wasn’t venues that technically fit. It was venues a guest would want to book. Ranking then balances four signals: best fit, active venues, premium and paid Spotlight.',
        ],
        diagram: 'vf-ranking',
      },
      {
        label: '06 · Edge cases',
        heading: 'Designing for the gaps in our marketplace.',
        body: [
          'Self-service Venue Finder only ran where HeadBox had 200+ venues, enough supply for real variety. Elsewhere, guests took a different path.',
          'We didn’t force recommendations where inventory couldn’t support them, but we still caught high-value enquiries through a concierge.',
        ],
        diagram: 'vf-gaps',
      },
      {
        label: '07 · Experiments',
        heading: 'A control, a first version that failed, and a second that shipped.',
        experiments: [
          {
            name: 'Control · Legacy brief builder',
            intent: 'The baseline.',
            change: 'The existing 13-step, preset-option builder.',
            result: '83% of users dropped off.',
            prototype: 'legacy',
          },
          {
            name: 'V1 · Disruptive',
            intent: 'Capture intent and show venues before a brief is submitted.',
            change:
              'AI prompt, venue recommendations before submission, required account creation, multi-venue selection.',
            result:
              'Lead Feed volume fell 40%. 38% dropped off at the AI input and 27% at account creation. Direct enquiries rose 26%; guests shortlisted 2.2 venues on average.',
            verdict: 'Failed on lead volume, and taught us the most.',
            image: {
              src: vfV1Disruptive,
              alt: 'The V1 flow. Three mobile screens: a how-it-works panel with a free-text "What are you looking for?" prompt and example chips such as Inspire me and Summer party; "We found 45 venues in Shoreditch" with a map and venue carousel above a Name your event form; and Recommended spaces cards with an Add to favourites button. Below, a heatmap of clicks on the prompt chips and a session recording.',
              width: 1486,
              height: 1391,
            },
          },
          {
            name: 'V2 · Moderate',
            intent: 'Keep the intent signal, remove the friction.',
            change:
              'Optional prompt, magic-link sign-up, recommendations only after sign-up (to deter scraping), faster load.',
            result:
              'Qualified inbound enquiries rose 30%. Kept where we have 200+ venues, with fallbacks elsewhere (see 06).',
            verdict: 'Shipped.',
            prototype: 'vf-v2',
          },
        ],
      },
      {
        label: '08 · Reflections',
        heading: 'A bold idea needs a strong business case.',
        list: [
          {
            title: 'The challenge',
            text: 'Lead Feed was a familiar product that leadership believed in, and marketing was focused on lead volume.',
          },
          {
            title: 'What I learned',
            text: 'Framing the problem around marketplace performance shifted the conversation. Being clear about trade-offs, between lead volume, match quality and revenue, made it easier to challenge existing thinking. Measured: more qualified enquiries. Still a hypothesis: more bookings.',
          },
          {
            title: 'What I’d explore next',
            text: 'Smarter venue rankings based on conversion potential, faster shortlisting for repeat users, and AI-assisted discovery. I’d also separate lead volume from metrics that reflect actual marketplace health.',
          },
        ],
        image: {
          src: vfCardDesigns,
          alt: 'Initial recommendation card designs for Venue Finder, in four states: a loading skeleton with a shimmer and pulse note, hover with an Add to enquiry button and image arrows, default, and favourited with Added to enquiry. Each card shows a venue photo, Popular and Responds fast tags, the venue name, location, rating, price band and capacity.',
          caption: 'Initial recommendation card designs',
          width: 1492,
          height: 514,
        },
      },
    ],
  },

  hosthq: {
    id: 'hosthq',
    heroImage: {
      src: hosthqHero,
      alt: 'Three HostHQ screens floating around a monitor: proposals with an urgent-requests alert, a leads list, and Lead Feed reports.',
      width: 1800,
      height: 654,
    },
    kicker: 'HeadBox · Supply side',
    subtitle:
      'Venue hosts on HeadBox used four separate tools. As Senior Product Designer, I ran host focus groups, set the consolidation strategy and scoped the MVP for one platform where hosts see how they earn and act on it.',
    meta: [
      { label: 'Role', value: 'Senior Product Designer - design strategy, execution, IA and workflow redesign' },
      { label: 'Stakeholders', value: 'Platform clients, CEO, CTO, Head of Marketing, Head of Venue Sales' },
      { label: 'Timescale', value: '3 months, 0→1, discovery to full release' },
      {
        label: 'I owned',
        value: 'Focus-group research, the consolidation strategy, MVP scope, IA and workflow redesign',
      },
      {
        label: 'Shipped',
        value: 'Unified navigation, requests dashboard, proposal builder and marketplace reporting',
      },
      { label: 'Deferred', value: '3D Studio migration, full reporting and mobile (see 06 for what comes next)' },
    ],
    problem:
      'Hosts’ platform was really four products (Lead Feed, PowerHost, HeadBox for Business, 3D Studio): confusing navigation, repeated workflows, inconsistent data, little cross-product use. We were shipping our org chart. I advocated for round-table research over a redesign driven by stakeholder opinion and support tickets.',
    solution:
      'One Platform: a single system organised around the jobs hosts do, positioned as a structured way to earn revenue. Research set the MVP scope and what comes next. We shipped structure over completeness and deferred 3D Studio migration, full reporting and mobile.',
    impact: [
      { value: '55+', label: 'New One Platform clients in 3 months' },
      { value: '+32%', label: 'Hosts reporting closed bookings' },
      { value: '-25%', label: 'Navigation support tickets' },
    ],
    impactNote: 'Reported project outcomes, not individual attribution.',
    sections: [
      {
        label: '01 · Research',
        heading: 'Hosts came to HeadBox for leads, but managed their business elsewhere.',
        eyebrow: 'Research insight',
        body: [
          'In focus groups with different venue types, hosts wanted clear signals of growth and return, not more features.',
          'Making revenue clear became the goal and shaped the consolidation strategy.',
        ],
        dayDiagram: {
          caption:
            'Learned about venue hosts’ existing workflows and day-to-day activities outside HeadBox from focus group sessions',
        },
      },
      {
        label: '02 · Strategy',
        heading: 'From fixing usability to growing supply.',
        list: [
          { text: 'Replace scattered tools with one place to start.' },
          { text: 'Organise around host goals, not product lines.' },
          { text: 'Bring performance data into one clear return-on-investment story.' },
          { text: 'Build a modular base ready for automation, AI and integrations.' },
        ],
        planDiagram: 'mvp-scope',
        planImage2: {
          src: hosthqBeforeAfter,
          alt: 'HeadBox before and after on laptops. Before: the Lead Feed "Your interested guests" table of 2232 contact details, each row with a status and a Guest details button. After: the HostHQ Requests screen with a Your Events menu (Requests, Proposals, Bookings, Leads, Reports) and event cards showing budget, date, location and a Send Proposal button.',
          width: 1983,
          height: 793,
        },
      },
      {
        label: '03 · The MVP',
        heading: 'Trade-off: A coherent system before surface polish.',
        body: [
          'With three months before peak season, I chose structure over completeness: unified navigation and IA, consolidated workflows, action-prompting dashboards and a stronger proposal builder as the main revenue lever.',
          'The cost: migrating the data slowed v1 load times for hosts with large datasets.',
        ],
      },
      {
        label: '04 · Decisions that shaped the release',
        heading: 'What we chose, what we gave up, what shipped.',
        decisions: [
          {
            title: 'Research before redesign',
            problem:
              'Four separate products, and pressure for a redesign driven by stakeholder opinion and support tickets.',
            options: 'Redesign from stakeholder opinion and tickets, or run round-table research with hosts first.',
            decision: 'I advocated for round-table research.',
            why: 'Hosts wanted clear signals of growth and return, not more features.',
            shipped: 'A consolidation strategy built around making revenue clear.',
          },
          {
            title: 'Structure over completeness',
            problem: 'Three months before peak season.',
            options: 'Polish the surface and the full feature set, or ship a coherent structure first.',
            decision: 'I chose structure over completeness.',
            why: 'A coherent system mattered more than surface polish before peak season.',
            shipped:
              'Unified navigation and IA, consolidated workflows, action-prompting dashboards and a stronger proposal builder as the main revenue lever.',
          },
          {
            title: '3D Studio',
            problem: '3D Studio was one of the four tools, and legacy dependencies blocked full integration.',
            options: 'Integrate fully, or embed it and defer migration.',
            decision: 'Embed it in the proposal flow and defer migration.',
            why: 'Legacy dependencies blocked full integration.',
            shipped: '3D Studio embedded in the proposal flow.',
          },
          {
            title: 'Reporting',
            problem: 'The data needed cleaning first.',
            options: 'Full reporting, or marketplace reporting only.',
            decision: 'Ship marketplace reporting only.',
            why: 'Reporting depends on a clean data layer.',
            shipped: 'Marketplace reporting. Full reporting is in what comes next.',
          },
          {
            title: 'Mobile',
            problem: 'Three months, and hosts work mainly on desktop.',
            options: 'Desktop and mobile, or desktop only.',
            decision: 'Desktop only.',
            why: 'Hosts work mainly on desktop.',
            shipped: 'A desktop-only v1.',
          },
        ],
      },
      {
        label: '05 · Key product moments',
        heading: 'Three screens, and the decision behind each.',
        moments: [
          {
            title: 'Requests dashboard',
            image: {
              src: hosthqRequestsDashboard,
              alt: 'The HostHQ Requests screen: a Your Events menu (Requests, Proposals, Bookings, Leads, Reports) beside a list of event requests with New, Urgent and Commissionable event tags, budgets, dates, locations and a Send Proposal button on each.',
              width: 1600,
              height: 1138,
              bordered: true,
            },
            problem: 'Hosts came to HeadBox for leads but ran their business elsewhere.',
            decision: 'Land on requests, where hosts see their inbound, qualified requests for proposals.',
            why: 'Hosts wanted clear signals of growth and return, and a dashboard that prompts action.',
          },
          {
            title: 'Filter events',
            image: {
              src: hosthqFilterEvents,
              alt: 'The HostHQ Leads screen with a Filter events panel open: preset filters such as Weekend events and Corporate parties, sort options, Show checkboxes and a budget field, with Reset filters and Apply filters buttons.',
              width: 1440,
              height: 1024,
              bordered: true,
            },
            problem: 'Hosts doubted whether an enquiry was genuine and whether they were even available.',
            decision:
              'Filters tailored to what the venue is looking for, with notifications for events that match the venue space and availability.',
            why: 'Those were the questions hosts asked of every enquiry: is it genuine, and are we available?',
          },
          {
            title: 'Proposal accepted and booking status',
            image: {
              src: hosthqProposalAccepted,
              alt: 'The HostHQ proposal screen after a guest accepts: a "John accepted your proposal" banner with the guest\'s verified contact details and a Confirm Booking button, a booking status timeline, and the space and pricing details of the proposal below.',
              width: 1440,
              height: 1024,
            },
            problem:
              'Hosts could not tell how long it had been since the last message or what action was pending, especially when several people handled one event.',
            decision:
              'Suggest the next action, put timestamps on each part of the events journey, and alert hosts when an event moves between stages.',
            why: 'The pain point was visibility of timing and pending actions.',
            widget: 'booking-status',
          },
        ],
      },
      {
        label: '06 · With 12 months instead of 3',
        heading: 'What comes next.',
        list: [
          { text: 'Group hosts by maturity and revenue band.' },
          { text: 'Predictive insights, plus risk and opportunity scoring for event briefs.' },
          { text: 'Automated recommendations to improve listings.' },
          { text: 'AI demand signals on the dashboard.' },
          { text: 'A supply-side North Star beyond churn, such as host lifetime value.' },
          { text: 'Consolidated reporting on a clean data layer.' },
        ],
      },
      {
        label: '07 · Reflections',
        heading: 'A fragmented platform is an alignment problem before it is a design problem.',
        body: [
          'Reactive growth caused the fragmentation. The fix was reframing the product around clearer growth signals for hosts. Strong marketplaces run on structural clarity and workflow-improving features, not faster shipping.',
        ],
      },
    ],
  },

  treeassist: {
    id: 'treeassist',
    heroImage: {
      src: treeassistHero,
      alt: 'Five phones at an angle showing the TreeAssist onboarding in the Findmypast mobile site: a "Let\'s build your tree together" welcome screen with a Get started button, an "Add a mother" form, a success message about a maiden name added, and the family tree view.',
      width: 1800,
      height: 1111,
    },
    kicker: 'Findmypast · Activation',
    subtitle:
      'Findmypast is a family history subscription. As Product Designer, I owned the UI and experiment design for three onboarding tests that got new users to value sooner with AI-powered relative suggestions.',
    meta: [
      { label: 'Role', value: 'Product Designer, with the Lead Product Designer' },
      { label: 'Team', value: 'PM, data science and engineering' },
      { label: 'Stakeholders', value: 'New users, Head of Tree Product, Head of Product Experience' },
      { label: 'Timescale', value: '2 months, 2-week experiment cycles' },
    ],
    problem:
      '41% of new users left before reaching value: onboarding was heavy on admin forms, then users faced a blank family-tree canvas.',
    solution:
      'AI-assisted onboarding: relative suggestions in the product and step-by-step guidance replaced a form-heavy setup. I advocated for interactive states in desktop onboarding, not the view-only state engineers proposed. Three tests cut onboarding from 8 forms to 3.',
    impact: [
      { value: '+18%', label: 'Free-trial starts' },
      { value: '+8%', label: 'Trial-to-subscription conversion' },
      { value: '+26%', label: 'Users building trees with 10+ people' },
      { value: '-13%', label: 'Onboarding drop-off' },
    ],
    impactNote: 'Results from A/B experiments run with product, data science and engineering.',
    sections: [
      {
        plan: 'flow',
        label: '01 · The problem',
        heading: 'Value arrived too late.',
        body: [
          'Business goal: stronger early activation, to lift free-trial starts and subscriptions. User goal: reach something valuable before the admin wore them out.',
          'Hypothesis: AI-assisted suggestions and guided building, instead of form-heavy onboarding, would lift activation, tree size and free-trial conversion.',
        ],
      },
      {
        label: '02 · Experiments',
        heading: 'Three experiments, two weeks each.',
        experiments: [
          {
            name: 'Experiment 1 · Reveal immediate value',
            intent: 'Show value straight after sign-up.',
            change: 'Used sign-up details to surface a likely birth record (British or Irish ancestry).',
            result: '60% of users accepted the suggested task.',
            image: {
              src: treeassistExp1,
              alt: 'A phone showing the Findmypast mobile site. "These records match your details. Which one belongs to you?" sits above two civil birth records, the first for Alex Green with the mother\'s maiden name Smith highlighted, and the question "Is this your birth record?" with tick and cross buttons.',
              width: 670,
              height: 1200,
            },
          },
          {
            name: 'Experiment 2 · Guide the next action',
            intent: 'Reduce confusion after onboarding.',
            change: 'Suggested mothers and spouses on the tree canvas.',
            result: 'Hint engagement rose 32%, and trees grew more.',
            image: {
              src: treeassistExp2,
              alt: 'A phone showing the Findmypast family tree. A dotted orange box for a suggested mother, Smith, has the prompt "Is this Alex\'s mother?" with Reject and Accept buttons, above the highlighted Alex Green card, born 1983.',
              width: 670,
              height: 1200,
            },
          },
          {
            name: 'Experiment 3 · Interactive onboarding',
            intent: 'Reach the core product faster.',
            change:
              'Cut onboarding from 8 forms to 3, then moved users into AI-assisted tree building with suggested relatives.',
            result: 'Onboarding drop-off fell 13%, and activation rose.',
            image: {
              src: treeassistExp3,
              alt: 'A phone showing the Findmypast family tree after onboarding. Christopher Smith is marked Added, a suggested relative, Ingrid Green, has an Add button, and a banner reads "You\'ve added Christopher to your tree."',
              width: 670,
              height: 1200,
            },
          },
        ],
      },
      {
        label: '03 · Trade-offs',
        heading: 'Momentum over completeness.',
        list: [
          {
            title: 'Activation over data completeness',
            text: 'Fewer steps up front meant less profile data short term.',
          },
          {
            title: 'Record availability',
            text: 'Suggestions rely on historical record matches, so they work best for British ancestry.',
          },
          {
            title: 'Advanced users',
            text: 'Experienced genealogists reached advanced search and editing more slowly.',
          },
        ],
      },
      {
        label: '04 · Key product moments',
        heading: 'Next steps on the canvas, not a blank tree.',
        moments: [
          {
            title: 'Desktop tree with next steps',
            image: {
              src: treeassistDesktop,
              alt: 'A laptop showing the Findmypast family tree on desktop. Suggested relatives wait to be added around the tree, and a "Let\'s keep building the Green family tree" checklist on the right offers three next steps: review suggested relatives, build your tree with hints, and start a 7-day free trial.',
              width: 1800,
              height: 1142,
            },
            problem: 'After onboarding, new users faced a blank family-tree canvas.',
            decision:
              'Show suggested relatives around the tree and a checklist of next steps on the canvas. I advocated for interactive states in desktop onboarding, not the view-only state engineers proposed.',
            why: 'To get users into the core product and building their tree sooner.',
          },
        ],
      },
      {
        label: '05 · Descope dungeon',
        heading: 'Latency: Designing for a 2 to 30 second wait.',
        eyebrow: 'Descoped, not forgotten',
        eyebrowIcon: 'sword',
        body: [
          'Suggestions took 2 to 30 seconds to appear. I proposed progressive, personalised content during the wait, such as headlines from the user’s birthday. It was descoped to focus on core improvements and release speed.',
        ],
        image: {
          src: treeassistWait,
          alt: 'Four phones showing the descoped wait-state concept. A progress bar reads "We\'re checking our records for information on your relatives" above a "Browse while you wait" carousel: tips to grow your family tree, newspaper headlines on your birthday, a "Did you know" fact with a historic photo, and a prompt to try Findmypast free for 7 days.',
          caption: 'Wait-state concepts',
          width: 1800,
          height: 894,
        },
      },
      {
        label: '06 · Reflections',
        heading: 'Deliver value before asking for data.',
        body: [
          'Designing for momentum can unlock engagement and monetisation. Next: a personalised task list on the tree canvas to guide the free trial.',
        ],
      },
    ],
  },
}
