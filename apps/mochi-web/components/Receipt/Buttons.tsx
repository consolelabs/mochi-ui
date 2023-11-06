import React, { useEffect, useState } from 'react'
import { Button } from '@consolelabs/ui-components'
import { IconCheck, IconLink, IconPlus, IconShare } from '@consolelabs/icons'
import { useClipboard } from '@dwarvesf/react-hooks'
import Link from 'next/link'

interface Props {
  shareLink?: string
}

export default function Buttons({ shareLink }: Props) {
  const { onCopy, hasCopied } = useClipboard(shareLink ?? '')
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    if (!shareLink) return
    if (navigator && navigator.canShare?.({ url: shareLink })) {
      setCanShare(true)
    }
  }, [shareLink])

  async function onShare() {
    await navigator.share({ url: shareLink })
  }

  return (
    <div className="flex gap-x-2 mx-auto">
      {canShare && (
        <Button
          type="button"
          onClick={onShare}
          variant="outline"
          color="info"
          size="sm"
        >
          <IconShare />
          Share
        </Button>
      )}
      <Button
        type="button"
        onClick={onCopy}
        variant="outline"
        color="info"
        size="sm"
      >
        {hasCopied ? <IconCheck /> : <IconLink />}
        {hasCopied ? 'Copied' : 'Copy link'}
      </Button>
      <Link href="/">
        <Button size="sm">
          <IconPlus />
          New tip
        </Button>
      </Link>
    </div>
  )
}
