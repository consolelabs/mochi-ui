import { createContext, useContext } from 'react'
import { FormControlProps } from './type'

export type FormControlContextValue = Partial<
  Pick<FormControlProps, 'required' | 'disabled' | 'error'>
> & {
  htmlFor?: string
  labelId?: string
}

const FormControlContext = createContext<FormControlContextValue>({
  required: false,
  disabled: false,
  error: false,
})

const useFromControl = () => useContext(FormControlContext)

export { FormControlContext, useFromControl }
