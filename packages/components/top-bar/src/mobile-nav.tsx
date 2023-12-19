import { IconButton } from '@mochi-ui/icon-button'
import { CloseLine, MenuSolid } from '@mochi-ui/icons'
import { List } from '@mochi-ui/list'
import { topBar } from '@mochi-ui/theme'
import { ReactNode, useState } from 'react'
import { useLockScreenScroll } from '../hooks'
import { MobileNavProps } from './type'

const {
  mobileNavWrapperClsx,
  mobileNavListRootClsx,
  mobileNavListContentClsx,
  mobileNavListViewportClsx,
  topBarMobileNavClsx,
  topBarNavToggleButtonClsx,
  topBarNavToggleButtonIconClsx,
  topBarNavMobileNavContainerClsx,
} = topBar

const LockScrollWrapper = ({ children }: { children: ReactNode }) => {
  useLockScreenScroll()

  return <div className={mobileNavWrapperClsx()}>{children}</div>
}

export const MobileNav = (props: MobileNavProps) => {
  const { navItems, Header, toggleIconClassName, className } = props
  const [openMobileNav, setOpenMobileNav] = useState(false)

  const onCloseMobileNav = () => {
    setOpenMobileNav(false)
  }

  return (
    <>
      <div className={topBarMobileNavClsx({ className })}>
        <IconButton
          label={openMobileNav ? 'Close' : 'Open'}
          size="lg"
          variant="ghost"
          color="neutral"
          className={topBarNavToggleButtonClsx()}
          onClick={() => setOpenMobileNav((prev) => !prev)}
        >
          {openMobileNav ? (
            <CloseLine
              aria-hidden
              className={topBarNavToggleButtonIconClsx({
                className: toggleIconClassName,
              })}
            />
          ) : (
            <MenuSolid
              aria-hidden
              className={topBarNavToggleButtonIconClsx({
                className: toggleIconClassName,
              })}
            />
          )}
        </IconButton>
      </div>

      {openMobileNav && (
        <div className={topBarNavMobileNavContainerClsx()}>
          <LockScrollWrapper>
            {Header !== undefined ? (
              <Header onClose={onCloseMobileNav} />
            ) : null}

            <List
              rootClassName={mobileNavListRootClsx()}
              data={navItems}
              renderItem={(elem) => elem}
              listClassName={mobileNavListContentClsx()}
              viewportClassName={mobileNavListViewportClsx()}
            />
          </LockScrollWrapper>
        </div>
      )}
    </>
  )
}
