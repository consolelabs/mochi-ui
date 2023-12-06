import { useDisclosure } from '@dwarvesf/react-hooks'
import clsx from 'clsx'
import Link from 'next/link'
import { AnimatePresence, Transition, Variants, m } from 'framer-motion'
import { useLoginWidget } from '@mochi-ui/core'
import { useEffect } from 'react'
import { ROUTES } from '~constants/routes'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import { useTipWidget } from './store'
import Timer from '../Timer'

const variants: Variants = {
  enter: (direction: number) => {
    return {
      position: 'relative',
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0.2,
      scale: 0.95,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => {
    return {
      position: 'absolute',
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0.2,
      scale: 0.95,
    }
  },
}

const transition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

const commonProps = {
  transition,
  variants,
  initial: 'enter',
  animate: 'center',
  exit: 'exit',
}

export default function Tip() {
  const { isLoggedIn } = useLoginWidget()
  const { step, error, tx, direction, reset } = useTipWidget()

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (!isLoggedIn) {
      reset()
    }
  }, [isLoggedIn, reset])

  useEffect(() => {
    if ((error && !tx) || (!error && tx)) onOpen()
  }, [error, onOpen, tx])

  const isOnchain = typeof tx === 'string'

  return (
    <div className="relative flex-1">
      <div
        className={clsx(
          'origin-center flex justify-between z-10 transition-transform absolute top-0 w-full p-3 duration-300 rounded-md border font-medium text-sm',
          {
            'border-green-200 bg-green-50 text-green-700': !error,
            'border-red-200 bg-red-50 text-red-700': error,
            'scale-1 translate-y-0 shadow-xl': isOpen,
            'shadow scale-[0.9] translate-y-[calc(-100%-16px)]': !isOpen,
          },
        )}
      >
        {!error ? (
          <>
            <span>
              🎉 {isOnchain ? 'Submit' : 'Transfer'} success,{' '}
              <Link
                target="_blank"
                className="underline"
                href={isOnchain ? tx : ROUTES.TX_RECEIPTS(tx?.external_id)}
              >
                here is your receipt
              </Link>
            </span>
            <Timer
              className="w-5 h-5 text-green-500"
              start={isOpen}
              onEnd={onClose}
              time={6000}
            />
          </>
        ) : (
          <>
            <span>
              {typeof error === 'string' ? (
                `Error: ${error}`
              ) : (
                <>😕 Something went wrong, please try again</>
              )}
            </span>
            <Timer
              className="w-5 h-5 text-red-500"
              start={isOpen}
              onEnd={onClose}
              time={6000}
            />
          </>
        )}
      </div>
      <AnimatePresence initial={false} custom={direction}>
        {step === 1 ? (
          <m.div key={step} custom={direction} {...commonProps}>
            <StepOne />
          </m.div>
        ) : (
          <m.div
            className="h-full"
            key={step}
            custom={direction}
            {...commonProps}
          >
            <StepTwo />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
