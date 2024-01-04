import { RefObject, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { useDisclosure, useOnClickOutside } from '@dwarvesf/react-hooks'
import { createContext } from '@dwarvesf/react-utils'
import { m } from 'framer-motion'
import { Button } from '@mochi-ui/core'
import { focusable } from 'tabbable'
import { AnimateChangeInHeight } from '~cpn/AnimateHeightChange'

interface State {
  onClose: () => void
  onOpen: () => void
  isOpen: boolean
  elem: RefObject<HTMLDivElement | null>
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
  focusNthChild?: number
}

function BottomSheet({
  isOpen,
  children,
  onClose,
  title,
  className = '',
  dynamic = false,
  focusNthChild = -1,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(sheetRef, (e) => {
    const isInsidePopover = (e.target as HTMLElement).closest(
      '[data-radix-popper-content-wrapper]',
    )
    if (isInsidePopover) return
    onClose()
  })
  const {
    elem,
    isOpen: _isOpen,
    onOpen: _onOpen,
    onClose: _onClose,
  } = useInternal()

  useEffect(() => {
    if (isOpen) {
      _onOpen()
    } else {
      _onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_onClose, _onOpen, isOpen])

  useEffect(() => {
    if (!_isOpen) {
      _onClose()
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_isOpen, _onClose, onClose])

  useEffect(() => {
    if (focusNthChild < 0 || !sheetRef.current || !isOpen) return
    const [_btn, ...targets] = focusable(sheetRef.current)
    const target = targets[focusNthChild]

    if (!target) return

    target.focus({ preventScroll: true })
  }, [focusNthChild, isOpen])

  if (!elem.current) return null

  return createPortal(
    <m.div
      initial={false}
      animate={{
        x: '-50%',
        y: isOpen ? '0%' : '100%',
      }}
      // @ts-ignore
      {...(isOpen ? {} : { inert: 'true' })}
      transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
      className={clsx(
        'will-change-transform',
        'absolute left-1/2 w-full bottom-0 min-h-0 h-full origin-bottom flex flex-col justify-end',
      )}
    >
      <div
        ref={sheetRef}
        className={clsx(
          'relative flex flex-col min-h-0 p-3 bg-white-pure rounded-t-lg',
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
      </div>
    </m.div>,
    elem.current,
  )
}

export { BottomSheet }

export default function BottomSheetProvider({
  children,
  className = '',
  nested = false,
}: {
  children: React.ReactNode
  className?: string
  nested?: boolean
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: delayIsOpen,
    onOpen: delayOpen,
    onClose: delayClose,
  } = useDisclosure()
  const outerSheetRef = useRef<HTMLDivElement | null>(null)

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
        isOpen,
        elem: outerSheetRef,
      }}
    >
      <div
        ref={outerSheetRef}
        className={clsx('transition', className, {
          relative: !nested,
        })}
      >
        <m.div
          initial={false}
          animate={{
            filter: !nested && isOpen ? 'brightness(50%)' : 'brightness(100%)',
            scale: !nested && isOpen ? '100%' : '100%',
          }}
          transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          className={clsx(
            'will-change-transform bg-white-pure h-full flex flex-col',
            {
              '-mx-3 px-3': nested && isOpen,
              'pointer-events-none overflow-hidden': isOpen || delayIsOpen,
              'pointer-events-auto': !isOpen && !delayIsOpen,
            },
          )}
        >
          {children}
        </m.div>
        {nested && (
          <m.div
            initial={false}
            animate={{
              opacity: isOpen ? 100 : 0,
            }}
            style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          />
        )}
      </div>
    </BottomSheetContextProvider>
  )
}
