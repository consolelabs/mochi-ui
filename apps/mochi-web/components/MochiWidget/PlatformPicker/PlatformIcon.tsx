import {
  Discord,
  DiscordColored,
  Github,
  Google,
  GoogleColored,
  Mochi,
  Reddit,
  RedditColored,
  Telegram,
  TelegramColored,
  WalletSolid,
  X,
} from '@mochi-ui/icons'
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
        <Discord className={className} />
      ) : (
        <DiscordColored className={className} />
      )
    }
    case 'telegram': {
      return compact ? (
        <Telegram className={className} />
      ) : (
        <TelegramColored className={className} />
      )
    }
    case 'email': {
      return compact ? (
        <Google className={className} />
      ) : (
        <GoogleColored className={className} />
      )
    }
    case 'x': {
      return <X className={className} />
    }
    case 'github': {
      return <Github className={className} />
    }
    case 'reddit': {
      return compact ? (
        <Reddit className={className} />
      ) : (
        <RedditColored className={className} />
      )
    }
    case 'on-chain': {
      return <WalletSolid className={className} />
    }
    case 'mochi-profile': {
      return <Mochi className={className} />
    }
    default: {
      return null
    }
  }
}

export default PlatformIcon
