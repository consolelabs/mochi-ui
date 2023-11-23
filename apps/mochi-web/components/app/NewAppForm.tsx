import { useState } from 'react'
import { Button, Input, Typography } from '@consolelabs/core'
import { DtoCreateApplicationRequest } from '~types/mochi-pay-schema'
import { API } from '~constants/api'

type Props = {
  id?: string
  onClose: () => void
  onSuccess?: () => void
  onError?: () => void
}

export default function NewAppForm({ id, onClose, onSuccess, onError }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const onCreateApp = (data: DtoCreateApplicationRequest) => {
    if (!id) return
    return API.MOCHI_PAY.post(data, `/profiles/${id}/applications`)
      .badRequest((e) => {
        const err = JSON.parse(e.message)
        setError(err.msg)
        onError?.()
      })
      .json(() => {
        onClose()
        onSuccess?.()
      })
  }

  return (
    <>
      <Typography level="title-lg" color="textPrimary">
        Create an application
      </Typography>
      <Typography
        level="body-xs"
        color="textSecondary"
        component="p"
        className="mt-5 mb-2 font-bold uppercase"
      >
        Name
      </Typography>
      <Input.InputField
        autoFocus
        error={!!error}
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value)
          setError('')
        }}
      />
      {!!error && (
        <Typography level="body-xs" color="danger">
          {error}
        </Typography>
      )}
      <div className="grid grid-cols-2 gap-3 mt-8">
        <Button variant="outline" color="neutral" size="lg" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="lg"
          onClick={() => {
            if (!value) {
              setError('Required')
            } else {
              onCreateApp({ app_name: value, metadata: {}, platforms: [] })
            }
          }}
        >
          Create
        </Button>
      </div>
    </>
  )
}
