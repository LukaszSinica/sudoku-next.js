"use client";

import { useEffect, useState } from "react";
import generateBoard, { getDailySeed } from "@/utils/generateBoard";

export default function Home() {
  const [board, setBoard] = useState<number[][]>(
    Array(9).fill(0).map(() => Array(9).fill(0))
  );
  const [initialBoard, setInitialBoard] = useState<number[][]>(
    Array(9).fill(0).map(() => Array(9).fill(0))
  );
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [invalidCells, setInvalidCells] = useState<Set<string>>(new Set());
  const [errorCount, setErrorCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [dailySeed, setDailySeed] = useState<number>(0);

  useEffect(() => {
    const seed = getDailySeed();
    setDailySeed(seed);
    const newBoard = generateBoard(40, seed);
    setBoard(newBoard.map(row => [...row]));
    setInitialBoard(newBoard.map(row => [...row]));
  }, []);

  const isValidMove = (row: number, col: number, value: number): boolean => {
    // Check row
    for (let j = 0; j < 9; j++) {
      if (j !== col && board[row][j] === value) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (i !== row && board[i][col] === value) return false;
    }

    // Check 3x3 square
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const r = startRow + i;
        const c = startCol + j;
        if ((r !== row || c !== col) && board[r][c] === value) {
          return false;
        }
      }
    }

    return true;
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameOver) return;
    if (initialBoard[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberClick = (value: number) => {
    if (!selectedCell || gameOver) return;

    const { row, col } = selectedCell;
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = value;
    setBoard(newBoard);

    const cellKey = `${row}-${col}`;
    const newInvalidCells = new Set(invalidCells);

    if (!isValidMove(row, col, value)) {
      newInvalidCells.add(cellKey);
      const newErrorCount = errorCount + 1;
      setErrorCount(newErrorCount);
      
      if (newErrorCount >= 3) {
        setGameOver(true);
      }
    } else {
      newInvalidCells.delete(cellKey);
    }

    setInvalidCells(newInvalidCells);
  };

  const handleRestart = () => {
    const newBoard = generateBoard(40, dailySeed);
    setBoard(newBoard.map(row => [...row]));
    setInitialBoard(newBoard.map(row => [...row]));
    setErrorCount(0);
    setGameOver(false);
    setInvalidCells(new Set());
    setSelectedCell(null);
  };

  const getCellColor = (row: number, col: number, cell: number): string => {
    if (cell === 0) return "text-zinc-900 dark:text-zinc-100";
    if (initialBoard[row][col] !== 0) return "text-zinc-900 dark:text-zinc-100 font-bold";
    if (invalidCells.has(`${row}-${col}`)) return "text-red-600 dark:text-red-400";
    return "text-blue-600 dark:text-blue-400";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Sudoku Generator
        </h1>
        
        <div className="text-center">
          {errorCount} out of 3 wrong answer(s)
        </div>

        {gameOver && (
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 text-center">
            Game Over! You made 3 mistakes.
            <button
              onClick={handleRestart}
              className="ml-4 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Restart
            </button>
          </div>
        )}
        
        <div className={`flex flex-col gap-1 ${gameOver ? 'opacity-50' : ''}`}>
          {board.map((row, i) => (
            <div key={i} className="flex gap-1">
              {row.map((cell, j) => (
                <div
                  key={j}
                  onClick={() => handleCellClick(i, j)}
                  className={`w-14 h-14 rounded-md border ${
                    selectedCell?.row === i && selectedCell?.col === j && !gameOver
                      ? "border-blue-500 dark:border-blue-400 border-2"
                      : "border-zinc-200 dark:border-zinc-700"
                  } ${
                    initialBoard[i][j] === 0 && !gameOver ? "cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900" : ""
                  } text-center text-xl ${getCellColor(i, j, cell)} flex items-center justify-center`}
                >
                  {cell === 0 ? "" : cell}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              disabled={gameOver}
              className={`w-12 h-12 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xl font-bold text-zinc-900 dark:text-zinc-100 transition-colors ${
                gameOver ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
