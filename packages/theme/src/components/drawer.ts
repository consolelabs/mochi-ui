import clsx from 'clsx'
import { cva } from 'class-variance-authority'

const drawerOverlayClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'fixed inset-0 z-50 bg-background-backdrop',
    'data-[state=open]:animate-in',
    'data-[state=open]:fade-in-0',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    className,
  )

const drawerContentCva = cva(
  [
    'fixed z-50 bg-background-surface overflow-auto',
    'data-[state=open]:ease-out',
    'data-[state=open]:animate-in',

    'data-[state=open]:data-[anchor=left]:slide-in-from-left-full',
    'data-[state=open]:data-[anchor=right]:slide-in-from-right-full',
    'data-[state=open]:data-[anchor=top]:slide-in-from-top-full',
    'data-[state=open]:data-[anchor=bottom]:slide-in-from-bottom-full',

    'data-[state=closed]:ease-in',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:data-[anchor=left]:slide-out-to-left-full',
    'data-[state=closed]:data-[anchor=top]:slide-out-to-top-full',
    'data-[state=closed]:data-[anchor=bottom]:slide-out-to-bottom-full',
    'data-[state=closed]:data-[anchor=right]:slide-out-to-right-full',
  ],
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
    '!m-0 absolute translate-x-1/2 -translate-y-1/2 right-6 top-6 rounded-full',
    'border border-neutral-outline-border',
    'opacity-70',
    'transition-opacity',
    'hover:opacity-100',
    'focus:outline-none disabled:pointer-events-none w-6 h-6 flex items-center justify-center',
    'text-neutral-outline-fg',
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
