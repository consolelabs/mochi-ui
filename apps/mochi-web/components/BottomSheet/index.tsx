import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { useDisclosure, useOnClickOutside } from '@dwarvesf/react-hooks'
import { createContext } from '@dwarvesf/react-utils'
import { m } from 'framer-motion'
import { Button } from '@mochi-ui/core'
import { AnimateChangeInHeight } from '~cpn/AnimateHeightChange'

interface State {
  onClose: () => void
  onOpen: () => void
  isOpen: boolean
  elem: HTMLDivElement | null
  sheet: React.RefObject<HTMLDivElement>
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
  dynamic?: boolean
}

function BottomSheet({
  isOpen,
  children,
  onClose,
  title,
  className = '',
  dynamic = false,
}: BottomSheetProps) {
  const {
    elem,
    isOpen: _isOpen,
    onOpen: _onOpen,
    onClose: _onClose,
    sheet,
  } = useInternal()

  const {
    isOpen: internalIsOpen,
    onOpen: internalOpen,
    onClose: internalClose,
  } = useDisclosure()

  useEffect(() => {
    if (isOpen) {
      _onOpen()
      internalOpen()
    } else {
      _onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_onClose, _onOpen, isOpen])

  useEffect(() => {
    if (!_isOpen) {
      _onClose()
      onClose()
      internalClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_isOpen, _onClose, onClose])
  if (!elem || !internalIsOpen) return null

  return createPortal(
    <div
      ref={sheet}
      className={clsx(
        'flex flex-col min-h-0 p-3 bg-white-pure rounded-t-lg',
        className,
        {
          'h-[75%]': !dynamic,
        },
      )}
    >
      <div className="flex justify-between items-center self-stretch mb-2">
        <div className="flex-1">
          <Button
            color="neutral"
            variant="link"
            size="sm"
            type="button"
            onClick={_onClose}
            className="!p-0"
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
      {dynamic ? (
        <AnimateChangeInHeight className="w-full min-h-0">
          {children}
        </AnimateChangeInHeight>
      ) : (
        children
      )}
    </div>,
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
  const {
    isOpen: delayIsOpen,
    onOpen: delayOpen,
    onClose: delayClose,
  } = useDisclosure()
  const outerSheetRef = useRef<HTMLDivElement | null>(null)
  const sheetRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(sheetRef, onClose)

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

  useEffect(() => {
    setTimeout(isOpen ? delayOpen : delayClose, 500)
  }, [delayClose, delayOpen, isOpen])

  return (
    <BottomSheetContextProvider
      value={{
        onOpen,
        onClose,
        isOpen: delayIsOpen,
        elem: outerSheetRef.current,
        sheet: sheetRef,
      }}
    >
      <div
        className={clsx('relative transition', className, {
          'bg-gray-700': isOpen,
          'bg-transparent': !isOpen,
        })}
      >
        <m.div
          initial={false}
          animate={{
            opacity: isOpen ? '50%' : '100%',
            scale: isOpen ? '100%' : '100%',
          }}
          transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          className={clsx('will-change-[opacity]', {
            'pointer-events-none overflow-hidden': isOpen,
            'pointer-events-auto': !isOpen,
          })}
        >
          {children}
        </m.div>
        <m.div
          ref={outerSheetRef}
          initial={false}
          animate={{
            x: '-50%',
            y: isOpen ? '0%' : '100%',
          }}
          transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          className={clsx(
            'will-change-transform',
            'absolute left-1/2 w-full bottom-0 min-h-0 h-full origin-bottom flex flex-col justify-end',
          )}
        />
      </div>
    </BottomSheetContextProvider>
  )
}
