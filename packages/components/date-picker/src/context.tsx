import { createContext, PropsWithChildren, useContext } from 'react'
import { DayPickerStyleProps } from './type'

const DayPickerStylePropsContext = createContext<DayPickerStyleProps>({
  hasShadow: false,
  paddingSize: 'md',
  alignCaptionCenter: false,
})

export const useStyleContext = () => useContext(DayPickerStylePropsContext)

export const DayPickerStylePropsProvider = (
  props: PropsWithChildren<DayPickerStyleProps>,
) => {
  const { children, ...restProps } = props
  return (
    <DayPickerStylePropsContext.Provider value={restProps}>
      {children}
    </DayPickerStylePropsContext.Provider>
  )
}
