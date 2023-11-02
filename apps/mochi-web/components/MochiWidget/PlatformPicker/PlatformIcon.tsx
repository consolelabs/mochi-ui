import DiscordIcon from './icons/discord-ic'
import TelegramIcon from './icons/telegram-ic'
import GithubIcon from './icons/github-ic'
import RedditIcon from './icons/reddit-ic'
import XIcon from './icons/x-ic'
import EmailIcon from './icons/google-ic'
import OnchainIcon from './icons/onchain-ic'
import { PlatformType } from './type'

interface IconProps {
  platform: PlatformType
  className?: string
}

const PlatformIcon: React.FC<IconProps> = (props: IconProps) => {
  switch (props.platform) {
    case 'Discord': {
      return <DiscordIcon className={props.className} />
    }
    case 'Telegram': {
      return <TelegramIcon className={props.className} />
    }
    case 'Email': {
      return <EmailIcon className={props.className} />
    }
    case 'X': {
      return <XIcon className={props.className} />
    }
    case 'Github': {
      return <GithubIcon className={props.className} />
    }
    case 'Reddit': {
      return <RedditIcon className={props.className} />
    }
    case 'On-chain': {
      return <OnchainIcon className={props.className} />
    }
    default: {
      return null
    }
  }
}

export default PlatformIcon
