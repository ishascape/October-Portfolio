import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyleGuide } from './StyleGuide'
import '../styles/tokens.css'
import '../styles/semantic.css'
import '../styles/global.css'
import './styleguide.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleGuide />
  </StrictMode>,
)
