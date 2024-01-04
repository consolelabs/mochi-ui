import { cva, VariantProps } from 'class-variance-authority'

const group = 'space-y-1'

const iconChevron = cva([], {
  variants: {
    color: {
      primary: ['!text-text-contrast'],
      secondary: ['!text-primary-outline-fg'],
      white: [''],
      gray: [''],
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

const content = [
  'relative z-50 w-fit',

  'data-[state=open]:animate-in',
  'data-[state=open]:fade-in-50',
  'data-[state=open]:zoom-in-95',

  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=top]:slide-in-from-bottom-2',

  'data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0',
  'data-[state=closed]:zoom-out-95',
].join(' ')

const viewportPoperMode =
  'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] '

const viewport = 'space-y-1 bg-background-popup p-3 rounded-lg shadow-md'

const label =
  'text-[10px] uppercase font-bold text-text-secondary tracking-tight leading-4'

const bodyWrapper = 'flex-1 flex flex-col items-start'

const subTitleWrapper = 'text-text-secondary text-xs'

const separator = 'block !my-3 w-full h-px bg-divider'

const value = 'truncate'

const itemCva = cva(
  [
    'flex gap-2 items-center',
    'transition duration-100',
    'text-sm',
    'focus-visible:outline-none',
    'truncate',
  ],
  {
    variants: {
      disabled: {
        true: ['text-text-secondary', 'cursor-not-allowed'],
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
          'border hover:border-primary-solid-focus focus:border-primary-solid-focus',
          'focus:shadow-input-focused',
          'hover:outline-none focus:outline-none',
        ],
      },
      isError: {
        true: ['!border-danger-solid-focus', 'focus:shadow-none'],
      },
      color: {
        primary: ['bg-primary-solid', '!text-text-contrast'],
        secondary: ['bg-primary-outline'],
        white: ['bg-background-surface'],
        gray: ['bg-background-level3'],
      },
      hasPadding: {
        false: ['!p-1 !rounded'],
      },
      isFilled: {
        true: [],
        false: [],
      },
      appearance: {
        form: ['px-3.5 h-10', 'rounded', 'border-divider', 'justify-between'],
        button: [
          'px-3 h-[34px]',
          'rounded-lg',
          'border-transparent',
          'font-semibold',
          'shadow-sm',
        ],
      },
    },
    compoundVariants: [
      {
        appearance: 'form',
        disabled: true,
        className: ['!bg-background-level2'],
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
  value,
  subTitleWrapper,
  viewport,
  viewportPoperMode,
  iconChevron,
  itemCva,
  iconWrapperCva,
  bodyWrapper,
}

export type selectItemProps = VariantProps<typeof itemCva>
