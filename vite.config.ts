import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

declare const process: { env: Record<string, string | undefined> }

// Evidence placeholders (src/components/EvidencePlaceholder.tsx) show only in dev, on Vercel preview deployments,
// or when SHOW_EVIDENCE=1 is set. Production builds never render them.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    __SHOW_EVIDENCE__: JSON.stringify(
      mode === 'development' || process.env.VERCEL_ENV === 'preview' || process.env.SHOW_EVIDENCE === '1',
    ),
  },
}))
