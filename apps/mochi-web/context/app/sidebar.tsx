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
import { APPLICATION_DETAIL_ROUTE_REGEX } from '../../constants/regex'
import { useFetchApplicationDetail } from '../../hooks/app/useFetchApplicationDetail'
import { useFetchApplicationList } from '../../hooks/app/useFetchApplicationList'
import { useProfileStore } from '../../store'
import { ViewApplication } from '../../types/mochi-pay-schema'

export type SidebarVarient = 'main' | 'app-detail'

type SidebarContextValue = {
  variant: SidebarVarient
  setVariant: Dispatch<SetStateAction<SidebarVarient>>
  selectedApp?: ViewApplication
  isSelectedAppLoading?: boolean
  appList?: ViewApplication[]
  isAppListLoading?: boolean
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

function SidebarContextProvider({
  initialSidebarVariant,
  children,
}: {
  initialSidebarVariant: SidebarVarient
  children: ReactNode
}) {
  const [variant, setVariant] = useState<SidebarVarient>(initialSidebarVariant)
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
    const currentVariant = variant
    if (APPLICATION_DETAIL_ROUTE_REGEX.test(router.pathname)) {
      setVariant('app-detail')
    }

    return () => {
      setVariant(currentVariant)
    }
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
    [
      router.pathname,
      router?.query?.id,
      variant,
      selectedApp,
      isSelectedAppLoading,
      appList,
      isAppListLoading,
    ],
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
