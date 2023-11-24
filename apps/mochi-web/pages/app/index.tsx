import AuthLayout from '~components/auth-layout'
import { NextPageWithLayout } from '~pages/_app'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { Statistics } from '~cpn/app/Statistics'
import { AppListing } from '~cpn/app/AppListing'
import { useProfileStore } from '~store'
import { shallow } from 'zustand/shallow'
import { API } from '~constants/api'
import useSWR from 'swr'
import { ViewApplicationListResponse } from '~types/mochi-pay-schema'
import NewAppForm from '~cpn/app/NewAppForm'
import { Modal, ModalContent } from '@consolelabs/core'
import { useDisclosure } from '@dwarvesf/react-hooks'

const App: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { id } = useProfileStore(
    (s) => ({
      id: s.me?.id,
    }),
    shallow,
  )
  const {
    data: apps,
    mutate: refresh,
    isLoading,
  } = useSWR<ViewApplicationListResponse>(
    ['get-list-apps', id],
    async ([_, id]: [any, string]) => {
      if (!id) return []
      return API.MOCHI_PAY.get(`/profiles/${id}/applications`).json(
        (r) => r ?? [],
      )
    },
  )

  return (
    <div>
      <Statistics id={id} apps={apps?.data} onOpenCreateAppModal={onOpen} />
      <AppListing
        apps={apps?.data}
        onOpenCreateAppModal={onOpen}
        isLoading={isLoading || !id}
      />
      <Modal open={isOpen}>
        <ModalContent className="w-full max-w-md">
          <NewAppForm id={id} onClose={onClose} onSuccess={refresh} />
        </ModalContent>
      </Modal>
    </div>
  )
}

App.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export default App
