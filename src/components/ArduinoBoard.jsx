import { useState } from 'react'

// Simplified Arduino UNO representation with pins and tooltips

const analogPins = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5']
const digitalPins = [
  'D2',
  'D3',
  'D4',
  'D5',
  'D6',
  'D7',
  'D8',
  'D9',
  'D10',
  'D11',
  'D12',
  'D13',
]
const powerPins = ['5V', '3V3', 'GND', 'VIN']

function Pin({ label }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs">
        {label}
      </div>
      {hover && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-1 rounded">
          {label}
        </div>
      )}
    </div>
  )
}

export default function ArduinoBoard() {
  return (
    <div className="border p-4 flex flex-col gap-2 flex-1">
      <div className="flex flex-wrap gap-1">
        {analogPins.map((p) => (
          <Pin key={p} label={p} />
        ))}
      </div>
      <div className="flex flex-wrap gap-1">
        {digitalPins.map((p) => (
          <Pin key={p} label={p} />
        ))}
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {powerPins.map((p) => (
          <Pin key={p} label={p} />
        ))}
      </div>
    </div>
  )
}
