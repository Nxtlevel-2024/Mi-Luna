const API_VERSION = '2025-07'

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN

export type Product = {
  id: string
  title: string
  handle: string
  onlineStoreUrl: string | null
  price: { amount: string; currencyCode: string }
  image: { url: string; altText: string | null; width: number; height: number } | null
}

type ProductsResponse = {
  data?: {
    products: {
      nodes: Array<{
        id: string
        title: string
        handle: string
        onlineStoreUrl: string | null
        priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
        featuredImage: Product['image']
      }>
    }
  }
  errors?: Array<{ message: string }>
}

export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
  signal?: AbortSignal,
): Promise<T> {
  if (!domain || !token) {
    throw new Error('Shopify-configuratie ontbreekt. Controleer het .env bestand.')
  }

  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    signal,
  })

  if (!res.ok) {
    throw new Error(`Shopify gaf status ${res.status}`)
  }

  return res.json() as Promise<T>
}

const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        onlineStoreUrl
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
          width
          height
        }
      }
    }
  }
`

export async function getProducts(first: number, signal?: AbortSignal): Promise<Product[]> {
  const json = await storefront<ProductsResponse>(PRODUCTS_QUERY, { first }, signal)

  if (json.errors?.length) {
    throw new Error(json.errors[0].message)
  }

  return (json.data?.products.nodes ?? []).map((node) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    onlineStoreUrl: node.onlineStoreUrl,
    price: node.priceRange.minVariantPrice,
    image: node.featuredImage,
  }))
}

export function formatPrice({ amount, currencyCode }: Product['price']) {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: currencyCode }).format(
    Number(amount),
  )
}
