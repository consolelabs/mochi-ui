import { truncate } from '@dwarvesf/react-utils'
import {
  Button,
  FormControl,
  FormErrorMessage,
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
import { PlusLine } from '@mochi-ui/icons'
import { Controller, useFormContext } from 'react-hook-form'
import { ResponseGeneralSettingData } from '~types/mochi-schema'
import { getPlatform } from '~utils/platform'
import { defaultMoneySource } from '~constants/settings'

export const MoneySource = () => {
  const { profile } = useLoginWidget()
  const { control, setValue } = useFormContext<ResponseGeneralSettingData>()

  return (
    <Controller
      name="payment.default_money_source.platform_identifier"
      control={control}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error} className="min-w-[160px]">
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
                <SelectTrigger appearance="form" className="h-10 w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value={defaultMoneySource.platform_identifier}>
                    Mochi wallet
                  </SelectItem>
                  {profile?.associated_accounts
                    ?.filter((each) => (each as any).is_wallet)
                    .map((each) => (
                      <SelectItem
                        key={each.platform_identifier}
                        value={each.platform_identifier}
                      >
                        {getPlatform(each.platform).name} |{' '}
                        {truncate(each.platform_identifier, 10, true)}
                      </SelectItem>
                    ))}
                  <SelectSeparator />
                  <Button variant="ghost" className="w-full pl-2 pr-2 h-9">
                    <PlusLine className="w-4 h-4" />
                    Add new wallet
                  </Button>
                </SelectContent>
              </Select>
            </SectionHeaderActions>
          </SectionHeader>
          <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  )
}
