import { IconButton } from '@consolelabs/icon-button'
import { CloseLine, MenuSolid } from '@consolelabs/icons'
import { List } from '@consolelabs/list'
import { topBar } from '@consolelabs/theme'
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

  return <>{children}</>
}

export const MobileNav = (props: MobileNavProps) => {
  const { navItems, Header } = props
  const [openMobileNav, setOpenMobileNav] = useState(false)

  const onCloseMobileNav = () => {
    setOpenMobileNav(false)
  }

  return (
    <>
      <div className={topBarMobileNavClsx()}>
        <IconButton
          size="lg"
          variant="ghost"
          color="neutral"
          className={topBarNavToggleButtonClsx()}
          onClick={() => setOpenMobileNav((prev) => !prev)}
        >
          {openMobileNav ? (
            <CloseLine className={topBarNavToggleButtonIconClsx()} />
          ) : (
            <MenuSolid className={topBarNavToggleButtonIconClsx()} />
          )}
        </IconButton>
      </div>

      {openMobileNav && (
        <div className={topBarNavMobileNavContainerClsx()}>
          <LockScrollWrapper>
            <div className={mobileNavWrapperClsx()}>
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
            </div>
          </LockScrollWrapper>
        </div>
      )}
    </>
  )
}
