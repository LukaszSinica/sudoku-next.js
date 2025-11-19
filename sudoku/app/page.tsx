import { ThemeToggle } from "@/components/themeToggle";
import GameOver from "@/components/gameOver";
import ErrorCount from "@/components/errorCount";
import Board from "@/components/board";
import Keyboard from "@/components/keyboard";

export default function Home() {

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="flex h-full w-full max-w-3xl flex-col items-center gap-4 sm:gap-8 py-8 md:py-4 sm:py-32 px-4 sm:px-16 dark:bg-black relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 text-center">
          Sudoku Generator
        </h1>
        <ErrorCount />
        <GameOver  />
        <Board />
        <Keyboard />

        <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 text-center sm:block">
          Tip: Use keyboard numbers 1-9 to fill cells, Backspace/Delete to clear
        </div>
      </main>
    </div>
  );
}
