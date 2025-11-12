"use client";

import { useEffect, useState } from "react";
import generateBoard from "@/utils/generateBoard";

export default function Home() {
  const [board, setBoard] = useState<number[][]>(
    Array(9).fill(0).map(() => Array(9).fill(0))
  );

  useEffect(() => {
    const newBoard = generateBoard(40); 
    setBoard(newBoard);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Sudoku Generator
        </h1>
        { board.map((row, i) => 
          <div key={i} className="flex flex-wrap gap-4">
            { row.map((cell, j) => 
              <div key={j} className="w-14 h-14 rounded-md border border-zinc-200 dark:border-zinc-700 text-center text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-center">
                { cell === 0 ? '' : cell }
              </div>
            )}
          </div>
        )}  
      </main>
    </div>
  );
}
