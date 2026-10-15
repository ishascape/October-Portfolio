import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Work } from './components/Work'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CaseStudy } from './components/CaseStudy'
import { useSheetStack } from './useSheetStack'
import { SketchDefs } from './components/Sketch'
import { caseStudies } from './data/content'
import type { Page } from './links'

// Each page is its own HTML file (pre-rendered at build time), so crawlers and AI tools
// read the full content without running any JavaScript.
export function App({ page }: { page: Page }) {
  useSheetStack([page])
  const study = page === 'home' ? undefined : caseStudies.find((s) => s.slug === page.caseSlug)

  return (
    <>
      <SketchDefs />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav onHome={!study} />
      <main id="main">
        {study ? (
          <>
            <CaseStudy id={study.id} />
            <Contact />
          </>
        ) : (
          <>
            <Hero />
            <Work />
            <About />
            <Contact />
          </>
        )}
      </main>
      <Footer onHome={!study} />
    </>
  )
}
