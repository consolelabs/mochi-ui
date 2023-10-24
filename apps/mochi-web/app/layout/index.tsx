import { Footer } from './footer'
import { Navbar } from './navbar'

interface Props {
  children: React.ReactNode
}

export const Layout = (props: Props) => (
  <div className="flex flex-col h-full">
    <Navbar />
    {props.children}
    <Footer />
  </div>
)
