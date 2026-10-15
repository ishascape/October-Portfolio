import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Work } from './components/Work'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CaseStudy } from './components/CaseStudy'
import { useRoute } from './useRoute'
import { useSheetStack } from './useSheetStack'
import { SketchDefs } from './components/Sketch'

export function App() {
  const route = useRoute()
  useSheetStack([route])

  return (
    <>
      <SketchDefs />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav route={route.page} />
      <main id="main">
        {route.page === 'case' ? (
          <>
            <CaseStudy key={route.id} id={route.id} />
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
      <Footer />
    </>
  )
}
