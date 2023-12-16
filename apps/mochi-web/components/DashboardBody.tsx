import { PageContent } from '@mochi-ui/page-content'

interface DashboardBodyProps {
  children: React.ReactNode
  className?: string
}

export const DashboardBody = (props: DashboardBodyProps) => {
  const { children, className } = props

  return <PageContent className={className}>{children}</PageContent>
}
