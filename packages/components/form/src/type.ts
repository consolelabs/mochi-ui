import { HTMLAttributes } from 'react'

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  disabled?: boolean
  error?: boolean
  required?: boolean
  id?: string
}
