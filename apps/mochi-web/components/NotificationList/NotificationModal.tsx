/* eslint-disable no-nested-ternary */
import { useLoginWidget } from '@mochi-web3/login-widget'
import { ActivityType } from '@consolelabs/mochi-rest'
import {
  IconButton,
  Tabs,
  TabList,
  TabTrigger,
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaViewport,
  ScrollAreaThumb,
  Typography,
  Badge,
  BadgeIcon,
  Skeleton as SkeletonCore,
  Modal,
  ModalTrigger,
  ModalContent,
  ModalPortal,
  ModalClose,
  Button,
  Avatar,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverClose,
} from '@mochi-ui/core'
import { Virtualizer } from 'virtua'
import {
  ArrowUpLine,
  BellSolid,
  CheckCircleOutlined,
  CheckLine,
  GearLine,
  InboxLine,
  BellNewSolid,
  CloseLgLine,
  WalletSolid,
  ThreeDotLine,
} from '@mochi-ui/icons'
import { api } from '~constants/mochi'
import clsx from 'clsx'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useFetchChangelogLatest } from '~hooks/app/useFetchChangelogLatest'
import { ROUTES } from '~constants/routes'
import ProfileDropdown from '~cpn/ProfileDropdown'
import WithdrawRow from './WithdrawRow'
import { ROW_HEIGHT } from './Row'
import TransferRow from './TransferRow'
import SwapRow from './SwapRow'
import Skeleton from './Skeleton'
import { MAX_PER_PAGE, useNotificationData, useUnreadNotiCount } from './util'

const CHANGELOG_HEIGHT = 56
const MAX_ROW_COUNT = 7
const HEADER_HEIGHT = 45
const FOOTER_HEIGHT = 46
const NAVBAR_HEIGHT = 56

