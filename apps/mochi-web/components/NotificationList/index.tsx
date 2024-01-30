import { useLoginWidget } from '@mochi-web3/login-widget'
import { ActivityType } from '@consolelabs/mochi-rest'
import {
  IconButton,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  Tabs,
  TabList,
  TabTrigger,
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaViewport,
  ScrollAreaThumb,
  Typography,
  Tooltip,
  Badge,
  BadgeIcon,
  Skeleton as SkeletonCore,
} from '@mochi-ui/core'
import { Virtualizer } from 'virtua'
import {
  ArrowUpLine,
  BellSolid,
  CheckCircleOutlined,
  GearLine,
  InboxLine,
} from '@mochi-ui/icons'
import clsx from 'clsx'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useDisclosure } from '@dwarvesf/react-hooks'
import WithdrawRow from './WithdrawRow'
import { ROW_HEIGHT } from './Row'
import TransferRow from './TransferRow'
import SwapRow from './SwapRow'
/* import AirdropRow from './AirdropRow' */
/* import PayLinkRow from './PayLinkRow' */
/* import PayMeRow from './PayMeRow' */
import Skeleton from './Skeleton'
import { MAX_PER_PAGE, useNotificationData, useUnreadNotiCount } from './util'

const MAX_ROW_COUNT = 7
const HEADER_HEIGHT = 45
const FOOTER_HEIGHT = 46
const NAVBAR_HEIGHT = 56

