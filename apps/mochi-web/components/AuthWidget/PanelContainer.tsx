import { ReactNode } from 'react'
import { Variant } from './AuthPanel'

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
        <div className="px-3 py-[22px] rounded-xl bg-white-pure">
          {children}
        </div>
      )
    case 'modal':
    default:
      return <div className="p-6 rounded-xl bg-white-pure">{children}</div>
  }
}
