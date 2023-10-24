import { useMemo } from 'react'
import { WalletConnector } from 'context/wallets/useWalletConnectors'
import { QRCode } from './QRCode'
import Text from '~cpn/base/text'
import { button } from '~cpn/base/button'

export type ConnectDetailProps = {
  connectionError: boolean
  connectionErrorMsg: string
  qrCodeUri?: string
  reconnect: (wallet: WalletConnector) => void
  wallet: WalletConnector
  signError: boolean
}

export const ConnectDetail = ({
  wallet,
  qrCodeUri,
  connectionError,
  reconnect,
  connectionErrorMsg,
  signError,
}: ConnectDetailProps) => {
  const { downloadUrls, iconUrl, qrCode, ready } = wallet

  const qrCodeView = useMemo(() => {
    const { name, iconBackground, iconUrl, qrCode } = wallet

    if (!qrCodeUri || !qrCode) return null

    return (
      <div className="flex flex-col items-center h-full">
        <Text size="xs">Scan with {name}</Text>
        <div className="flex flex-1 justify-center items-center my-3">
          <QRCode
            logoBackground={iconBackground}
            logoUrl={iconUrl}
            uri={qrCodeUri}
          />
        </div>
      </div>
    )
  }, [wallet, qrCodeUri])

  const connectingView = useMemo(() => {
    return (
      <div className="relative h-full">
        <div className="flex justify-center items-center w-full h-full">
          <div className="flex flex-col mx-auto w-full text-center max-w-[200px]">
            <div className="flex justify-center items-center">
              <div className="w-14 h-14 rounded-full lg:w-20 lg:h-20">
                <img
                  alt="Logo"
                  className="object-cover w-full"
                  src="/logo.png"
                />
              </div>
              <hr className="flex-1 border-t-2 border-dashed border-[#33B4DD]" />
              <div
                style={{
                  boxShadow: '0px 0px 16.5517px rgba(0, 0, 0, 0.18)',
                }}
                className="overflow-hidden p-3 w-14 h-14 rounded-full lg:w-20 lg:h-20"
              >
                <img
                  alt={wallet.name}
                  className="object-cover w-full rounded-md lg:rounded-none"
                  src={iconUrl}
                />
              </div>
            </div>
            <Text size="xs" className="mt-8">
              Opening {wallet.name}
            </Text>
            {connectionError || signError ? (
              <span className="text-sm font-semibold text-red-400">
                {signError ? 'Failed to sign message' : connectionErrorMsg}
              </span>
            ) : (
              <span className="mt-px text-xs font-semibold text-foreground">
                Please wait for connection...
              </span>
            )}
          </div>
        </div>
        <div className="flex inset-x-0 justify-between items-center mt-10 lg:absolute lg:bottom-1 lg:mt-0">
          <span className="text-xs font-medium text-foreground">
            If the connection failed, please try again.
          </span>
          <button
            className={button({ size: 'sm' })}
            onClick={() => reconnect(wallet)}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }, [
    wallet,
    iconUrl,
    connectionError,
    signError,
    connectionErrorMsg,
    reconnect,
  ])

  const downloadExtendsionView = useMemo(() => {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="mb-6 w-20 h-20 rounded-full">
          <img
            alt={wallet.name}
            className="object-cover w-full"
            src={wallet.iconUrl}
          />
        </div>
        <span className="mb-2 max-w-xs text-sm font-semibold text-center text-foreground">{`The ${wallet.name} extension is not installed in your browser`}</span>
        <a
          className={button({
            className: 'uppercase',
            size: 'sm',
          })}
          href={downloadUrls?.browserExtension}
          target="_blank"
          rel="noreferrer"
        >
          Install
        </a>
      </div>
    )
  }, [wallet, downloadUrls])

  const contentView = useMemo(() => {
    if (qrCode && qrCodeUri) {
      return qrCodeView
    }
    if (ready) {
      return connectingView
    }

    if (downloadUrls?.browserExtension) {
      return downloadExtendsionView
    }
  }, [
    qrCodeView,
    connectingView,
    downloadExtendsionView,
    qrCode,
    qrCodeUri,
    ready,
    downloadUrls,
  ])

  return <div className="w-full h-full">{contentView}</div>
}
