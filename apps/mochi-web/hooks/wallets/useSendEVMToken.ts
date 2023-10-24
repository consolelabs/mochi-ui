import { useMemo, useState } from 'react'
import {
  ChainMismatchError,
  erc20ABI,
  RpcError,
  useContractWrite,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
} from 'wagmi'

export const useSendEVMToken = () => {
  const [config, setConfig] = useState<any>(null)

  const { config: nativeConfig, error: nativeError } =
    usePrepareSendTransaction(config ?? {})
  const { sendTransactionAsync } = useSendTransaction(nativeConfig)

  const { config: nonNativeConfig, error: nonNativeError } =
    usePrepareContractWrite<typeof erc20ABI, 'transfer', number>(config ?? {})
  const { writeAsync } = useContractWrite(nonNativeConfig)

  const errorMessage = useMemo(() => {
    if (nativeError) {
      const error = nativeError as RpcError<{ message: string }>
      return error.data?.message ?? (error as any).reason ?? nativeError.message
    }
    if (nonNativeError) {
      const error = nonNativeError as RpcError<{ message: string }>
      return (
        error.data?.message ?? (error as any).reason ?? nonNativeError.message
      )
    }
    if (nativeError || nonNativeError) {
      setConfig(null)
    }
  }, [nativeError, nonNativeError])

  return {
    config,
    setConfig,
    sendNonNative: writeAsync,
    sendNative: sendTransactionAsync,
    errorMessage,
    wrongChain:
      nativeError instanceof ChainMismatchError ||
      nonNativeError instanceof ChainMismatchError,
  }
}