const NotificationList = () => {
  const { profile } = useLoginWidget()
  const [tabValue, setTabValue] = useState<'for-you' | 'unread'>('for-you')
  const unreadCount = useUnreadNotiCount(profile?.id)
  const { data, isLoading, isValidating, refresh, nextPage } =
    useNotificationData(tabValue, profile?.id)
  const actualRowCount = data?.length || MAX_ROW_COUNT
  const {
    isOpen: isLoadMore,
    onOpen: setIsLoadMore,
    onClose: setIsNotLoadMore,
  } = useDisclosure()

  const { isOpen, onClose, onOpenChange } = useDisclosure()

  const { height, maxRow } = useMemo(() => {
    const getContentHeight = (limit: number) =>
      Math.min(limit, actualRowCount) * ROW_HEIGHT + FOOTER_HEIGHT

    for (let i = MAX_ROW_COUNT; i > 1; i--) {
      const h = getContentHeight(i)
      if (h < window.innerHeight - NAVBAR_HEIGHT - HEADER_HEIGHT)
        return { height: h, maxRow: i }
    }

    return { height: getContentHeight(2), maxRow: 2 }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualRowCount, data.length, isOpen])

  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    isOpen: isShowScrollTop,
    onOpen: setShowScrollTop,
    onClose: setHideScrollTop,
  } = useDisclosure()

  useEffect(() => {
    if (isValidating) return
    setIsNotLoadMore()
  }, [isValidating, setIsNotLoadMore])

  useEffect(() => {
    if (!isOpen) setHideScrollTop()
  }, [isOpen, setHideScrollTop])

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <IconButton
          color="neutral"
          variant="outline"
          label=""
          className="!p-1 !w-8 !h-8 my-auto hidden lg:block"
        >
          <BellSolid className="w-full h-full text-neutral-800" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10} className="!p-0 overflow-hidden">
        <div className="flex relative flex-col" style={{ width: 400 }}>
          <Tabs value={tabValue} className="relative z-20 bg-white-pure">
            <div className="flex justify-between items-center p-2 pr-4 border-b border-neutral-200">
              <TabList className="flex w-max">
                {[
                  ['for-you', 'For You'],
                  ['unread', 'Unread'],
                ].map((t) => {
                  const [id, text] = t
                  const isSelected = id === tabValue

                  return (
                    <TabTrigger
                      key={id}
                      value={id}
                      onClick={() => setTabValue(id as any)}
                      wrapperClassName="!p-0 w-max"
                      className={clsx(
                        'w-max !px-2 !py-1 text-sm font-semibold',
                        {
                          '!text-primary-700': isSelected,
                        },
                      )}
                    >
                      {text}
                      {id === 'unread' && unreadCount > 0 && (
                        <div className="flex justify-center items-center px-1 rounded-full bg-danger-solid">
                          <Typography
                            level="p7"
                            className="!text-danger-solid-fg !leading-relaxed"
                          >
                            {unreadCount}
                          </Typography>
                        </div>
                      )}
                    </TabTrigger>
                  )
                })}
              </TabList>
              <div className="flex gap-x-2">
                <Tooltip content="Mark all as read" arrow="bottom-center">
                  <IconButton
                    label=""
                    variant="link"
                    className="p-0.5 text-text-icon-secondary"
                  >
                    <CheckCircleOutlined className="w-5 h-5" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  arrow="bottom-center"
                  content="Go to notification settings"
                >
                  <Link onClick={onClose} href="/settings?tab=notification">
                    <IconButton
                      label=""
                      variant="link"
                      className="p-0.5 text-text-icon-secondary"
                    >
                      <GearLine className="w-5 h-5" />
                    </IconButton>
                  </Link>
                </Tooltip>
              </div>
            </div>
          </Tabs>
          <Badge
            appearance="primary"
            className={clsx(
              'cursor-pointer top-[45px] left-1/2 -translate-x-1/2 z-10 absolute inline-flex transition !bg-primary-solid',
              {
                '-translate-y-full': !isShowScrollTop,
                'translate-y-1/2': isShowScrollTop,
              },
            )}
            onClick={() =>
              scrollRef.current?.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >
            <BadgeIcon className="-ml-0.5">
              <ArrowUpLine className="w-3.5 h-3.5 text-text-contrast" />
            </BadgeIcon>
            <Typography level="p5" color="textContrast">
              Scroll to top
            </Typography>
          </Badge>
          <ScrollArea
            style={{
              maxHeight: height,
            }}
            className="w-full h-screen"
          >
            <ScrollAreaViewport
              ref={scrollRef}
              className={clsx({
                '[&>*]:h-full': data?.length === 0,
              })}
            >
              {isLoading ? (
                <>
                  {Array(maxRow)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} />
                    ))}
                  <div
                    style={{ height: FOOTER_HEIGHT }}
                    className="py-3 px-4 w-full"
                  >
                    <SkeletonCore className="mx-auto w-1/2 h-5 rounded" />
                  </div>
                </>
              ) : (
                <Virtualizer
                  onScroll={(offset) => {
                    if (offset < ROW_HEIGHT && isShowScrollTop)
                      setHideScrollTop()
                    if (offset >= ROW_HEIGHT && !isShowScrollTop)
                      setShowScrollTop()
                  }}
                  scrollRef={scrollRef}
                >
                  {data.map((d, i) => {
                    const key = `${d.type}-${i}`
                    let content

                    switch (d.type) {
                      case ActivityType.ACTIVITY_PAY_WITHDRAW:
                        content = (
                          <WithdrawRow key={key} refresh={refresh} {...d} />
                        )
                        break
                      /* case 'deposit': */
                      /*   return <DepositRow /> */
                      /* case 'airdrop': */
                      /*   return <AirdropRow time={d.time} /> */
                      case ActivityType.ACTIVITY_PAY_SWAP:
                        content = <SwapRow key={key} refresh={refresh} {...d} />
                        break
                      /* case 'paylink': */
                      /*   return <PayLinkRow /> */
                      /* case 'payme': */
                      /*   return <PayMeRow /> */
                      /* case 'vault_transfer': */
                      /*   return <VaultRow /> */
                      case ActivityType.ACTIVITY_PAY_RECEIVE:
                      case ActivityType.ACTIVITY_PAY_SEND:
                        content = (
                          <TransferRow key={key} refresh={refresh} {...d} />
                        )
                        break
                      default:
                        break
                    }

                    return content
                  })}
                  {((isValidating && isLoadMore) || isLoading) && <Skeleton />}
                  {!isLoadMore && data.length >= MAX_PER_PAGE && (
                    <button
                      type="button"
                      style={{ height: FOOTER_HEIGHT }}
                      className="py-3 px-4 w-full outline-none"
                      onClick={() => {
                        setIsLoadMore()
                        nextPage()
                      }}
                    >
                      <Typography
                        className="text-center"
                        level="p5"
                        color="textSecondary"
                        fontWeight="lg"
                      >
                        See previous notifications
                      </Typography>
                    </button>
                  )}
                </Virtualizer>
              )}
              {data?.length === 0 && !isLoading && (
                <div className="flex justify-center items-center w-full h-full">
                  <div className="flex flex-col items-center">
                    <InboxLine className="w-10 h-10 text-text-disabled" />
                    <Typography level="p4" color="textDisabled">
                      You&apos;re all caught up
                    </Typography>
                  </div>
                </div>
              )}
            </ScrollAreaViewport>
            <ScrollAreaScrollbar>
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
          </ScrollArea>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationList
