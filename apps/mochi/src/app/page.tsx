'use client'

import {
  WagmiConfig,
  createConfig,
  mainnet,
  useAccount,
  useConnect,
  useDisconnect,
} from 'wagmi'
import { createPublicClient, http } from 'viem'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

function Connect(): JSX.Element {
  const { address, isConnected } = useAccount()
  const { connect: connectRainbow } = useConnect({
    connector: new InjectedConnector(),
  })
  const { connect } = useConnect({ connector: new MetaMaskConnector() })
  const { disconnect } = useDisconnect({})

  return (
    <div className="grid grid-cols-3 auto-rows-auto gap-2 max-w-max">
      <button
        onClick={
          isConnected
            ? () => {
                disconnect()
              }
            : () => {
                connectRainbow()
              }
        }
        type="button"
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </button>
      <span>
        {isConnected && address
          ? `${address.slice(0, 5)}...${address.slice(-5)}`
          : 'not connected'}
      </span>
      <button disabled={!isConnected} type="button">
        {isConnected ? 'sign message' : 'connect to sign message'}
      </button>
    </div>
  )
}

const config = createConfig({
  autoConnect: false,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
})

export default function Page(): JSX.Element {
  return (
    <WagmiConfig config={config}>
      <Connect />
    </WagmiConfig>
  )
}
