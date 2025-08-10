import * as Tone from 'tone'

export function exampleMicTrace() {
  // simulate SPL trace with occasional spikes for the "kids in library" scenario
  const base = 35
  const trace = Array.from({ length: 256 }, (_, i) => {
    const noise = Math.sin(i / 10) * 5 + (Math.random() * 2 - 1)
    const kids = i % 50 === 0 ? 20 : 0
    return base + noise + kids
  })
  // touch Tone.js context so the library is used
  Tone.getContext()
  return trace
}
