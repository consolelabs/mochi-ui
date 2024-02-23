import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import { createContext } from '@dwarvesf/react-utils'
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
} from '@mochi-ui/core'
import { focusable } from 'tabbable'
import { LoginWidget, useLoginWidget } from '@mochi-web3/login-widget'

type Sheet =
  | 'TokenPicker'
  | 'PlatformPicker'
  | 'Contacts'
  | 'Recipients'
  | 'MessagePicker'
  | 'ThemePicker'
  | 'ChainPicker'
  | 'StepOne'
  | 'StepTwo'

interface Stateeee {
  openSheets: Sheet[]
  setOpenSheets: Dispatch<SetStateAction<Sheet[]>>
  elem: RefObject<HTMLDivElement | null>
}

const [BottomSheetContextProvider, useBottomSheetContext] =
  createContext<Stateeee>({
    name: 'BottomSheetContextttt',
  })

function BottomSheet({
  name,
  children,
  title,
  className = '',
  fixedHeight = true,
  focusNthChild = -1,
  trigger,
  loginWidgetProps,
}: {
  name: Sheet
  children?: React.ReactNode
  title?: string
  className?: string
  fixedHeight?: boolean
  focusNthChild?: number
  trigger?: React.ReactNode
  loginWidgetProps?: { raw?: boolean; chain?: string }
}) {
  const sheetRef = useRef<HTMLDivElement | null>(null)
  const { isLoggedIn } = useLoginWidget()
  const { elem, openSheets, setOpenSheets } = useBottomSheetContext()
  const isOpen = openSheets.includes(name)

  useEffect(() => {
    if (focusNthChild < 0 || !sheetRef.current || !isOpen) return
    const [_btn, ...targets] = focusable(sheetRef.current)
    const target = targets[focusNthChild]

    if (!target) return

    target.focus({ preventScroll: true })
  }, [focusNthChild, isOpen])

  if (!elem.current) return null

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onOpenChange={(open) =>
        setOpenSheets(
          open ? [...openSheets, name] : openSheets.filter((s) => s !== name),
        )
      }
    >
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerPortal container={elem.current}>
        <DrawerOverlay className="absolute" />
        <DrawerContent
          ref={sheetRef}
          className={clsx(
            'absolute !w-full flex flex-col min-h-0 p-3 bg-background-surface rounded-t-lg data-[state=open]:duration-300',
            fixedHeight && isLoggedIn ? 'h-[75%]' : '',
            className,
          )}
        >
          {isLoggedIn && (
            <div
              className="flex justify-between items-center self-stretch mb-2"
              ref={sheetRef}
            >
              <div className="flex-1" />
              {title && isLoggedIn ? (
                <span className="flex-1 text-sm font-semibold text-center">
                  {title}
                </span>
              ) : (
                <>&#8203;</>
              )}
              <div className="flex-1" />
            </div>
          )}
          {isLoggedIn ? (
            children
          ) : (
            <div className="flex justify-center">
              <LoginWidget
                onClose={() =>
                  setOpenSheets(openSheets.filter((s) => s !== name))
                }
                raw
                {...loginWidgetProps}
              />
            </div>
          )}
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
}

function BottomSheetProvider({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const outerSheetRef = useRef<HTMLDivElement | null>(null)
  const [openSheets, setOpenSheets] = useState<Sheet[]>([])

  return (
    <BottomSheetContextProvider
      value={{
        openSheets,
        setOpenSheets,
        elem: outerSheetRef,
      }}
    >
      <div ref={outerSheetRef} className={clsx('relative', className)}>
        {children}
      </div>
    </BottomSheetContextProvider>
  )
}

export { BottomSheet, useBottomSheetContext, BottomSheetProvider }
