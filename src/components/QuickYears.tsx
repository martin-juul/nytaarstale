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
          className={`rounded-full px-4 py-2 text-sm border shadow-sm transition-colors cursor-pointer ${
            y === selected
              ? 'bg-royal-primary text-white border-royal-primary'
              : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50'
          }`}
        >
          {y}
        </button>
      ))}
    </section>
  )
}
