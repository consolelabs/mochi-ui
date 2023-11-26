import { HTMLAttributes } from 'react'

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  disabled?: boolean
  error?: boolean
  errorValue?: string
  required?: boolean
  id?: string
  hideHelperTextOnError?: boolean
}
