export interface ModelChain {
  coin_gecko_id?: string
  currency?: string
  id?: number
  name?: string
  short_name?: string
}

export interface ModelToken {
  address?: string
  chain?: ModelChain
  chain_id?: number
  coin_gecko_id?: string
  decimal?: number
  discord_bot_supported?: boolean
  guild_default?: boolean
  id?: number
  is_native?: boolean
  name?: string
  symbol?: string
}