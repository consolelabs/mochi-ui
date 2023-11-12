import {
  IconDiscord,
  IconDiscordColored,
  IconGithub,
  IconGoogle,
  IconGoogleColored,
  IconReddit,
  IconRedditColored,
  IconTelegram,
  IconTelegramColored,
  IconWallet,
  IconX,
} from '@consolelabs/icons'
import { PlatformType } from './type'

interface IconProps {
  platform: PlatformType | string
  compact?: boolean
  className?: string
}

const PlatformIcon: React.FC<IconProps> = ({
  platform,
  compact,
  className,
}) => {
  switch (platform.toLowerCase()) {
    case 'discord': {
      return compact ? (
        <IconDiscord className={className} />
      ) : (
        <IconDiscordColored className={className} />
      )
    }
    case 'telegram': {
      return compact ? (
        <IconTelegram className={className} />
      ) : (
        <IconTelegramColored className={className} />
      )
    }
    case 'email': {
      return compact ? (
        <IconGoogle className={className} />
      ) : (
        <IconGoogleColored className={className} />
      )
    }
    case 'x': {
      return <IconX className={className} />
    }
    case 'github': {
      return <IconGithub className={className} />
    }
    case 'reddit': {
      return compact ? (
        <IconReddit className={className} />
      ) : (
        <IconRedditColored className={className} />
      )
    }
    case 'on-chain': {
      return <IconWallet className={className} />
    }
    default: {
      return null
    }
  }
}

export default PlatformIcon
