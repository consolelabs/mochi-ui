import { useHasMounted } from '@dwarvesf/react-hooks'
import { topBar } from '@consolelabs/theme'
// import { MobileNav } from './mobile-nav'
// import { DesktopNav } from './desktop-nav'
import { TopBarProps } from './type'

const { topBarNavContainerClsx, topBarRightClsx } = topBar

export const TopBar = (props: TopBarProps) => {
  const {
    // title,
    className,
    // desktopNavItems = [],
    // mobileNavItems = [],
    // MobileHeader,
    leftSlot,
    rightSlot,
  } = props
  const isMounted = useHasMounted()

  return (
    <header className={topBarNavContainerClsx({ className })}>
      {leftSlot}

      {isMounted ? (
        <div className={topBarRightClsx()}>
          {/* <MobileNav navItems={mobileNavItems} Header={MobileHeader} />
          <DesktopNav navItems={desktopNavItems} /> */}
          {rightSlot}
        </div>
      ) : null}
    </header>
  )
}
