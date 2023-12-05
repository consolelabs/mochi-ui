import { Meta, StoryObj } from '@storybook/react'
import { CheckBoxStyleProps } from '@mochi-ui/theme'
import { Checkbox, CheckboxProps } from '../src/checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    appearance: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'neutral',
        'success',
        'warning',
        'danger',
      ],
    },
  },
}

export default meta

export const Default: StoryObj<typeof Checkbox> = {
  render(props) {
    return (
      <div className="flex gap-4">
        <Checkbox {...props} defaultChecked={false} />
        <Checkbox {...props} defaultChecked />
        <Checkbox {...props} defaultChecked="indeterminate" />
      </div>
    )
  },
}

export const Sizes: StoryObj<typeof Checkbox> = {
  render() {
    const sizes: CheckboxProps['size'][] = ['md', 'lg']
    return (
      <div className="flex gap-4 flex-col">
        {sizes.map((s) => (
          <div key={s} className="flex gap-4">
            <Checkbox size={s} defaultChecked={false} />
            <Checkbox size={s} defaultChecked />
            <Checkbox size={s} defaultChecked="indeterminate" />
          </div>
        ))}
      </div>
    )
  },
}

export const Colors: StoryObj<typeof Checkbox> = {
  render() {
    const appearances: CheckBoxStyleProps['appearance'][] = [
      'primary',
      'secondary',
      'neutral',
      'success',
      'warning',
      'danger',
    ]
    return (
      <div className="flex flex-col gap-3">
        {appearances.map((a) => (
          <div key={a} className="flex gap-4">
            <Checkbox appearance={a} defaultChecked={false} />
            <Checkbox appearance={a} defaultChecked />
            <Checkbox appearance={a} defaultChecked="indeterminate" />
          </div>
        ))}
      </div>
    )
  },
}

export const disabled: StoryObj<typeof Checkbox> = {
  render() {
    return (
      <div className="flex gap-4">
        <Checkbox disabled defaultChecked={false} />
        <Checkbox disabled defaultChecked />
        <Checkbox disabled defaultChecked="indeterminate" />
      </div>
    )
  },
}
