import { Button, Input, Typography } from '@consolelabs/core'
import {
  DtoCreateApplicationRequest,
  ViewFullApplicationResponse,
} from '~types/mochi-pay-schema'
import { API } from '~constants/api'
import { useForm } from 'react-hook-form'
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
    register,
    formState: { errors, isSubmitting },
  } = useForm<DtoCreateApplicationRequest>({
    defaultValues: {
      app_name: '',
    },
    resolver: zodResolver(schema),
  })

  const onCreateApp = (data: DtoCreateApplicationRequest) => {
    if (!id) return
    return API.MOCHI_PAY.post(
      { ...data, app_name: data.app_name.trim(), metadata: {}, platforms: [] },
      `/profiles/${id}/applications`,
    )
      .badRequest((e) => {
        const err = JSON.parse(e.message)
        alert(err.msg)
        onError?.()
      })
      .json((r) => {
        onClose()
        onSuccess?.(r)
      })
  }

  return (
    <form onSubmit={handleSubmit(onCreateApp)}>
      <Typography level="h6" color="textPrimary">
        Create an application
      </Typography>
      <Typography
        level="p6"
        color="textSecondary"
        component="p"
        className="mt-5 mb-2 font-bold uppercase"
      >
        Name
      </Typography>
      <Input.InputField
        autoFocus
        error={!!errors.app_name?.message}
        {...register('app_name', { required: true })}
      />
      {!!errors.app_name?.message && (
        <Typography level="p6" color="danger">
          {errors.app_name?.message}
        </Typography>
      )}
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
