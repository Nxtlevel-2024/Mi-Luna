import { useState, type ImgHTMLAttributes } from 'react'

/*
 * Image that keeps its box and falls back to a warm sand tone when the source
 * fails, so a missing placeholder never collapses the layout.
 */
export function Photo({ className = '', alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div role="img" aria-label={alt} className={`bg-sand ${className}`} />
  }

  return <img alt={alt} onError={() => setFailed(true)} className={`bg-sand object-cover ${className}`} {...props} />
}
