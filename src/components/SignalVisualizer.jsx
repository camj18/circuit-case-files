import { useEffect } from 'react'
import { FFT } from 'dsp.js'

export default function SignalVisualizer({ data = [] }) {
  useEffect(() => {
    if (data.length) {
      const fft = new FFT(1024, 44100)
      const segment = data.slice(0, 1024)
      while (segment.length < 1024) segment.push(0)
      fft.forward(segment)
      console.log('FFT Spectrum', fft.spectrum)
    }
  }, [data])

  return <div className="border p-4 flex-1">Signal Visualizer</div>
}
