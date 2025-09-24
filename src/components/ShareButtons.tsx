import { useCallback, useMemo } from 'react'

export type ShareButtonsProps = {
  year: number
  title?: string
  monarch?: string
  className?: string
}

export default function ShareButtons({ year, title, monarch, className = '' }: ShareButtonsProps) {
  const { url, text } = useMemo(() => {
    let urlStr = ''
    try {
      const u = new URL(window.location.href)
      u.searchParams.set('year', String(year))
      urlStr = u.toString()
    } catch {
      // Fallback to relative link
      urlStr = `?year=${encodeURIComponent(String(year))}`
    }
    const t = title ? `${title} – Nytårstalen ${year}` : `Nytårstalen ${year}`
    const withAuthor = monarch ? `${t} – ${monarch}` : t
    return { url: urlStr, text: withAuthor }
  }, [year, title, monarch])

  const shareOnInstagram = useCallback(async () => {
    // Instagram does not support a public web share intent.
    // Try the Web Share API as best-effort; otherwise copy link.
    const shareData: ShareData = { title: 'Nytårstalen', text, url }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }
    } catch {
      // If user cancels or share fails, fall back to copy below.
    }
    try {
      await navigator.clipboard.writeText(url)
      alert('Link kopieret! Åbn Instagram og indsæt linket i din story eller bio.')
    } catch {
      // Final fallback: open the url so user can copy from address bar
      window.open(url, '_blank', 'noopener')
    }
  }, [text, url])

  const btn = 'inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-800 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-royal-accent/40 shadow-sm'

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  const blueskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${text} ${url}`)}`

  return (
    <div className={`mt-4 flex flex-wrap items-center gap-2 ${className}`} aria-label="Del">
      <span className="mr-1 text-xs uppercase tracking-wide text-neutral-500">Del</span>
      <a className={btn} href={facebookUrl} target="_blank" rel="noopener" aria-label="Del på Facebook" title="Del på Facebook">Facebook</a>
      <a className={btn} href={xUrl} target="_blank" rel="noopener" aria-label="Del på X" title="Del på X">X (Twitter)</a>
      <a className={btn} href={blueskyUrl} target="_blank" rel="noopener" aria-label="Del på Bluesky" title="Del på Bluesky">Bluesky</a>
      <button type="button" className={btn} onClick={shareOnInstagram} aria-label="Del på Instagram" title="Del på Instagram">Instagram</button>
    </div>
  )
}
