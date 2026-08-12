import {
  Avatar,
  Badge,
  BadgeIcon,
  Button,
  Card,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Tooltip,
  Typography,
  ValueChange,
  ValueChangeIndicator,
} from '@mochi-ui/core'
import {
  AddUserSolid,
  ArrowDownSquareSolid,
  ArrowUpSquareSolid,
  GiftSolid,
  InfoCircleOutlined,
  TipSolid,
} from '@mochi-ui/icons'
import { useLoginWidget } from '@mochi-web3/login-widget'
import { useFetchMonthlyStats } from '~hooks/profile/useFetchMonthlyStats'
import UI, { Platform, utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { TokenAvatar } from '~cpn/TokenAvatar'
import { ModelStatTx } from '~types/mochi-pay-schema'
import emojiStrip from 'emoji-strip'
import { Profile } from '@consolelabs/mochi-rest'
import { utils } from 'ethers'
import { truncate } from '@dwarvesf/react-utils'
import { useTheme } from '~hooks/useTheme'
import clsx from 'clsx'
import { useState } from 'react'
import { useFetchTotalBalance } from '~hooks/profile/useFetchTotalBalance'
import { ROUTES } from '~constants/routes'
import { useRouter } from 'next/router'
import events from '~constants/events'

const intervals = [
  {
    key: 'daily',
    label: '24H',
  },
  {
    key: 'weekly',
    label: '7 days',
  },
  {
    key: 'monthly',
    label: '30 days',
  },
  {
    key: 'quarterly',
    label: '90 days',
  },
  {
    key: 'bi_quarterly',
    label: '180 days',
  },
  {
    key: 'yearly',
    label: '1 year',
  },
  {
    key: 'all_time',
    label: 'All the time',
  },
]

const getSummary = (total_spending: number = 0, total_receive: number = 0) => {
  if (!total_spending && !total_receive) return 'No data found.'
  if (!total_spending || total_spending < total_receive)
    return 'You receive more than you send'
  if (!total_receive || total_spending > total_receive)
    return 'You send more than you receive'
  return 'You send as much as you receive'
}

const getPnl = (pnl?: string) => {
  switch (pnl) {
    case 'Inf':
    case '+Inf':
      return '+100.00'
    case '-Inf':
      return '-100.00'
    case 'NaN':
      return '0.00'
    default:
      return pnl || '0.00'
  }
}

interface Props {
  type: 'sent' | 'received'
  statTx?: ModelStatTx
}

const UserSection = ({ type, statTx }: Props) => {
  const [profile] = UI.render(Platform.Web, statTx?.other_profile as Profile)
  const { activeTheme } = useTheme()
  const name =
    statTx?.other_profile?.type === 'vault'
      ? statTx.other_profile.profile_name || 'Vault'
      : emojiStrip(profile?.plain || '').trim()
  const icon =
    type === 'sent' ? (
      <TipSolid
        className={clsx('w-6 h-6', {
          'text-primary-solid': activeTheme === 'light',
          'text-primary-500': activeTheme === 'dark',
        })}
      />
    ) : (
      <GiftSolid
        className={clsx('w-6 h-6', {
          'text-secondary-solid': activeTheme === 'light',
          'text-secondary-500': activeTheme === 'dark',
        })}
      />
    )

  const { pathname, push } = useRouter()
  const redirectToTipWidget = async () => {
    if (pathname !== ROUTES.HOME) {
      await push(ROUTES.HOME)
    }
    window.dispatchEvent(new Event(events.TIP_WIDGET.FOCUS_AMOUNT))
  }

  if (type === 'sent' && !statTx) {
    return (
      <div className="flex items-center py-4 space-x-2">
        {icon}
        <div className="flex items-center flex-wrap [&>*]:mr-1">
          <Typography level="p5" color="textTertiary">
            To send money
          </Typography>
          <Button
            variant="link"
            color="neutral"
            className="pr-0 pl-0 h-auto"
            onClick={redirectToTipWidget}
          >
            <TipSolid className="w-4 h-4" />
            tip
          </Button>
          <Typography level="p5" color="textTertiary">
            your token first.
          </Typography>
        </div>
      </div>
    )
  }

  if (type === 'received' && !statTx) {
    return (
      <div className="flex items-center py-4 space-x-2">
        {icon}
        <div className="flex items-center flex-wrap [&>*]:mr-1">
          <Typography level="p5" color="textTertiary">
            To receive money
          </Typography>
          <Button variant="link" color="neutral" className="pr-0 pl-0 h-auto">
            <AddUserSolid className="w-4 h-4" />
            invite friends
          </Button>
          <Typography level="p5" color="textTertiary">
            to Mochi.
          </Typography>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center py-4 space-x-2">
      {icon}
      <div className="flex items-center flex-wrap [&>*]:mr-1">
        <Typography level="p5">You {type} the most</Typography>
        <TokenAvatar
          src={statTx?.token?.icon || ''}
          name={statTx?.token?.symbol || ''}
        />
        <Typography level="h8">{statTx?.token?.symbol}</Typography>
        <Typography level="p5" className="font-mono">
          {mochiUtils.formatUsdDigit(statTx?.usd_amount || 0)}
        </Typography>
        <Typography level="p5">{type === 'sent' ? 'to' : 'from'}</Typography>
        <Tooltip
          content={name}
          arrow="top-center"
          componentProps={{
            root: { open: name.length > 15 ? undefined : false },
          }}
        >
          <Badge className="border border-divider !bg-background-level1">
            <BadgeIcon className="-ml-0.5">
              <Avatar
                src={statTx?.other_profile?.avatar || '/logo.png'}
                size="xxs"
              />
            </BadgeIcon>
            <Typography level="p6">{truncate(name, 15)}</Typography>
          </Badge>
        </Tooltip>
      </div>
    </div>
  )
}

const TokenSection = ({ type, statTx }: Props) => {
  return (
    <div className="flex-1 space-y-4">
      <Typography level="p5">Top 1 {type} token</Typography>
      {statTx ? (
        <div className="flex items-center space-x-2">
          <TokenAvatar
            src={statTx.token?.icon || ''}
            name={statTx.token?.symbol || ''}
          />
          <div className="flex flex-wrap items-center">
            <Typography level="h8" className="mr-2">
              {mochiUtils.formatDigit({
                value: utils.formatUnits(
                  statTx.amount || 0,
                  statTx.token?.decimal,
                ),
                fractionDigits: 2,
                shorten: false,
              })}{' '}
              {statTx?.token?.symbol}
            </Typography>
            <Typography level="h8" color="textDisabled" className="font-mono">
              (
              {mochiUtils.formatUsdDigit({
                value: statTx.usd_amount || 0,
                shorten: false,
              })}
              )
            </Typography>
          </div>
        </div>
      ) : (
        <div className="h-6">-</div>
      )}
    </div>
  )
}

export const RecapSection = () => {
  const { profile } = useLoginWidget()
  const [interval, setInterval] = useState('monthly')
  const { activeTheme } = useTheme()
  const { data: recap } = useFetchMonthlyStats(profile?.id)
  const { data: exchange } = useFetchMonthlyStats(profile?.id, { interval })
  const { data: balance, isLoading: isLoadingBalance } = useFetchTotalBalance(
    profile?.id,
  )

  const mochiBalance =
    balance?.offchain?.reduce(
      (prev, curr) => prev + (curr.usd_balance || 0),
      0,
    ) || 0

  const {
    total_receive = 0,
    total_spending = 0,
    total_volume = 0,
  } = exchange || {}
  const totalExchange = total_spending + total_receive + mochiBalance
  const receive_pnl = getPnl(exchange?.receive_pnl)
  const spending_pnl = getPnl(exchange?.spending_pnl)

  return (
    <Card className="px-0 pb-3 shadow-input !bg-background-body">
      <div className="flex items-center space-x-2 px-4">
        <Typography level="h8">Your last 30 days recap</Typography>
        <Tooltip
          className="max-w-xs"
          content="Overview of the top tokens that Mochi Wallet has exchanged in the last 30 days."
          arrow="top-center"
        >
          <InfoCircleOutlined className="w-4 h-4 text-text-disabled" />
        </Tooltip>
      </div>
      <Separator className="mt-4" />
      <div className="px-4">
        <div className="flex items-center py-4 space-x-2">
          {(recap?.total_spending || 0) > (recap?.total_receive || 0) ? (
            <ArrowUpSquareSolid
              className={clsx('w-6 h-6', {
                'text-primary-solid': activeTheme === 'light',
                'text-primary-500': activeTheme === 'dark',
              })}
            />
          ) : (
            <ArrowDownSquareSolid
              className={clsx('w-6 h-6', {
                'text-success-solid': activeTheme === 'light',
                'text-success-500': activeTheme === 'dark',
              })}
            />
          )}
          <Typography level="p5">
            {getSummary(recap?.total_spending, recap?.total_receive)}
          </Typography>
        </div>
        <Separator />
        <UserSection type="sent" statTx={recap?.most_send} />
        <Separator />
        <UserSection type="received" statTx={recap?.most_receive} />
        <Separator />
        <div className="flex py-4 space-x-8">
          <TokenSection type="sent" statTx={recap?.spending?.[0]} />
          <div className="my-auto h-10">
            <Separator orientation="vertical" />
          </div>
          <TokenSection type="received" statTx={recap?.receive?.[0]} />
        </div>
        <Separator />
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <Typography level="h8">Exchange Flow Recap</Typography>
            <Tooltip
              className="max-w-xs"
              content="Overview of token balances, including daily sent and received on Mochi wallet."
              arrow="top-center"
            >
              <InfoCircleOutlined className="w-4 h-4 text-text-disabled" />
            </Tooltip>
          </div>
          <Select value={interval} onChange={setInterval}>
            <SelectTrigger size="sm" appearance="form" className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {intervals.map(({ key, label }) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between pt-2">
          <Typography level="p5">Mochi Balance</Typography>
          <Typography level="h6">
            {!profile?.id || isLoadingBalance
              ? '$0.00'
              : mochiUtils.formatUsdDigit(mochiBalance)}
          </Typography>
        </div>
        <div className="flex my-2 rounded overflow-hidden">
          <div
            className="h-8 bg-primary-solid"
            style={{
              width: totalExchange
                ? `${(total_receive / totalExchange) * 100}%`
                : 0,
            }}
          />
          <div
            className="h-8 bg-primary-outline-border"
            style={{
              width: totalExchange
                ? `${(total_spending / totalExchange) * 100}%`
                : 0,
            }}
          />
          <div className="h-8 bg-success-plain-active flex-1" />
        </div>
        {[
          {
            label: 'Income',
            value: total_receive,
            pnl: receive_pnl,
            icon: (
              <div className="w-2.5 h-2.5 rounded-full mr-2 bg-primary-solid" />
            ),
          },
          {
            label: 'Expense',
            value: total_spending,
            pnl: spending_pnl,
            icon: (
              <div className="w-2.5 h-2.5 rounded-full mr-2 bg-primary-outline-border" />
            ),
          },
          {
            label: 'Current balance',
            value: mochiBalance,
            icon: (
              <div className="w-2.5 h-2.5 rounded-full mr-2 bg-success-plain-active" />
            ),
          },
        ].map((item) => (
          <div key={item.label} className="py-2 space-y-2">
            <div className="flex items-center justify-between">
              <Typography level="h8" className="flex items-center">
                {item.icon}
                {item.label}
              </Typography>
              <Typography level="p5" fontWeight="md">
                {`${mochiUtils.formatUsdDigit(item.value || 0)}`}
              </Typography>
            </div>
            {!!item.pnl && (
              <div className="flex items-center justify-between">
                <Typography level="p5">Compare with last period</Typography>
                <ValueChange trend={Number(item.pnl) < 0 ? 'down' : 'up'}>
                  <ValueChangeIndicator />
                  {mochiUtils.formatPercentDigit(
                    Number.isNaN(Number(item.pnl)) || item.pnl === ''
                      ? 0
                      : Math.abs(Number(item.pnl)),
                  )}
                </ValueChange>
              </div>
            )}
          </div>
        ))}
        <Separator className="my-2" />
        <div className="flex items-center justify-between py-2">
          <Typography level="h8">Net Worth</Typography>
          <ValueChange trend={total_volume < 0 ? 'down' : 'up'}>
            {`${mochiUtils.formatUsdDigit(total_volume || 0)}`}
          </ValueChange>
        </div>
      </div>
    </Card>
  )
}
