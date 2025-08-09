import React, { useState, useEffect } from 'react';
import puzzles from '../data/puzzles.json';
import CodeEditor from './CodeEditor';
import Results from './Results';

const Workbench = () => {
  const puzzle = puzzles.find(p => p.id === 'library-noise');
  const [placed, setPlaced] = useState([]);
  const [index, setIndex] = useState(0);
  const [spl, setSpl] = useState(puzzle.signalData[0]);
  const [log, setLog] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => {
        const next = (i + 1) % puzzle.signalData.length;
        setSpl(puzzle.signalData[next]);
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [puzzle]);

  const handleDragStart = e => {
    e.dataTransfer.setData('component', e.target.dataset.component);
  };

  const handleDrop = e => {
    const component = e.dataTransfer.getData('component');
    setPlaced([...placed, component]);
    e.preventDefault();
  };

  const allowDrop = e => e.preventDefault();

  return (
    <div className="workbench">
      <h2>{puzzle.title}</h2>
      <p>{puzzle.description}</p>
      <div className="component-panel">
        {puzzle.availableComponents.map(c => (
          <div
            key={c}
            draggable
            onDragStart={handleDragStart}
            data-component={c}
            className="component-item"
          >
            {c}
          </div>
        ))}
      </div>
      <div className="breadboard" onDrop={handleDrop} onDragOver={allowDrop}>
        {placed.map((c, i) => (
          <div key={i} className="placed-component">
            {c}
          </div>
        ))}
      </div>
      <CodeEditor
        spl={spl}
        sampleIndex={index}
        onLog={event => setLog(log => [...log, event])}
      />
      <Results log={log} puzzle={puzzle} />
    </div>
  );
};

export default Workbench;
