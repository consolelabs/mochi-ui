import { Children, PropsWithChildren, forwardRef, useCallback } from 'react'
import { stepper } from '@mochi-ui/theme'
import { StepItemStatus, StepperContext, StepperContextValue } from './context'

const { stepperCva } = stepper

interface StepperProps extends PropsWithChildren {
  currentStep: number
  isLoading?: boolean
  isError?: boolean
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

const Stepper = forwardRef<HTMLDivElement, StepperProps>((props, ref) => {
  const {
    children,
    currentStep = 0,
    isLoading,
    isError,
    orientation = 'vertical',
    className,
    ...restProps
  } = props

  const items = Children.toArray(children)
  const count = items.length

  const getStatus = useCallback(
    (step: number): StepItemStatus => {
      if (step < currentStep) {
        return 'complete'
      }
      if (step > currentStep) {
        return 'incomplete'
      }
      return 'current'
    },
    [currentStep],
  )

  const getValue = useCallback(
    (step: number): StepperContextValue => ({
      step,
      count,
      isFirst: step === 1,
      isLast: step === count,
      orientation,
      ...(getStatus(step) === 'current'
        ? { status: getStatus(step), isLoading, isError }
        : { status: getStatus(step) }),
    }),
    [count, getStatus, isError, isLoading, orientation],
  )

  return (
    <div
      ref={ref}
      className={stepperCva({ className, orientation })}
      {...restProps}
    >
      {items.map((item, index) => (
        <StepperContext.Provider key={index} value={getValue(index + 1)}>
          {item}
        </StepperContext.Provider>
      ))}
    </div>
  )
})

Stepper.displayName = 'Stepper'

export { Stepper, type StepperProps }
