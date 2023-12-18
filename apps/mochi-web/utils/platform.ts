import { Platform } from '@consolelabs/mochi-ui'
import { appLogo, discordLogo, telegramLogo, webLogo } from './image'

export const getPlatform = (key?: string) => {
  switch (key) {
    case Platform.Discord: {
      return {
        icon: discordLogo.src,
        name: 'Discord',
      }
    }
    case Platform.Telegram: {
      return {
        icon: telegramLogo.src,
        name: 'Telegram',
      }
    }
    case 'web':
    case Platform.Web: {
      return {
        icon: webLogo.src,
        name: 'Web',
      }
    }
    case 'app':
    case Platform.App: {
      return {
        icon: appLogo.src,
        name: 'App',
      }
    }
    default:
      return {
        icon: '',
        name: key,
      }
  }
}
