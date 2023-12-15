import useSWR from 'swr'

export const NOTIFICATION_SETTING_KEY = 'NOTIFICATION_SETTING_KEY'

export const useFetchNotificationSettings = () => {
  const { data, ...rest } = useSWR(
    [NOTIFICATION_SETTING_KEY],
    () =>
      new Promise<any>((r) => {
        setTimeout(() => {
          r({
            data: {
              enableNotification: false,
              receiveTip: false,
              receiveAirdrops: false,
              depositCompleted: false,
              withdrawalCompleted: false,
              walletTransactions: false,
              paymentRequestExpired: false,
              paymentRequestCompleted: false,
              paylinkExpired: false,
              paylinkClaimedByAnother: false,
              paylinkClaimed: false,
              newConfiguration: false,
              newVaultTransactions: false,
              informationChanged: false,
              newApiCall: false,
              newMember: false,
              discord: false,
              telegram: false,
              website: false,
            },
          })
        }, 1000)
      }),
  )
  return {
    notiSettings: data?.data,
    ...rest,
  }
}
