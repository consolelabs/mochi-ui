import { forwardRef } from 'react'

export const ActionBar = forwardRef<any, any>((props, ref) => (
  <div ref={ref} {...props}>
    Actionbar
  </div>
))
