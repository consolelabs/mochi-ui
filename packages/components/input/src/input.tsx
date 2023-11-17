import { input, InputStylesProps } from '@consolelabs/theme'
import React, { InputHTMLAttributes, useMemo } from 'react'
import type * as Polymorphic from '@consolelabs/polymorphic'

// root

type TextFieldContextValue = {
  size?: 'md' | 'lg'
  disabled?: boolean
  error?: boolean
  spacing?: 'md' | 'lg'
}
const TextFieldContext = React.createContext<TextFieldContextValue | undefined>(
  undefined,
)

export type InputRootProps = TextFieldContextValue

type PolymorphicInputRoot = Polymorphic.ForwardRefComponent<
  'div',
  InputRootProps
>

export const InputRoot = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const {
    as: Component = 'div',
    children,
    size,
    disabled,
    error,
    spacing,
    className,
    ...rest
  } = props

  const contextValue = useMemo(
    () => ({
      size,
      disabled,
      error,
      spacing,
    }),
    [disabled, error, size, spacing],
  )

  return (
    <Component
      className={input.root({ className, spacing, error })}
      ref={ref}
      onPointerDown={(event: MouseEvent) => {
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
      <TextFieldContext.Provider value={contextValue}>
        {children}
      </TextFieldContext.Provider>
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
    spacing?: 'md' | 'lg'
  }

export const InputInner = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = 'md',
      error = false,
      disabled = false,
      spacing = 'lg',
      ...rest
    },
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
            size: context?.size ?? size,
            error: context?.error ?? error,
            disabled: context?.disabled ?? disabled,
          })}
          disabled={context?.disabled ?? disabled}
          ref={ref}
          {...rest}
        />
        <div
          className={input.mask({
            error: context?.error ?? error,
            disabled: context?.disabled ?? disabled,
          })}
        />
      </>
    )

    return hasRoot ? (
      inputElement
    ) : (
      <InputRoot
        size={size}
        disabled={disabled}
        error={error}
        spacing={spacing}
      >
        {inputElement}
      </InputRoot>
    )
  },
)

// slot

type TextFieldSlotElement = React.ElementRef<'div'>

const InputSlot = React.forwardRef<TextFieldSlotElement, any>(
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
