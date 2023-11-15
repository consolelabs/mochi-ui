import getAvailableWallets from '../src/detect-providers'

// FIX: handle for module exports
jest.mock('browser-string-hexer', () => (h: string) => h)

describe('getAvailableWallets', () => {
  it('returns connectors for EVM, Solana, RONIN, and Sui', () => {
    const wallets = getAvailableWallets()
    expect(wallets).toHaveProperty('EVM')
    expect(wallets).toHaveProperty('Solana')
    expect(wallets).toHaveProperty('RONIN')
    expect(wallets).toHaveProperty('Sui')
  })

  it('returns MetaMask connector for EVM', () => {
    const wallets = getAvailableWallets()
    const evmConnectors = wallets.EVM
    const metaMaskConnector = evmConnectors.find(
      (connector) => connector.name === 'MetaMask',
    )
    expect(metaMaskConnector).toBeDefined()
    expect(metaMaskConnector?.icon).toBeDefined()
    expect(metaMaskConnector?.isInstalled).toBeDefined()
    expect(metaMaskConnector?.connect).toBeDefined()
  })

  it('returns Phantom connector for Solana', () => {
    const wallets = getAvailableWallets()
    const solanaConnectors = wallets.Solana
    const phantomConnector = solanaConnectors.find(
      (connector) => connector.name === 'Phantom',
    )
    expect(phantomConnector).toBeDefined()
    expect(phantomConnector?.icon).toBeDefined()
    expect(phantomConnector?.isInstalled).toBeDefined()
    expect(phantomConnector?.connect).toBeDefined()
  })

  it('returns Ronin connector for RONIN', () => {
    const wallets = getAvailableWallets()
    const roninConnectors = wallets.RONIN
    const roninConnector = roninConnectors.find(
      (connector) => connector.name === 'Ronin',
    )
    expect(roninConnector).toBeDefined()
    expect(roninConnector?.icon).toBeDefined()
    expect(roninConnector?.isInstalled).toBeDefined()
    expect(roninConnector?.connect).toBeDefined()
  })

  it('returns empty array for Sui', () => {
    const wallets = getAvailableWallets()
    const suiConnectors = wallets.Sui
    expect(suiConnectors).toHaveLength(0)
  })
})
