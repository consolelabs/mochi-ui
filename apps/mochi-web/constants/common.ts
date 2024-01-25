import packageJson from 'package.json'

export const appVersion = packageJson.version

export const SHARE_CONTENT = 'Check out the latest update of Mochi.gg 👇'

export const FACEBOOK_SHARE_URL = (url: string) =>
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`

export const TWITTER_SHARE_URL = (url: string, content: string) =>
  `http://twitter.com/share?url=${encodeURIComponent(
    url,
  )}&text=${encodeURIComponent(content)}`

export const MAIL_SHARE_URL = (subject: string, body: string) =>
  `mailto:?subject=${subject}&body=${encodeURIComponent(body)}`
