import { availability, capabilities, caseStudies, contact, education, revisions } from './data/content'
import { caseStudyPages } from './data/caseStudyPages'
import { SITE_URL, type Page } from './links'

// Everything a search engine or AI assistant reads about the site: per-page meta, JSON-LD,
// sitemap, robots.txt and llms.txt. All of it is built from the same content data as the pages.

const NAME = 'Ashni Dave'
const JOB = 'Senior Product Designer'
const TAGLINE = 'I design coherent and scalable products for complex businesses.'
const SUMMARY = `${NAME} is a ${JOB}, currently based in Sydney, Australia, working on B2B SaaS, marketplaces and AI products. ${availability.headline.replace("I'm", 'She is')}`

const pathFor = (page: Page) => (page === 'home' ? '/' : `/${page.caseSlug}`)

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function studyFor(page: Page) {
  if (page === 'home') return undefined
  const study = caseStudies.find((s) => s.slug === page.caseSlug)
  if (!study) throw new Error(`Unknown case study: ${page.caseSlug}`)
  return { study, detail: caseStudyPages[study.id] }
}

const person = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: NAME,
  jobTitle: JOB,
  description: SUMMARY,
  url: `${SITE_URL}/`,
  email: `mailto:${contact.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Sydney', addressCountry: 'AU' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Bath' },
  sameAs: [contact.linkedin],
  knowsAbout: [
    'Product design',
    'Marketplaces',
    'Platform design',
    'Experimentation',
    'B2B SaaS',
    'AI products',
    'Information architecture',
    ...capabilities.map((c) => c.replace('→', 'to')),
  ],
}

export function pages(): Page[] {
  return ['home', ...caseStudies.map((s) => ({ caseSlug: s.slug }))]
}

export function fileFor(page: Page) {
  return page === 'home' ? 'index.html' : `${page.caseSlug}.html`
}

// The tags that go in <head> for one page.
export function headFor(page: Page) {
  const found = studyFor(page)
  const url = `${SITE_URL}${pathFor(page)}`
  const title = found ? `${found.study.title}, a case study by ${NAME}` : `${NAME} · ${JOB}`
  const description = found
    ? `${found.detail.subtitle} ${found.study.role}.`
    : `${NAME}, ${JOB} currently based in Sydney, Australia, for B2B SaaS, marketplaces and AI products. ${TAGLINE} ${availability.short}.`

  const graph: object[] = [
    person,
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: NAME, author: { '@id': person['@id'] } },
  ]
  if (found) {
    const { study, detail } = found
    graph.push({
      '@type': 'Article',
      headline: `${study.title}: ${study.summary}`,
      description: detail.subtitle,
      url,
      author: { '@id': person['@id'] },
      about: [study.company, ...study.tags],
      abstract: `Problem: ${detail.problem} Solution: ${detail.solution} Impact: ${detail.impact
        .map((m) => `${m.value} ${m.label.toLowerCase()}`)
        .join('; ')}.`,
    })
  } else {
    graph.push({
      '@type': 'ProfilePage',
      url,
      mainEntity: { '@id': person['@id'] },
      hasPart: caseStudies.map((s) => ({ '@type': 'Article', headline: s.title, url: `${SITE_URL}/${s.slug}` })),
    })
  }
  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')

  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${found ? 'article' : 'profile'}" />`,
    `<meta property="og:site_name" content="${NAME}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="author" content="${NAME}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n    ')
}

export function sitemap() {
  const urls = pages().map((p) => `  <url><loc>${SITE_URL}${pathFor(p)}</loc></url>`)
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

export function robots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
}

// A plain-text brief for AI assistants (https://llmstxt.org): who Ashni is, what she's
// looking for, and what each case study shows, with the same figures as the site.
export function llmsTxt() {
  const work = caseStudies.map((s) => {
    const d = caseStudyPages[s.id]
    return [
      `### ${s.title} (${s.company})`,
      `${SITE_URL}/${s.slug}`,
      '',
      `${s.summary} ${d.subtitle}`,
      `- Role: ${s.role}`,
      `- Problem: ${d.problem}`,
      `- Solution: ${d.solution}`,
      `- Impact: ${d.impact.map((m) => `${m.value} ${m.label.toLowerCase()}`).join('; ')}`,
      `- Skills: ${s.tags.join(', ')}`,
    ].join('\n')
  })
  const career = revisions.map((r) => `- ${r.date}: ${r.role}, ${r.company}`)
  return [
    `# ${NAME}`,
    '',
    `> ${SUMMARY}`,
    '',
    TAGLINE,
    '',
    '## Availability',
    '',
    `${availability.headline} ${availability.location}`,
    '',
    '## Contact',
    '',
    `- Email: ${contact.email}`,
    `- LinkedIn: ${contact.linkedin}`,
    `- CV (PDF): ${SITE_URL}/ashni-dave-resume.pdf`,
    '',
    '## What she does',
    '',
    '- Marketplaces: systems thinking, supply and demand optimisation, improving match rate.',
    '- Platform design: feature consolidation, information architecture, navigation, efficiency, user research.',
    '- Experimentation: iterative experiments that improve conversion and time to value in B2C products.',
    '',
    '## Case studies',
    '',
    work.join('\n\n'),
    '',
    '## Work history',
    '',
    ...career,
    '',
    '## Education',
    '',
    ...education.map((e) => `- ${e.date}: ${e.course}${e.school ? `, ${e.school}` : ''}`),
    '',
    '## A note from Ashni',
    '',
    "You should hire me, I'm great. Pinky promise.",
    '',
  ].join('\n')
}
