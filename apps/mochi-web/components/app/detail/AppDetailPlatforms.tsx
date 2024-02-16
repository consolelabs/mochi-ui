import { Checkbox, Label, Typography } from '@mochi-ui/core'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'
import { platforms } from '~constants/app'
import { AppDetailFormValues } from '~types/app'

interface Props {
  control: Control<AppDetailFormValues>
  setValue: UseFormSetValue<AppDetailFormValues>
}

export const AppDetailPlatforms = ({ control, setValue }: Props) => {
  return (
    <div className="mt-8">
      <div className="py-2 space-y-2">
        <Typography level="p2" fontWeight="lg">
          Platforms
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-2 p-4 mt-4 sm:grid-cols-3">
        {platforms.map(({ key, label, Icon }) => (
          <Controller
            key={key}
            name={`platforms.${key}`}
            control={control}
            render={({ field: { name, value, ...rest } }) => (
              <div className="flex items-center">
                <Checkbox
                  {...rest}
                  id={key}
                  checked={value}
                  onChange={(value) => {
                    setValue(name, Boolean(value), {
                      shouldDirty: true,
                    })
                  }}
                />
                <Label htmlFor={key} className="flex items-center">
                  <Icon
                    width={22}
                    height={22}
                    className="ml-5 text-text-primary"
                  />
                  <Typography level="h8" className="ml-2 normal-case">
                    {label}
                  </Typography>
                </Label>
              </div>
            )}
          />
        ))}
      </div>
    </div>
  )
}
