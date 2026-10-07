import { useState, type FormEvent } from 'react'
import { Container } from './Container'

type Status = 'idle' | 'error' | 'success'

export function Newsletter() {
  const [status, setStatus] = useState<Status>('idle')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = new FormData(event.currentTarget).get('email')
    // TODO: connect to Shopify customer marketing consent or the chosen email provider.
    setStatus(typeof email === 'string' && /^\S+@\S+\.\S+$/.test(email) ? 'success' : 'error')
  }

  return (
    <section id="nieuwsbrief" className="scroll-mt-20 border-t border-line py-24 md:py-32">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Blijf op de hoogte</h2>
          <p className="mt-4 max-w-[40ch] leading-relaxed text-ink-muted">
            Nieuwe stukken en kleine verhalen, hooguit een keer per maand.
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit} className="md:col-span-6 md:col-start-7 md:self-end">
          {status === 'success' ? (
            <p role="status" className="text-lg">
              Dank je. Je ontvangt binnenkort een bevestiging.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-ink">
                E-mailadres
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'email-error' : undefined}
                  className="h-12 w-full rounded-full sm:flex-1 border border-line bg-transparent px-5 text-base placeholder:text-ink-muted focus:border-ink focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-12 rounded-full bg-accent px-7 text-sm font-medium text-accent-ink transition-transform duration-200 active:scale-[0.98]"
                >
                  Aanmelden
                </button>
              </div>
              {status === 'error' && (
                <p id="email-error" className="text-sm text-ink">
                  Vul een geldig e-mailadres in.
                </p>
              )}
            </div>
          )}
        </form>
      </Container>
    </section>
  )
}
