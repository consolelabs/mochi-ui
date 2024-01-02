import clsx from 'clsx'
import { Footer } from './footer'

interface Props {
  children: React.ReactNode
  noFooter?: boolean
  className?: string
}

export const Layout = (props: Props) => (
  <div
    className={clsx(
      'flex flex-col max-w-[100vw] h-[calc(100vh-56px)] overflow-y-auto',
      props.className ?? '',
    )}
  >
    {props.children}
    {!(props.noFooter ?? false) && <Footer />}
  </div>
)
