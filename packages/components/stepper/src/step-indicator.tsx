import { PropsWithChildren, forwardRef } from 'react'
import { stepper } from '@mochi-ui/theme'
import { CheckLine, CloseLine, SpinnerLine } from '@mochi-ui/icons'
import { useStepperContext } from './context'

const { stepIndicatorClsx, stepIndicatorIconClsx, stepIndicatorLoadingClsx } =
  stepper

interface StepIndicatorProps extends PropsWithChildren {
  className?: string
}

const StepIndicator = forwardRef<HTMLDivElement, StepIndicatorProps>(
  (props, ref) => {
    const { className, ...restProps } = props
    const { step, status: stepStatus, isLoading, isError } = useStepperContext()

    let status: 'loading' | 'error' | 'success' | 'current' | 'incomplete' =
      'current'
    let children = null
    if (isLoading) {
      status = 'loading'
      children = <SpinnerLine className={stepIndicatorLoadingClsx()} />
    } else if (isError) {
      status = 'error'
      children = <CloseLine className={stepIndicatorIconClsx()} />
    } else if (stepStatus === 'complete') {
      status = 'success'
      children = <CheckLine className={stepIndicatorIconClsx()} />
    } else {
      status = stepStatus
      children = step
    }

    return (
      <div
        ref={ref}
        className={stepIndicatorClsx({
          className,
          status,
        })}
        {...restProps}
      >
        {children}
      </div>
    )
  },
)

StepIndicator.displayName = 'StepIndicator'

export { StepIndicator, type StepIndicatorProps }
