import { useMemo } from 'react'
import { valueChange } from '@mochi-ui/theme'
import { ArrowDownShortLine, ArrowUpShortLine } from '@mochi-ui/icons'
import { ValueChangeIndicatorProps, ValueChangeProps } from './type'
import { ValueChangeContext, useValueChangeContext } from './context'

const { valueChangeCva, valueChangeIndicatorCva } = valueChange

const ValueChange = (props: ValueChangeProps) => {
  const { className, children, trend = 'up' } = props

  const contextValue = useMemo(() => ({ trend }), [trend])

  return (
    <ValueChangeContext.Provider value={contextValue}>
      <div className={valueChangeCva({ trend, className })}>{children}</div>
    </ValueChangeContext.Provider>
  )
}

const ValueChangeIndicator = (props: ValueChangeIndicatorProps) => {
  const { className, children } = props
  const { trend } = useValueChangeContext()

  const Icon = trend === 'up' ? ArrowUpShortLine : ArrowDownShortLine

  return (
    <div>
      {children ?? (
        <Icon className={valueChangeIndicatorCva({ trend, className })} />
      )}
    </div>
  )
}

export {
  ValueChange,
  ValueChangeIndicator,
  type ValueChangeIndicatorProps,
  type ValueChangeProps,
}
