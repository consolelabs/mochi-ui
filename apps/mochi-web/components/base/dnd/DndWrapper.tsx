import React from 'react'
import {
  DragDropContext,
  DragDropContextProps,
  DroppableProps,
} from 'react-beautiful-dnd'
import { StrictModeDroppable } from './StrictModeDroppable'

interface Props {
  children: React.ReactNode
  className?: string
  componentProps: {
    context: Omit<DragDropContextProps, 'children'>
    droppable: Omit<DroppableProps, 'children'>
  }
}

export const DndWrapper = ({ children, className, componentProps }: Props) => {
  return (
    <DragDropContext {...componentProps.context}>
      <StrictModeDroppable {...componentProps.droppable}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={className}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  )
}
