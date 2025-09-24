import type { Speech } from '../types'

export type SpeechCardProps = {
  loading: boolean
  error: string | null
  speech: Speech | null
  year: number
}

export default function SpeechCard({ loading, error, speech, year }: SpeechCardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5">
      {loading && (
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-1/3 rounded bg-neutral-200" />
          <div className="h-10 w-2/3 rounded bg-neutral-200" />
          <div className="h-4 w-1/2 rounded bg-neutral-200" />
          <div className="h-4 w-full rounded bg-neutral-200" />
          <div className="h-4 w-11/12 rounded bg-neutral-200" />
          <div className="h-4 w-10/12 rounded bg-neutral-200" />
        </div>
      )}

      {!loading && error && (
        <div className="text-royal-primary">
          <div className="mb-2 text-sm font-semibold">Kunne ikke indlæse talen for {year}.</div>
          <div className="text-sm opacity-90">{error}</div>
        </div>
      )}

      {!loading && !error && speech && (
        <article className="max-w-none">
          <header className="mb-6">
            <div className="text-sm uppercase tracking-wider text-neutral-500">{new Date(speech.date).toLocaleDateString('da-DK', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
            <h1 className="mt-1 text-3xl font-semibold leading-tight text-royal-ink">{speech.title}</h1>
            <div className="mt-1 text-neutral-600">Af {speech.monarch}</div>
          </header>
          <div className="space-y-5 text-[17px] leading-8 text-neutral-800">
            {speech.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>
      )}

      {!loading && !error && !speech && (
        <div className="text-neutral-600">Ingen data at vise.</div>
      )}
    </div>
  )
}
