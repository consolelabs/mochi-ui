import useSWR from 'swr'
import { Avatar, AvatarProps } from '@mochi-ui/core'
import { coinIcon } from '~utils/image'
import { api } from '~constants/mochi'

export const TokenAvatar = (
  props: Omit<AvatarProps, 'fallback'> & { name: string; chainName?: string },
) => {
  const { src: _src, name, smallSrc: _smallSrc, chainName, className } = props

  const { data = { src: _src, smallSrc: _smallSrc } } = useSWR(
    [name, _src, chainName, _smallSrc],
    async () => {
      const result = {
        src: _src,
        smallSrc: _smallSrc,
      }
      if (_src && _smallSrc) return result

      const { ok, data } = await api.base.metadata.getEmojis({
        codes: [name].concat(chainName ? [chainName] : []),
      })
      if (!ok) {
        result.src = coinIcon.src
        delete result.smallSrc
        return result
      }

      result.src = data[0]?.emoji_url || coinIcon.src
      result.smallSrc = data[1]?.emoji_url

      return result
    },
  )

  return (
    <Avatar
      src={data.src}
      smallSrc={data.smallSrc}
      fallback={coinIcon.src}
      size="xs"
      className={className}
    />
  )
}
