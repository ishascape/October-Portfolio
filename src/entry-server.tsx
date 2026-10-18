import { renderToString } from 'react-dom/server'
import { App } from './App'
import type { Page } from './links'

export { pages, fileFor, headFor, sitemap, robots, llmsTxt } from './seo'

export function render(page: Page) {
  return renderToString(<App page={page} />)
}
