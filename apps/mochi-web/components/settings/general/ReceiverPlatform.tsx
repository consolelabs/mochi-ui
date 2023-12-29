import {
  FormControl,
  FormErrorMessage,
  FormLabel,
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
          <FormLabel>Default receiver platform</FormLabel>
          <Select {...field}>
            <SelectTrigger appearance="form" className="justify-between h-10">
              <SelectValue placeholder="Discord" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discord">Discord</SelectItem>
              <SelectItem value="telegram">Telegram</SelectItem>
              <SelectItem value="google">Google Account</SelectItem>
            </SelectContent>
          </Select>
          <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  )
}
