export type QuickYearsProps = {
  years: number[]
  selected: number
  onSelect: (y: number) => void
}

export default function QuickYears({ years, selected, onSelect }: QuickYearsProps) {
  return (
    <section className="mb-6 flex flex-wrap gap-2">
      {years.map((y) => (
        <button
          key={y}
          onClick={() => onSelect(y)}
          aria-pressed={y === selected}
          aria-label={`Vælg år ${y}${y === selected ? ' (aktivt)' : ''}`}
          title={y === selected ? 'Aktivt år' : 'Vælg år'}
          className={`rounded-full px-4 py-2 text-sm border shadow-sm transition-colors focus:outline-none cursor-pointer ${
            y === selected
              ? 'bg-red-400 text-white border-royal-primary font-semibold shadow-md hover:bg-royal-primaryDark'
              : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-royal-accent/40'
          }`}
        >
          {y}
        </button>
      ))}
    </section>
  )
}
