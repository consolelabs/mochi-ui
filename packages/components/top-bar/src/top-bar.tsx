import { useHasMounted } from '@dwarvesf/react-hooks'
import { topBar } from '@consolelabs/theme'
import { TopBarProps } from './type'

const { topBarNavContainerClsx, topBarRightClsx } = topBar

export const TopBar = (props: TopBarProps) => {
  const { className, leftSlot, rightSlot } = props
  const isMounted = useHasMounted()

  return (
    <header className={topBarNavContainerClsx({ className })}>
      {leftSlot}

      {isMounted ? <div className={topBarRightClsx()}>{rightSlot}</div> : null}
    </header>
  )
}
