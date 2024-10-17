import { BOARD_WIDTH } from "../constants"
import { calculateWinner } from "../utils/useBoard";
import Square from "./Square"

interface BoardProps {
  squares: string[]
  xIsNext: boolean
  onPlay: (nextSquares: string[], squareIndex: number) => void
}

export default function Board({ squares, xIsNext, onPlay }: BoardProps) {
  function handleClick(index: number) {
    const [winner] = calculateWinner(squares)
    // If there's a winner OR square not empty
    if (winner || squares[index]) {
      return;
    }
    // Make a copy
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = 'X';
    } else {
      nextSquares[index] = 'O';
    }
    onPlay(nextSquares, index);
  }

  const [winner, winningLine] = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if(squares.every((value) => value !== null)) {
    status = 'Tie';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className={`
        ${winner === null ? '' : 'pointer-events-none'}
        relative flex flex-col gap-2
      `}
    >
      <span className='absolute -top-20 text-2xl font-semibold text-gray-800'>{status}</span>
      {Array.from({ length: BOARD_WIDTH }, (_, row) => (
        <div key={row} className='flex flex-row gap-2'>
          {Array.from({ length: BOARD_WIDTH }, (_, col) => {
            const index: number = row * BOARD_WIDTH + col
            return (
              <Square 
                key={`${row}-${col}`} value={squares[index]} 
                onClick={() => {handleClick(index)}} 
                isHighlighted={winningLine !== null && winningLine?.includes(index)}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}