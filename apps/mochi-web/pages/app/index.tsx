import AuthLayout from '~components/auth-layout'
import { NextPageWithLayout } from '~pages/_app'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { Statistics } from '~cpn/app/Statistics'
import { AppListing } from '~cpn/app/AppListing'
import { useProfileStore } from '~store'
import { shallow } from 'zustand/shallow'
import NewAppForm from '~cpn/app/NewAppForm'
import { Modal, ModalContent } from '@consolelabs/core'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useFetchApplicationList } from '~hooks/app/useFetchApplicationList'
import { useRouter } from 'next/router'
import { ViewFullApplicationResponse } from '~types/mochi-pay-schema'

const App: NextPageWithLayout = () => {
  const { push } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { id } = useProfileStore(
    (s) => ({
      id: s.me?.id,
    }),
    shallow,
  )
  const { data: apps, mutate: refresh, isLoading } = useFetchApplicationList(id)

  const onCreateApp = (result: ViewFullApplicationResponse) => {
    refresh()
    push(`/app/${result.data?.id}`)
  }

  return (
    <div>
      <Statistics id={id} apps={apps} onOpenCreateAppModal={onOpen} />
      <AppListing
        apps={apps}
        onOpenCreateAppModal={onOpen}
        isLoading={isLoading || !id}
      />
      <Modal open={isOpen}>
        <ModalContent className="w-full max-w-md">
          <NewAppForm id={id} onClose={onClose} onSuccess={onCreateApp} />
        </ModalContent>
      </Modal>
    </div>
  )
}

App.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export default App
