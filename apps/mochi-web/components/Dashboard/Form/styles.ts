import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const labelVariant = cva([
  'tracking-wider font-medium text-dashboard-gray-2 text-xs uppercase mb-2 block',
])

type LabelProps = VariantProps<typeof labelVariant> & { className?: string }

export const label = ({ className = '', ...rest }: LabelProps = {}) =>
  labelVariant({ className, ...rest })
