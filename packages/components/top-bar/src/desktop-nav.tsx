import { topBar } from '@mochi-ui/theme'
import { Fragment } from 'react'
import { DesktopNavProps } from './type'

const { topBarDesktopNavClsx, topBarDesktopNavContainerClsx } = topBar

export const DesktopNav = ({ navItems, className }: DesktopNavProps) => {
  return (
    <div className={topBarDesktopNavClsx({ className })}>
      {navItems.length ? (
        <div className={topBarDesktopNavContainerClsx()}>
          {navItems.map((item, index) => (
            <Fragment key={index}>{item}</Fragment>
          ))}
        </div>
      ) : null}
    </div>
  )
}
