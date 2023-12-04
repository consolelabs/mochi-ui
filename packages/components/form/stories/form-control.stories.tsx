import { StoryObj, Meta } from '@storybook/react'
import { useForm, Controller } from 'react-hook-form'
import {
  TextFieldRoot,
  TextFieldInput,
  TextFieldDecorator,
} from '@mochi-ui/input'
import { Button } from '@mochi-ui/button'
import { Checkbox } from '@mochi-ui/checkbox'
import { UserSolid } from '@mochi-ui/icons'
import { FormControl } from '../src'
import { FormLabel } from '../src/form-label'
import { FormHelperText } from '../src/form-helper-text'
import { FormErrorMessage } from '../src/form-error-message'

const errorValues = ['max', 'min', 'required']

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
    errorValue: {
      control: 'select',
      options: errorValues,
    },
    hideHelperTextOnError: {
      control: 'boolean',
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
        <TextFieldRoot>
          <TextFieldDecorator>
            <UserSolid />
          </TextFieldDecorator>
          <TextFieldInput />
        </TextFieldRoot>
        <FormHelperText>This is helper text</FormHelperText>
        <FormErrorMessage>This field is required</FormErrorMessage>
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
          <TextFieldRoot>
            <TextFieldDecorator>
              <UserSolid />
            </TextFieldDecorator>
            <TextFieldInput name="username" placeholder="Enter your username" />
          </TextFieldRoot>
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
            <FormControl error={!!fieldState.error} hideHelperTextOnError>
              <FormLabel>Username</FormLabel>
              <TextFieldRoot>
                <TextFieldDecorator>
                  <UserSolid />
                </TextFieldDecorator>
                <TextFieldInput {...field} placeholder="Enter your username" />
              </TextFieldRoot>
              <FormHelperText>Type in your username</FormHelperText>
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
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
              <TextFieldRoot>
                <TextFieldDecorator>
                  <UserSolid />
                </TextFieldDecorator>
                <TextFieldInput
                  {...field}
                  placeholder="Enter your password"
                  type="password"
                />
              </TextFieldRoot>
              <FormHelperText>Type in your password</FormHelperText>
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
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
