import { createContext, useContext } from 'react'

export type FormControlContextValue = {
  disabled?: boolean
  error?: boolean
  required?: boolean
  hideHelperTextOnError?: boolean
  errorValue?: string
  htmlFor?: string
  labelId?: string
}

const FormControlContext = createContext<FormControlContextValue>({
  required: false,
  disabled: false,
  error: false,
  errorValue: undefined,
})

const useFromControl = () => useContext(FormControlContext)

export { FormControlContext, useFromControl }
