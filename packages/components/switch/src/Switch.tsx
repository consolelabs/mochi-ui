import clsx from 'clsx'
import * as RadixSwitch from '@radix-ui/react-switch'
import { useId } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const switchContainer = cva([''], {
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

const switchThumb = cva([''], {
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

type SwitchProps = VariantProps<typeof switchContainer> & {
  label?: string
  checked: boolean
  onChange?: (c: boolean) => void
  disabled?: boolean
}

export default function Switch(props: SwitchProps) {
  const { label, checked = false, disabled = false, size, onChange } = props
  const id = useId()

  return (
    <div className="flex gap-x-4">
      {label ? <label htmlFor={id}>{label}</label> : null}
      <RadixSwitch.Root
        checked={checked}
        className={clsx(
          'focus-visible:outline-none w-9 h-5 p-0.5 rounded-full transition ring-0 ring-offset-0 ring-transparent focus:ring-4 focus:ring-primary-200',
          switchContainer({ size }),
          {
            'hover:bg-neutral-400': !disabled,
            'bg-neutral-200': disabled,
            'bg-neutral-300': !checked && !disabled,
            'bg-primary-700 hover:bg-primary-700': checked && !disabled,
          },
        )}
        disabled={disabled}
        id={id}
        onCheckedChange={onChange}
      >
        <RadixSwitch.Thumb
          className={clsx(
            'transition origin-center block w-4 h-4 rounded-full bg-neutral-0',
            switchThumb({ size }),
            {
              'translate-x-0': !checked,
              'translate-x-full': checked,
            },
          )}
          style={{
            boxShadow:
              '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)',
          }}
        />
      </RadixSwitch.Root>
    </div>
  )
}
