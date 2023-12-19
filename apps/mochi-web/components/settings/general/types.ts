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

export interface GeneralFormValue {
  defaultMoneySource: string
  defaultReceiverPlatform: string
  defaultTokenPriority: TokenPriority[]
  enableDefaultMessage: boolean
  defaultMessage: Message[]
  enableTransactionLimit: boolean
  transactionLimit: TransactionLimit[]
}
