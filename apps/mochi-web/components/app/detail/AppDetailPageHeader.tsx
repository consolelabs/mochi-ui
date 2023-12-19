import {
  Button,
  PageHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Typography,
  DropdownMenuPortal,
} from '@mochi-ui/core'
import {
  AddUserSolid,
  TrashBinSolid,
  ThreeDotsLine,
  KeySolid,
} from '@mochi-ui/icons'
import { SOCIAL_LINKS } from '~constants'

interface Props {
  name?: string
  onDeleteApp: () => void
}

export const AppDetailPageHeader = ({ name = '', onDeleteApp }: Props) => {
  return (
    <PageHeader
      title={name}
      actions={[
        <Button
          color="white"
          key="see-docs-button"
          as="a"
          href={SOCIAL_LINKS.DOCS}
          target="_blank"
        >
          See docs
        </Button>,
        <Button variant="outline" key="api-keys-button">
          <KeySolid className="w-4 h-4" />
          API Keys
        </Button>,
        <DropdownMenu key="app-select">
          <DropdownMenuTrigger className="p-1.5">
            <ThreeDotsLine className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="end">
              <DropdownMenuItem leftIcon={<AddUserSolid className="w-5 h-5" />}>
                Invite member
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                leftIcon={<TrashBinSolid className="w-5 h-5 text-danger-700" />}
                onClick={onDeleteApp}
              >
                <Typography level="h8" color="danger">
                  Delete app
                </Typography>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>,
      ]}
    />
  )
}
