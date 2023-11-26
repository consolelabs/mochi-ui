import { StoryObj, Meta } from '@storybook/react'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '@consolelabs/input'
import { Button } from '@consolelabs/button'
import { Checkbox } from '@consolelabs/checkbox'
import { UserSolid } from '@consolelabs/icons'
import { FormControl } from '../src'
import { FormLabel } from '../src/form-label'
import { FormHelperText } from '../src/form-helper-text'

const meta: Meta<typeof FormControl> = {
  title: 'Components/FormControl',
  component: FormControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    error: {
      control: 'boolean',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      defaultValue: false,
    },
  },
}

export default meta

type Story = StoryObj<typeof FormControl>

export const Default: Story = {
  render(props) {
    return (
      <FormControl {...props}>
        <FormLabel>Username</FormLabel>
        <Input.Root>
          <Input.Slot>
            <UserSolid />
          </Input.Slot>
          <Input.InputField />
        </Input.Root>
        <FormHelperText>This is helper text</FormHelperText>
      </FormControl>
    )
  },
}

export const FormSubmission: Story = {
  render() {
    return (
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault()
          const formData = new FormData(event.currentTarget)
          alert(formData.get('username'))
        }}
      >
        <FormControl required>
          <FormLabel>Username</FormLabel>
          <Input.Root>
            <Input.Slot>
              <UserSolid />
            </Input.Slot>
            <Input.InputField
              name="username"
              placeholder="Enter your username"
            />
          </Input.Root>
          <FormHelperText>This is helper text</FormHelperText>
        </FormControl>

        <Button type="submit">Submit</Button>
      </form>
    )
  },
}

interface FormFieldValues {
  username: string
  password: string
  accept: boolean
}

export const WithReactHookForm: Story = {
  render() {
    const { handleSubmit, control, setValue, register } =
      useForm<FormFieldValues>({
        defaultValues: {
          username: '',
          accept: false,
        },
      })

    const onSubmit = (data: any) => alert(JSON.stringify(data))

    return (
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          rules={{ required: 'This field is required' }}
          render={({ field, fieldState }) => (
            <FormControl error={!!fieldState.error}>
              <FormLabel>Username</FormLabel>
              <Input.Root>
                <Input.Slot>
                  <UserSolid />
                </Input.Slot>
                <Input.InputField
                  {...field}
                  placeholder="Enter your username"
                />
              </Input.Root>
              {fieldState.error && (
                <FormHelperText>{fieldState.error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: 'This field is required' }}
          render={({ field, fieldState }) => (
            <FormControl error={!!fieldState.error}>
              <FormLabel>Password</FormLabel>
              <Input.Root>
                <Input.Slot>
                  <UserSolid />
                </Input.Slot>
                <Input.InputField
                  {...field}
                  placeholder="Enter your password"
                  type="password"
                />
              </Input.Root>
              {fieldState.error && (
                <FormHelperText>{fieldState.error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="accept"
            {...(register('accept'),
            {
              onChange: (value) => {
                setValue('accept', value as boolean)
              },
            })}
          />
          <label htmlFor="accept">Accept terms and conditions.</label>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    )
  },
}
