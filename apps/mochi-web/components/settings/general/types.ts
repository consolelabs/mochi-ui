interface TokenPriority {
  id: string
}

export interface Message {
  action: string
  message: string
}

export interface GeneralFormValue {
  defaultMoneySource: string
  defaultReceiverPlatform: string
  defaultTokenPriority: TokenPriority[]
  enableDefaultMessage: boolean
  defaultMessage: Message[]
}
