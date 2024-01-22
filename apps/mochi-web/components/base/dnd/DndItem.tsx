import { IconButton } from '@mochi-ui/core'
import { MenuSolid } from '@mochi-ui/icons'
import clsx from 'clsx'
import React, { HTMLAttributes } from 'react'
import {
  Draggable,
  DraggableProps,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd'

interface Props extends Omit<DraggableProps, 'children'> {
  children: React.ReactNode
  className?: string
  handleProps?: (
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot,
  ) => HTMLAttributes<HTMLDivElement>
}

export const DndItem = ({
  className,
  draggableId,
  index,
  children,
  handleProps,
}: Props) => {
  return (
    <Draggable key={draggableId} draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...handleProps?.(provided, snapshot)}
          className={clsx(
            'flex items-center border-b border-divider',
            { 'bg-background-level2': snapshot.isDragging },
            className,
          )}
        >
          {children}
          <IconButton
            label="Move"
            variant="ghost"
            color="neutral"
            className="cursor-grab active:cursor-grabbing mx-1.5"
            {...provided.dragHandleProps}
          >
            <MenuSolid className="w-4 h-4" />
          </IconButton>
        </div>
      )}
    </Draggable>
  )
}
