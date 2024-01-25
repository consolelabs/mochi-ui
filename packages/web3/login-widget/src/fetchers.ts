import { msg } from '@mochi-web3/connect-wallet-widget'

async function getAccessToken(data: any, profileBaseUrl: string) {
  try {
    const res = await fetch(
      `${profileBaseUrl}/profiles/auth/${data.platform.replace('-chain', '')}`,
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

async function getOwnProfile(token: string, profileBaseUrl: string) {
  try {
    const res = await fetch(`${profileBaseUrl}/profiles/me`, {
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
