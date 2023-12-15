import { useClipboard, useDisclosure } from '@dwarvesf/react-hooks'
import { Button } from '@mochi-ui/core'
import { CheckLine, LinkLine } from '@mochi-ui/icons'
import { useEffect } from 'react'

export default function ShareButton({ link }: { link: string }) {
  const { isOpen: isCanShare, onOpen: canShare } = useDisclosure()
  const { hasCopied, onCopy } = useClipboard(link)

  useEffect(() => {
    if (!!navigator.share && navigator.canShare({ url: link })) {
      canShare()
    }
  }, [canShare, link])

  let text = hasCopied ? 'Copied' : 'Copy'
  if (isCanShare) {
    text = 'Share'
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={() => (isCanShare ? navigator.share({ url: link }) : onCopy())}
    >
      {hasCopied ? <CheckLine /> : <LinkLine />}
      <div className="whitespace-nowrap">{text}</div>
    </Button>
  )
}
