import { createContext, useContext } from 'react'
import { ValueChangeProps } from './type'

type ValueChangeContextValue = {
  trend: ValueChangeProps['trend']
}

const ValueChangeContext = createContext<ValueChangeContextValue>({
  trend: 'up',
})

const useValueChangeContext = () => useContext(ValueChangeContext)

export {
  type ValueChangeContextValue,
  ValueChangeContext,
  useValueChangeContext,
}
