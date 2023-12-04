import { cva } from 'class-variance-authority'

const layoutDirectionCva = cva('flex flex-nowrap', {
  variants: {
    hasSidebar: {
      true: 'flex-row',
      false: 'flex-col',
    },
  },
  defaultVariants: {
    hasSidebar: false,
  },
})

const layout = { layoutDirectionCva }

export { layout }
