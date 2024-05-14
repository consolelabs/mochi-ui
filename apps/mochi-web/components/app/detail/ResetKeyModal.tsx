import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalPortal,
  ModalTrigger,
  Typography,
} from '@mochi-ui/core'
import { AlertTriangleLine } from '@mochi-ui/icons'

interface Props {
  trigger: React.ReactNode
  onConfirm: () => void
}

export const ResetKeyModal = ({ trigger, onConfirm }: Props) => {
  return (
    <Modal modal>
      <ModalTrigger asChild>{trigger}</ModalTrigger>
      <ModalPortal>
        <ModalOverlay />
        <ModalContent className="w-full max-w-sm">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center p-3 border-8 rounded-full w-fit bg-warning-outline-active border-warning-outline-hover">
              <AlertTriangleLine className="w-6 h-6 text-warning-solid" />
            </div>
            <Typography level="h6" className="mt-5">
              Reset app’s key?
            </Typography>
            <Typography
              level="p5"
              color="textSecondary"
              className="mt-2 text-center"
            >
              Once you reset, your app can not access Mochi’s API, until you
              update the new secret key.
            </Typography>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-8">
            <ModalTrigger asChild>
              <Button size="lg" color="neutral" variant="outline">
                Cancel
              </Button>
            </ModalTrigger>
            <ModalTrigger asChild>
              <Button size="lg" onClick={onConfirm}>
                Yes, do it
              </Button>
            </ModalTrigger>
          </div>
        </ModalContent>
      </ModalPortal>
    </Modal>
  )
}
