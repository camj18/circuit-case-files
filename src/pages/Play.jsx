import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import puzzles from '../data/puzzles.json'
import { useGameStore } from '../state/useGameStore'

export default function Play() {
  const location = useLocation()
  const mode = new URLSearchParams(location.search).get('mode') || 'daily'
  const puzzle = puzzles[0]
  const setPuzzle = useGameStore((s) => s.setPuzzle)

  useEffect(() => {
    setPuzzle(puzzle)
  }, [puzzle, setPuzzle])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{puzzle.title}</h1>
      <p>{puzzle.description}</p>
      <p className="text-sm text-gray-600">Mode: {mode}</p>
      <Link
        to="/workbench"
        className="inline-block px-4 py-2 bg-primary text-white rounded"
      >
        Start Workbench
      </Link>
    </div>
  )
}
