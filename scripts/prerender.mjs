// Renders every page to static HTML after the client build, plus sitemap, robots and llms.txt.
// Usage: node scripts/prerender.mjs <client outDir> <ssr outDir>
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const [outDir = 'dist', ssrDir = 'dist-ssr'] = process.argv.slice(2)
const server = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
const template = readFileSync(join(outDir, 'index.html'), 'utf8')

for (const page of server.pages()) {
  const name = page === 'home' ? 'home' : page.caseSlug
  const html = template
    .replace(/<!--head-->[\s\S]*<!--\/head-->/, server.headFor(page))
    .replace('<div id="root"></div>', `<div id="root" data-page="${name}">${server.render(page)}</div>`)
  writeFileSync(join(outDir, server.fileFor(page)), html)
  console.log('prerendered', server.fileFor(page))
}
writeFileSync(join(outDir, 'sitemap.xml'), server.sitemap())
writeFileSync(join(outDir, 'robots.txt'), server.robots())
writeFileSync(join(outDir, 'llms.txt'), server.llmsTxt())
rmSync(ssrDir, { recursive: true, force: true })
