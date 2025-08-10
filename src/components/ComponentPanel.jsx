import { useState } from 'react'

// Panel listing available components. Items are draggable onto the workbench.
// Includes an "Advanced" toggle to reveal additional components.

export default function ComponentPanel({ components = [], advanced = [] }) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const items = [...components, ...(showAdvanced ? advanced : [])]

  return (
    <div className="border p-4 w-48">
      <h3 className="font-bold mb-2">Components</h3>
      <ul className="space-y-1 mb-2">
        {items.map((c) => (
          <li
            key={c}
            draggable
            data-component={c}
            className="p-1 border rounded text-sm bg-white hover:bg-gray-50 cursor-move"
          >
            {c}
          </li>
        ))}
      </ul>
      {advanced.length > 0 && (
        <button
          onClick={() => setShowAdvanced((s) => !s)}
          className="text-xs text-primary underline"
        >
          {showAdvanced ? 'Hide advanced' : 'Advanced'}
        </button>
      )}
    </div>
  )
}
