import { HandbagSimple } from '@phosphor-icons/react'
import { Container } from './Container'

const links = [
  { href: '#collectie', label: 'Collectie' },
  { href: '#verhaal', label: 'Verhaal' },
  { href: '#nieuwsbrief', label: 'Nieuwsbrief' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/60 bg-surface/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between md:h-[72px]">
        <a href="#top" className="text-lg font-medium tracking-tight">
          Mi-Luna
        </a>

        <nav aria-label="Hoofdnavigatie" className="hidden md:block">
          <ul className="flex items-center gap-10 text-sm text-ink-muted">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors duration-200 hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#collectie"
          aria-label="Winkelmand"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-surface-raised"
        >
          <HandbagSimple size={20} weight="light" />
        </a>
      </Container>
    </header>
  )
}
