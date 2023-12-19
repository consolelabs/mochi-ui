import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@mochi-ui/core'
import { PlusLine } from '@mochi-ui/icons'
import { Control, Controller } from 'react-hook-form'
import { GeneralFormValue } from './types'

interface Props {
  control: Control<GeneralFormValue>
}

export const MoneySource = ({ control }: Props) => {
  return (
    <Controller
      name="defaultMoneySource"
      control={control}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error} className="min-w-[160px]">
          <FormLabel>Default money source</FormLabel>
          <Select {...field}>
            <SelectTrigger className="justify-between h-10 border border-divider">
              <SelectValue placeholder="Mochi wallet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mochi">Mochi wallet</SelectItem>
              <SelectItem value="evm">EVM | 0xfsf...few</SelectItem>
              <SelectItem value="sol">SOL | 0xfsf...few</SelectItem>
              <SelectSeparator />
              <Button variant="ghost" className="w-full pl-2 pr-2 h-9">
                <PlusLine className="w-4 h-4" />
                Add new wallet
              </Button>
            </SelectContent>
          </Select>
          <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  )
}
