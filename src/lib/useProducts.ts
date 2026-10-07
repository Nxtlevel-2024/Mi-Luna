import { useCallback, useEffect, useState } from 'react'
import { getProducts, type Product } from './shopify'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; products: Product[] }

export function useProducts(first: number) {
  const [state, setState] = useState<State>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    getProducts(first, controller.signal)
      .then((products) => setState({ status: 'success', products }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({
          status: 'error',
          message: error instanceof Error ? error.message : 'Onbekende fout',
        })
      })

    return () => controller.abort()
  }, [first, attempt])

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((n) => n + 1)
  }, [])

  return { ...state, retry }
}
