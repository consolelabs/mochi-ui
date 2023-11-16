import { input, InputStylesProps } from '@consolelabs/theme'
import React, { InputHTMLAttributes } from 'react'
import type * as Polymorphic from '@consolelabs/polymorphic'

// root

type TextFieldContextValue = {
  size?: 'md' | 'lg'
  disabled?: boolean
  error?: boolean
}
const TextFieldContext = React.createContext<TextFieldContextValue | undefined>(
  undefined,
)

export type InputRootProps = TextFieldContextValue

type PolymorphicInputRoot = Polymorphic.ForwardRefComponent<
  'div',
  InputRootProps
>

export const InputRoot = React.forwardRef(
  (
    {
      as: Component = 'div',
      children,
      size,
      disabled,
      error,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <Component
        className={input.root({ className })}
        ref={ref}
        onPointerDown={(event) => {
          const target = event.target as HTMLElement
          if (target.closest('input, button, a')) return

          const input = event.currentTarget.querySelector(
            'input',
          ) as HTMLInputElement | null
          if (!input) return

          const position = input.compareDocumentPosition(target)
          const targetIsBeforeInput =
            (position & Node.DOCUMENT_POSITION_PRECEDING) !== 0
          const cursorPosition = targetIsBeforeInput ? 0 : input.value.length

          requestAnimationFrame(() => {
            input.setSelectionRange(cursorPosition, cursorPosition)
            input.focus()
          })
        }}
        {...rest}
      >
        <TextFieldContext.Provider value={{ size, disabled, error }}>
          {children}
        </TextFieldContext.Provider>
      </Component>
    )
  },
) as PolymorphicInputRoot

type InputProps = Omit<InputStylesProps, 'size' | 'disabled' | 'error'> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    className?: string
    size?: 'md' | 'lg'
    disabled?: boolean
    error?: boolean
  }

// type PolymorphicInput = Polymorphic.ForwardRefComponent<'input', InputProps>

// export default function Input({
//   disabled,
//   error,
//   size,
//   className,
//   ...rest
// }: InputProps) {
//   const { inputVariants } = input

//   return (
//     <input
//       className={inputVariants({
//         className: `rt-TextFieldInput  ${className}`,
//         size,
//         disabled,
//         error,
//       })}
//       disabled={disabled}
//       {...rest}
//     />
//   )
// }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, size = 'md', error = false, disabled = false, ...rest },
    ref,
  ) => {
    const { inputVariants } = input

    const context = React.useContext(TextFieldContext)
    const hasRoot = context !== undefined

    const inputElement = (
      <>
        <input
          className={inputVariants({
            className,
            size,
            disabled,
            error,
          })}
          disabled={disabled}
          ref={ref}
          {...rest}
        />
        <div className={input.mask({ disabled, error })} />
      </>
    )

    return hasRoot ? (
      inputElement
    ) : (
      <InputRoot size={size} disabled={disabled} error={error}>
        {inputElement}
      </InputRoot>
    )
  },
)

export default Input

export { type InputProps }
