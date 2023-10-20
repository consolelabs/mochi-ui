'use client'

import { LoginWidget } from '@consolelabs/ui-components'
import { useState } from 'react'

export default function Page(): JSX.Element {
  const [open, setOpen] = useState(false)

  return <LoginWidget onOpenChange={setOpen} open={open} />
}
