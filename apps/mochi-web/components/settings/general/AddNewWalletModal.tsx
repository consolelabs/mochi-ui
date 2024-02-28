import { Profile } from '@consolelabs/mochi-rest'
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalPortal,
  toast,
} from '@mochi-ui/core'
import { LoginWidget } from '@mochi-web3/login-widget'
import { useState } from 'react'
import { WretchError } from 'wretch/resolver'
import { API } from '~constants/api'
import { useWalletStore } from '~store'
import { truncateWallet } from '~utils/string'

interface Props {
  code?: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const AddNewWalletModal = ({ code, isOpen, onOpenChange }: Props) => {
  const [loading, setLoading] = useState(false)
  const { setWallets } = useWalletStore()

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalPortal>
        <ModalOverlay />
        <ModalContent
          className="p-3 w-full sm:w-auto"
          style={{
            maxWidth: 'calc(100% - 32px)',
          }}
        >
          <LoginWidget
            raw
            onchain
            onWalletConnectSuccess={async ({
              address,
              signature,
              platform,
            }) => {
              if (!code || loading) return
              setLoading(true)
              const payload = {
                wallet_address: address,
                code,
                signature,
                message: 'Please sign this message to prove wallet ownership',
              }

              await API.MOCHI_PROFILE.post(
                payload,
                `/profiles/me/accounts/connect-${platform.replace(
                  '-chain',
                  '',
                )}`,
              )
                .badRequest((e: WretchError) => [
                  toast({
                    description: e.json?.msg ?? 'Something went wrong',
                    scheme: 'danger',
                  }),
                ])
                .json((r: Profile) => {
                  setWallets(r)
                  toast({
                    description: `Your ${truncateWallet(
                      address,
                    )} wallet is now connected to Mochi.`,
                    scheme: 'success',
                  })
                })
                .finally(() => {
                  setLoading(false)
                  onOpenChange(false)
                })
            }}
          />
        </ModalContent>
      </ModalPortal>
    </Modal>
  )
}
