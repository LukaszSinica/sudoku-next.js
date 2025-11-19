"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import generateBoard, { getDailySeed } from '@/utils/generateBoard';

interface SudokuContextType {
  board: number[][];
  initialBoard: number[][];
  solution: number[][];
  selectedCell: { row: number; col: number } | null;
  invalidCells: Set<string>;
  errorCount: number;
  gameOver: boolean;
  dailySeed: number;
  setBoard: React.Dispatch<React.SetStateAction<number[][]>>;
  setSelectedCell: React.Dispatch<React.SetStateAction<{ row: number; col: number } | null>>;
  setInvalidCells: React.Dispatch<React.SetStateAction<Set<string>>>;
  setErrorCount: React.Dispatch<React.SetStateAction<number>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  handleCellClick: (row: number, col: number) => void;
  handleNumberClick: (value: number) => void;
  handleRestart: () => void;
  getCellColor: (row: number, col: number, cell: number) => string;
  isValidMove: (row: number, col: number, value: number) => boolean;
}

const SudokuContext = createContext<SudokuContextType | undefined>(undefined);

export function SudokuProvider({ children }: { children: ReactNode }) {
  const [board, setBoard] = useState<number[][]>(
    Array(9).fill(0).map(() => Array(9).fill(0))
  );
  const [initialBoard, setInitialBoard] = useState<number[][]>(
    Array(9).fill(0).map(() => Array(9).fill(0))
  );
  const [solution, setSolution] = useState<number[][]>(
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
    const { puzzle, solution } = generateBoard(40, seed);
    setBoard(puzzle.map(row => [...row]));
    setInitialBoard(puzzle.map(row => [...row]));
    setSolution(solution);
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
    return solution[row][col] === value;
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
    const { puzzle, solution } = generateBoard(40, dailySeed);
    setBoard(puzzle.map(row => [...row]));
    setInitialBoard(puzzle.map(row => [...row]));
    setSolution(solution);
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
    <SudokuContext.Provider
      value={{
        board,
        initialBoard,
        solution,
        selectedCell,
        invalidCells,
        errorCount,
        gameOver,
        dailySeed,
        setBoard,
        setSelectedCell,
        setInvalidCells,
        setErrorCount,
        setGameOver,
        handleCellClick,
        handleNumberClick,
        handleRestart,
        getCellColor,
        isValidMove,
      }}
    >
      {children}
    </SudokuContext.Provider>
  );
}

export function useSudoku() {
  const context = useContext(SudokuContext);
  if (context === undefined) {
    throw new Error('useSudoku must be used within a SudokuProvider');
  }
  return context;
}