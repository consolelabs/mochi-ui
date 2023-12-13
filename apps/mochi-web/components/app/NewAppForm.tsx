import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  TextFieldInput,
  TextFieldRoot,
  Typography,
  useToast,
} from '@mochi-ui/core'
import {
  DtoCreateApplicationRequest,
  ViewFullApplicationResponse,
} from '~types/mochi-pay-schema'
import { API, GET_PATHS } from '~constants/api'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type Props = {
  id?: string
  onClose: () => void
  onSuccess?: (result: ViewFullApplicationResponse) => void
  onError?: () => void
}

const schema = z.object({
  app_name: z
    .string()
    .min(6, 'Name must contain at least 6 characters')
    .regex(
      /^[a-zA-Z0-9 ]+$/,
      'Name must contain only letters, numbers and spaces',
    ),
})

export default function NewAppForm({ id, onClose, onSuccess, onError }: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<DtoCreateApplicationRequest>({
    defaultValues: {
      app_name: '',
    },
    resolver: zodResolver(schema),
  })
  const { toast } = useToast()

  const onCreateApp = (data: DtoCreateApplicationRequest) => {
    if (!id) return
    return API.MOCHI_PAY.post(
      {
        ...data,
        app_name: data.app_name.trim(),
        metadata: {},
        platforms: [],
      },
      GET_PATHS.CREATE_APPLICATION(id),
    )
      .json((r) => {
        onClose()
        onSuccess?.(r)
      })
      .catch((e) => {
        const err = JSON.parse(e.message)
        toast({
          description: err.msg,
          scheme: 'danger',
        })
        onError?.()
      })
  }

  return (
    <form onSubmit={handleSubmit(onCreateApp)}>
      <Typography level="h6" color="textPrimary">
        Create an application
      </Typography>
      <Controller
        name="app_name"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error} className="mt-5">
            <FormLabel>Name</FormLabel>
            <TextFieldRoot>
              <TextFieldInput {...field} autoComplete="off" />
            </TextFieldRoot>
            <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
          </FormControl>
        )}
      />
      <div className="grid grid-cols-2 gap-3 mt-8">
        <Button
          variant="outline"
          color="neutral"
          size="lg"
          type="button"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          size="lg"
          type="submit"
          disabled={!!Object.keys(errors).length || isSubmitting}
          loading={isSubmitting}
        >
          Create
        </Button>
      </div>
    </form>
  )
}
