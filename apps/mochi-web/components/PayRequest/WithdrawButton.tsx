import { useCallback, useState } from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalDescription,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
  TextFieldInput,
  TextFieldRoot,
} from '@mochi-ui/core'
import { API } from '~constants/api'

export default function WithdrawButton({ code }: { code: string }) {
  const [value, setValue] = useState('')

  const handleWithdraw = useCallback(async () => {
    try {
      await API.MOCHI_PAY.put(
        { public_key: value },
        `/pay-requests/${code}/claim/onchain`,
      ).json()
    } catch (e) {
      console.error('handleWithdraw', e)
    }
  }, [code, value])

  return (
    <Modal modal>
      <ModalTrigger asChild>
        <Button size="sm">Withdraw</Button>
      </ModalTrigger>

      <ModalPortal>
        <ModalOverlay />
        <ModalContent>
          <form
            className="flex flex-col gap-y-3 items-center w-screen max-w-xs"
            onSubmit={handleWithdraw}
          >
            <ModalTitle>Claim</ModalTitle>
            <ModalDescription>
              Claim to a wallet address you specify
            </ModalDescription>
            <TextFieldRoot className="w-full">
              <TextFieldInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter wallet address"
              />
            </TextFieldRoot>

            <div className="flex gap-x-2 w-full">
              <ModalTrigger asChild>
                <Button
                  type="button"
                  className="flex-1"
                  color="neutral"
                  variant="outline"
                >
                  Close
                </Button>
              </ModalTrigger>
              <ModalTrigger asChild>
                <Button type="submit" className="flex-1">
                  Confirm
                </Button>
              </ModalTrigger>
            </div>
          </form>
        </ModalContent>
      </ModalPortal>
    </Modal>
  )
}
