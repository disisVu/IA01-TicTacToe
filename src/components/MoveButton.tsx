import useHover from "../hooks/useHover"

interface MoveButtonProps {
  description: string
  coordinates: {row: number, col: number} | null
  onClick: () => void
  isCurrentMove: boolean
}

export default function MoveButton({ description, coordinates, onClick, isCurrentMove }: MoveButtonProps) {
  const {isHovered, onMouseEnter, onMouseLeave} = useHover()
  const { row, col } = coordinates || {};

  return (
    <div 
      className={`
        ${isCurrentMove ? 'bg-blue-500' : isHovered ? 'bg-gray-300' : 'bg-gray-200'}
        ${isCurrentMove ? 'text-white' : 'text-gray-800'}
        ${isCurrentMove ? '' : 'cursor-pointer'}
        flex justify-between items-center rounded-md
        w-72 h-12 px-4 
      `}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span 
        className={`
          text-lg font-medium
        `}
      >
        {description}
      </span>
      {coordinates !== null && (
        <div className='flex justify-between gap-2'>
          <CoordinateSquare value={row!} isCurrentMove={isCurrentMove} />
          <CoordinateSquare value={col!} isCurrentMove={isCurrentMove} />
        </div>
      )}
    </div>
  )
}

interface CoordinateSquareProps {
  value: number
  isCurrentMove: boolean
}

function CoordinateSquare({ value, isCurrentMove }: CoordinateSquareProps) {
  return (
    <div
      className={`
        ${isCurrentMove ? 'bg-blue-700' : 'bg-white'}
        ${isCurrentMove ? 'text-white' : 'text-gray-900'}
        ${isCurrentMove ? 'border-blue-500' : 'border-gray-300'}
        w-8 h-8 rounded-md flex justify-center items-center border
      `}
    >
      <span className='text-lg font-semibold'>{value}</span>
    </div>
  )
}