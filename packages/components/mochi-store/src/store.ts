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

      const newState = {
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

      localStorage.setItem('login-state', JSON.stringify(newState))

      return newState
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
              // @ts-ignore
              if (!window.ethereum) {
                a.isWalletNotInstalled = true
                break
              }
              // @ts-ignore
              a.chainId = await window.ethereum.request({
                method: 'eth_chainId',
              })
              a.connect = () =>
                // @ts-ignore
                window.ethereum
                  .request({
                    method: 'wallet_requestPermissions',
                    params: [{ eth_accounts: {} }],
                  })
                  .then(() =>
                    // @ts-ignore
                    window.ethereum.request({
                      method: 'eth_requestAccounts',
                    }),
                  )
                  .then((accounts: string[]) =>
                    get().connect(accounts, 'evm-chain'),
                  )
                  .catch(() => {})
              break
            }
            case 'solana-chain': {
              // @ts-ignore
              if (!window.phantom) {
                a.isWalletNotInstalled = true
                break
              }
              a.connect = () =>
                // @ts-ignore
                window.phantom.solana
                  .disconnect()
                  // @ts-ignore
                  .then(() => window.phantom.solana.connect())
                  .then((pb: any) =>
                    get().connect(
                      [pb.publicKey.toString()] as string[],
                      'solana-chain',
                    ),
                  )
                  .catch(() => {})
              break
            }
            case 'ronin-chain': {
              // @ts-ignore
              if (!window.ronin) {
                a.isWalletNotInstalled = true
                break
              }
              // @ts-ignore
              a.chainId = await window.ronin.provider.request({
                method: 'eth_chainId',
              })
              a.connect = () =>
                // @ts-ignore
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
                  .catch(() => {})
              break
            }
          }

          return a
        }),
    )

    set((state) => {
      const newState = {
        ...state,
        user: {
          name: user.profile_name,
          token,
          associatedAccounts,
        },
      }

      localStorage.setItem('login-state', JSON.stringify(newState))

      return newState
    })
  },
  logout: () =>
    set((state) => {
      const newState = {
        ...state,
        user: null,
      }

      localStorage.setItem('login-state', JSON.stringify(newState))

      return newState
    }),
}))
