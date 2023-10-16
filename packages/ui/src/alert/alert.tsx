import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const alert = cva(['flex gap-x-2 rounded-lg p-3 border'], {
  variants: {
    appearance: {
      info: ['bg-gray-100', 'text-gray-600', 'border', 'border-gray-300/70'],
      success: ['bg-green-50', 'text-green-700', 'border-green-200'],
      warn: ['bg-yellow-50', 'text-yellow-700', 'border-yellow-300/70'],
      error: ['bg-red-50', 'text-red-700', 'border-red-200'],
    },
  },
  defaultVariants: {
    appearance: 'info',
  },
})

type Props = VariantProps<typeof alert> & {
  children: React.ReactNode
  className?: string
  title: string
}

export default function Alert({
  title,
  children,
  className,
  appearance = 'info',
}: Props) {
  return (
    <div className={alert({ className, appearance })}>
      <div />
      <div className="flex flex-col flex-1 text-current">
        <span className="text-sm font-medium text-current">{title}</span>
        {children}
      </div>
    </div>
  )
}
