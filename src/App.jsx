import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Workbench from './pages/Workbench';
import CodeEditor from './pages/CodeEditor';
import Results from './pages/Results';

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/workbench">Workbench</Link>
        <Link to="/code">Code</Link>
        <Link to="/results">Results</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workbench" element={<Workbench />} />
        <Route path="/code" element={<CodeEditor />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}
