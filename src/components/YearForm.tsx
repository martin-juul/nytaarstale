export type YearFormProps = {
  defaultYear: number
  onSubmit: (e: React.FormEvent) => void
  className?: string
  inputClassName?: string
  buttonLabel?: string
}

export default function YearForm({ defaultYear, onSubmit, className = '', inputClassName = '', buttonLabel = 'Hent' }: YearFormProps) {
  return (
    <form onSubmit={onSubmit} className={`flex items-center gap-2 ${className}`}>
      <input
        type="number"
        name="year"
        inputMode="numeric"
        defaultValue={defaultYear}
        className={`w-28 appearance-none rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-neutral-400 focus:ring-2 focus:ring-royal-accent/30 ${inputClassName}`}
        aria-label="År"
      />
      <button
        type="submit"
        className="rounded-xl bg-royal-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-royal-primaryDark focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-accent/40 active:bg-royal-primaryDark/90"
      >
        {buttonLabel}
      </button>
    </form>
  )
}
