import type { Variant } from './types'

interface PanelHeaderProps {
  variant?: Variant
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({ variant }) => {
  switch (variant) {
    case 'dropdown':
      return (
        <div className="space-y-2 text-center">
          <h5 className="!text-lg font-medium text-neutral-900">Log in</h5>
          <p className="text-sm text-neutral-800">
            Quickly sign in with your social network
          </p>
        </div>
      )
    case 'modal':
    default:
      return (
        <div className="space-y-2 text-center">
          <h3 className="!text-2xl font-medium text-neutral-900">
            Welcome back!
          </h3>
          <p className="text-sm text-neutral-800">
            Great to see you again! Sign in your account to continue.
          </p>
        </div>
      )
  }
}
