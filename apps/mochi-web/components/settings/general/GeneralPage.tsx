import { Button, useLoginWidget } from '@mochi-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { ROUTES } from '~constants/routes'

export const GeneralPage = () => {
  const { logout } = useLoginWidget()
  const { replace } = useRouter()

  return (
    <Button
      variant="outline"
      color="white"
      onClick={() => {
        replace(ROUTES.HOME)
        setTimeout(() => {
          logout()
        }, 500)
      }}
    >
      Log out
    </Button>
  )
}
