import { Footer } from './footer'

interface Props {
  children: React.ReactNode
}

export const Layout = (props: Props) => (
  <div className="flex flex-col h-full max-w-[100vw]">
    {props.children}
    <Footer />
  </div>
)
