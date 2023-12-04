import {
  Button,
  PageHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Typography,
  Modal,
  ModalContent,
} from '@mochi-ui/core'
import { CheckLine, ChevronDownLine } from '@mochi-ui/icons'
import AuthLayout from '~components/auth-layout'
import { NextPageWithLayout } from '~pages/_app'
import { Statistics } from '~cpn/app/Statistics'
import { AppListing } from '~cpn/app/AppListing'
import { useProfileStore } from '~store'
import { shallow } from 'zustand/shallow'
import NewAppForm from '~cpn/app/NewAppForm'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useFetchApplicationList } from '~hooks/app/useFetchApplicationList'
import { useRouter } from 'next/router'
import {
  ViewApplication,
  ViewFullApplicationResponse,
} from '~types/mochi-pay-schema'
import Link from 'next/link'
import { SOCIAL_LINKS } from '~constants'
import { ROUTES } from '~constants/routes'

const AppPageHeader = ({
  onClickCreateApp,
  apps = [],
}: {
  onClickCreateApp: () => void
  apps?: ViewApplication[]
}) => {
  return (
    <PageHeader
      title="Developer Portal"
      description="Build secure and frictionless payments across Web2 and Web3
      platforms with a single API call."
      actions={[
        <Button
          color="white"
          key="see-docs-button"
          onClick={() => window.open(SOCIAL_LINKS.DOCS, '_blank')}
        >
          See docs
        </Button>,
        <DropdownMenu key="app-select">
          <DropdownMenuTrigger className="">
            <Button className="!bg-neutral-150">
              <Typography level="p5">All apps</Typography>
              <ChevronDownLine className="w-4 h-4 text-neutral-800" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              rightIcon={
                <CheckLine className="w-4 h-4 ml-4 text-primary-700" />
              }
            >
              All apps
            </DropdownMenuItem>
            {apps.map((app) => (
              <Link key={app.id} href={ROUTES.APPLICATION_DETAIL(app.id)}>
                <DropdownMenuItem key={app.id}>{app.name}</DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onClickCreateApp}>
              <Typography level="h8" color="primary">
                Create an app
              </Typography>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      ]}
    />
  )
}

const App: NextPageWithLayout = () => {
  const { push } = useRouter()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const { id } = useProfileStore(
    (s) => ({
      id: s.me?.id,
    }),
    shallow,
  )
  const { data: apps, mutate: refresh, isLoading } = useFetchApplicationList(id)

  const onCreateApp = (result: ViewFullApplicationResponse) => {
    refresh()
    push({
      pathname: ROUTES.APPLICATION_DETAIL(result.data?.id),
      query: {
        secretKey: result.data?.private_key,
      },
    })
  }

  return (
    <AuthLayout
      pageHeader={<AppPageHeader apps={apps} onClickCreateApp={onOpen} />}
    >
      <Statistics id={id} onOpenCreateAppModal={onOpen} />
      <AppListing
        apps={apps}
        onOpenCreateAppModal={onOpen}
        isLoading={isLoading || !id}
        className="max-w-full"
      />
      <Modal open={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="w-full max-w-md">
          <NewAppForm id={id} onClose={onClose} onSuccess={onCreateApp} />
        </ModalContent>
      </Modal>
    </AuthLayout>
  )
}

export default App
