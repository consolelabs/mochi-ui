import {
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
  Skeleton,
} from '@mochi-ui/core'
import { DashboardBody } from '~cpn/DashboardBody'

export const AppDetailSkeleton = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>
          <Skeleton className="h-10 rounded-lg w-60" />
        </PageHeaderTitle>
        <PageHeaderActions>
          <Skeleton className="w-24 h-10 rounded-lg" key="see-docs-button" />,
          <Skeleton className="w-24 h-10 rounded-lg" key="api-keys-button" />,
        </PageHeaderActions>
      </PageHeader>

      <DashboardBody>
        <Skeleton className="rounded-lg h-52" />
        <div className="grid flex-1 grid-cols-2 gap-2 mt-8 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-4 space-y-4 border rounded-xl border-divider shadow-input"
            >
              <Skeleton className="w-1/2 h-5 rounded-lg" />
              <Skeleton className="w-2/5 h-8 rounded-lg" />
              <Skeleton className="w-3/4 h-5 rounded-lg" />
            </div>
          ))}
        </div>
      </DashboardBody>
    </>
  )
}
