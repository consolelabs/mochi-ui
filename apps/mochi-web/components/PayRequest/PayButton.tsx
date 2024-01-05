import { useDisclosure } from '@dwarvesf/react-hooks'
import { truncate } from '@dwarvesf/react-utils'
import {
  Avatar,
  Button,
  List,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalPortal,
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
  Typography,
} from '@mochi-ui/core'
import { ChevronDownLine } from '@mochi-ui/icons'
import { LoginWidget, useLoginWidget } from '@mochi-web3/login-widget'
import { useEffect, useState } from 'react'
import { api } from '~constants/mochi'

export default function PayButton({
  wallets,
  chain,
  amount,
  chainId,
  tokenAddress,
}: {
  wallets: any[]
  chain: string
  amount: string
  chainId: string
  tokenAddress?: string
}) {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
    onToggle: onToggleModal,
  } = useDisclosure()
  const [item, setItem] = useState<any>()
  const { wallets: stateWallets } = useLoginWidget()
  const [emojis, setEmojis] = useState({})

  useEffect(() => {
    api.base.metadata
      .getEmojis({
        codes: ['ETH', 'SOL', 'SUI', 'TON', 'RON'],
      })
      .then(({ ok, data }) => {
        if (!ok) return
        setEmojis({
          'evm-chain': data.find((d) => d.code === 'ETH')?.emoji_url,
          'solana-chain': data.find((d) => d.code === 'SOL')?.emoji_url,
          'sui-chain': data.find((d) => d.code === 'SUI')?.emoji_url,
          'ronin-chain': data.find((d) => d.code === 'RON')?.emoji_url,
          'ton-chain': data.find((d) => d.code === 'TON')?.emoji_url,
        })
      })
  }, [])

  useEffect(() => {
    const wallet = stateWallets.find(
      (w) => w.providers[0]?.platform === item?.platform,
    )
    if (wallet) onCloseModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateWallets])

  return (
    <>
      <Popover open={isOpen} onOpenChange={onToggle}>
        <PopoverTrigger asChild>
          <Button size="sm" type="button">
            Recipient wallets <ChevronDownLine />
          </Button>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent className="!p-3">
            <List
              data={wallets}
              listClassName="flex flex-col"
              renderItem={(item) => {
                return (
                  <button
                    key={item.platform_identifier}
                    type="button"
                    onClick={async () => {
                      try {
                        onClose()
                        setItem(item)
                        const wallet = stateWallets.find(
                          (w) => w.providers[0]?.platform === item.platform,
                        )
                        if (!wallet) {
                          onOpenModal()
                          return
                        }
                        const provider = wallet.providers[0]

                        await provider.transfer({
                          from: wallet.address,
                          to: item.platform_identifier,
                          amount,
                          chainId,
                          tokenAddress,
                        })
                      } catch (e) {
                        console.error(e)
                      } finally {
                        setItem(null)
                      }
                    }}
                    className="flex gap-x-2 items-center p-2 rounded-md hover:bg-neutral-200"
                  >
                    <Avatar
                      src={emojis[item.platform as keyof typeof emojis]}
                      size="sm"
                    />
                    <Typography level="p4">
                      {truncate(item.platform_identifier, 10, true)}
                    </Typography>
                  </button>
                )
              }}
            />
          </PopoverContent>
        </PopoverPortal>
      </Popover>
      <Modal open={isOpenModal} onOpenChange={onToggleModal}>
        <ModalOverlay />
        <ModalPortal>
          <ModalContent>
            <LoginWidget raw chain={chain} />
          </ModalContent>
        </ModalPortal>
      </Modal>
    </>
  )
}
