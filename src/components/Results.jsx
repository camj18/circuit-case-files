import React, { useEffect, useState } from 'react'

const Results = ({ log, puzzle }) => {
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    const { threshold, minDurationMs, triggerWindowMs, maxFalseAlarms } =
      puzzle.successCondition
    const sampleInterval = 100 // ms per signalData sample
    const minSamples = Math.ceil(minDurationMs / sampleInterval)
    const windowSamples = Math.ceil(triggerWindowMs / sampleInterval)

    // Determine noise events
    const noiseStarts = []
    let count = 0
    for (let i = 0; i < puzzle.signalData.length; i++) {
      if (puzzle.signalData[i] > threshold) {
        count++
        if (
          count >= minSamples &&
          (noiseStarts.length === 0 ||
            noiseStarts[noiseStarts.length - 1] !== i - count + 1)
        ) {
          noiseStarts.push(i - count + 1)
        }
      } else {
        count = 0
      }
    }

    // Alarm events from log
    const alarms = []
    log.forEach((e) => {
      if (e.state) {
        const last = alarms[alarms.length - 1]
        if (last === undefined || e.index - last > 1) {
          alarms.push(e.index)
        }
      }
    })

    let matched = 0
    noiseStarts.forEach((n) => {
      const match = alarms.find((a) => a >= n && a <= n + windowSamples)
      if (match !== undefined) matched++
    })

    const falseAlarms = alarms.filter(
      (a) => !noiseStarts.some((n) => a >= n && a <= n + windowSamples)
    ).length
    const success =
      matched === noiseStarts.length && falseAlarms <= maxFalseAlarms

    setAnalysis({
      success,
      matched,
      noiseEvents: noiseStarts.length,
      falseAlarms,
    })
  }, [log, puzzle])

  if (!analysis) return <div className="results"></div>

  return (
    <div className="results">
      <h3>Results: {analysis.success ? 'Pass' : 'Fail'}</h3>
      <p>
        Detected {analysis.matched} of {analysis.noiseEvents} noise events
      </p>
      <p>False alarms: {analysis.falseAlarms}</p>
    </div>
  )
}

export default Results
