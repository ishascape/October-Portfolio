import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import type { Page } from './links'
import './styles/tokens.css'
import './styles/global.css'

const root = document.getElementById('root')!

// The pre-rendered HTML names its page; in dev there is none, so read it from the path.
const slug = root.dataset.page ?? window.location.pathname.replace(/^\/|\.html$|\/$/g, '')
const page: Page = !slug || slug === 'index' || slug === 'home' ? 'home' : { caseSlug: slug }

const app = (
  <StrictMode>
    <App page={page} />
  </StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
