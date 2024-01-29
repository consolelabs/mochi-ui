import { zodResolver } from '@hookform/resolvers/zod'
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
} from '@mochi-ui/core'
import { LinkLine, PlusLine } from '@mochi-ui/icons'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { urlPlatforms } from '~constants/app'
import { UrlValue } from '~types/app'

export const getIcon = (key?: string) => {
  const Icon = urlPlatforms.find((item) => item.key === key)?.Icon || LinkLine
  return <Icon className="w-5 h-5" />
}

export const placeholderMap: Record<(typeof urlPlatforms)[0]['key'], string> = {
  telegram: '@username',
  email: 'email@gmail.com',
}

export const prefixMap: Record<(typeof urlPlatforms)[0]['key'], string[]> = {
  telegram: ['https://t.me/'],
  twitter: ['https://twitter.com/', 'https://x.com/'],
}

export const getPlatformByPrefix = (
  url: string,
): (typeof urlPlatforms)[0]['key'] => {
  const platform = urlPlatforms.find(
    (item) => prefixMap[item.key]?.some((prefix) => url.startsWith(prefix)),
  )

  if (!platform && url.startsWith('https://')) {
    return 'website'
  }

  return platform?.key || ''
}

export const appDetailUrlSchema = z
  .object({
    platform: z.string().min(1, 'Platform is required'),
    url: z.string().min(1, 'This field is required'),
  })
  .superRefine((data, ctx) => {
    const platform = data.platform as (typeof urlPlatforms)[number]['key']

    let isUrlValid = false

    switch (platform) {
      case 'telegram': {
        isUrlValid =
          // 1. @username (regex)
          /^@([a-zA-Z0-9_]{1,32})$/.test(data.url) ||
          // 2. https://t.me/username (regex)
          /^https:\/\/t.me\/([a-zA-Z0-9_]{1,32})$/.test(data.url) ||
          // 3. username (regex)
          /^[a-zA-Z0-9_]{1,32}$/.test(data.url)

        break
      }
      case 'email': {
        isUrlValid = z.string().email().safeParse(data.url).success

        break
      }
      default: {
        isUrlValid = true
      }
    }

    if (!isUrlValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid format',
        path: ['url'],
      })
    }

    return ctx
  })

interface Props {
  onAddNewUrl: (data: UrlValue) => void
}

export const AppDetailNewUrl = ({ onAddNewUrl }: Props) => {
  const {
    setValue,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<UrlValue>({
    defaultValues: {
      platform: '',
      url: '',
    },
    resolver: zodResolver(appDetailUrlSchema),
  })

  const onSubmit = (data: UrlValue) => {
    onAddNewUrl(data)
    reset()
  }

  const platform = watch('platform')
  const inputPlaceholder = placeholderMap[platform] || 'https://'

  const url = watch('url')
  const platformByPrefix = getPlatformByPrefix(url)

  // Auto select platform by prefix if platform is not selected yet
  useEffect(() => {
    if (platformByPrefix && !platform) {
      setValue('platform', platformByPrefix)
    }
  }, [url]) // eslint-disable-line

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
                    size="sm"
                    variant="soft"
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
                placeholder={inputPlaceholder}
                className="text-sm"
                autoComplete="off"
              />
            )}
          />
          <TextFieldDecorator>
            <IconButton label="Add" variant="link">
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
