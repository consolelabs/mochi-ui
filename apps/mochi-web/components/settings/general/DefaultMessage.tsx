import {
  Button,
  FormLabel,
  IconButton,
  Switch,
  Typography,
} from '@mochi-ui/core'
import { EditLine, TrashBinLine } from '@mochi-ui/icons'
import React from 'react'
import {
  Control,
  Controller,
  UseFormWatch,
  useFieldArray,
} from 'react-hook-form'
import clsx from 'clsx'
import { actionList } from '~constants/settings'
import { GeneralFormValue } from './types'
import { MessageModal } from './MessageModal'

interface Props {
  control: Control<GeneralFormValue>
  watch: UseFormWatch<GeneralFormValue>
}

export const DefaultMessage = ({ control, watch }: Props) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'defaultMessage',
  })
  const enableDefaultMessage = watch('enableDefaultMessage')

  return (
    <div className="flex flex-col w-full max-w-md space-y-2">
      <div className="flex items-center justify-between">
        <FormLabel>Default message</FormLabel>
        <Controller
          name="enableDefaultMessage"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => (
            <Switch
              {...rest}
              checked={value}
              onCheckedChange={(checked) => onChange(checked)}
            />
          )}
        />
      </div>
      {fields.map((each, index) => (
        <Controller
          key={each.id}
          name={`defaultMessage.${index}`}
          control={control}
          render={({ field }) => (
            <div
              className={clsx(
                'flex items-center border rounded-md border-divider shadow-input',
                { 'opacity-25 pointer-events-none': !enableDefaultMessage },
              )}
            >
              <div className="flex-1 p-2 pl-10 overflow-hidden">
                <Typography level="h8">
                  {
                    actionList.find(
                      (action) => action.key === field.value.action,
                    )?.label
                  }
                </Typography>
                <Typography level="p5" noWrap>
                  {field.value.message}
                </Typography>
              </div>
              <MessageModal
                defaultValues={field.value}
                onConfirm={(data) => update(index, data)}
                trigger={
                  <IconButton
                    label="Edit"
                    variant="ghost"
                    color="white"
                    disabled={!enableDefaultMessage}
                  >
                    <EditLine className="w-5 h-5" />
                  </IconButton>
                }
              />
              <IconButton
                label="Delete"
                variant="ghost"
                color="white"
                onClick={() => remove(index)}
                disabled={!enableDefaultMessage}
              >
                <TrashBinLine className="w-5 h-5 text-danger-solid" />
              </IconButton>
            </div>
          )}
        />
      ))}
      {!!enableDefaultMessage && (
        <MessageModal
          onConfirm={(data) => append(data)}
          trigger={
            <Button color="white" className="w-fit">
              Add a new default message
            </Button>
          }
        />
      )}
    </div>
  )
}
