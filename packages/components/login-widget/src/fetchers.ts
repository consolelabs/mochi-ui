import MochiAPI from '@consolelabs/mochi-rest'
import { msg } from '@mochi-ui/connect-wallet-widget'

export const api = new MochiAPI({
  log: false,
  payUrl: 'https://api-preview.mochi-pay.console.so/api/v1',
  profileUrl: 'https://api-preview.mochi-profile.console.so/api/v1',
  baseUrl: 'https://api-preview.mochi.console.so/api/v1',
})

const authUrl =
  'https://api-preview.mochi-profile.console.so/api/v1/profiles/auth' as const
const meUrl =
  'https://api-preview.mochi-profile.console.so/api/v1/profiles/me' as const

async function getAccessToken(data: any) {
  try {
    const res = await fetch(
      `${authUrl}/${data.platform.replace('-chain', '')}`,
      {
        method: 'POST',
        body: JSON.stringify({
          wallet_address: data.addresses.at(0),
          message: msg,
          signature: data.signature,
          platform: data.platform.replace('-chain', ''),
        }),
      },
    )

    if (!res.ok) return null

    const json = await res.json()

    return json.data.access_token
  } catch (e) {
    return null
  }
}

async function getOwnProfile(token: string) {
  try {
    const res = await fetch(meUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) return null

    const json = await res.json()

    return {
      ...json,
      associated_accounts: json.associated_accounts.map((aa: any) => {
        if (aa.platform !== 'ronin-chain') return aa
        return {
          ...aa,
          platform_identifier: `0x${aa.platform_identifier.slice(
            'ronin:'.length,
          )}`,
        }
      }),
    }
  } catch (e) {
    return null
  }
}

export default { getOwnProfile, getAccessToken }
