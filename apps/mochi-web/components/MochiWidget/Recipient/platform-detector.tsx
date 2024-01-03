import {
  DiscordColored,
  Github,
  GoogleColored,
  Reddit,
  TelegramColored,
  X,
  FacebookColored,
} from '@mochi-ui/icons'
import { Platforms } from '../PlatformPicker'

export function isDiscord(value: string) {
  if (
    ['discord:', 'dsc:', 'disc:'].some((prefix) =>
      value.toLowerCase().startsWith(prefix),
    )
  ) {
    return {
      prefix: (
        <>
          <DiscordColored className="w-4 h-4" /> <span>Discord:</span>{' '}
        </>
      ),
      platform: Platforms[0],
      keepValue: false,
    }
  }
  return null
}

export function isTelegram(value: string) {
  if (
    ['tg:', 'tlg:', 'tele:', 'telegram:'].some((prefix) =>
      value.toLowerCase().startsWith(prefix),
    )
  ) {
    return {
      prefix: (
        <>
          <TelegramColored className="w-4 h-4" /> <span>Telegram:</span>{' '}
        </>
      ),
      platform: Platforms[1],
      keepValue: false,
    }
  }
  return null
}

export function isEmail(value: string) {
  if (
    ['email:', 'mail:', 'gmail:'].some((prefix) =>
      value.toLowerCase().startsWith(prefix),
    ) ||
    /(.+)@(.+)/g.test(value)
  ) {
    return {
      prefix: (
        <>
          <GoogleColored className="w-4 h-4" /> <span>Gmail:</span>{' '}
        </>
      ),
      platform: Platforms[2],
      keepValue: /(.+)@(.+)/g.test(value),
    }
  }
  return null
}

export function isTwitter(value: string) {
  if (
    ['x:', 'tw:', 'twt:'].some((prefix) =>
      value.toLowerCase().startsWith(prefix),
    )
  ) {
    return {
      prefix: (
        <>
          <X className="w-4 h-4" /> <span>X:</span>{' '}
        </>
      ),
      platform: Platforms[3],
      keepValue: false,
    }
  }
  return null
}

export function isFacebook(value: string) {
  if (
    ['fb:', 'facebook:'].some((prefix) =>
      value.toLowerCase().startsWith(prefix),
    )
  ) {
    return {
      prefix: (
        <>
          <FacebookColored className="w-4 h-4" /> <span>Facebook:</span>{' '}
        </>
      ),
      platform: Platforms[4],
      keepValue: false,
    }
  }
  return null
}

export function isGithub(value: string) {
  if (
    ['git:', 'github:', 'gh:'].some((prefix) =>
      value.toLowerCase().startsWith(prefix),
    )
  ) {
    return {
      prefix: (
        <>
          <Github className="w-4 h-4" /> <span>Github:</span>{' '}
        </>
      ),
      platform: Platforms[5],
      keepValue: false,
    }
  }
  return null
}

export function isReddit(value: string) {
  if (
    ['rd:', 'rddt:', 'reddit:'].some((prefix) =>
      value.toLowerCase().startsWith(prefix),
    )
  ) {
    return {
      prefix: (
        <>
          <Reddit className="w-4 h-4" /> <span>Reddit:</span>{' '}
        </>
      ),
      platform: Platforms[6],
      keepValue: false,
    }
  }
  return null
}
