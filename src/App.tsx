import { useEffect, useMemo, useState } from 'react'
import type { Speech } from './types'
import Header from './components/Header'
import QuickYears from './components/QuickYears'
import SpeechCard from './components/SpeechCard'
import YearForm from './components/YearForm'
import Footer from './components/Footer'

function App() {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState<number>(currentYear - 1)
  const [speech, setSpeech] = useState<Speech | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [availableYears, setAvailableYears] = useState<number[]>([])

  useEffect(() => {
    let cancelled = false
    async function loadYears() {
      try {
        const res = await fetch('/assets/years.json', { cache: 'no-store' })
        if (!res.ok) throw new Error('Kunne ikke hente årsliste.')
        const raw = (await res.json()) as Array<number | string>
        let ys = Array.isArray(raw)
          ? raw
              .map((v) => Number(v))
              .filter((n) => Number.isFinite(n) && n > 1800 && n < 3000)
          : []
        // unique and sort desc
        ys = Array.from(new Set(ys)).sort((a, b) => b - a)
        if (!cancelled) {
          setAvailableYears(ys)
          if (ys.length > 0 && !ys.includes(year)) {
            setYear(ys[0])
          }
        }
      } catch {
        // If we cannot load the years manifest, leave quick years empty.
      }
    }
    loadYears()
    return () => {
      cancelled = true
    }
  }, [])

  const quickYears = useMemo(() => availableYears, [availableYears])

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
    <div className="min-h-screen bg-royal-paper text-royal-ink">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:shadow" >Spring til indhold</a>
      <Header/>

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <QuickYears years={quickYears} selected={year} onSelect={setYear} />

        <SpeechCard loading={loading} error={error} speech={speech} year={year} />

        <YearForm defaultYear={year} onSubmit={onSubmit} className="mt-10 sm:hidden" />
      </main>

      <Footer />
    </div>
  )
}

export default App
