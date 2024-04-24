import { PropsWithChildren, forwardRef } from 'react'
import { stepper } from '@mochi-ui/theme'

const { stepContentClsx } = stepper

interface StepContentProps extends PropsWithChildren {
  className?: string
}

const StepContent = forwardRef<HTMLDivElement, StepContentProps>(
  (props, ref) => {
    const { className, ...restProps } = props

    return (
      <div
        ref={ref}
        className={stepContentClsx({ className })}
        {...restProps}
      />
    )
  },
)

StepContent.displayName = 'StepContent'

export { StepContent, type StepContentProps }
