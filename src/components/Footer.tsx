import { InstagramLogo } from '@phosphor-icons/react'
import { Container } from './Container'

const columns = [
  {
    title: 'Winkel',
    links: [
      { href: '#collectie', label: 'Collectie' },
      { href: '#verhaal', label: 'Verhaal' },
    ],
  },
  {
    title: 'Service',
    links: [
      { href: '#', label: 'Verzending en retour' },
      { href: '#', label: 'Contact' },
    ],
  },
]

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line py-16 md:py-20">
      <Container className="grid grid-cols-2 gap-12 md:grid-cols-12">
        <div className="col-span-2 md:col-span-6">
          <p className="text-lg font-medium tracking-tight">Mi-Luna</p>
          <a
            href="#"
            aria-label="Mi-Luna op Instagram"
            className="-ml-2 mt-6 inline-flex size-10 items-center justify-center rounded-full text-ink-muted transition-colors duration-200 hover:bg-surface-raised hover:text-ink"
          >
            <InstagramLogo size={20} weight="light" />
          </a>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="md:col-span-3">
            <p className="text-sm text-ink">{column.title}</p>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors duration-200 hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="col-span-2 text-xs text-ink-muted md:col-span-12 md:mt-8">
          &copy; {year} Mi-Luna
        </p>
      </Container>
    </footer>
  )
}
