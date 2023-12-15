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
      'flex flex-col h-full max-w-[100vw]',
      props.className ?? '',
    )}
  >
    {props.children}
    {!(props.noFooter ?? false) && <Footer />}
  </div>
)
