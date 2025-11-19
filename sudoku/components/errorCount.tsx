"use client"
import { useSudoku } from '@/app/sudokuContext';

export default function ErrorCount() {
    const { errorCount } = useSudoku();
    return (
        <div className="text-center text-sm sm:text-base">
            {errorCount} out of 3 wrong answer(s)
        </div>
    )
}
