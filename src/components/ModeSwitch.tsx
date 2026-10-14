import type { PlanMode } from './SitePlan'

interface ModeSwitchProps {
  mode: PlanMode
  onChange: (mode: PlanMode) => void
}

// Existing ⇄ proposed: the architectural before/after convention. Styles live in Hero.css.
export function ModeSwitch({ mode, onChange }: ModeSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={mode === 'proposed'}
      aria-label="Proposed: show what shipped"
      className="switch mono"
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
