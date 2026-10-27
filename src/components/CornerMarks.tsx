export function CornerMarks() {
  return (
    <>
      <svg viewBox="0 0 40 40" className="pointer-events-none fixed left-3 top-3 z-30 hidden h-6 w-6 text-(--color-ink)/25 lg:block">
        <path d="M2 14V2H14" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 40 40" className="pointer-events-none fixed right-3 top-3 z-30 hidden h-6 w-6 rotate-90 text-(--color-ink)/25 lg:block">
        <path d="M2 14V2H14" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 40 40" className="pointer-events-none fixed bottom-3 left-3 z-30 hidden h-6 w-6 -rotate-90 text-(--color-ink)/25 lg:block">
        <path d="M2 14V2H14" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 40 40" className="pointer-events-none fixed bottom-3 right-3 z-30 hidden h-6 w-6 rotate-180 text-(--color-ink)/25 lg:block">
        <path d="M2 14V2H14" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </>
  );
}
