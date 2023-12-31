export interface UrlValue {
  platform: string
  url: string
}

export interface PlatformValue {
  discord?: boolean
  telegram?: boolean
  web?: boolean
}

export interface AppDetailFormValues {
  urls: UrlValue[]
  platforms: PlatformValue
  webhook?: string
  app_name: string
  description?: string
}
