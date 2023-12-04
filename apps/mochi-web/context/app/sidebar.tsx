import { useRouter } from 'next/router'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { shallow } from 'zustand/shallow'
import { APPLICATION_DETAIL_ROUTE_REGEX } from '../../constants/regex'
import { useFetchApplicationDetail } from '../../hooks/app/useFetchApplicationDetail'
import { useFetchApplicationList } from '../../hooks/app/useFetchApplicationList'
import { useProfileStore } from '../../store'
import { ViewApplication } from '../../types/mochi-pay-schema'

export type SidebarStatus = 'main' | 'app-detail'

type SidebarContextValue = {
  status: SidebarStatus
  setStatus: Dispatch<SetStateAction<SidebarStatus>>
  selectedApp?: ViewApplication
  isSelectedAppLoading?: boolean
  appList?: ViewApplication[]
  isAppListLoading?: boolean
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

function SidebarContextProvider({
  initialSidebarStatus,
  children,
}: {
  initialSidebarStatus: SidebarStatus
  children: ReactNode
}) {
  const [status, setStatus] = useState<SidebarStatus>(initialSidebarStatus)
  const [selectedApp, setSelectedApplication] = useState<ViewApplication>()
  const router = useRouter()

  const { id: profileId } = useProfileStore(
    (s) => ({
      id: s.me?.id,
    }),
    shallow,
  )

  const { data: appList, isLoading: isAppListLoading } =
    useFetchApplicationList(profileId)

  const { data, isLoading: isSelectedAppLoading } = useFetchApplicationDetail(
    profileId,
    router?.query?.id as string,
  )

  useEffect(() => {
    const currentStatus = status
    if (APPLICATION_DETAIL_ROUTE_REGEX.test(router.pathname)) {
      setStatus('app-detail')
    }

    return () => {
      setStatus(currentStatus)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  useEffect(() => {
    if (APPLICATION_DETAIL_ROUTE_REGEX.test(router.pathname)) {
      if (!isSelectedAppLoading && data) {
        setSelectedApplication(data)
      }
    }

    return () => {
      setSelectedApplication(undefined)
    }
  }, [router.pathname, router?.query?.id, isSelectedAppLoading])

  return (
    <SidebarContext.Provider
      value={{
        status,
        setStatus,
        selectedApp,
        isSelectedAppLoading,
        appList,
        isAppListLoading,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

const useSidebarContext = () =>
  useContext(SidebarContext) as SidebarContextValue

export {
  type SidebarContextValue,
  SidebarContext,
  SidebarContextProvider,
  useSidebarContext,
}
