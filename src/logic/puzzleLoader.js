export async function loadPuzzle(name) {
  const res = await fetch(`/puzzles/${name}.json`);
  if (!res.ok) {
    throw new Error('Puzzle not found');
  }
  return res.json();
}
