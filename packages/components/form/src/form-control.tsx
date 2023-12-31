import { forwardRef, useId, useMemo } from 'react'
import { formControl } from '@mochi-ui/theme'
import { FormControlContext } from '@mochi-ui/form-context'
import type * as Polymorphic from '@mochi-ui/polymorphic'
import { FormControlProps } from './type'

type PolymorphicFormControl = Polymorphic.ForwardRefComponent<
  'div',
  FormControlProps
>

export const FormControl = forwardRef((props, ref) => {
  const {
    as: Component = 'div',
    className,
    children,
    required,
    disabled,
    error,
    errorValue = '',
    hideHelperTextOnError = false,
    id: idProp,
    ...restProps
  } = props

  const internalId = useId()
  const id = idProp ?? internalId

  const passValue = useMemo(
    () => ({
      required,
      disabled,
      error,
      htmlFor: id,
      labelId: `${id}_label`,
      errorValue,
      hideHelperTextOnError,
    }),
    [disabled, error, errorValue, hideHelperTextOnError, id, required],
  )

  return (
    <FormControlContext.Provider value={passValue}>
      <Component
        ref={ref}
        className={formControl.wrapperClsx({ className })}
        {...restProps}
      >
        {children}
      </Component>
    </FormControlContext.Provider>
  )
}) as PolymorphicFormControl

FormControl.displayName = 'FormControl'
