"use client";
import { useSudoku } from '@/app/sudokuContext';

export default function GameOver() {
    const { gameOver, handleRestart } = useSudoku();

    if(!gameOver) return null;

    return (
        <div className="text-lg sm:text-2xl font-bold text-red-600 dark:text-red-400 text-center flex flex-col sm:flex-row items-center gap-4">
                <span>Game Over! You made 3 mistakes.</span>
                <button
                onClick={handleRestart}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors text-base sm:text-lg"
                >
                Restart
                </button>
        </div>
  )
}
