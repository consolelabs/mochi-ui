import { PropsWithChildren, forwardRef } from 'react'
import { stepper } from '@mochi-ui/theme'
import { useStepperContext } from './context'

const { stepClsx } = stepper

interface StepProps extends PropsWithChildren {
  className?: string
}

const Step = forwardRef<HTMLDivElement, StepProps>((props, ref) => {
  const { className, ...restProps } = props
  const { isLast, orientation } = useStepperContext()

  return (
    <div
      ref={ref}
      className={stepClsx({ className, isLast, orientation })}
      {...restProps}
    />
  )
})

Step.displayName = 'Step'

export { Step, type StepProps }
