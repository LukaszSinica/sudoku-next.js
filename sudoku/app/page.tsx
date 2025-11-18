"use client";

import { useEffect, useState } from "react";
import generateBoard, { getDailySeed } from "@/utils/generateBoard";
import { ThemeToggle } from "@/components/themeToggle";

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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver || !selectedCell) return;
      
      const key = e.key;
      if (key >= '1' && key <= '9') {
        handleNumberClick(parseInt(key));
      } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
        const { row, col } = selectedCell;
        if (initialBoard[row][col] === 0) {
          const newBoard = board.map(r => [...r]);
          newBoard[row][col] = 0;
          setBoard(newBoard);
          
          const cellKey = `${row}-${col}`;
          const newInvalidCells = new Set(invalidCells);
          newInvalidCells.delete(cellKey);
          setInvalidCells(newInvalidCells);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCell, gameOver, board, initialBoard, invalidCells]);

  const isValidMove = (row: number, col: number, value: number): boolean => {
    for (let j = 0; j < 9; j++) {
      if (j !== col && board[row][j] === value) return false;
    }

    for (let i = 0; i < 9; i++) {
      if (i !== row && board[i][col] === value) return false;
    }

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
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="flex h-full w-full max-w-3xl flex-col items-center gap-4 sm:gap-8 py-8 md:py-4 sm:py-32 px-4 sm:px-16 dark:bg-black relative">
        {/* Theme Toggle Button */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 text-center">
          Sudoku Generator
        </h1>
        
        <div className="text-center text-sm sm:text-base">
          {errorCount} out of 3 wrong answer(s)
        </div>

        {gameOver && (
          <div className="text-lg sm:text-2xl font-bold text-red-600 dark:text-red-400 text-center flex flex-col sm:flex-row items-center gap-4">
            <span>Game Over! You made 3 mistakes.</span>
            <button
              onClick={handleRestart}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors text-base sm:text-lg"
            >
              Restart
            </button>
          </div>
        )}
        
        <div className={`flex flex-col gap-0.5 sm:gap-1 ${gameOver ? 'opacity-50' : ''}`}>
          {board.map((row, i) => (
            <div key={i} className="flex gap-0.5 sm:gap-1">
              {row.map((cell, j) => {
                const isRightEdge = (j + 1) % 3 === 0 && j !== 8;
                const isBottomEdge = (i + 1) % 3 === 0 && i !== 8;
                
                return (
                  <div
                    key={j}
                    onClick={() => handleCellClick(i, j)}
                    className={`w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded border select-none ${
                      selectedCell?.row === i && selectedCell?.col === j && !gameOver
                        ? "border-blue-500 dark:border-blue-400 border-2"
                        : "border-zinc-200 dark:border-zinc-700"
                    } ${
                      isRightEdge ? "border-r-2 border-r-zinc-400 dark:border-r-zinc-600" : ""
                    } ${
                      isBottomEdge ? "border-b-2 border-b-zinc-400 dark:border-b-zinc-600" : ""
                    } ${
                      initialBoard[i][j] === 0 && !gameOver ? "cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 active:bg-zinc-200 dark:active:bg-zinc-800" : "cursor-default"
                    } text-center text-sm sm:text-lg md:text-xl ${getCellColor(i, j, cell)} flex items-center justify-center`}
                  >
                    {cell === 0 ? "" : cell}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-9 sm:flex gap-1 sm:gap-2 w-full sm:w-auto px-2 sm:px-0">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
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

        <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 text-center sm:block">
          Tip: Use keyboard numbers 1-9 to fill cells, Backspace/Delete to clear
        </div>
      </main>
    </div>
  );
}
