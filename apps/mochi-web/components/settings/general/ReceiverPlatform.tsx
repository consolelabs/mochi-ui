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
import { Control, Controller } from 'react-hook-form'
import { GeneralFormValue } from './types'

interface Props {
  control: Control<GeneralFormValue>
}

export const ReceiverPlatform = ({ control }: Props) => {
  return (
    <Controller
      name="defaultReceiverPlatform"
      control={control}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error} className="min-w-[160px]">
          <FormLabel>Default receiver platform</FormLabel>
          <Select {...field}>
            <SelectTrigger className="justify-between h-10 border border-divider">
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
