interface TokenPriority {
  id: string
}

export interface Message {
  action: string
  message: string
}

export interface TransactionLimit {
  action: string
  minToken: string
  minAmount: string
  maxToken: string
  maxAmount: string
}

export interface CustomSettings {
  platform: string
  target_group: string
}

export interface CustomPrivacy {
  custom_settings: CustomSettings[]
  general_platform_group: string
  general_target_group: string
}

export interface GeneralFormValue {
  defaultMoneySource: string
  defaultReceiverPlatform: string
  defaultTokenPriority: TokenPriority[]
  enableDefaultMessage: boolean
  defaultMessage: Message[]
  enableTransactionLimit: boolean
  transactionLimit: TransactionLimit[]
  transactionPrivacy: CustomPrivacy
  socialAccountsPrivacy: CustomPrivacy
  walletsPrivacy: CustomPrivacy
}
