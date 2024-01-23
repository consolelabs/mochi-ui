import {
  FormControl,
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
import { platformList } from '~constants/settings'
import { ResponseGeneralSettingData } from '~types/mochi-schema'

export const ReceiverPlatform = () => {
  const { control } = useFormContext<ResponseGeneralSettingData>()

  return (
    <Controller
      name="payment.default_receiver_platform"
      control={control}
      render={({ field }) => (
        <FormControl className="min-w-[160px]">
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
                <SelectTrigger appearance="form" className="h-10 w-52">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  {platformList.map(({ key, label, Icon }) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center">
                        <Icon className="w-6 h-6 mr-2" />
                        {label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SectionHeaderActions>
          </SectionHeader>
        </FormControl>
      )}
    />
  )
}
