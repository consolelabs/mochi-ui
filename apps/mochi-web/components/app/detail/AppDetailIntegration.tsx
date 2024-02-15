import { useClipboard } from '@dwarvesf/react-hooks'
import { truncate } from '@dwarvesf/react-utils'
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
} from '@mochi-ui/core'
import { CopyLine, ThreeDotLoading } from '@mochi-ui/icons'
import { useMemo } from 'react'
import { Control, Controller } from 'react-hook-form'
import { AppDetailFormValues } from '~types/app'
import { CodeSnippet } from './CodeSnippet'
import { ResetKeyModal } from './ResetKeyModal'

interface Props {
  apiKey?: string
  control: Control<AppDetailFormValues>
  secretKey?: string
  appId?: string
  profileId?: string
  onResetSecretKey: () => void
  isResettingSecretKey?: boolean
}

export const AppDetailIntegration = ({
  apiKey = '',
  control,
  secretKey = '',
  appId,
  profileId,
  onResetSecretKey,
  isResettingSecretKey,
}: Props) => {
  const { onCopy: onCopyApiKey, hasCopied: hasCopiedApiKey } =
    useClipboard(apiKey)
  const { onCopy: onCopySecretKey, hasCopied: hasCopiedSecretKey } =
    useClipboard(secretKey)

  const code = useMemo(() => {
    return `curl --location https://api.mochi-pay.console.so/api/v1/profiles/${profileId}/applications/${appId}/balances \\\n  --header 'Content-Type: application/json' \\\n  --header 'Authorization: <Bearer token>'`
  }, [appId, profileId])

  return (
    <div className="mt-8">
      <div className="py-2">
        <Typography level="p2" fontWeight="lg">
          Integrations
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-8 p-6 mt-4 rounded-xl border sm:grid-cols-2 border-divider bg-background-body">
        <div>
          <Typography level="p3" className="font-medium">
            API Key
          </Typography>
          <Typography level="p5" color="textSecondary" className="py-3">
            Make a sample request to any Mochi product with the key below.
          </Typography>
          <div className="flex gap-2 justify-between items-center py-1.5 px-4 rounded border border-divider shadow-input w-fit min-w-[175px]">
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
                    className="w-4 h-4 text-primary-solid"
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
          <div className="flex flex-col my-2 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="flex overflow-hidden flex-1 items-center px-3.5 rounded border border-divider shadow-input">
              <Typography
                level="p5"
                className="leading-10 whitespace-nowrap text-ellipsis"
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
                <ResetKeyModal
                  onConfirm={onResetSecretKey}
                  trigger={
                    <Button
                      color="neutral"
                      variant="outline"
                      loading={isResettingSecretKey}
                      disabled={isResettingSecretKey}
                      className="min-w-[130px]"
                    >
                      Generate new
                    </Button>
                  }
                />
              </div>
            ) : (
              <ResetKeyModal
                onConfirm={onResetSecretKey}
                trigger={
                  <Button
                    color="neutral"
                    variant="outline"
                    loading={isResettingSecretKey}
                    disabled={isResettingSecretKey}
                    className="min-w-[75px]"
                  >
                    Reset
                  </Button>
                }
              />
            )}
          </div>
          {secretKey ? (
            <Alert scheme="warning" size="sm" layout="stack">
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
        <CodeSnippet code={code} />
      </div>
      <Controller
        name="webhook"
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
