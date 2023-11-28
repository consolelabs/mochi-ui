import {
  Button,
  PageHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Typography,
} from '@consolelabs/core'
import {
  AddUserSolid,
  TrashBinSolid,
  ThreeDotsLine,
  KeySolid,
} from '@consolelabs/icons'
import { SOCIAL_LINKS } from '~constants'

interface Props {
  name?: string
}

export const AppDetailPageHeader = ({ name = '' }: Props) => {
  return (
    <PageHeader
      title={name}
      actions={[
        <Button
          variant="outline"
          color="neutral"
          className="!bg-neutral-0"
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
          <DropdownMenuContent align="end">
            <DropdownMenuItem leftIcon={<AddUserSolid className="w-5 h-5" />}>
              Invite member
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              leftIcon={<TrashBinSolid className="w-5 h-5 text-danger-700" />}
            >
              <Typography level="h8" color="danger">
                Delete app
              </Typography>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      ]}
    />
  )
}
