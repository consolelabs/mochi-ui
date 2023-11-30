import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  TextFieldInput,
  TextFieldRoot,
  Tooltip,
  Typography,
} from '@consolelabs/core'
import { ThreeDotLoading, CopyLine } from '@consolelabs/icons'
import { truncate } from '@dwarvesf/react-utils'
import { useClipboard } from '@dwarvesf/react-hooks'
import { Control, Controller } from 'react-hook-form'
import { AppDetailFormValues } from '~types/app'
import { urlRegex } from '~constants/app'
import { CodeSnippet } from './CodeSnippet'

interface Props {
  apiKey?: string
  control: Control<AppDetailFormValues>
}

export const AppDetailIntegration = ({ apiKey = '', control }: Props) => {
  const { onCopy, hasCopied } = useClipboard(apiKey)

  return (
    <div className="mt-8">
      <div className="py-2">
        <Typography level="p4" className="font-medium">
          Integrations
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-8 p-6 mt-4 border sm:grid-cols-2 rounded-xl border-neutral-200 bg-neutral-0">
        <div>
          <Typography level="p3" className="font-medium">
            Test API Key
          </Typography>
          <Typography level="p5" color="textSecondary" className="py-3">
            Make a sample request to any Mochi product with the key below.
          </Typography>
          <div className="rounded border border-neutral-300 shadow-input px-4 py-1.5 flex items-center gap-2 w-fit">
            {apiKey ? (
              <>
                <Typography level="h8">{truncate(apiKey, 12, true)}</Typography>
                <Tooltip
                  content={hasCopied ? 'Copied' : 'Click to copy API key'}
                  arrow="top-center"
                  componentProps={{ root: { open: hasCopied || undefined } }}
                >
                  <CopyLine
                    className="w-4 h-4 text-primary-700"
                    onClick={onCopy}
                  />
                </Tooltip>
              </>
            ) : (
              <ThreeDotLoading className="w-5 h-5" />
            )}
          </div>
          <Typography
            component="p"
            level="p7"
            color="textSecondary"
            className="mt-6 font-bold uppercase"
          >
            Secret key
          </Typography>
          <div className="flex my-2 space-x-2">
            <div className="rounded border border-neutral-300 shadow-input px-3.5 flex items-center flex-1">
              <Typography level="p5">********* ******** ********</Typography>
            </div>
            <Button variant="outline" color="neutral" className="!bg-neutral-0">
              Reset
            </Button>
          </div>
          <Typography level="p6" color="textSecondary" component="p">
            The key can only be seen once, for security purposes. If you lose or
            forget your key, you will need to generate a new one.
          </Typography>
        </div>
        <CodeSnippet />
      </div>
      <Controller
        name="webhookUrl"
        control={control}
        rules={{
          pattern: {
            value: urlRegex,
            message: 'Invalid URL',
          },
        }}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error} className="mt-4">
            <FormLabel>Webhook Url</FormLabel>
            <TextFieldRoot>
              <TextFieldInput
                {...field}
                placeholder="https://your-endpoint-url.com"
              />
            </TextFieldRoot>
            <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
          </FormControl>
        )}
      />
    </div>
  )
}
