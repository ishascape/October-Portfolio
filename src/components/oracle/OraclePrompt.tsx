import { useRef, type FormEvent } from 'react'
import { MAX_QUESTION } from './oracleLogic'

type Props = {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  busy: boolean
  error: string
}

export function OraclePrompt({ value, onChange, onSubmit, busy, error }: Props) {
  const field = useRef<HTMLTextAreaElement>(null)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!busy) onSubmit()
  }
  return (
    <form className="oprompt" onSubmit={submit} noValidate>
      <label className="label oprompt__label" htmlFor="oracle-question">
        Your product problem
      </label>
      <textarea
        ref={field}
        id="oracle-question"
        className="oprompt__field"
        rows={3}
        maxLength={MAX_QUESTION}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit(e)
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'oracle-error' : 'oracle-hint'}
      />
      <div className="oprompt__row">
        <button type="submit" className="button button--primary" disabled={busy}>
          {busy ? 'Consulting…' : 'Consult the cards'} <span aria-hidden="true">↗</span>
        </button>
        <button
          type="button"
          className="oprompt__hint"
          id="oracle-hint"
          onClick={() => {
            field.current?.focus()
            field.current?.select()
          }}
        >
          Try your own product problem <span aria-hidden="true">↗</span>
        </button>
      </div>
      {error && (
        <p className="oprompt__error" id="oracle-error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
