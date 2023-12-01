import {
  Alert,
  AlertDescription,
  AlertIcon,
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
import { CodeSnippet } from './CodeSnippet'

interface Props {
  apiKey?: string
  control: Control<AppDetailFormValues>
  secretKey?: string
  onResetSecretKey: () => void
  isResettingSecretKey?: boolean
}

export const AppDetailIntegration = ({
  apiKey = '',
  control,
  secretKey = '',
  onResetSecretKey,
  isResettingSecretKey,
}: Props) => {
  const { onCopy: onCopyApiKey, hasCopied: hasCopiedApiKey } =
    useClipboard(apiKey)
  const { onCopy: onCopySecretKey, hasCopied: hasCopiedSecretKey } =
    useClipboard(secretKey)

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
            API Key
          </Typography>
          <Typography level="p5" color="textSecondary" className="py-3">
            Make a sample request to any Mochi product with the key below.
          </Typography>
          <div className="rounded border border-neutral-300 shadow-input px-4 py-1.5 flex items-center gap-2 w-fit min-w-[175px] justify-between">
            {apiKey ? (
              <>
                <Typography level="h8">{truncate(apiKey, 12, true)}</Typography>
                <Tooltip
                  content={hasCopiedApiKey ? 'Copied' : 'Click to copy API key'}
                  arrow="top-center"
                  componentProps={{
                    root: { open: hasCopiedApiKey || undefined },
                  }}
                >
                  <CopyLine
                    className="w-4 h-4 text-primary-700"
                    onClick={onCopyApiKey}
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
          <div className="flex flex-col my-2 space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row">
            <div className="rounded border border-neutral-300 shadow-input px-3.5 flex items-center flex-1 overflow-hidden">
              <Typography
                level="p5"
                className="leading-10 text-ellipsis whitespace-nowrap"
              >
                {secretKey || '********* ******** ********'}
              </Typography>
            </div>
            {secretKey ? (
              <div className="flex space-x-2">
                <Tooltip
                  content="Copied"
                  arrow="top-center"
                  componentProps={{
                    root: { open: hasCopiedSecretKey },
                    trigger: { asChild: true },
                  }}
                >
                  <Button variant="outline" onClick={onCopySecretKey}>
                    Copy
                  </Button>
                </Tooltip>
                <Button
                  variant="outline"
                  color="white"
                  onClick={onResetSecretKey}
                  loading={isResettingSecretKey}
                  disabled={isResettingSecretKey}
                  className="min-w-[130px]"
                >
                  Generate new
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                color="white"
                onClick={onResetSecretKey}
                loading={isResettingSecretKey}
                disabled={isResettingSecretKey}
                className="min-w-[75px]"
              >
                Reset
              </Button>
            )}
          </div>
          {secretKey ? (
            <Alert scheme="warning" size="sm">
              <AlertIcon />
              <AlertDescription>
                Your secret key has been generated. To access the Mochi API, use
                the new secret key and save it securely, as it only appears
                once.
              </AlertDescription>
            </Alert>
          ) : (
            <Typography level="p6" color="textSecondary" component="p">
              The key can only be seen once, for security purposes. If you lose
              or forget your key, you will need to generate a new one.
            </Typography>
          )}
        </div>
        <CodeSnippet />
      </div>
      <Controller
        name="webhookUrl"
        control={control}
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
