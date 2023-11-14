import { IconArrowRight, IconArrowUp } from '@consolelabs/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@consolelabs/core'
import clsx from 'clsx'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useEffect, useMemo, useRef, useState } from 'react'
import HeaderCell from './HeaderCell'
import { useTipFeed } from './store'
import Row from './Row'
import RowSkeleton from './RowSkeleton'

const showTopFadeLimit = 35 as const
const showBotFadeLimit = -35 as const
const colWidth = [
  'w-[205px]', // from
  'w-min', // arrow icon
  'w-[205px]', // to
  'w-[130px]', // method
  'w-[205px]', // amount
  'w-[200px]', // channel
  'w-[110px]', // tx id
  'w-[170px]', // wen
  'w-[100px]', // status
  //
  /* 'w-2/12', // from */
  /* 'w-min', // arrow icon */
  /* 'w-2/12', // to */
  /* 'w-1/12', // method */
  /* 'w-1/12', // amount */
  /* 'w-1/12', // channel */
  /* 'w-2/12', // tx id */
  /* 'w-2/12', // wen */
  /* 'w-1/12', // status */
]

interface Props {
  className?: string
}

export default function Feed({ className = '' }: Props) {
  const {
    isOpen: isShowTopFade,
    onOpen: showTopFade,
    onClose: hideTopFade,
  } = useDisclosure()
  const {
    isOpen: isShowBotFade,
    onOpen: showBotFade,
    onClose: hideBotFade,
  } = useDisclosure({ defaultIsOpen: true })
  const containerRef = useRef<HTMLDivElement>(null)

  const [lastTopCode, setLastTopCode] = useState('')
  const { loading, ws, fetchTxns, initWs, txns } = useTipFeed()

  useEffect(() => {
    fetchTxns()
    initWs()

    return () => {
      ws?.close()
    }
  }, [])

  useEffect(() => {
    if (!txns.length) return
    setLastTopCode(txns[0].code)
  }, [txns[0]?.code])

  const hasNewUpdate = useMemo(() => {
    return txns.length && lastTopCode && lastTopCode !== txns[0].code
  }, [lastTopCode, txns])

  return (
    <div
      style={{ maxHeight: 850 }}
      className={clsx('h-screen relative bg-feed-bg w-screen flex flex-col', {
        className,
      })}
    >
      <button
        type="button"
        onClick={() => {
          if (containerRef.current) {
            containerRef.current.scrollTop = 0
          }
        }}
        className={clsx(
          'flex absolute left-1/2 top-[110px] z-20 gap-x-1 items-center py-1 px-2 rounded-full transition -translate-x-1/2 bg-white-pure hover:bg-neutral-300',
          {
            'opacity-0': !isShowTopFade,
            'opacity-100 translate-y-2': isShowTopFade,
          },
        )}
      >
        <IconArrowUp className="w-4 h-4" />
        {hasNewUpdate ? (
          <span className="text-sm">New update</span>
        ) : (
          <span className="text-sm">Scroll to top</span>
        )}
      </button>
      <div
        className={clsx(
          'transition bottom-0 left-0 absolute w-full h-20 bg-gradient-to-t pointer-events-none from-feed-bg z-10',
          {
            'opacity-100': isShowBotFade,
            'opacity-0': !isShowBotFade,
          },
        )}
      />
      <div
        style={{ maxWidth: 1440 }}
        className="flex items-center justify-between w-screen px-8 py-6 mx-auto"
      >
        <span className="px-4 text-sm leading-5 text-white-pure">
          Recent Transactions
        </span>
        <div className="hidden px-4">
          <Button variant="link">
            View all <IconArrowRight />
          </Button>
        </div>
      </div>
      <div
        ref={containerRef}
        onScroll={(e) => {
          const el = e.target as HTMLDivElement
          const bottomSpace = el.scrollTop - (el.scrollHeight - el.offsetHeight)
          if (el.scrollTop > showTopFadeLimit && !isShowTopFade) showTopFade()
          if (el.scrollTop <= showTopFadeLimit && isShowTopFade) hideTopFade()

          if (bottomSpace > showBotFadeLimit && isShowBotFade) hideBotFade()
          if (bottomSpace <= showBotFadeLimit && !isShowBotFade) showBotFade()
        }}
        className="overflow-y-hidden h-screen max-h-full"
      >
        <div className="px-8 mx-auto" style={{ width: 1440 }}>
          <div className="sticky top-0 z-10 flex flex-1 bg-feed-bg">
            {[
              'issued by',
              '',
              'recipients',
              'method',
              'amount',
              'where',
              'tx id',
              'wen',
              'status',
            ].map((column, i) => {
              return (
                <HeaderCell key={`feed-column-${column}`} width={colWidth[i]}>
                  {i === 1 ? <div className="w-5" /> : column}
                </HeaderCell>
              )
            })}
            <div
              className={clsx(
                'transition top-full left-0 absolute w-full h-20 bg-gradient-to-b pointer-events-none from-feed-bg',
                {
                  'opacity-100': isShowTopFade,
                  'opacity-0': !isShowTopFade,
                },
              )}
            />
          </div>

          <div className="relative flex flex-col flex-1 min-h-0">
            <AnimatePresence>
              {loading
                ? Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div key={`rows-skeleton-${i}`} className="flex">
                        <RowSkeleton colWidth={colWidth} />
                      </div>
                    ))
                : txns.map((tx) => {
                    return (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={`feed-row-${tx.from}-${tx.to}-${tx.code}`}
                        className="flex"
                      >
                        <Row tx={tx} colWidth={colWidth} />
                      </motion.div>
                    )
                  })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
