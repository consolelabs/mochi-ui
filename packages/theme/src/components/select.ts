import { cva, VariantProps } from 'class-variance-authority'

const group = 'space-y-1'

const iconChevron = 'text-sm'

const content = 'relative z-50 w-fit bg-white rounded-lg shadow-md'

const viewportPoperMode =
  'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] '

const viewport = 'space-y-1 bg-white-pure p-3'

const label =
  'text-[10px] uppercase font-bold text-neutral-500  tracking-tight leading-4'

const bodyWrapper = 'flex-1 flex flex-col items-start'

const subTitleWrapper = 'text-neutral-600 text-xs'

const separator = 'block !my-3 w-full h-px bg-neutral-200'

const itemCva = cva(
  [
    'flex gap-2 items-center',
    'transition duration-100',
    'text-sm rounded-md',
    'focus-visible:outline-none',
  ],
  {
    variants: {
      disabled: {
        true: ['pointer-events-none', 'text-neutral-600'],
        false: ['text-neutral-800'],
      },
      isTrigger: {
        false: [
          'font-medium ',
          'hover:bg-neutral-150',
          'hover:outline-none focus:outline-none',
          'cursor-pointer',
          'p-2 ',
        ],
        true: ['px-2 py-1.5', 'font-semibold', 'shadow-sm'],
      },
    },
    defaultVariants: {
      disabled: false,
      isTrigger: false,
    },
  },
)

const iconWrapperCva = cva('', {
  variants: {
    isRightIcon: {
      true: 'text-base max-w-4 max-h-4 text-neutral-500',
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
