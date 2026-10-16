// Every page is pre-rendered to its own HTML file.
// Production (Vercel, cleanUrls): /, /venue-finder, /hosthq, /tree-assist — the same URLs the old site used.
// Static preview build (VITE_LINKS=file): index.html, venue-finder.html, … so it works from any folder.
const FILE_LINKS = import.meta.env.VITE_LINKS === 'file'

export const SITE_URL = 'https://ashnidave.com'

export type Page = 'home' | { caseSlug: string }

export function homeHref(hash = '') {
  return FILE_LINKS ? `index.html${hash}` : `/${hash}`
}

export function caseHref(slug: string) {
  return FILE_LINKS ? `${slug}.html` : `/${slug}`
}

// A section anchor: in-page on the homepage, a link back home from anywhere else.
export function sectionHref(id: string, onHome: boolean) {
  return onHome ? `#${id}` : homeHref(`#${id}`)
}