const NotificationModal = () => {
  const { profile } = useLoginWidget()
  const [tabValue, setTabValue] = useState<'for-you' | 'unread'>('for-you')
  const { count: unreadCount, refresh: refreshUnreadCount } =
    useUnreadNotiCount(profile?.id)
  const {
    isEnd,
    data,
    isLoading,
    isValidating,
    refresh,
    optimisticMarkReadAll,
    nextPage,
  } = useNotificationData(tabValue, profile?.id)
  const actualRowCount = data?.length ?? MAX_ROW_COUNT
  const {
    isOpen: isLoadMore,
    onOpen: setIsLoadMore,
    onClose: setIsNotLoadMore,
  } = useDisclosure()

  const { data: changelog } = useFetchChangelogLatest()

  const { isOpen, onOpenChange } = useDisclosure()

  const previousHeight = useRef(0)
  const { maxRow } = useMemo(() => {
    const getContentHeight = (limit: number) =>
      Math.min(limit, actualRowCount) * ROW_HEIGHT + FOOTER_HEIGHT

    for (let i = MAX_ROW_COUNT; i > 1; i--) {
      let h = getContentHeight(i)
      if (
        h <
        window.innerHeight -
          NAVBAR_HEIGHT -
          HEADER_HEIGHT -
          (changelog ? CHANGELOG_HEIGHT : 0)
      ) {
        if (actualRowCount === 0) {
          h = previousHeight.current
        }
        previousHeight.current = h
        return { maxRow: i }
      }
    }

    let height = getContentHeight(2)

    if (actualRowCount === 0) {
      height = previousHeight.current
    }

    previousHeight.current = height

    return { maxRow: 2 }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualRowCount, isOpen])

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

  useEffect(() => {
    setHideScrollTop()
  }, [setHideScrollTop, tabValue])

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalTrigger asChild>
        <IconButton
          color="neutral"
          variant="outline"
          label=""
          className="!p-1 !w-8 !h-8 my-auto lg:hidden"
        >
          {unreadCount > 0 ? (
            <BellNewSolid className="w-full h-full text-neutral-800" />
          ) : (
            <BellSolid className="w-full h-full text-neutral-800" />
          )}
        </IconButton>
      </ModalTrigger>
      <ModalPortal>
        <ModalContent className="w-screen h-screen px-0 py-0">
          <div className="h-14 w-screen grid grid-cols-3 gap-6 items-center pr-4 pl-3">
            <ModalClose className="p-1">
              <CloseLgLine className="w-6 h-6" />
            </ModalClose>
            <Typography level="h8" className="text-center">
              Inbox
            </Typography>
            <div className="flex items-center justify-end space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="link" className="pl-0 pr-0 w-10">
                    <ThreeDotLine className="w-6 h-6 text-text-icon-primary" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="flex flex-col items-stretch !p-3 z-[60]"
                  align="end"
                >
                  <PopoverClose asChild>
                    <Button
                      type="button"
                      color="neutral"
                      variant="ghost"
                      className="!justify-start h-11 !font-medium"
                      onClick={() => {
                        if (!profile?.id) return
                        api.profile.activities.markReadAll({
                          profileId: profile.id,
                        })

                        // optimistic update
                        optimisticMarkReadAll()
                        refreshUnreadCount(0)
                      }}
                    >
                      <CheckCircleOutlined className="w-5 h-5" />
                      Mark all as read
                    </Button>
                  </PopoverClose>
                  <Link href={ROUTES.SETTINGS('notification')}>
                    <ModalClose asChild>
                      <Button
                        type="button"
                        color="neutral"
                        variant="ghost"
                        className="!justify-start h-11 !font-medium"
                      >
                        <GearLine className="w-5 h-5" />
                        Go to notification settings
                      </Button>
                    </ModalClose>
                  </Link>
                </PopoverContent>
              </Popover>
              <ProfileDropdown>
                <Button variant="link" className="!px-0 relative">
                  <Avatar src={profile?.avatar || '/logo.png'} />
                  <div className="absolute -right-1 -bottom-1 p-0.5 rounded-full bg-background-surface">
                    <WalletSolid className="text-sm text-neutral-800" />
                  </div>
                </Button>
              </ProfileDropdown>
            </div>
          </div>
          <div className="flex relative flex-col">
            <Tabs value={tabValue} className="relative z-20 bg-white-pure">
              <TabList className="grid grid-cols-2 h-[46px] border-t border-b border-divider">
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
                      wrapperClassName="!p-0 w-full"
                      className={clsx('!text-text-secondary', {
                        'bg-background-level2': isSelected,
                      })}
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
            </Tabs>
            <Badge
              appearance="primary"
              className={clsx(
                'cursor-pointer top-[44px] left-1/2 -translate-x-1/2 z-10 absolute inline-flex transition !bg-primary-solid',
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
            <ScrollArea className="w-full h-[calc(100vh-56px-45px)]">
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
                ) : data.length !== 0 ? (
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
                          content = (
                            <SwapRow key={key} refresh={refresh} {...d} />
                          )
                          break
                        /* case 'paylink': */
                        /*   return <PayLinkRow /> */
                        /* case 'payme': */
                        /*   return <PayMeRow /> */
                        /* case 'vault_transfer': */
                        /*   return <VaultRow /> */
                        case ActivityType.ACTIVITY_PAY_RECEIVE:
                          content = (
                            <TransferRow key={key} refresh={refresh} {...d} />
                          )
                          break
                        default:
                          break
                      }

                      return content
                    })}
                    {((isValidating && isLoadMore) || isLoading) && (
                      <Skeleton />
                    )}
                    {!isLoadMore && !isEnd && data.length >= MAX_PER_PAGE && (
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
                    {isEnd && !isLoadMore && !isValidating && (
                      <div
                        className="flex gap-x-1 justify-center items-center"
                        style={{ height: FOOTER_HEIGHT }}
                      >
                        <CheckLine className="w-3.5 h-3.5 text-text-secondary" />
                        <Typography level="p5" color="textSecondary">
                          You&apos;re all caught up!
                        </Typography>
                      </div>
                    )}
                  </Virtualizer>
                ) : null}
                {data?.length === 0 && !isLoading && (
                  <div className="flex justify-center items-center w-full h-full">
                    <div className="flex flex-col items-center">
                      <InboxLine className="w-10 h-10 text-text-disabled" />
                      <Typography level="p4" color="textDisabled">
                        The inbox is empty
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
        </ModalContent>
      </ModalPortal>
    </Modal>
  )
}

export default NotificationModal
