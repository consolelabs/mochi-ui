import { PageContent } from '@mochi-ui/page-content'

interface DashboardBodyProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

export const DashboardBody = (props: DashboardBodyProps) => {
  const { children, className, containerClassName } = props

  return (
    <PageContent {...{ className, containerClassName }}>{children}</PageContent>
  )
}
