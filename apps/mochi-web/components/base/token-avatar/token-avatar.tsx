import useSWR from 'swr'
import { VariantProps, cva } from 'class-variance-authority'
import { useId, useState } from 'react'

const style = cva(['rounded-full'], {
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
  chainSrc?: string
  chainName?: string
}

export const TokenAvatar = ({
  src,
  name,
  size,
  className,
  chainSrc,
  chainName,
}: Props) => {
  const id = useId()
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
  const [isChainError, setIsChainError] = useState(false)
  const { data: fallbackChainSrc } = useSWR(
    isChainError && chainName
      ? `https://api-preview.mochi.console.so/api/v1/product-metadata/emoji?codes=${chainName}`
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
    <div className={style({ size, className })}>
      <svg height="100%" role="none" viewBox="0 0 100 100" width="100%">
        {!!chainName && (
          <mask id={`circle-mask-${id}`}>
            <circle cx="50%" cy="50%" fill="white" r="50%" />
            <circle cx="80%" cy="80%" fill="black" r="25%" />
          </mask>
        )}
        <image
          width="100%"
          height="100%"
          mask={`url(#circle-mask-${id})`}
          onError={() => {
            setIsError(true)
          }}
          xlinkHref={isError ? fallbackSrc : src}
        />
        {!!chainName && (
          <image
            height="40%"
            width="40%"
            x="60%"
            y="60%"
            onError={() => {
              setIsChainError(true)
            }}
            xlinkHref={isChainError ? fallbackChainSrc : chainSrc}
          />
        )}
      </svg>
    </div>
  )
}
