import { forwardRef, useId, useMemo } from 'react'
import { formControl } from '@consolelabs/theme'
import { FormControlContext } from './context'
import { FormControlProps } from './type'

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  (props: FormControlProps, ref) => {
    const { className, children, required, disabled, error, id: _id } = props
    const internalId = useId()
    const id = _id ?? internalId

    const passValue = useMemo(
      () => ({
        required,
        disabled,
        error,
        htmlFor: id,
        labelId: `${id}_label`,
      }),
      [disabled, error, id, required],
    )
    return (
      <FormControlContext.Provider value={passValue}>
        <div ref={ref} className={formControl.wrapper({ className })}>
          {children}
        </div>
      </FormControlContext.Provider>
    )
  },
)
