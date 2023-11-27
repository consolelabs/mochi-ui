import React, { ReactNode } from 'react'
import type { Variant } from './types'

interface PanelContainerProps {
  variant?: Variant
  children?: ReactNode
}

export const PanelContainer = React.forwardRef<
  HTMLDivElement,
  PanelContainerProps
>(({ variant, children }, ref) => {
  switch (variant) {
    case 'dropdown':
      return (
        <div ref={ref} className="px-3 rounded-xl py-[22px] bg-white-pure">
          {children}
        </div>
      )
    case 'modal':
    default:
      return (
        <div ref={ref} className="p-6 rounded-xl bg-white-pure">
          {children}
        </div>
      )
  }
})
