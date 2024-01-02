/* eslint-disable react-hooks/exhaustive-deps */
import { useDisclosure } from '@dwarvesf/react-hooks'
import {
  Button,
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  Typography,
} from '@mochi-ui/core'
import { ArrowRightLine, ArrowUpLine } from '@mochi-ui/icons'
import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ROUTES } from '~constants/routes'
import { TransactionTable } from '~cpn/TransactionTable'
import Link from 'next/link'
import { useTipFeed } from './store'

interface Props {
  className?: string
}

export default function Feed({ className = '' }: Props) {
  const {
    isOpen: isShowTopFade,
    /* onOpen: showTopFade, */
    /* onClose: hideTopFade, */
  } = useDisclosure()
  const {
    isOpen: isShowBotFade,
    /* onOpen: showBotFade, */
    /* onClose: hideBotFade, */
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
      style={{ maxHeight: 700 }}
      className={clsx('h-screen relative bg-white w-screen flex flex-col', {
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
          'hidden absolute left-1/2 top-[110px] z-20 gap-x-1 items-center py-1 px-2 rounded-full transition -translate-x-1/2 bg-white-pure hover:bg-neutral-300',
          {
            'opacity-0': !isShowTopFade,
            'opacity-100 translate-y-2': isShowTopFade,
          },
        )}
      >
        <ArrowUpLine className="w-4 h-4" />
        {hasNewUpdate ? (
          <span className="text-sm">New update</span>
        ) : (
          <span className="text-sm">Scroll to top</span>
        )}
      </button>
      <div
        className={clsx(
          'transition bottom-0 left-0 absolute w-full h-20 bg-gradient-to-t pointer-events-none from-white z-10',
          {
            'opacity-100': isShowBotFade,
            'opacity-0': !isShowBotFade,
          },
        )}
      />
      <div
        style={{ maxWidth: 1500 }}
        className="flex justify-between items-center pt-6 pb-4 sm:px-8 px-4 mx-auto w-screen"
      >
        <Typography>Recent Transactions</Typography>
        <Button
          as={Link}
          href={ROUTES.EXPLORE}
          className="!pr-0"
          variant="link"
          color="primary"
        >
          View all <ArrowRightLine />
        </Button>
      </div>
      <ScrollArea className="min-h-0">
        <ScrollAreaViewport
          ref={containerRef}
          /* onScroll={(e) => { */
          /*   const el = e.target as HTMLDivElement */
          /*   const bottomSpace = */
          /*     el.scrollTop - (el.scrollHeight - el.offsetHeight) */
          /*   if (el.scrollTop > showTopFadeLimit && !isShowTopFade) showTopFade() */
          /*   if (el.scrollTop <= showTopFadeLimit && isShowTopFade) hideTopFade() */
          /**/
          /*   if (bottomSpace > showBotFadeLimit && isShowBotFade) hideBotFade() */
          /*   if (bottomSpace <= showBotFadeLimit && !isShowBotFade) showBotFade() */
          /* }} */
          className="overflow-hidden h-screen max-h-full"
        >
          <div className="px-6 mx-auto" style={{ width: 1488 }}>
            <TransactionTable
              data={txns}
              loadingRows={10}
              isLoading={loading}
              onRow={(tx) => {
                return {
                  onClick: () => {
                    window.open(ROUTES.TX_RECEIPTS(tx.code))
                  },
                }
              }}
            />
          </div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      </ScrollArea>
    </div>
  )
}
