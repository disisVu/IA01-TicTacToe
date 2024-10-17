import { useState } from "react"
import { BOARD_WIDTH } from "../constants"
import Board from "./Board"
import MoveButton from "./MoveButton"
import SortButton from "./SortButton"

export default function Game() {
  // Move history
  const [history, setHistory] = useState<{squares: string[], squareIndex: number | null}[]>([
    {
      squares: Array(BOARD_WIDTH * BOARD_WIDTH).fill(null),
      squareIndex: null
    }
  ])
  // Index of current move
  const [currentMove, setCurrentMove] = useState<number>(0)
  // Current player
  const xIsNext: boolean = currentMove % 2 === 0
  // Current board set
  const currentSquares: string[] = history[currentMove].squares
  // Toggle moves sorting order
  const [isAscending, setIsAscending] = useState<boolean>(true)

  function handlePlay(nextSquares: string[], squareIndex: number) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1), 
      {squares: nextSquares, squareIndex: squareIndex}
    ]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
  }

  function toggleSort() {
    setIsAscending((prevState) => !prevState)
  }
  
  const sortedMoves = history
    .map((entry, move) => ({ ...entry, move }))
    .sort((a, b) => isAscending ? a.move - b.move : b.move - a.move)
    
  const moves = sortedMoves.map(({ move, squareIndex }) => {
    let description: string
    let coordinates: {row: number, col: number} | null = null
    const isCurrentMove = move === currentMove
    if (squareIndex !== null) {
      const row = Math.floor(squareIndex / 3)
      const col = squareIndex % 3
      coordinates = {row, col}
    }
    if (move === 0) {
      description = 'Go to game start'
    } else if (isCurrentMove) {
      description = `You are at move #${move}`
    } else {
      description = `Go to move #${move}`
    }

    return (
      <MoveButton key={move} description={description} coordinates={coordinates} onClick={() => { jumpTo(move) }} isCurrentMove={isCurrentMove} />
    )
  })

  return (
    <div className='select-none flex flex-row gap-40'>
      <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay}/>
      <div className='relative min-w-72 flex flex-col gap-2'>
        <div className='absolute -top-20 w-full flex flex-row justify-between'>
          <span className='text-2xl font-semibold text-gray-800'>Moves:</span>
          {/* Sort button */}
          <SortButton sortOrder={isAscending} onClick={toggleSort} />
        </div>
        {moves}
      </div>
    </div>
  )
}
