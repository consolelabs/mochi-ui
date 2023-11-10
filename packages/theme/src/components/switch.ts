import clsx from 'clsx'
import { cva, VariantProps } from 'class-variance-authority'

const switchContainerCva = cva([''], {
  variants: {
    size: {
      sm: 'w-9 h-5 p-0.5',
      md: 'w-11 h-6 p-0.5',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

const switchThumbCva = cva([''], {
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

const switchWrapperClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('flex gap-x-4', className)

const switchRootClsx = ({
  className = '',
  disabled,
  checked,
}: {
  className?: string
  disabled?: boolean
  checked?: boolean
} = {}) =>
  clsx(
    'focus-visible:outline-none w-9 h-5 p-0.5 rounded-full transition ring-0 ring-offset-0 ring-transparent focus:ring-4 focus:ring-primary-200',
    {
      'hover:bg-neutral-400': !disabled,
      'bg-neutral-200': disabled,
      'bg-neutral-300': !checked && !disabled,
      'bg-primary-700 hover:bg-primary-700': checked && !disabled,
    },
    className,
  )

const switchThumbClsx = ({
  className = '',
  checked,
  size = 'sm',
}: {
  className?: string
  checked?: boolean
  size?: 'sm' | 'md' | null
} = {}) =>
  clsx(
    'transition origin-center block w-4 h-4 rounded-full bg-neutral-0',
    {
      'translate-0': !checked,
      'translate-x-full': checked && size === 'sm',
      'translate-x-[calc(100%-8px)]': checked && size === 'md',
    },
    className,
  )

export type SwitchProps = VariantProps<typeof switchContainerCva> & {
  label?: string
  checked: boolean
  onChange?: (c: boolean) => void
  disabled?: boolean
}

const switchInput = {
  switchContainerCva,
  switchThumbCva,
  switchWrapperClsx,
  switchRootClsx,
  switchThumbClsx,
}

export { switchInput }
