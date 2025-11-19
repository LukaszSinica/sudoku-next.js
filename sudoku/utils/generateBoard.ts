export const sudokuNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

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

function shuffleArray(array: number[], random: SeededRandom): number[] {
    const shuffled = [...array];
    for(let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random.next() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function fillBoard(board: number[][], random: SeededRandom): boolean {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(board[i][j] === 0) {
                const numbers = shuffleArray(sudokuNumbers, random);
                for(const value of numbers) {
                    if(!checkRow(board[i], value) && 
                       !checkColumn(board, value, j) && 
                       !checkSquare(board, i, j, value)) {
                        board[i][j] = value;
                        if(fillBoard(board, random)) {
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

function removeNumbers(board: number[][], difficulty: number, random: SeededRandom): void {
    const positions: [number, number][] = [];
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            positions.push([i, j]);
        }
    }
    
    for(let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(random.next() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    
    for(let i = 0; i < difficulty && i < positions.length; i++) {
        const [row, col] = positions[i];
        board[row][col] = 0;
    }
}

export function getDailySeed(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime();
}

export default function generateBoard(difficulty: number = 40, seed?: number): { puzzle: number[][], solution: number[][] } {
    const dailySeed = seed ?? getDailySeed();
    const random = new SeededRandom(dailySeed);
    
    const solution: number[][] = Array(9).fill(0).map(() => Array(9).fill(0));
    fillBoard(solution, random);
    
    const puzzle = solution.map(row => [...row]);
    removeNumbers(puzzle, difficulty, random);
    
    return { puzzle, solution };
}