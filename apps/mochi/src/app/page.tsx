'use client'

import { LoginWidget } from '@consolelabs/ui-components'
import { useState } from 'react'

const authUrl =
  'https://api.mochi-profile.console.so/api/v1/profiles/auth' as const
const meUrl = 'https://api.mochi-profile.console.so/api/v1/profiles/me' as const

export default function Page(): JSX.Element {
  const [open, setOpen] = useState(false)

  return (
    <LoginWidget
      authUrl={authUrl}
      meUrl={meUrl}
      onOpenChange={setOpen}
      open={open}
    />
  )
}
