import { ReactNode } from 'react'
import type { Variant } from './types'

interface PanelContainerProps {
  variant?: Variant
  children?: ReactNode
}

export const PanelContainer: React.FC<PanelContainerProps> = ({
  variant,
  children,
}) => {
  switch (variant) {
    case 'dropdown':
      return (
        <div className="px-3 rounded-xl py-[22px] bg-white-pure">
          {children}
        </div>
      )
    case 'modal':
    default:
      return <div className="p-6 rounded-xl bg-white-pure">{children}</div>
  }
}
