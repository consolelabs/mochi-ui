import { input, InputStylesProps } from '@consolelabs/theme'
import React, { InputHTMLAttributes, useMemo } from 'react'
import { FormControlContext } from '@consolelabs/form-context'
import type * as Polymorphic from '@consolelabs/polymorphic'

// root
type InputContextValue = {
  size?: 'md' | 'lg'
  disabled?: boolean
  error?: boolean
}
const InputContext = React.createContext<InputContextValue | undefined>(
  undefined,
)

export type InputRootProps = InputContextValue

type PolymorphicInputRoot = Polymorphic.ForwardRefComponent<
  'div',
  InputRootProps
>

export const InputRoot = React.forwardRef((props, ref) => {
  const {
    as: Component = 'div',
    children,
    size,
    disabled,
    error,
    className,
    ...rest
  } = props

  const contextValue = useMemo(
    () => ({
      size,
      disabled,
      error,
    }),
    [disabled, error, size],
  )

  return (
    <Component
      className={input.root({ className, error })}
      ref={ref}
      onPointerDown={(event) => {
        const target = event.target as HTMLElement
        if (target.closest('input, button, a')) return

        const input = (event?.currentTarget as HTMLElement)?.querySelector(
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
      <InputContext.Provider value={contextValue}>
        {children}
      </InputContext.Provider>
    </Component>
  )
}) as PolymorphicInputRoot

// input field
type InputProps = Omit<InputStylesProps, 'size' | 'disabled' | 'error'> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    className?: string
    size?: 'md' | 'lg'
    disabled?: boolean
    error?: boolean
  }

export const InputInner = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = 'md',
      error: errorProp,
      disabled: disabledProp,
      id: idProp,
      required: requiredProp,
      ...rest
    },
    ref,
  ) => {
    const { inputVariants } = input

    const context = React.useContext(InputContext)
    const hasRoot = context !== undefined

    const formControlContext = React.useContext(FormControlContext)

    const disabled =
      context?.disabled ?? disabledProp ?? formControlContext.disabled
    const error = context?.error ?? errorProp ?? formControlContext.error
    const id = idProp ?? formControlContext.htmlFor
    const required = requiredProp ?? formControlContext.required

    const inputElement = (
      <>
        <input
          className={inputVariants({
            className,
            size: context?.size ?? size,
            error,
            disabled,
          })}
          disabled={disabled}
          required={required}
          ref={ref}
          id={id}
          {...rest}
        />
        <div
          className={input.mask({
            error,
            disabled,
          })}
        />
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

// slot

type InputSlotElement = React.ElementRef<'div'>

const InputSlot = React.forwardRef<InputSlotElement, any>(
  (props, forwardedRef) => {
    const { className, ...rest } = props
    return (
      <div {...rest} ref={forwardedRef} className={input.slot({ className })} />
    )
  },
)

const Input = Object.assign(
  {},
  {
    Root: InputRoot,
    Slot: InputSlot,
    InputField: InputInner,
  },
)

export default Input

export { type InputProps }
