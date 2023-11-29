import React from 'react'
import { Controller } from 'react-hook-form'
import type {
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  ControllerFieldState,
} from 'react-hook-form'

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>

type Props<T extends FieldValues> = {
  label?: string
  children:
    | ((p: {
        field: ControllerRenderProps<FieldValues, string>
        fieldState: ControllerFieldState
        formState: UseFormStateReturn<FieldValues>
      }) => React.ReactNode)
    | React.ReactElement<any>
  description?: React.ReactNode
  valueProps?: string
  labelProps?: JSX.IntrinsicElements['label']
  htmlFor?: string
} & Omit<Optional<ControllerProps<T>, 'name'>, 'render'>

export default function Field<T extends FieldValues = FieldValues>({
  label,
  description,
  children,
  control,
  name,
  valueProps,
  labelProps,
  htmlFor,
  ...rest
}: Props<T>) {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={htmlFor}
            className={labelProps?.className ?? 'text-base font-medium'}
          >
            {label}
            {rest.rules?.required && (
              <span className="text-xs text-mochi-900"> *</span>
            )}
          </label>
        )}
        {description}
      </div>
      {!control || !name ? (
        <div>{children as React.ReactElement<any>}</div>
      ) : (
        <Controller
          {...rest}
          name={name}
          control={control}
          render={({ field, fieldState, ...renderRest }) => {
            return (
              <div className="flex flex-col">
                {(() => {
                  if (typeof children === 'function') {
                    return children({
                      field: {
                        ...field,
                        ...(fieldState.error ? { appearance: 'invalid' } : {}),
                        ...(valueProps ? { [valueProps]: field.value } : {}),
                      },
                      fieldState,
                      ...renderRest,
                    })
                  }

                  if (React.isValidElement<any>(children)) {
                    return React.cloneElement(children, {
                      ...children.props,
                      ...field,
                      ...fieldState,
                      ...renderRest,
                      ...(valueProps ? { [valueProps]: field.value } : {}),
                    })
                  }

                  return null
                })()}
                {fieldState.error && (
                  <span className="mt-1 text-xs text-mochi-500">
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            )
          }}
        />
      )}
    </div>
  )
}
