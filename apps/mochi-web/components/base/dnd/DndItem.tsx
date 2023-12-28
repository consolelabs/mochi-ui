import { IconButton } from '@mochi-ui/core'
import { MenuSolid } from '@mochi-ui/icons'
import clsx from 'clsx'
import React from 'react'
import { Draggable, DraggableProps } from 'react-beautiful-dnd'

interface Props extends Omit<DraggableProps, 'children'> {
  children: React.ReactNode
  className?: string
}

export const DndItem = ({ className, draggableId, index, children }: Props) => {
  return (
    <Draggable key={draggableId} draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={clsx(
            'flex items-center border-b border-divider',
            { 'bg-background-level2': snapshot.isDragging },
            className,
          )}
        >
          <IconButton
            label="Move"
            variant="ghost"
            color="white"
            className="cursor-grab active:cursor-grabbing"
            {...provided.dragHandleProps}
          >
            <MenuSolid className="w-5 h-5" />
          </IconButton>
          {children}
        </div>
      )}
    </Draggable>
  )
}
