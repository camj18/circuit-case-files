import { useState } from 'react'

// Simple three-step tour overlay guiding the user through core actions

const steps = [
  'Place the microphone on the breadboard',
  'Wire the microphone signal to pin A0',
  'Add a threshold block in the code editor and run',
]

export default function TourOverlay({ onFinish }) {
  const [step, setStep] = useState(0)

  if (step >= steps.length) return null

  const next = () => {
    if (step >= steps.length - 1) {
      if (onFinish) onFinish()
    }
    setStep((s) => s + 1)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-80 text-center space-y-4">
        <p>{steps[step]}</p>
        <button
          onClick={next}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          {step === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  )
}
