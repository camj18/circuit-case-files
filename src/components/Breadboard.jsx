import { useState } from 'react'

// Simple breadboard grid with drag / drop highlight support
// This is a minimal placeholder for the eventual interactive breadboard

const ROWS = 10
const COLS = 30

export default function Breadboard({ onCellDrop }) {
  const [hoverIndex, setHoverIndex] = useState(null)

  const handleDragOver = (e, index) => {
    e.preventDefault()
    setHoverIndex(index)
  }

  const handleDragLeave = () => setHoverIndex(null)

  const handleDrop = (e, index) => {
    e.preventDefault()
    const component = e.dataTransfer.getData('component')
    setHoverIndex(null)
    if (onCellDrop) onCellDrop({ component, index })
  }

  const cells = Array.from({ length: ROWS * COLS }, (_, i) => (
    <div
      key={i}
      onDragOver={(e) => handleDragOver(e, i)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, i)}
      className={`w-4 h-4 border border-gray-300 ${
        hoverIndex === i ? 'bg-yellow-200' : 'bg-white'
      }`}
    />
  ))

  return <div className="p-2 border flex flex-wrap w-[260px]">{cells}</div>
}
