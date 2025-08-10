import { useEffect, useRef } from 'react'
import { FFT } from 'dsp.js'

// Visualizes waveform and FFT spectrum of provided data array

export default function SignalVisualizer({ data = [] }) {
  const waveRef = useRef(null)
  const fftRef = useRef(null)

  useEffect(() => {
    if (!data.length) return

    const waveCtx = waveRef.current.getContext('2d')
    waveCtx.clearRect(0, 0, 200, 80)
    waveCtx.strokeStyle = '#10b981'
    waveCtx.beginPath()
    data.slice(0, 200).forEach((v, i) => {
      const x = (i / 200) * 200
      const y = 40 - v * 40
      if (i === 0) waveCtx.moveTo(x, y)
      else waveCtx.lineTo(x, y)
    })
    waveCtx.stroke()

    const fft = new FFT(1024, 44100)
    const segment = data.slice(0, 1024)
    while (segment.length < 1024) segment.push(0)
    fft.forward(segment)
    const spec = fft.spectrum

    const fftCtx = fftRef.current.getContext('2d')
    fftCtx.clearRect(0, 0, 200, 80)
    fftCtx.fillStyle = '#3b82f6'
    for (let i = 0; i < Math.min(spec.length, 200); i++) {
      const h = spec[i] * 4000
      fftCtx.fillRect(i, 80 - h, 1, h)
    }
  }, [data])

  return (
    <div className="border p-2 flex gap-2 flex-1">
      <canvas ref={waveRef} width={200} height={80} className="bg-white" />
      <canvas ref={fftRef} width={200} height={80} className="bg-white" />
    </div>
  )
}
