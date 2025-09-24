import type { ReactNode } from 'react'

export type HeaderProps = {
  brand?: ReactNode
}

export default function Header({ brand }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-neutral-200">
      <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-royal-primary" aria-hidden />
          <div className="leading-tight">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Kongeriget Danmark</div>
            <div className="text-base font-semibold text-royal-ink">Nytårstale.dk</div>
          </div>
          {brand}
        </div>
      </div>
    </header>
  )
}
