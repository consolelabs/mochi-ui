import {
  Avatar,
  Badge,
  BadgeIcon,
  Button,
  Card,
  Separator,
  Tooltip,
  Typography,
} from '@mochi-ui/core'
import {
  AddUserSolid,
  ArrowDownSquareSolid,
  ArrowUpSquareSolid,
  GiftSolid,
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

const getSummary = (total_spending: number = 0, total_receive: number = 0) => {
  if (!total_spending && !total_receive) return 'No data found.'
  if (!total_spending || total_spending < total_receive)
    return 'You receive more than you send.'
  if (!total_receive || total_spending > total_receive)
    return 'You send more than you receive.'
  return 'You send as much as you receive.'
}

interface Props {
  type: 'sent' | 'received'
  statTx?: ModelStatTx
}

const UserSection = ({ type, statTx }: Props) => {
  const [profile] = UI.render(Platform.Web, statTx?.other_profile as Profile)
  const name = emojiStrip(profile?.plain || '').trim()
  const icon =
    type === 'sent' ? (
      <TipSolid className="w-6 h-6 text-primary-solid" />
    ) : (
      <GiftSolid className="w-6 h-6 text-secondary-solid" />
    )

  if (type === 'sent' && !statTx) {
    return (
      <div className="flex items-center py-6 space-x-2">
        {icon}
        <div className="flex items-center flex-wrap [&>*]:mr-1">
          <Typography level="p5" color="textTertiary">
            To send money
          </Typography>
          <Button variant="link" color="neutral" className="pr-0 pl-0 h-auto">
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
      <div className="flex items-center py-6 space-x-2">
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
    <div className="flex items-center py-6 space-x-2">
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
  const { data } = useFetchMonthlyStats(profile?.id)

  return (
    <Card className="px-0 pb-3 shadow-input">
      <Typography level="h9" className="px-4">
        Your last 30 days recap
      </Typography>
      <Separator className="mt-4" />
      <div className="px-4">
        <div className="flex items-center py-6 space-x-2">
          {(data?.total_spending || 0) > (data?.total_receive || 0) ? (
            <ArrowUpSquareSolid className="w-6 h-6 text-primary-solid" />
          ) : (
            <ArrowDownSquareSolid className="w-6 h-6 text-success-solid" />
          )}
          <Typography level="p5">
            {getSummary(data?.total_spending, data?.total_receive)}
          </Typography>
        </div>
        <Separator />
        <UserSection type="sent" statTx={data?.most_send} />
        <Separator />
        <UserSection type="received" statTx={data?.most_receive} />
        <Separator />
        <div className="flex py-6 space-x-8">
          <TokenSection type="sent" statTx={data?.spending?.[0]} />
          <div className="my-auto h-10">
            <Separator orientation="vertical" />
          </div>
          <TokenSection type="received" statTx={data?.receive?.[0]} />
        </div>
        <Separator />
        <Typography
          level="h9"
          color="textDisabled"
          className="mt-4 mb-2 uppercase"
        >
          Details
        </Typography>
        {[
          { label: 'Sent', value: data?.total_spending },
          { label: 'Received', value: data?.total_receive },
          { label: 'Net', value: data?.total_volume },
        ].map((item) => (
          <div
            key={item.label}
            className="flex justify-between items-center py-2"
          >
            <Typography level="p5">{item.label}</Typography>
            <Typography level="h8">
              {item.value
                ? `$${mochiUtils.formatDigit({
                    value: item.value || 0,
                    fractionDigits: 2,
                  })}`
                : '-'}
            </Typography>
          </div>
        ))}
      </div>
    </Card>
  )
}
