import { faArrowDownShortWide, faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useHover from "../hooks/useHover"

interface SortButtonProps {
  sortOrder: boolean
  onClick: () => void
}

export default function SortButton({ sortOrder, onClick }: SortButtonProps) {
  const {isHovered, onMouseEnter, onMouseLeave} = useHover()

  return (
    <div 
      className={`
        ${isHovered ? 'bg-gray-300' : 'bg-gray-200'}
        cursor-pointer px-3 py-2 rounded-sm
      `}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FontAwesomeIcon icon={sortOrder ? faArrowDownShortWide : faArrowDownWideShort} style={{ color: '#333' }} />
    </div>
  )
}