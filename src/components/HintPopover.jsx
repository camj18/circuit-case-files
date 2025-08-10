import { useState } from 'react'

// Shows tiered hints in a small popover

export default function HintPopover({ hints = [] }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const current = hints[index]

  const next = () => {
    setIndex((i) => Math.min(i + 1, hints.length - 1))
  }

  return (
    <div className="relative inline-block">
      <button
        className="px-3 py-1 bg-accent text-white rounded"
        onClick={() => setOpen((o) => !o)}
      >
        Hint
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-48 p-2 bg-white border rounded shadow">
          <p className="text-sm">{current || 'No more hints'}</p>
          {current && index < hints.length - 1 && (
            <button className="mt-2 text-xs text-primary" onClick={next}>
              Next hint
            </button>
          )}
        </div>
      )}
    </div>
  )
}
