import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const tooltipCva = cva(['rounded-lg px-3 py-2 text-xs font-semibold'], {
  variants: {
    theme: {
      light: ['bg-white', 'text-neutral-800'],
      dark: ['bg-neutral-800', 'text-white'],
    },
  },
  defaultVariants: {
    theme: 'light',
  },
})

const tooltipArrowCva = cva([], {
  variants: {
    theme: {
      light: ['fill-white'],
      dark: ['fill-neutral-800'],
    },
  },
  defaultVariants: {
    theme: 'light',
  },
})

const tooltipTriggerClsx = ({ className = '' }: { className?: string }) =>
  clsx('w-fit', className)

const tooltip = { tooltipCva, tooltipArrowCva, tooltipTriggerClsx }

export const ARROW_OPTIONS = [
  'none',
  'top-start',
  'top-center',
  'top-end',
  'right-start',
  'right-center',
  'right-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
  'left-start',
  'left-center',
  'left-end',
] as const

export type Arrow = (typeof ARROW_OPTIONS)[number]

export type TooltipStyleProps = VariantProps<typeof tooltipCva> & {
  children: React.ReactNode
  content: React.ReactNode
  arrow?: Arrow | 'none'
  className?: string
}

export { tooltip }
