import clsx from 'clsx'
import { cva } from 'class-variance-authority'

const drawerOverlayClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('fixed inset-0 z-50 bg-background-backdrop/40', className)

const drawerContentCva = cva(
  ['fixed z-50 bg-background-surface overflow-auto'],
  {
    variants: {
      anchor: {
        left: 'h-screen top-0 left-0 animate-slide-from-left',
        right: 'h-screen top-0 right-0 animate-slide-from-right',
        top: 'w-screen top-0 left-0 animate-slide-from-top',
        bottom: 'w-screen bottom-0 left-0 animate-slide-from-bottom',
      },
    },
    defaultVariants: {
      anchor: 'left',
    },
  },
)

const drawerCloseButtonClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    '!m-0 absolute translate-x-1/2 -translate-y-1/2 right-6 top-6 rounded-full border border-neutral-outline-border opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none w-6 h-6 flex items-center justify-center',
    className,
  )

const drawerTitleClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('text-lg font-medium tracking-tight', className)

const drawerDescriptionClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('text-sm', className)

const drawerTriggerClsx = ({ className = '' }: { className?: string }) =>
  clsx('focus-visible:outline-none', className)

const drawer = {
  drawerOverlayClsx,
  drawerContentCva,
  drawerCloseButtonClsx,
  drawerTitleClsx,
  drawerDescriptionClsx,
  drawerTriggerClsx,
}

export { drawer }
