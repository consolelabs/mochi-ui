import { renderHook } from '@testing-library/react-hooks'
import { useMochi } from '../src/store'

const token = 'token'
const addresses = ['0x987654321abcdbef']
const mockChainId = 'ethereumChain'

describe('useMochi', () => {
  beforeEach(() => {
    localStorage.clear()
    if (!('ethereum' in window)) {
      Object.defineProperty(window, 'ethereum', {
        value: {
          request: () => mockChainId,
          connect: () => {},
        },
      })
    }
  })
  afterEach(() => {
    delete window['ethereum']
  })

  it('should set user to null by default', () => {
    const { result } = renderHook(() => useMochi())
    expect(result.current.user).toBeNull()
  })

  it('should set user when login is called', async () => {
    const { result } = renderHook(() => useMochi())
    const user = {
      profile_name: 'John Doe',
      associated_accounts: [
        {
          platform: 'evm-chain',
          platform_identifier: addresses[0],
        },
      ],
    }

    await result.current.login(user, token, addresses)
    expect(result.current.user).toEqual({
      name: user.profile_name,
      token,
      associatedAccounts: [
        {
          address: addresses[0],
          chainId: mockChainId,
          platform: 'evm-chain',
          isConnected: true,
          isWalletNotInstalled: false,
          connect: expect.any(Function),
        },
      ],
    })
  })

  it('should set user when connect is called', async () => {
    const { result } = renderHook(() => useMochi())
    const user = {
      profile_name: 'John Doe',
      associated_accounts: [
        {
          platform: 'evm-chain',
          platform_identifier: addresses[0],
        },
      ],
    }
    await result.current.login(user, token, addresses)
    result.current.connect(['0x123'], 'evm-chain')
    expect(result.current.user).toEqual({
      name: user.profile_name,
      token,
      associatedAccounts: [
        {
          address: addresses[0],
          chainId: mockChainId,
          platform: 'evm-chain',
          isConnected: true,
          isWalletNotInstalled: false,
          connect: expect.any(Function),
        },
      ],
    })
  })

  it('should set user when logout is called', async () => {
    const { result } = renderHook(() => useMochi())
    const user = {
      profile_name: 'John Doe',
      associated_accounts: [
        {
          platform: 'evm-chain',
          platform_identifier: '0x123',
        },
      ],
    }
    await result.current.login(user, token, addresses)
    result.current.logout()
    expect(result.current.user).toBeNull()
  })

  it('should store state in localStorage', async () => {
    const { result } = renderHook(() => useMochi())
    const user = {
      profile_name: 'John Doe',
      associated_accounts: [
        {
          platform: 'evm-chain',
          platform_identifier: '0x123',
        },
      ],
    }
    await result.current.login(user, token, addresses)
    expect(JSON.parse(localStorage.getItem('login-state')!)).toEqual({
      user: {
        name: user.profile_name,
        token,
        associatedAccounts: [
          {
            address: '0x123',
            chainId: mockChainId,
            platform: 'evm-chain',
            isConnected: false,
            isWalletNotInstalled: false,
          },
        ],
      },
    })
  })
})
