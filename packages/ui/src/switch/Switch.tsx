import clsx from 'clsx'
import * as RadixSwitch from '@radix-ui/react-switch'
import { useId } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const switchContainer = cva([''], {
  variants: {
    size: {
      sm: 'ui-w-9 ui-h-5 ui-p-0.5',
      md: 'ui-w-11 ui-h-6 ui-p-0.5',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

const switchThumb = cva([''], {
  variants: {
    size: {
      sm: 'ui-w-4 ui-h-4',
      md: 'ui-w-5 ui-h-5',
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
    <div className="ui-flex ui-gap-x-4">
      {label ? <label htmlFor={id}>{label}</label> : null}
      <RadixSwitch.Root
        checked={checked}
        className={clsx(
          'focus-visible:ui-outline-none ui-w-9 ui-h-5 ui-p-0.5 ui-rounded-full ui-transition ui-ring-0 ui-ring-offset-0 ui-ring-transparent focus:ui-ring-4 focus:ui-ring-primary-200',
          switchContainer({ size }),
          {
            'hover:ui-bg-neutral-400': !disabled,
            'ui-bg-neutral-200': disabled,
            'ui-bg-neutral-300': !checked && !disabled,
            'ui-bg-primary-700 hover:ui-bg-primary-700': checked && !disabled,
          },
        )}
        disabled={disabled}
        id={id}
        onCheckedChange={onChange}
      >
        <RadixSwitch.Thumb
          className={clsx(
            'ui-transition ui-origin-center ui-block ui-w-4 ui-h-4 ui-rounded-full ui-bg-neutral-0',
            switchThumb({ size }),
            {
              'ui-translate-x-0': !checked,
              'ui-translate-x-full': checked,
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
