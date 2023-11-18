import { ChangeEventHandler } from 'react'
import { createPassPropsContext } from '../utils'

interface InputPropsContextValue {
  fromInputProps?: {
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
  }
  toInputProps?: {
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
  }
}

const [InputControllProvider, useInputProps] =
  createPassPropsContext<InputPropsContextValue>({ name: 'InputPassProps' })

export { InputControllProvider, useInputProps }
