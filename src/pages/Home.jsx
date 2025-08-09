import { useEffect, useState } from 'react';
import { loadPuzzle } from '../logic/puzzleLoader';

export default function Home() {
  const [puzzle, setPuzzle] = useState(null);

  useEffect(() => {
    loadPuzzle('kids-in-library').then(setPuzzle).catch(() => {});
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Circuit Case Files</h1>
      <p>
        Daily Challenge: {puzzle ? puzzle.title : 'Loading...'}
      </p>
    </div>
  );
}
