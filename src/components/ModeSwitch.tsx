import type { PlanMode } from './SitePlan'
import './ModeSwitch.css'

interface ModeSwitchProps {
  mode: PlanMode
  onChange: (mode: PlanMode) => void
}

// Existing ⇄ proposed: the architectural before/after convention.
export function ModeSwitch({ mode, onChange }: ModeSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={mode === 'proposed'}
      aria-label="Existing Proposed: show what shipped"
      className="switch label"
      onClick={() => onChange(mode === 'existing' ? 'proposed' : 'existing')}
    >
      <span data-on={mode === 'existing'}>Existing</span>
      <span className="switch__track" aria-hidden="true">
        <span className="switch__thumb" />
      </span>
      <span data-on={mode === 'proposed'}>Proposed</span>
    </button>
  )
}
