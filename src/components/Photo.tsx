import { useState, type ImgHTMLAttributes } from 'react'

/*
 * Image that keeps its box and falls back to a deep espresso tone when the source
 * fails, so a missing placeholder never collapses the layout.
 */
export function Photo({ className = '', alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div role="img" aria-label={alt} className={`bg-espresso ${className}`} />
  }

  return <img alt={alt} onError={() => setFailed(true)} className={`bg-espresso object-cover ${className}`} {...props} />
}
