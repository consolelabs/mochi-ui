import {
  Button,
  FormControl,
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderDescription,
  SectionHeaderTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@mochi-ui/core'
import { useLoginWidget } from '@mochi-web3/login-widget'
import { Mochi, PlusLine } from '@mochi-ui/icons'
import { Controller, useFormContext } from 'react-hook-form'
import { ResponseGeneralSettingData } from '~types/mochi-schema'
import { defaultMoneySource } from '~constants/settings'
import { useWalletStore } from '~store'
import { TokenAvatar } from '~cpn/TokenAvatar'

export const MoneySource = () => {
  const { profile } = useLoginWidget()
  const { control, setValue } = useFormContext<ResponseGeneralSettingData>()
  const { wallets } = useWalletStore()

  return (
    <Controller
      name="payment.default_money_source.platform_identifier"
      control={control}
      render={({ field }) => {
        const wallet = wallets.find((each) => each.id === field.value)
        return (
          <FormControl className="min-w-[160px]">
            <SectionHeader
              wrapActionsOnMobile={false}
              className="!grid-cols-[1fr,auto]"
            >
              <SectionHeaderTitle className="font-normal">
                Default money source
              </SectionHeaderTitle>
              <SectionHeaderDescription>
                Prioritize your preferred payment wallet.
              </SectionHeaderDescription>
              <SectionHeaderActions>
                <Select
                  {...field}
                  onChange={(value) => {
                    setValue(
                      'payment.default_money_source',
                      {
                        platform_identifier: value,
                        platform:
                          profile?.associated_accounts?.find(
                            (each) => each.platform_identifier === value,
                          )?.platform || defaultMoneySource.platform,
                      },
                      { shouldDirty: true },
                    )
                  }}
                >
                  <SelectTrigger appearance="form" className="h-10 w-52">
                    <div className="flex items-center">
                      {field.value ===
                      defaultMoneySource.platform_identifier ? (
                        <Mochi className="w-6 h-6 mr-2" />
                      ) : (
                        <TokenAvatar
                          src={wallet?.icon || ''}
                          name={wallet?.chainSymbol || ''}
                          className="mr-2"
                        />
                      )}
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent align="end">
                    {wallets.map((each) =>
                      each.id === defaultMoneySource.platform ? (
                        <SelectItem
                          key={defaultMoneySource.platform_identifier}
                          value={defaultMoneySource.platform_identifier}
                          leftIcon={<Mochi className="w-6 h-6" />}
                          subTitle={
                            <span className="font-normal">
                              {each.usd_amount}
                            </span>
                          }
                        >
                          {each.title}
                        </SelectItem>
                      ) : (
                        <SelectItem
                          key={each.id}
                          value={each.id}
                          leftIcon={
                            <TokenAvatar
                              src={each.icon}
                              name={each.chainSymbol}
                            />
                          }
                          subTitle={
                            <span className="font-normal">
                              {each.usd_amount}
                            </span>
                          }
                        >
                          {each.title}
                        </SelectItem>
                      ),
                    )}
                    <SelectSeparator />
                    <Button variant="ghost" className="w-full pl-2 pr-2 h-9">
                      <PlusLine className="w-4 h-4" />
                      Add new wallet
                    </Button>
                  </SelectContent>
                </Select>
              </SectionHeaderActions>
            </SectionHeader>
          </FormControl>
        )
      }}
    />
  )
}
