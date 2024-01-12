import {
  FormControl,
  FormErrorMessage,
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderDescription,
  SectionHeaderTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@mochi-ui/core'
import { Controller, useFormContext } from 'react-hook-form'
import { ResponseGeneralSettingData } from '~types/mochi-schema'

export const ReceiverPlatform = () => {
  const { control } = useFormContext<ResponseGeneralSettingData>()

  return (
    <Controller
      name="payment.default_receiver_platform"
      control={control}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error} className="min-w-[160px]">
          <SectionHeader
            wrapActionsOnMobile={false}
            className="!grid-cols-[1fr,auto]"
          >
            <SectionHeaderTitle className="font-normal">
              Default receiver platform
            </SectionHeaderTitle>
            <SectionHeaderDescription>
              Choose which platform of recipient to use first/default.
            </SectionHeaderDescription>
            <SectionHeaderActions>
              <Select {...field}>
                <SelectTrigger
                  appearance="form"
                  className="justify-between h-10 w-48"
                >
                  <SelectValue placeholder="Discord" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="discord">Discord</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="google">Google Account</SelectItem>
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
