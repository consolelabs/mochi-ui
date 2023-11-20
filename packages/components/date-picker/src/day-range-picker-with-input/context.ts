import { createPassPropsContext } from '../utils'
import { UseDayRangeInputReturn } from '../type'

type InputPropsContextValue = Pick<
  UseDayRangeInputReturn,
  'fromInputProps' | 'toInputProps' | 'inputState'
>

const [InputControllProvider, useInputProps] =
  createPassPropsContext<InputPropsContextValue>({ name: 'InputPassProps' })

export { InputControllProvider, useInputProps }
