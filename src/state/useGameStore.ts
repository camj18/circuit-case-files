import { create } from 'zustand'

export type RunState = 'idle' | 'running' | 'success' | 'failure'

interface GameState {
  puzzle: unknown
  wiring: unknown[]
  code: string
  runState: RunState
  setPuzzle: (puzzle: unknown) => void
  setWiring: (wiring: unknown[]) => void
  setCode: (code: string) => void
  setRunState: (state: RunState) => void
}

export const useGameStore = create<GameState>((set) => ({
  puzzle: null,
  wiring: [],
  code: '',
  runState: 'idle',
  setPuzzle: (puzzle) => set({ puzzle }),
  setWiring: (wiring) => set({ wiring }),
  setCode: (code) => set({ code }),
  setRunState: (runState) => set({ runState }),
}))
