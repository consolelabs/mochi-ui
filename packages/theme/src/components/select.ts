import { cva, VariantProps } from 'class-variance-authority'

const group = 'space-y-1'

const iconChevron = cva([], {
  variants: {
    color: {
      primary: ['!text-primary-outline-fg'],
    },
    appearance: {
      form: ['text-base'],
      button: ['text-sm'],
    },
  },
  defaultVariants: {
    appearance: 'button',
  },
})

const content = 'relative z-50 w-fit'

const viewportPoperMode =
  'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] '

const viewport = 'space-y-1 bg-background-popup p-3 rounded-lg  shadow-md'

const label =
  'text-[10px] uppercase font-bold text-text-secondary tracking-tight leading-4'

const bodyWrapper = 'flex-1 flex flex-col items-start'

const subTitleWrapper = 'text-text-secondary text-xs'

const separator = 'block !my-3 w-full h-px bg-divider'

const itemCva = cva(
  [
    'flex gap-2 items-center',
    'transition duration-100',
    'text-sm',
    'focus-visible:outline-none',
  ],
  {
    variants: {
      disabled: {
        true: [
          'pointer-events-none',
          'text-text-secondary',
          'cursor-not-allowed',
        ],
        false: ['text-text-primary'],
      },
      isTrigger: {
        false: [
          'font-medium',
          'hover:bg-background-level2 focus:bg-background-level2',
          'hover:outline-none focus:outline-none',
          'cursor-pointer',
          'p-2',
          'rounded-lg',
        ],
        true: [
          'border hover:border-primary-solid',
          'focus:ring focus:ring-primary-outline-active',
          'hover:outline-none focus:outline-none',
          'shadow-sm',
        ],
      },
      isError: {
        true: ['!border-danger-outline-fg', 'focus:!ring-0'],
      },
      color: {
        primary: ['bg-primary-outline'],
      },
      hasPadding: {
        false: ['!p-1 !rounded-md'],
      },
      isFilled: {
        true: [],
        false: [],
      },
      appearance: {
        form: [
          'px-3.5 py-2.5',
          'rounded-md',
          'border-divider',
          'justify-between',
        ],
        button: [
          'px-3 py-1.5',
          'rounded-lg',
          'border-transparent',
          'font-semibold',
        ],
      },
    },
    compoundVariants: [
      {
        appearance: 'form',
        disabled: true,
        className: ['bg-background-level2'],
      },
      {
        appearance: 'form',
        isFilled: false,
        className: ['text-text-secondary'],
      },
    ],
    defaultVariants: {
      disabled: false,
      isTrigger: false,
      isError: false,
    },
  },
)

const iconWrapperCva = cva('', {
  variants: {
    isRightIcon: {
      true: 'text-base max-w-4 max-h-4 text-text-secondary',
      false: 'text-2xl max-w-6 max-h-6 text-inherit',
    },
  },
  defaultVariants: {
    isRightIcon: false,
  },
})

export const select = {
  group,
  content,
  label,
  separator,
  subTitleWrapper,
  viewport,
  viewportPoperMode,
  iconChevron,
  itemCva,
  iconWrapperCva,
  bodyWrapper,
}

export type selectItemProps = VariantProps<typeof itemCva>
