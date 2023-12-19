import { Card, PageContent, Skeleton } from '@mochi-ui/core'

export const DashboardSkeleton = () => {
  return (
    <div className="flex flex-row h-[calc(100vh-56px)]">
      <aside className="space-y-5 h-full w-64 border-r border-divider sm:block hidden">
        <Skeleton className="w-full h-20" />
        <div className="space-y-3 p-4">
          <Skeleton className="w-full h-4 rounded-lg" />
          <Skeleton className="w-full h-4 rounded-lg" />
          <Skeleton className="w-2/3 h-4 rounded-lg" />
        </div>
      </aside>
      <div className="flex-1">
        <PageContent>
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            <Card className="space-y-5 pb-20 sm:block hidden">
              <Skeleton className="w-20 h-20 rounded-full" />
              <div className="space-y-3 w-4/5">
                <Skeleton className="w-full h-4 rounded-lg" />
                <Skeleton className="w-2/3 h-4 rounded-lg" />
                <Skeleton className="w-1/3 h-4 rounded-lg" />
              </div>
              <div className="space-x-3 flex">
                <Skeleton className="w-24 h-10 rounded-lg" />
                <Skeleton className="w-24 h-10 rounded-lg opacity-75" />
              </div>
            </Card>
            <Card className="space-y-5 pb-20">
              <Skeleton className="w-20 h-20 rounded-full" />
              <div className="space-y-3 w-4/5">
                <Skeleton className="w-full h-4 rounded-lg" />
                <Skeleton className="w-2/3 h-4 rounded-lg" />
                <Skeleton className="w-1/3 h-4 rounded-lg" />
              </div>
              <div className="space-x-3 flex">
                <Skeleton className="w-24 h-10 rounded-lg" />
                <Skeleton className="w-24 h-10 rounded-lg opacity-75" />
              </div>
            </Card>
          </div>
          <div className="space-y-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="flex space-x-5 sm:space-x-10" key={index}>
                <div className="w-1/3">
                  <Skeleton className="w-2/3 h-6 rounded-lg" />
                </div>
                <div className="w-1/6">
                  <Skeleton className="w-full h-6 rounded-lg" />
                </div>
                <div className="w-1/3">
                  <Skeleton className="w-full h-6 rounded-lg" />
                </div>
                <div className="w-1/6">
                  <Skeleton className="w-full h-6 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </PageContent>
      </div>
    </div>
  )
}
