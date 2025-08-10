import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Play from './pages/Play.jsx'
import Workbench from './pages/Workbench.jsx'
import CodeEditor from './pages/CodeEditor.jsx'
import Results from './pages/Results.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex gap-4 bg-primary text-white p-4">
        <Link to="/">Home</Link>
        <Link to="/play">Play</Link>
        <Link to="/workbench">Workbench</Link>
        <Link to="/code">Code</Link>
        <Link to="/results">Results</Link>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/workbench" element={<Workbench />} />
          <Route path="/code" element={<CodeEditor />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>
    </div>
  )
}
