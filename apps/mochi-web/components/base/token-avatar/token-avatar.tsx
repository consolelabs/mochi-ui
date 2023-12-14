import { NativeImage } from '~cpn/NativeImage'
import useSWR from 'swr'
import { VariantProps, cva } from 'class-variance-authority'
import { useState } from 'react'

const style = cva([], {
  variants: {
    size: {
      base: ['w-6 h-6'],
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

type Props = VariantProps<typeof style> & {
  src: string
  name: string
  className?: string
}

export const TokenAvatar = ({ src, name, size, className }: Props) => {
  const [isError, setIsError] = useState(false)
  const { data: fallbackSrc } = useSWR(
    isError
      ? `https://api-preview.mochi.console.so/api/v1/product-metadata/emoji?codes=${name}`
      : null,
    (url) => {
      return fetch(url)
        .then((res) => res.json())
        .then((res) => res?.data?.[0]?.emoji_url || '')
        .catch(() => {})
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return (
    <NativeImage
      src={isError ? fallbackSrc : src}
      alt={name}
      className={style({ size, className })}
      onError={() => {
        setIsError(true)
      }}
    />
  )
}
