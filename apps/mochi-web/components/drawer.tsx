import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export type Props = {
  isOpen: boolean
  onOpen?: () => void
  onClose: () => void
  children: React.ReactNode
}

export default function Drawer({ onClose, isOpen, children }: Props) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-40">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <div className="flex fixed inset-0 justify-end p-4">
          <Transition.Child
            as={Fragment}
            enter="transition duration-300 ease-out"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition duration-200 ease-in"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel>{children}</Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
