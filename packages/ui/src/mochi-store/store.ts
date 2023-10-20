import { create } from 'zustand'

interface Account {
  address: string
  chainId: string
  platform: string
  isConnected: boolean
  isWalletNotInstalled: boolean
  connect: () => Promise<any>
}

interface MochiState {
  user: null | {
    name: string
    token: string
    associatedAccounts: Account[]
  }
  connect: (addresses: string[], platform: string) => void
  login: (user: any, token: string, addresses: any) => Promise<void>
  logout: () => void
}

export const useMochi = create<MochiState>((set, get) => ({
  user: null,
  connect: (addresses, platform) =>
    set((state) => {
      if (!state.user) return state

      return {
        ...state,
        user: {
          ...state.user,
          associatedAccounts: state.user.associatedAccounts.map((aa) => {
            if (
              !addresses
                .map((a) => a.toLowerCase())
                .includes(aa.address.toLowerCase())
            )
              return aa

            if (aa.platform !== platform) return aa

            aa.isConnected = true
            return aa
          }),
        },
      }
    }),
  login: async (user, token, _addresses) => {
    const associatedAccounts = await Promise.all(
      user.associated_accounts
        .filter((aa: any) => aa.platform.includes('chain'))
        .map(async (aa: any) => {
          let addresses: any
          if (Array.isArray(_addresses)) {
            addresses = _addresses.map((addr: string) => addr.toLowerCase())
          }

          const a: Account = {
            address: aa.platform_identifier,
            chainId: '',
            platform: aa.platform,
            isConnected: addresses.includes(
              aa.platform_identifier.toLowerCase(),
            ),
            isWalletNotInstalled: false,
            connect: () => {
              throw new Error()
            },
          }

          switch (aa.platform) {
            case 'evm-chain': {
              if (!window.web3) {
                a.isWalletNotInstalled = true
                break
              }
              a.chainId = await window.web3.currentProvider.request({
                method: 'eth_chainId',
              })
              a.connect = () =>
                window.web3.currentProvider
                  .request({
                    method: 'wallet_requestPermissions',
                    params: [{ eth_accounts: {} }],
                  })
                  .then(() =>
                    window.web3.currentProvider.request({
                      method: 'eth_requestAccounts',
                    }),
                  )
                  .then((accounts: string[]) =>
                    get().connect(accounts, 'evm-chain'),
                  )
                  .catch(() => { })
              break
            }
            case 'solana-chain': {
              if (!window.phantom) {
                a.isWalletNotInstalled = true
                break
              }
              a.connect = () =>
                window.phantom.solana
                  .disconnect()
                  .then(() => window.phantom.solana.connect())
                  .then((pb: any) =>
                    get().connect(
                      [pb.publicKey.toString()] as string[],
                      'solana-chain',
                    ),
                  )
                  .catch(() => { })
              break
            }
            case 'ronin-chain': {
              if (!window.ronin) {
                a.isWalletNotInstalled = true
                break
              }
              a.chainId = await window.ronin.provider.request({
                method: 'eth_chainId',
              })
              a.connect = () =>
                window.ronin.provider
                  .request({
                    method: 'eth_requestAccounts',
                  })
                  // .then(() =>
                  //   window.ronin.provider.request({
                  //     method: 'eth_requestAccounts',
                  //   }),
                  // )
                  .then((accounts: string[]) =>
                    get().connect(
                      accounts.map((acc) => `ronin:${acc.slice(2)}`),
                      'ronin-chain',
                    ),
                  )
                  .catch(() => { })
              break
            }
          }

          return a
        }),
    )

    set((state) => {
      return {
        ...state,
        user: {
          name: user.profile_name,
          token,
          associatedAccounts,
        },
      }
    })
  },
  logout: () =>
    set((state) => {
      return {
        ...state,
        user: null,
      }
    }),
}))
