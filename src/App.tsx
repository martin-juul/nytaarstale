import { useEffect, useMemo, useState } from 'react'

type Speech = {
  year: number
  monarch: string
  date: string
  title: string
  paragraphs: string[]
}

const DK_RED = '#C8102E'

function App() {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState<number>(currentYear)
  const [speech, setSpeech] = useState<Speech | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const quickYears = useMemo(() => {
    const y = currentYear
    return [y, y - 1, y - 2]
  }, [currentYear])

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      setSpeech(null)
      try {
        const res = await fetch(`/assets/${year}.json`, { cache: 'no-store' })
        if (!res.ok) {
          throw new Error(res.status === 404 ? 'Ingen tale fundet for det år.' : 'Kunne ikke hente talen.')
        }
        const data: Speech = await res.json()
        if (!cancelled) setSpeech(data)
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Noget gik galt'
        if (!cancelled) setError(msg)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [year])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const fd = new FormData(form)
    const y = Number(fd.get('year'))
    if (!Number.isNaN(y) && y > 1800 && y < 3000) {
      setYear(y)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-neutral-200">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: DK_RED }} aria-hidden />
            <div className="leading-tight">
              <div className="text-sm text-neutral-500">Kongeriget Danmark</div>
              <div className="text-base font-semibold">Nytårstalen</div>
            </div>
          </div>
          <form onSubmit={onSubmit} className="hidden sm:flex items-center gap-2">
            <input
              type="number"
              name="year"
              inputMode="numeric"
              defaultValue={year}
              className="w-28 appearance-none rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-neutral-400 focus:ring-2 focus:ring-red-100"
              aria-label="År"
            />
            <button
              type="submit"
              className="rounded-xl bg-red-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 active:bg-red-900"
            >
              Hent
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <section className="mb-6 flex flex-wrap gap-2">
          {quickYears.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`rounded-full px-4 py-2 text-sm border shadow-sm transition-colors ${
                y === year
                  ? 'bg-red-700 text-white border-red-700'
                  : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              {y}
            </button>
          ))}
        </section>

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
            <div className="text-red-700">
              <div className="mb-2 text-sm font-semibold">Kunne ikke indlæse talen for {year}.</div>
              <div className="text-sm opacity-90">{error}</div>
            </div>
          )}

          {!loading && !error && speech && (
            <article className="max-w-none">
              <header className="mb-6">
                <div className="text-sm uppercase tracking-wider text-neutral-500">{new Date(speech.date).toLocaleDateString('da-DK', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                <h1 className="mt-1 text-3xl font-semibold leading-tight text-neutral-900">{speech.title}</h1>
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

        <form onSubmit={onSubmit} className="mt-10 flex items-center gap-2 sm:hidden">
          <input
            type="number"
            name="year"
            inputMode="numeric"
            defaultValue={year}
            className="w-28 appearance-none rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-neutral-400 focus:ring-2 focus:ring-red-100"
            aria-label="År"
          />
          <button
            type="submit"
            className="rounded-xl bg-red-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 active:bg-red-900"
          >
            Hent
          </button>
        </form>
      </main>

      <footer className="border-t border-neutral-200 bg-white/80">
        <div className="mx-auto max-w-4xl px-6 py-6 text-xs text-neutral-500 flex flex-wrap items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Nytårstalen – Et uofficielt arkiv</div>
          <div>
            Farver: Dannebrog rød og hvid. Designstil: inspireret af Apple HIG.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
