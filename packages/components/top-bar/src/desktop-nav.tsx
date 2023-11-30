import { topBar } from '@consolelabs/theme'
import { Fragment } from 'react'

const { topBarDesktopNavClsx, topBarDesktopNavContainerClsx } = topBar

interface DesktopNavProps {
  navItems: JSX.Element[]
}

export const DesktopNav = ({ navItems }: DesktopNavProps) => {
  return (
    <div className={topBarDesktopNavClsx()}>
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
