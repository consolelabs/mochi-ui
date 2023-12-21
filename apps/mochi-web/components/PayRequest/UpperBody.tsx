import { Typography, Avatar } from '@mochi-ui/core'
import clsx from 'clsx'
import Image from 'next/image'
import { coinIcon } from '~utils/image'
import useSWR from 'swr'
import { api } from '~constants/mochi'
import { useDisclosure } from '@dwarvesf/react-hooks'

type Props = {
  author: string
  avatarUrl?: string
  avatarPlatform?: string
  action: string
  amountTokenIcon?: string
  amountToken: string
  amountSymbol: string
  amountUsd: string
}

export default function UpperBody({
  author,
  avatarUrl,
  avatarPlatform,
  action,
  amountUsd,
  amountToken,
  amountSymbol,
  amountTokenIcon: _tokenIcon,
}: Props) {
  const { isOpen: isUseFallback, onOpen: setUseFallback } = useDisclosure()
  const { data: tokenIcon = coinIcon.src } = useSWR(
    [amountSymbol, isUseFallback],
    async ([_, isUseFallback]) => {
      if (_tokenIcon && !isUseFallback) return _tokenIcon
      const { ok, data } = await api.base.metadata.getEmojis({
        codes: [amountSymbol],
      })
      if (!ok) return coinIcon.src
      return data[0]?.emoji_url || coinIcon.src
    },
  )

  return (
    <div className="flex flex-col items-center">
      <Avatar
        size="lg"
        src={avatarUrl || '/logo.png'}
        smallSrc={avatarPlatform}
      />
      {/* TODO */}
      <Typography
        level="p6"
        color="textPrimary"
        fontWeight="md"
        className="mt-1"
      >
        {author}
      </Typography>
      {/* TODO */}
      <Typography
        level="p7"
        color="textSecondary"
        fontWeight="sm"
        className="mt-1"
      >
        {action}
      </Typography>
      <div className="flex justify-center items-center mt-1 font-medium">
        <div
          className={clsx('flex', {
            /* 'flex-col': data.isLongNumber, */
            /* 'items-center': data.isLongNumber, */
            /* 'items-baseline': !data.isLongNumber, */
          })}
        >
          <Image
            width={24}
            height={24}
            className="object-contain mr-2"
            src={tokenIcon}
            alt=""
            onError={() => setUseFallback()}
          />
          <Typography level="h5" fontWeight="md">
            {amountToken} {amountSymbol}
          </Typography>
        </div>
      </div>
      <Typography level="p5" fontWeight="sm" color="textSecondary">
        {amountUsd.startsWith('<') ? amountUsd : <>&asymp; {amountUsd}</>} USD
      </Typography>
    </div>
  )
}
