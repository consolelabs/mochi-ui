import { cva, VariantProps } from 'class-variance-authority'

const group = 'space-y-1'

const iconChevron = 'text-sm'

const content = 'relative z-50 w-fit'

const viewportPoperMode =
  'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] '

const viewport = 'space-y-1 bg-background-popup p-3 rounded-lg  shadow-md'

const label =
  'text-[10px] uppercase font-bold text-text-secondary tracking-tight leading-4'

const bodyWrapper = 'flex-1 flex flex-col items-start'

const subTitleWrapper = 'text-text-secondary text-xs'

const separator = 'block !my-3 w-full h-px bg-neutral-outline-border'

const itemCva = cva(
  ['flex gap-2 items-center', 'transition duration-100', 'text-sm rounded-md'],
  {
    variants: {
      disabled: {
        true: ['pointer-events-none', 'text-text-secondary'],
        false: ['text-text-primary'],
      },
      isTrigger: {
        false: [
          'font-medium ',
          'hover:bg-neutral-plain-hover',
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
