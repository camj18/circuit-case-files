import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import puzzles from '../data/puzzles.json'
import ResultsAnalysis from '../components/Results'

export default function Results() {
  const location = useLocation()
  const { log = [] } = location.state || {}
  const puzzle = puzzles[0]
  const [analysis, setAnalysis] = useState(null)

  const share = () => {
    if (!analysis) return
    const text = `Circuit Case Files: ${analysis.success ? 'Success' : 'Fail'} - ` +
      `${analysis.matched}/${analysis.noiseEvents} events`
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-4">
      <ResultsAnalysis log={log} puzzle={puzzle} onAnalysis={setAnalysis} />
      <div className="flex gap-4">
        <button
          onClick={share}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Share
        </button>
        <Link
          to="/play"
          className="px-4 py-2 bg-secondary text-white rounded"
        >
          Play Again
        </Link>
      </div>
    </div>
  )
}
