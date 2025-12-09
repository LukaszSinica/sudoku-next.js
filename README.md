# Sudoku Next.js

A modern, interactive Sudoku game built with Next.js, React, and TypeScript. Features daily puzzle generation, dark mode support, and an intuitive user interface.

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

- **Daily Puzzle**: New Sudoku puzzle generated daily with seeded randomization
- **Interactive Gameplay**: Click-to-select cells and number input with visual feedback
- **Smart Validation**: Real-time move validation with error tracking
- **Game Over System**: Three strikes rule - game ends after 3 mistakes
- **Dark Mode**: Beautiful dark theme support for comfortable playing
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Visual Feedback**: Color-coded cells to distinguish between initial numbers, user input, and errors
- **Restart Option**: Replay the same daily puzzle after game over

## Tech Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **UI Library**: Shadcn
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Fonts**: Geist Sans & Geist Mono (Vercel)

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LukaszSinica/sudoku-next.js.git
   cd sudoku-next.js/sudoku
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Running the Application

#### Development Mode

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

#### Production Build

Build the application for production:

```bash
npm run build
npm run start
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## How to Play

1. **Select a Cell**: Click on any empty cell (cells with initial numbers cannot be changed)
2. **Enter a Number**: Click on a number button (1-9) to fill the selected cell
3. **Validation**: The game automatically validates your moves:
   - Valid moves appear in blue
   - Invalid moves appear in red and count as an error
4. **Win or Lose**: 
   - Make 3 mistakes and the game ends
   - Complete the puzzle correctly to win
5. **Restart**: Click the "Restart" button to replay the same daily puzzle

## Project Structure

```
sudoku-next.js/
├── sudoku/
│   ├── app/
│   │   ├── page.tsx          # Main game component
│   │   ├── layout.tsx        # Root layout with fonts and metadata
│   │   ├── globals.css       # Global styles
│   │   └── favicon.ico       # Favicon
│   ├── utils/
│   │   └── generateBoard.ts  # Sudoku puzzle generation logic
│   ├── public/               # Static assets
│   ├── package.json          # Project dependencies
│   ├── next.config.ts        # Next.js configuration
│   ├── tsconfig.json         # TypeScript configuration
│   └── eslint.config.mjs     # ESLint configuration
└── README.md                 # This file
```

## Game Logic

The game includes several key features:

- **Seeded Random Generation**: Uses a daily seed based on the current date to ensure everyone gets the same puzzle each day
- **Backtracking Algorithm**: Generates valid Sudoku puzzles by filling the board recursively
- **Difficulty Settings**: Currently set to 40 empty cells (medium difficulty)
- **Validation Rules**: Checks rows, columns, and 3x3 squares for duplicate numbers

## Development

### Technologies Used

- **Next.js App Router**: Modern React framework with server and client components
- **TypeScript**: Type-safe development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Hooks**: useState and useEffect for state management
- **Geist Font**: Beautiful font family from Vercel

### Key Components

- `page.tsx`: Main game component with all game logic and UI
- `generateBoard.ts`: Sudoku puzzle generation with seeded randomization

## Deployment

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Fonts by [Vercel](https://vercel.com/font)

---

Made with ❤️ by [LukaszSinica](https://github.com/LukaszSinica)
