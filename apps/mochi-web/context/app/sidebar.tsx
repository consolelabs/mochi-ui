import { useRouter } from 'next/router'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { shallow } from 'zustand/shallow'
import { ROUTES } from '../../constants/routes'
import { useFetchApplicationDetail } from '../../hooks/app/useFetchApplicationDetail'
import { useFetchApplicationList } from '../../hooks/app/useFetchApplicationList'
import { useProfileStore } from '../../store'
import { ViewApplication } from '../../types/mochi-pay-schema'

export type SidebarVariant = 'main' | 'app-detail'

type SidebarContextValue = {
  variant: SidebarVariant
  setVariant: Dispatch<SetStateAction<SidebarVariant>>
  selectedApp?: ViewApplication
  isSelectedAppLoading?: boolean
  appList?: ViewApplication[]
  isAppListLoading?: boolean
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

function SidebarContextProvider({
  initialSidebarVariant = 'main',
  children,
}: {
  initialSidebarVariant?: SidebarVariant
  children: ReactNode
}) {
  const [variant, setVariant] = useState<SidebarVariant>(initialSidebarVariant)
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
    console.log(router)
    if (
      [
        ROUTES.APPLICATION_DETAIL.pathname,
        ROUTES.APPLICATION_DETAIL_REVENUE.pathname,
      ].includes(router.pathname)
    ) {
      setVariant('app-detail')
    } else {
      setVariant('main')
    }
  }, [router.pathname])

  useEffect(() => {
    if (
      [
        ROUTES.APPLICATION_DETAIL.pathname,
        ROUTES.APPLICATION_DETAIL_REVENUE.pathname,
      ].includes(router.pathname)
    ) {
      if (!isSelectedAppLoading && data) {
        setSelectedApplication(data)
      }
    } else {
      setSelectedApplication(undefined)
    }
  }, [router.pathname, router?.query?.id, isSelectedAppLoading, data])

  const contextValue = useMemo(
    () => ({
      variant,
      setVariant,
      selectedApp,
      isSelectedAppLoading,
      appList,
      isAppListLoading,
    }),
    [variant, selectedApp, isSelectedAppLoading, appList, isAppListLoading],
  )

  return (
    <SidebarContext.Provider value={contextValue}>
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
