import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { createContext, isSSR } from '@dwarvesf/react-utils'
import { useSpring, m, useTransform, MotionValue } from 'framer-motion'
import { Button } from '@consolelabs/core'

interface State {
  y: MotionValue<string>
  scale: MotionValue<string>
  onClose: () => void
  onOpen: () => void
}

const [BottomSheetContextProvider, useInternal] = createContext<State>({
  name: 'BottomSheetContext',
})

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
}

function BottomSheet({
  isOpen,
  children,
  onClose,
  title,
  className = '',
}: BottomSheetProps) {
  const {
    isOpen: internalIsOpen,
    onOpen: internalOpen,
    onClose: internalClose,
  } = useDisclosure({ defaultIsOpen: isOpen })
  const { onOpen: _onOpen, onClose: _onClose, y, scale } = useInternal()
  const elem = !isSSR() && document.querySelector('#bottom-sheet')

  useEffect(() => {
    if (isOpen) {
      _onOpen()
      internalOpen()
    } else {
      _onClose()
    }
  }, [isOpen, _onOpen, _onClose, internalOpen])

  useEffect(
    () =>
      y.on('change', (latestValue) => {
        if (latestValue === '100%') {
          _onClose()
          onClose()
          internalClose()
        }
      }),
    [_onClose, internalClose, onClose, y],
  )

  if (!elem || !internalIsOpen) return null

  return createPortal(
    <m.div
      style={{ x: '-50%', y, scale }}
      className={clsx(
        'absolute left-1/2 w-full h-[75%] bottom-0 origin-bottom flex flex-col p-3 bg-white-pure rounded-t-lg',
        className,
      )}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex-1">
          <Button
            color="neutral"
            variant="link"
            size="sm"
            type="button"
            onClick={_onClose}
          >
            Close
          </Button>
        </div>
        {title ? (
          <span className="flex-1 text-sm font-semibold text-center">
            {title}
          </span>
        ) : (
          <>&#8203;</>
        )}
        <div className="flex-1" />
      </div>
      {children}
    </m.div>,
    elem,
  )
}

export { BottomSheet }

export default function BottomSheetProvider({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const top = useSpring(100, { duration: 500, bounce: 0 })
  const y = useTransform(top, [0, 100], ['0%', '100%'])
  const opacity = useTransform(top, [0, 100], ['50%', '100%'])
  const scale = useTransform(top, [0, 100], ['100%', '100%'])
  const scaleSheet = useTransform(top, [0, 100], ['100%', '100%'])
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      top.set(0)
    } else {
      top.set(100)
    }
  }, [isOpen, top])

  useEffect(() => {
    function listenForEsc(e: KeyboardEvent) {
      if (isOpen && e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', listenForEsc)

    return () => {
      window.removeEventListener('keydown', listenForEsc)
    }
  }, [isOpen, onClose])

  return (
    <BottomSheetContextProvider
      value={{
        onOpen,
        onClose,
        scale: scaleSheet,
        y,
      }}
    >
      <div
        // capture to prevent it from going down children
        onClickCapture={(e) => {
          if (!isOpen) return
          if (ref.current?.contains(e.target as HTMLElement)) return
          onClose()
          e.stopPropagation()
        }}
        className={clsx('relative transition', className, {
          'bg-gray-700': isOpen,
          'bg-transparent': !isOpen,
        })}
      >
        <m.div
          style={{
            opacity,
            scale,
          }}
          className={clsx({
            'pointer-events-none overflow-hidden': isOpen,
            'pointer-events-auto': !isOpen,
          })}
        >
          {children}
        </m.div>
        <div ref={ref} id="bottom-sheet" />
      </div>
    </BottomSheetContextProvider>
  )
}
