import { useRef, useState } from 'react'

// Very lightweight wire drawing canvas. Users click to start and end a wire.
// Wires snap to a 10px grid.

function snap(value) {
  return Math.round(value / 10) * 10
}

export default function WireCanvas() {
  const svgRef = useRef(null)
  const [start, setStart] = useState(null)
  const [wires, setWires] = useState([])
  const [hover, setHover] = useState(null)

  const handleClick = (e) => {
    const rect = svgRef.current.getBoundingClientRect()
    const point = {
      x: snap(e.clientX - rect.left),
      y: snap(e.clientY - rect.top),
    }
    if (!start) {
      setStart(point)
    } else {
      setWires([
        ...wires,
        { x1: start.x, y1: start.y, x2: point.x, y2: point.y },
      ])
      setStart(null)
    }
  }

  return (
    <svg
      ref={svgRef}
      width={260}
      height={160}
      className="absolute inset-0"
      onClick={handleClick}
    >
      {wires.map((w, i) => (
        <line
          key={i}
          x1={w.x1}
          y1={w.y1}
          x2={w.x2}
          y2={w.y2}
          stroke={hover === i ? '#0f0' : '#f00'}
          strokeWidth="2"
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
        />
      ))}
      {start && <circle cx={start.x} cy={start.y} r={3} fill="blue" />}
    </svg>
  )
}
