import { createContext, useContext } from 'react'

export type FormControlContextValue = {
  disabled?: boolean
  error?: boolean
  required?: boolean
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
