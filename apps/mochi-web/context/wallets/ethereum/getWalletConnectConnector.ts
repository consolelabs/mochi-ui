import { Chain } from 'wagmi'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletConnectLegacyConnector as WalletConnectConnector } from 'wagmi/connectors/walletConnectLegacy'

export type CustomWalletConnectConnector = WalletConnectConnector & {
  getURI: () => Promise<string>
}

type SerializedOptions = string
const sharedConnectors = new Map<
  SerializedOptions,
  CustomWalletConnectConnector
>()

type WalletConnectConnectorOptions = ConstructorParameters<
  typeof WalletConnectConnector
>[0]

function createConnector(options: WalletConnectConnectorOptions) {
  const connector = new WalletConnectConnector(
    options,
  ) as CustomWalletConnectConnector

  connector.getURI = async function () {
    return new Promise<string>((r) => {
      this.getProvider().then((provider) => {
        r(provider.connector.uri)

        // provider.on('display_uri', (uri) => {
        //   r(uri)
        // })
        //
        // provider.enable()
      })
    })
  }

  sharedConnectors.set(JSON.stringify(options), connector)
  return connector
}

export function getWalletConnectConnector({
  chains,
  showQrModal = false,
}: {
  chains: Chain[]
  showQrModal?: boolean
}) {
  const options: WalletConnectConnectorOptions = {
    chains,
    options: {
      qrcode: showQrModal,
      // projectId: 'e9f8a905b4d5c924cec1a740623be776',
      // showQrModal,
    },
  }

  const serializedOptions = JSON.stringify(options)
  const sharedConnector = sharedConnectors.get(serializedOptions)

  return sharedConnector ?? createConnector(options)
}
