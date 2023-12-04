import React, { useEffect, useState } from 'react'
import { Button } from '@mochi-ui/core'
import { CheckLine, LinkLine, PlusLine, ShareSolid } from '@mochi-ui/icons'
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
    <div className="flex mx-auto gap-x-2">
      {canShare && (
        <Button
          type="button"
          onClick={onShare}
          variant="outline"
          color="neutral"
          size="sm"
        >
          <ShareSolid />
          Share
        </Button>
      )}
      <Button
        type="button"
        onClick={onCopy}
        variant="outline"
        color="neutral"
        size="sm"
      >
        {hasCopied ? <CheckLine /> : <LinkLine />}
        {hasCopied ? 'Copied' : 'Copy link'}
      </Button>
      <Link href="/">
        <Button size="sm">
          <PlusLine />
          New tip
        </Button>
      </Link>
    </div>
  )
}
