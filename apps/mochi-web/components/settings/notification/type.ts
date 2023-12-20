export type NotificationWalletFlags = {
  disable_all: boolean
  receive_tip_success: boolean
  receive_payme_success: boolean
  receive_airdrop_success: boolean
  '*_payme_expired': boolean
  receive_deposit_success: boolean
  '*_paylink_expired': boolean
  send_withdraw_success: boolean
  send_paylink_success: boolean
  receive_paylink_success: boolean
}

export type NotificationAppActivityFlags = {
  info_updated: boolean
  new_api_call: boolean
  new_member: boolean
  new_vault_tx: boolean
}

export type NotificationCommunitiesActivityFlags = {
  new_configuration: boolean
}

export type NotificationPlatform = 'website' | 'telegram' | 'discord'

export type NotificationFlags = NotificationWalletFlags &
  NotificationAppActivityFlags &
  NotificationCommunitiesActivityFlags
