"use client"
import Cell from '@/components/cell';
import { useSudoku } from '@/app/sudokuContext';

export default function Board() {
    const { board, initialBoard, selectedCell, gameOver, handleCellClick, getCellColor } = useSudoku();

    return (
        <div className={`flex flex-col gap-0.5 sm:gap-1 ${gameOver ? 'opacity-50' : ''}`}>
            {board.map((row, i) => (
            <div key={i} className="flex gap-0.5 sm:gap-1">
                {row.map((cell, j) => {
                return (
                    <Cell 
                    i={i}
                    j={j}
                    cell={cell}
                    selectedCell={selectedCell}
                    initialBoard={initialBoard}
                    gameOver={gameOver}
                    handleCellClick={handleCellClick}
                    getCellColor={getCellColor}
                    key={j}
                    />
                );
                })}
            </div>
            ))}
        </div>
    )
}
