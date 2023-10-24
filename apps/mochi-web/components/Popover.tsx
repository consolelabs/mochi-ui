import { Popover as HeadlessPopover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'

type Props = {
  trigger: React.ReactNode
  triggerClassname?: string
  children: Parameters<typeof HeadlessPopover.Panel>[0]['children']
  panelClassname?: string
  offset?: number
}

export const Popover = (props: Props) => {
  return (
    <HeadlessPopover className="relative">
      {({ open }) => (
        <>
          <HeadlessPopover.Button
            className={({ open }) =>
              clsx(
                'outline-none h-full flex items-center',
                props.triggerClassname ?? '',
                {
                  'text-mochi': open,
                },
              )
            }
          >
            {props.trigger}
          </HeadlessPopover.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
            unmount={false}
          >
            <HeadlessPopover.Panel
              unmount={false}
              className={clsx(
                'absolute left-1/2 z-50 mt-3 -translate-x-1/2 transform w-screen max-w-sm',
                props.panelClassname,
              )}
            >
              {props.children}
            </HeadlessPopover.Panel>
          </Transition>
        </>
      )}
    </HeadlessPopover>
  )
}
