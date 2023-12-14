import * as RadixAvatar from '@radix-ui/react-avatar'
import { avatar, TokenAvatarStylesProps } from '@mochi-ui/theme'
import useSWR from 'swr'

const { tokenAvatarCva } = avatar

interface AvatarProps extends TokenAvatarStylesProps {
  src: string
  name: string
  className?: string
}

const Fallback = ({ name }: Pick<AvatarProps, 'name'>) => {
  const { data: fallbackUrl } = useSWR(
    name ? [TokenAvatar, name] : null,
    () =>
      fetch(
        `https://api-preview.mochi.console.so/api/v1/product-metadata/emoji?codes=${name}`,
      )
        .then((res) => res.json())
        .then((res) => res?.data?.[0]?.emoji_url || '')
        .catch(() => {}),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return <img alt={name} src={fallbackUrl} />
}

export default function TokenAvatar({
  size,
  src,
  name,
  className,
}: AvatarProps) {
  return (
    <RadixAvatar.Root className={tokenAvatarCva({ size, className })}>
      <RadixAvatar.Image src={src} />
      <RadixAvatar.Fallback delayMs={600} asChild>
        <Fallback name={name} />
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

export { type AvatarProps }
