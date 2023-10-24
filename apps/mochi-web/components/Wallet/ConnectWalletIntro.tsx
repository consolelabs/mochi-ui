import Text from '~cpn/base/text'

export const ConnectWalletIntro = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="mb-9 w-20 h-20">
        <img
          width={80}
          height={80}
          alt="wallet intro"
          className="object-cover w-full"
          src="/assets/wallet-intro.png"
        />
      </div>
      <Text size="xs">Connect your wallet</Text>
      <span className="mt-1 max-w-xs text-xs font-medium text-center text-dashboard-gray-2">
        By connecting your wallet, you agree to our{' '}
        <span className="text-dashboard-gray-2">Term of Service</span> and{' '}
        <span className="text-dashboard-gray-2">Privacy Policy</span>
      </span>
    </div>
  )
}
