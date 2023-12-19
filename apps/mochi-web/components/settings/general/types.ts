interface TokenPriority {
  id: string
}

export interface GeneralFormValue {
  defaultMoneySource: string
  defaultReceiverPlatform: string
  defaultTokenPriority: TokenPriority[]
}
