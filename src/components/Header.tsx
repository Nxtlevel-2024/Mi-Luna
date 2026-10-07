import { HandbagSimple } from '@phosphor-icons/react'
import { Container } from './Container'

const links = [
  { href: '#abonnement', label: 'Abonnement' },
  { href: '#zo-werkt-het', label: 'Zo werkt het' },
  { href: '#collectie', label: 'Shop' },
]

/* Sits on top of the full-bleed hero photo, so it starts in ecru on transparent. */
export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 text-ecru">
      <Container className="flex h-16 items-center justify-between md:h-[76px]">
        <a href="#top" className="text-xl font-bold tracking-tight uppercase">
          Mi-Luna
        </a>

        <nav aria-label="Hoofdnavigatie" className="hidden md:block">
          <ul className="flex items-center gap-10 text-[13px] font-medium tracking-wide uppercase">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="opacity-85 transition-opacity duration-200 hover:opacity-100">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#abonnement"
          aria-label="Winkelmand"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-full transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          <HandbagSimple size={22} weight="light" />
        </a>
      </Container>
    </header>
  )
}
