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
  DropdownMenuPortal,
  ModalPortal,
  ModalOverlay,
  PageHeaderTitle,
  PageHeaderActions,
} from '@mochi-ui/core'
import { CheckLine, ChevronDownLine } from '@mochi-ui/icons'
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
import { SEO } from '~app/layout/seo'
import { DashboardBody } from '~cpn/DashboardBody'

const AppPageHeader = ({
  onClickCreateApp,
  apps = [],
}: {
  onClickCreateApp: () => void
  apps?: ViewApplication[]
}) => {
  return (
    <PageHeader>
      <PageHeaderTitle>Developer Portal</PageHeaderTitle>

      <PageHeaderActions>
        <Button
          color="neutral"
          variant="outline"
          onClick={() => window.open(SOCIAL_LINKS.DOCS, '_blank')}
        >
          See docs
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="" asChild>
            <Button variant="soft" color="neutral">
              <Typography level="p5">All apps</Typography>
              <ChevronDownLine className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                rightIcon={
                  <CheckLine className="ml-4 w-4 h-4 text-primary-plain-fg" />
                }
              >
                All apps
              </DropdownMenuItem>
              {apps.map((app) => (
                <Link
                  key={app.id}
                  href={ROUTES.APPLICATION_DETAIL.getPath(app.id)}
                >
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
          </DropdownMenuPortal>
        </DropdownMenu>
      </PageHeaderActions>
    </PageHeader>
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
      pathname: ROUTES.APPLICATION_DETAIL.getPath(result.data?.id),
      query: {
        secretKey: result.data?.private_key,
      },
    })
  }

  return (
    <>
      <SEO title="Applications" tailTitle />
      <AppPageHeader apps={apps} onClickCreateApp={onOpen} />
      <DashboardBody>
        <Statistics id={id} onOpenCreateAppModal={onOpen} />
        <AppListing
          {...{ apps, refresh }}
          onOpenCreateAppModal={onOpen}
          isLoading={isLoading || !id}
          className="max-w-full"
        />
        <Modal open={isOpen} onOpenChange={onOpenChange}>
          <ModalPortal>
            <ModalOverlay />
            <ModalContent className="w-full max-w-md">
              <NewAppForm id={id} onClose={onClose} onSuccess={onCreateApp} />
            </ModalContent>
          </ModalPortal>
        </Modal>
      </DashboardBody>
    </>
  )
}

export default App
