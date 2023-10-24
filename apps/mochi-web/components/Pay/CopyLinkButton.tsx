import { useClipboard } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import Button from '~cpn/base/button'

export default function CopyLink({ link }: { link: string }) {
  const { hasCopied, onCopy } = useClipboard(link)

  return (
    <Button className="flex-1" size="sm" onClick={onCopy}>
      <Icon
        icon={hasCopied ? 'mdi:success' : 'mingcute:copy-2-fill'}
        className="w-4 h-4 text-dashboard-gray-4"
      />
      <div className="whitespace-nowrap">
        {hasCopied ? 'Link Copied' : 'Copy Link'}
      </div>
    </Button>
  )
}
