"use client"
import { sudokuNumbers } from '@/utils/generateBoard';
import { useSudoku } from '@/app/sudokuContext';


export default function Keyboard() {
    const { handleNumberClick, gameOver } = useSudoku();
    return (
        <div className="grid grid-cols-9 sm:flex gap-1 sm:gap-2 w-full sm:w-auto px-2 sm:px-0">
            {sudokuNumbers.map((num) => (
            <button
                key={num}
                onClick={() => handleNumberClick(num)}
                disabled={gameOver}
                className={`w-full sm:w-12 h-10 sm:h-12 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 active:bg-zinc-300 dark:active:bg-zinc-600 text-base sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 transition-colors ${
                gameOver ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {num}
            </button>
            ))}
        </div>
  )
}
