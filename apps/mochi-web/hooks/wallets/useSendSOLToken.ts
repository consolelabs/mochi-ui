import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
} from '@solana/spl-token'
import {
  useConnection,
  useWallet,
  WalletContextState,
} from '@solana/wallet-adapter-react'
import {
  PublicKey,
  Transaction,
  SystemProgram,
  TransactionInstruction,
  Connection,
} from '@solana/web3.js'
import { BigNumber } from 'ethers'
import { useMemo, useState } from 'react'

type Config = {
  tokenMint?: PublicKey
  recipientAddress?: PublicKey
  amount?: BigNumber
}

async function sendTx(
  connection: Connection,
  feePayer: PublicKey,
  recipient: PublicKey,
  tx: Transaction,
  signTransaction: WalletContextState['signTransaction'],
) {
  const blockHash = await connection.getLatestBlockhash()
  tx.feePayer = feePayer
  tx.recentBlockhash = blockHash.blockhash
  const signed = await signTransaction!(tx)
  const signature = await connection.sendRawTransaction(signed.serialize())

  return Promise.resolve({
    hash: signature,
    wait: async () => {
      await connection.confirmTransaction({
        blockhash: blockHash.blockhash,
        lastValidBlockHeight: blockHash.lastValidBlockHeight,
        signature,
      })
      const finalizedTx = await connection.getTransaction(signature, {
        commitment: 'finalized',
      })
      return {
        ...finalizedTx,
        to: recipient.toBase58(),
      }
    },
  })
}

export const useSendSOLToken = () => {
  const { connection } = useConnection()
  const { publicKey, signTransaction } = useWallet()
  const [config, setConfig] = useState<Config | null>(null)

  const sendNative = useMemo(() => {
    if (
      !publicKey ||
      !config?.amount ||
      config?.amount.isZero() ||
      config?.amount.isNegative() ||
      !config.recipientAddress ||
      !signTransaction
    )
      return

    return async () => {
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: config.recipientAddress!,
          lamports: config.amount!.toBigInt(),
        }),
      )

      return await sendTx(
        connection,
        publicKey,
        config.recipientAddress!,
        tx,
        signTransaction,
      )
    }
  }, [
    config?.amount,
    config?.recipientAddress,
    connection,
    publicKey,
    signTransaction,
  ])

  const sendNonNative = useMemo(() => {
    if (
      !config?.tokenMint ||
      !publicKey ||
      !config?.amount ||
      config?.amount.isZero() ||
      config?.amount.isNegative() ||
      !config?.recipientAddress ||
      !signTransaction
    )
      return

    return async () => {
      const txInstructions: TransactionInstruction[] = []
      const associatedTokenAccountFrom = await getAssociatedTokenAddress(
        config.tokenMint!,
        publicKey,
      )
      const fromAccount = await getAccount(
        connection,
        associatedTokenAccountFrom,
      )
      const associatedTokenAccountTo = await getAssociatedTokenAddress(
        config.tokenMint!,
        config.recipientAddress!,
      )

      if (!(await connection.getAccountInfo(associatedTokenAccountTo))) {
        txInstructions.push(
          createAssociatedTokenAccountInstruction(
            publicKey,
            associatedTokenAccountTo,
            config.recipientAddress!,
            config.tokenMint!,
          ),
        )
      }

      txInstructions.push(
        createTransferInstruction(
          fromAccount.address,
          associatedTokenAccountTo,
          publicKey,
          config.amount!.toBigInt(),
        ),
      )

      const tx = new Transaction().add(...txInstructions)

      return await sendTx(
        connection,
        publicKey,
        config.recipientAddress!,
        tx,
        signTransaction,
      )
    }
  }, [
    config?.amount,
    config?.recipientAddress,
    config?.tokenMint,
    connection,
    publicKey,
    signTransaction,
  ])

  return {
    config,
    setConfig,
    sendNative,
    sendNonNative,
  }
}
