import {
  FormControl,
  FormErrorMessage,
  IconButton,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TextFieldDecorator,
  TextFieldInput,
  TextFieldRoot,
  Typography,
} from '@mochi-ui/core'
import { PlusLine } from '@mochi-ui/icons'
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
} from 'react-hook-form'
import { AppDetailFormValues } from '~types/app'
import { urlPlatforms } from '~constants/app'
import { AppDetailNewUrl, getIcon } from './AppDetailNewUrl'

interface Props {
  control: Control<AppDetailFormValues>
  errors: FieldErrors<AppDetailFormValues>
}

export const AppDetailUrl = ({ control, errors }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'urls',
  })

  return (
    <div className="mt-8">
      <div className="py-2 space-y-2">
        <Typography level="p4" className="font-medium">
          URL
        </Typography>
        <Typography level="p5" color="textSecondary">
          You can optionally configure an interactions endpoint to receive
          interactions.
        </Typography>
      </div>
      <div className="mt-4 space-y-4">
        {fields.map((item, index) => (
          <FormControl key={item.id} error={!!errors.urls?.[index]}>
            <TextFieldRoot size="lg" className="group">
              <TextFieldDecorator>
                <Controller
                  name={`urls.${index}.platform`}
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <SelectTrigger
                        className="bg-neutral-outline"
                        leftIcon={getIcon(field.value)}
                      >
                        <SelectValue placeholder="Select link" />
                      </SelectTrigger>
                      <SelectContent className="min-w-[200px]">
                        {urlPlatforms.map(({ key, label, Icon }) => (
                          <SelectItem
                            key={key}
                            value={key}
                            leftIcon={<Icon className="w-6 h-6" />}
                          >
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </TextFieldDecorator>
              <Controller
                name={`urls.${index}.url`}
                control={control}
                render={({ field }) => (
                  <TextFieldInput
                    {...field}
                    placeholder="https://"
                    className="text-sm"
                    autoComplete="off"
                  />
                )}
              />
              <TextFieldDecorator className="hidden group-hover:flex">
                <IconButton
                  variant="link"
                  type="button"
                  label="Remove"
                  onClick={() => remove(index)}
                >
                  <PlusLine className="w-6 h-6 rotate-45 text-danger-700" />
                </IconButton>
              </TextFieldDecorator>
            </TextFieldRoot>
            <FormErrorMessage>
              {errors.urls?.[index]?.platform?.message ||
                errors.urls?.[index]?.url?.message}
            </FormErrorMessage>
          </FormControl>
        ))}
        <AppDetailNewUrl onAddNewUrl={(data) => append(data)} />
      </div>
    </div>
  )
}
