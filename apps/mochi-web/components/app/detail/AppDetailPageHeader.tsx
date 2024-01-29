import { useClipboard } from '@dwarvesf/react-hooks'
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
  PageHeaderTitle,
  PageHeaderActions,
  Tooltip,
} from '@mochi-ui/core'
import {
  AddUserSolid,
  TrashBinSolid,
  ThreeDotLine,
  KeySolid,
} from '@mochi-ui/icons'
import { SOCIAL_LINKS } from '~constants'

interface Props {
  name?: string
  apiKey?: string
  onDeleteApp: () => void
}

export const AppDetailPageHeader = ({
  name = '',
  apiKey = '',
  onDeleteApp,
}: Props) => {
  const { onCopy: onCopyApiKey, hasCopied: hasCopiedApiKey } =
    useClipboard(apiKey)

  return (
    <PageHeader>
      <PageHeaderTitle>{name}</PageHeaderTitle>

      <PageHeaderActions>
        <Button color="neutral" variant="outline" asChild>
          <a href={SOCIAL_LINKS.DOCS} target="_blank">
            See docs
          </a>
        </Button>
        <Tooltip
          content={hasCopiedApiKey ? 'Copied' : 'Click to copy API key'}
          arrow="top-center"
          componentProps={{
            root: { open: hasCopiedApiKey || undefined },
          }}
        >
          <Button variant="outline" onClick={onCopyApiKey}>
            <KeySolid className="w-4 h-4" />
            API Keys
          </Button>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger className="p-1.5">
            <ThreeDotLine className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="end">
              <DropdownMenuItem leftIcon={<AddUserSolid className="w-5 h-5" />}>
                Invite member
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                leftIcon={
                  <TrashBinSolid className="w-5 h-5 text-danger-outline-fg" />
                }
                onClick={onDeleteApp}
              >
                <Typography level="h8" color="danger">
                  Delete app
                </Typography>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </PageHeaderActions>
    </PageHeader>
  )
}
