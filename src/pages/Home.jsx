import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const stats = JSON.parse(
    localStorage.getItem('stats') || '{"played":0,"won":0}'
  )

  return (
    <div className="text-center space-y-6">
      <h1 className="text-3xl font-bold">Circuit Case Files</h1>
      <p className="max-w-xl mx-auto">
        Solve playful hardware puzzles using a virtual breadboard and code.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/play?mode=daily"
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Play Daily
        </Link>
        <Link
          to="/play?mode=endless"
          className="px-4 py-2 bg-secondary text-white rounded"
        >
          Play Endless
        </Link>
      </div>
      <div className="mt-8">
        <h2 className="font-semibold mb-2">Stats</h2>
        <p>Games Played: {stats.played}</p>
        <p>Wins: {stats.won}</p>
      </div>
    </div>
  )
}
