const sudokuNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function checkRow(row: number[], value: number): boolean {
    return row.includes(value);
}

function checkColumn(board: number[][], value: number, col: number): boolean {
    for(let i = 0; i < board.length; i++) {
        if(board[i][col] === value) {
            return true;
        }
    }
    return false;
}

function checkSquare(board: number[][], row: number, col: number, value: number): boolean {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[startRow + i][startCol + j] === value) {
                return true;
            }
        }
    }
    return false;
}

function shuffleArray(array: number[]): number[] {
    const shuffled = [...array];
    for(let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function fillBoard(board: number[][]): boolean {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(board[i][j] === 0) {
                const numbers = shuffleArray(sudokuNumbers);
                for(const value of numbers) {
                    if(!checkRow(board[i], value) && 
                       !checkColumn(board, value, j) && 
                       !checkSquare(board, i, j, value)) {
                        board[i][j] = value;
                        if(fillBoard(board)) {
                            return true;
                        }
                        board[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function removeNumbers(board: number[][], difficulty: number = 40): void {
    let removed = 0;
    while(removed < difficulty) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if(board[row][col] !== 0) {
            board[row][col] = 0;
            removed++;
        }
    }
}

export default function generateBoard(difficulty: number = 40): number[][] {
    const board: number[][] = Array(9).fill(0).map(() => Array(9).fill(0));
    fillBoard(board);
    removeNumbers(board, difficulty);
    return board;
}

