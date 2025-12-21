import { useState } from 'react'
import { GripVertical } from 'lucide-react'
import { cn } from '../../lib/utils'

interface DraggableListProps<T> {
  items: T[]
  onReorder: (fromIndex: number, toIndex: number) => void
  renderItem: (item: T, index: number) => React.ReactNode
  itemId: (item: T) => string
  className?: string
}

export function DraggableList<T>({
  items,
  onReorder,
  renderItem,
  itemId,
  className,
}: DraggableListProps<T>) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index)
    }
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onReorder(draggedIndex, dropIndex)
    }
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => (
        <div
          key={itemId(item)}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={cn(
            'relative group cursor-move transition-all',
            draggedIndex === index && 'opacity-50',
            dragOverIndex === index && 'translate-y-2'
          )}
        >
          <div className="flex items-start gap-2">
            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
              <GripVertical className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">{renderItem(item, index)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

