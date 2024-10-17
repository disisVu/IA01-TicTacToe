import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faO, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useHover from '../hooks/useHover'

interface SquareProps {
  value: string
  onClick: () => void
  isHighlighted: boolean
}

export default function Square({ value, onClick, isHighlighted }: SquareProps) {
  const iconMap: { [key: string]: IconProp } = {
    X: faX,
    O: faO,
  }

  const {isHovered, onMouseEnter, onMouseLeave} = useHover()

  return (
    <div 
      className={`
        ${!value && 'cursor-pointer'} 
        ${isHovered && !value ? 'bg-gray-300' : 'bg-gray-200'} 
        flex justify-center items-center
        w-40 h-40 
        rounded-md
      `}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {iconMap[value] && <FontAwesomeIcon icon={iconMap[value]} size='6x' style={{ color: isHighlighted ? '#f00' : '#333' }} />}
    </div>
  )
}