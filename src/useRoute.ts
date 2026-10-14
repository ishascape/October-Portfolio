import { useEffect, useState } from 'react'
import { caseStudies, type CaseStudyId } from './data/content'

export type Route = { page: 'home' } | { page: 'case'; id: CaseStudyId }

// Hash routing: "#/work/<id>" is a case study, any other hash is a section on the homepage.
// It needs no server rewrites, so the same build works on Vercel and as a static preview.
function parse(hash: string): Route {
  const match = hash.match(/^#\/work\/([\w-]+)/)
  const study = match && caseStudies.find((s) => s.id === match[1])
  return study ? { page: 'case', id: study.id } : { page: 'home' }
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(window.location.hash))

  useEffect(() => {
    // In-page anchors that don't exist on the homepage (like the skip link) keep the current page.
    const onChange = () => {
      const hash = window.location.hash
      const homeSection = /^#(top|work|about|contact|how-i-work)?$/.test(hash)
      if (hash.startsWith('#/') || homeSection) setRoute(parse(hash))
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  // After the page swaps, land in the right place: the top of a case study, or the section asked for.
  useEffect(() => {
    const hash = window.location.hash
    if (route.page === 'case') {
      window.scrollTo(0, 0)
      document.getElementById('case-title')?.focus({ preventScroll: true })
      const study = caseStudies.find((s) => s.id === route.id)
      document.title = `${study?.title} · Ashni Dave`
    } else {
      document.title = 'Ashni Dave · Senior Product Designer'
      const target = hash.length > 1 && !hash.startsWith('#/') ? document.getElementById(hash.slice(1)) : null
      if (target) target.scrollIntoView()
    }
  }, [route])

  return route
}
