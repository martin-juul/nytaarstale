export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white/80">
      <div className="mx-auto max-w-4xl px-6 py-6 text-xs text-neutral-500 flex flex-wrap items-center justify-between gap-2">
        <div>© {new Date().getFullYear()} Nytårstalen – Et uofficielt arkiv</div>
        <div>
          <a className="underline hover:text-royal-primary" href="https://juul.xyz" target="_blank">Martin Christiansen</a>
        </div>
      </div>
    </footer>
  )
}
