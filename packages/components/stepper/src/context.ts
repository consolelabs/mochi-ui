import { createContext, useContext } from 'react'

export type StepItemStatus = 'current' | 'complete' | 'incomplete'

type StepperContextValue = {
  /**
   * The status of the step
   */
  status: StepItemStatus
  /**
   * The total number of steps
   */
  count: number
  /**
   * The index of the step
   */
  step: number
  /**
   * Whether the step is the last step
   */
  isLast?: boolean
  /**
   * Whether the step is the first step
   */
  isFirst?: boolean
  /**
   * Whether the step is loading
   */
  isLoading?: boolean
  /**
   * Whether the step has an error
   */
  isError?: boolean
  /**
   * The orientation of the stepper
   * @default 'vertical'
   */
  orientation: 'horizontal' | 'vertical'
}

const StepperContext = createContext<StepperContextValue>({
  status: 'incomplete',
  count: 0,
  step: 0,
  orientation: 'vertical',
})

const useStepperContext = () => useContext(StepperContext)

export { type StepperContextValue, StepperContext, useStepperContext }
