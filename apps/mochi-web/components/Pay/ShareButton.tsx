import { useClipboard } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import Button from '~cpn/base/button'

export default function ShareButton({ link }: { link: string }) {
  const { onCopy } = useClipboard(link)
  return (
    <Button
      type="button"
      size="sm"
      className="flex-1"
      onClick={() => {
        const shareData = { url: link }
        if (navigator.share && navigator.canShare(shareData)) {
          navigator.share(shareData)
        } else {
          // Copy link if can't share
          onCopy()
          alert('Link Copied')
        }
      }}
    >
      <Icon
        icon="mingcute:share-forward-fill"
        className="w-4 h-4 text-dashboard-gray-4"
      />
      <div className="whitespace-nowrap">Share</div>
    </Button>
  )
}
