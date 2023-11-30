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
} from '@consolelabs/core'
import { LinkLine, PlusLine } from '@consolelabs/icons'
import { Controller, useForm } from 'react-hook-form'
import { urlPlatforms, urlRegex } from '~constants/app'
import { UrlValue } from '~types/app'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const getIcon = (key?: string) => {
  const Icon = urlPlatforms.find((item) => item.key === key)?.Icon || LinkLine
  return <Icon className="w-5 h-5" />
}

const schema = z.object({
  platform: z.string().min(1, 'This field is required'),
  url: z
    .string()
    .min(1, 'This field is required')
    .regex(urlRegex, 'Invalid URL'),
})

interface Props {
  onAddNewUrl: (data: UrlValue) => void
}

export const AppDetailNewUrl = ({ onAddNewUrl }: Props) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UrlValue>({
    defaultValues: {
      platform: '',
      url: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: UrlValue) => {
    onAddNewUrl(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl error={!!errors.platform || !!errors.url}>
        <TextFieldRoot size="lg">
          <TextFieldDecorator>
            <Controller
              name="platform"
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
            name="url"
            control={control}
            render={({ field }) => (
              <TextFieldInput
                {...field}
                placeholder="https://"
                className="text-sm"
              />
            )}
          />
          <TextFieldDecorator>
            <IconButton variant="link">
              <PlusLine className="w-6 h-6" />
            </IconButton>
          </TextFieldDecorator>
        </TextFieldRoot>
        <FormErrorMessage>
          {errors.platform?.message || errors.url?.message}
        </FormErrorMessage>
      </FormControl>
    </form>
  )
}
