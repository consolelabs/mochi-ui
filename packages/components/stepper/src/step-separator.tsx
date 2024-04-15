import { PropsWithChildren, forwardRef } from 'react'
import { stepper } from '@mochi-ui/theme'
import { useStepperContext } from './context'

const { stepSeparatorClsx } = stepper

interface StepSeparatorProps extends PropsWithChildren {
  className?: string
}

const StepSeparator = forwardRef<HTMLDivElement, StepSeparatorProps>(
  (props, ref) => {
    const { className, ...restProps } = props
    const { isLast, orientation } = useStepperContext()

    return (
      <div
        ref={ref}
        className={stepSeparatorClsx({ className, isLast, orientation })}
        {...restProps}
      />
    )
  },
)

StepSeparator.displayName = 'StepTitle'

export { StepSeparator, type StepSeparatorProps }
