interface CellProps {
  i: number;
  j: number;
  cell: number;
  selectedCell: { row: number; col: number } | null;
  initialBoard: number[][];
  gameOver: boolean;
  handleCellClick: (row: number, col: number) => void;
  getCellColor: (row: number, col: number, value: number) => string;
}

export default function Cell({ i, j, cell, selectedCell, initialBoard, gameOver, handleCellClick, getCellColor }: CellProps) {
    const isRightEdge = (j + 1) % 3 === 0 && j !== 8;
    const isBottomEdge = (i + 1) % 3 === 0 && i !== 8;
    return (
        <div
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
    )
}
