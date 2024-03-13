import { formatDate } from '~utils/time'
import { utils } from 'ethers'
import { Platform, utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { UI } from '../../constants/mochi'
import { PayRequest } from './type'

export function transformData(rawData: any): PayRequest {
  const payRequest = JSON.parse(JSON.stringify({ ...rawData }))

  if (payRequest.profile_tx.from_profile) {
    const [name] = UI.render(Platform.Web, payRequest.profile_tx.from_profile)

    payRequest.profile = {
      name: name?.plain ?? '',
      avatar: payRequest.profile_tx.from_profile.avatar ?? '',
    }
  }

  if (payRequest.profile_tx.other_profile) {
    const [name] = UI.render(Platform.Web, payRequest.profile_tx.other_profile)

    payRequest.to = {
      name: name?.plain ?? '',
      avatar: payRequest.profile_tx.other_profile.avatar ?? '',
    }
  }

  payRequest.usdAmountDisplay = mochiUtils.formatUsdDigit({
    value: payRequest.usd_amount,
    scientificFormat: true,
  })

  payRequest.amountDisplay = mochiUtils.formatTokenDigit({
    value: utils.formatUnits(payRequest.amount, payRequest.token.decimal),
    scientificFormat: true,
    bound: {
      hi: 1_000_000,
      lo: -1_000_000,
    },
  })

  payRequest.date = formatDate(payRequest.created_at, 'dd/MM/yyyy')

  if (payRequest.type === 'payme') {
    let key = ''
    if (payRequest.profile_id === payRequest.profile_tx.from_profile_id) {
      key = 'from_profile'
    } else {
      key = 'other_profile'
    }

    payRequest.recipient_wallets =
      payRequest.profile_tx[key]?.associated_accounts.filter((aa: any) =>
        payRequest.token.chain.type === 'evm'
          ? aa.platform === 'evm-chain'
          : aa.platform === 'solana-chain',
      ) ?? []
  }

  switch (payRequest.status.toLowerCase()) {
    case 'submitted':
      payRequest.status = 'pending'
      break
    default:
      break
  }

  return payRequest
}
