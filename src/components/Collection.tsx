import { ArrowClockwise } from '@phosphor-icons/react'
import { formatPrice, type Product } from '../lib/shopify'
import { useProducts } from '../lib/useProducts'
import { Container } from './Container'

const PRODUCT_COUNT = 4

export function Collection() {
  const products = useProducts(PRODUCT_COUNT)

  return (
    <section id="collectie" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">De collectie</h2>
        <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-muted">
          Een kleine selectie, met aandacht gekozen.
        </p>

        <div className="mt-14 md:mt-20">
          {products.status === 'loading' && <ProductGridSkeleton />}

          {products.status === 'error' && (
            <div role="alert" className="max-w-md">
              <p className="text-ink">De collectie kon niet worden geladen.</p>
              <p className="mt-1 text-sm text-ink-muted">{products.message}</p>
              <button
                type="button"
                onClick={products.retry}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition-colors duration-200 hover:bg-surface-raised active:scale-[0.98]"
              >
                <ArrowClockwise size={16} />
                Opnieuw proberen
              </button>
            </div>
          )}

          {products.status === 'success' && products.products.length === 0 && (
            <p className="text-ink-muted">
              Er staan nog geen producten online. Voeg producten toe in Shopify en publiceer ze naar
              het Headless-kanaal.
            </p>
          )}

          {products.status === 'success' && products.products.length > 0 && (
            <ProductGrid products={products.products} />
          )}
        </div>
      </Container>
    </section>
  )
}

/*
 * Offset grid: the first product is featured (taller, 4:5), the rest sit in a
 * quieter 3:4 row next to it. Collapses to a single column below md.
 */
function ProductGrid({ products }: { products: Product[] }) {
  const [featured, ...rest] = products

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12">
      <ProductCard product={featured} className="md:col-span-6" aspect="aspect-[4/5]" />
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:col-span-6 md:mt-24">
        {rest.map((product) => (
          <ProductCard key={product.id} product={product} aspect="aspect-[3/4]" />
        ))}
      </div>
    </div>
  )
}

function ProductCard({
  product,
  aspect,
  className = '',
}: {
  product: Product
  aspect: string
  className?: string
}) {
  const href = product.onlineStoreUrl ?? `#${product.handle}`

  return (
    <a href={href} className={`group block ${className}`}>
      <div className={`${aspect} overflow-hidden rounded-[4px] bg-surface-raised`}>
        {product.image && (
          <img
            src={`${product.image.url}&width=900`}
            alt={product.image.altText ?? product.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          />
        )}
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-6">
        <h3 className="text-base">{product.title}</h3>
        <p className="shrink-0 text-sm text-ink-muted tabular-nums">{formatPrice(product.price)}</p>
      </div>
    </a>
  )
}

function ProductGridSkeleton() {
  return (
    <div aria-hidden className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12">
      <SkeletonCard className="md:col-span-6" aspect="aspect-[4/5]" />
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:col-span-6 md:mt-24">
        {Array.from({ length: PRODUCT_COUNT - 1 }, (_, i) => (
          <SkeletonCard key={i} aspect="aspect-[3/4]" />
        ))}
      </div>
    </div>
  )
}

function SkeletonCard({ aspect, className = '' }: { aspect: string; className?: string }) {
  return (
    <div className={`animate-pulse motion-reduce:animate-none ${className}`}>
      <div className={`${aspect} rounded-[4px] bg-surface-raised`} />
      <div className="mt-5 h-4 w-2/5 rounded-full bg-surface-raised" />
    </div>
  )
}
