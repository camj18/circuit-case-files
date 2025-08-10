import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Workbench from './pages/Workbench.jsx'
import CodeEditor from './pages/CodeEditor.jsx'
import Results from './pages/Results.jsx'
export default function App() {
  return (
    <div style={{padding:16}}>
      <nav style={{display:'flex', gap:12, marginBottom:16}}>
        <Link to="/">Home</Link>
        <Link to="/workbench">Workbench</Link>
        <Link to="/code">Code</Link>
        <Link to="/results">Results</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/workbench" element={<Workbench/>} />
        <Route path="/code" element={<CodeEditor/>} />
        <Route path="/results" element={<Results/>} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </div>
  )
}
