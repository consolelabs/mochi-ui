import type { Meta, StoryObj } from '@storybook/react'
import { ConnectWallets, Spinner } from '@consolelabs/icons'
import Button, { ButtonProps } from '../src/button'

const buttonColorVariants: ButtonProps['color'][] = [
  'primary',
  'secondary',
  'warning',
  'danger',
  'success',
  'neutral',
]

const buttonVariants: ButtonProps['variant'][] = [
  'solid',
  'outline',
  'ghost',
  'link',
]

const buttonSizes: ButtonProps['size'][] = ['sm', 'md', 'lg']

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      type: 'boolean',
    },
    variant: {
      control: 'select',
      options: buttonVariants,
    },
    color: {
      control: 'select',
      options: buttonColorVariants,
    },
    size: {
      control: 'select',
      options: buttonSizes,
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Connect Wallet',
  },
}

export function Variants() {
  return (
    <div className="flex items-stretch space-x-4">
      {buttonVariants.map((variant) => (
        <div key={variant} className="flex flex-col justify-around gap-4">
          <Button variant={variant}>{variant}</Button>
          <Button disabled variant={variant}>
            {variant}
          </Button>
        </div>
      ))}
    </div>
  )
}

export function Colors() {
  return (
    <div className="flex items-stretch space-x-4">
      {buttonColorVariants.map((color) => (
        <div key={color} className="flex flex-col justify-around gap-4">
          <Button color={color}>{color}</Button>
          <Button disabled color={color}>
            {color}
          </Button>
        </div>
      ))}
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex items-center space-x-4">
      {buttonSizes.map((size) => (
        <Button key={size} size={size}>
          Connect Wallet
        </Button>
      ))}
    </div>
  )
}

export function Loading() {
  return (
    <div className="flex items-center space-x-4">
      {buttonSizes.map((size) => (
        <Button key={size} size={size} loading>
          Connect Wallet
        </Button>
      ))}
    </div>
  )
}

export function CustomLoadingIndicator() {
  return (
    <div className="flex items-center space-x-4">
      {buttonSizes.map((size) => (
        <Button
          key={size}
          size={size}
          loading
          loadingIndicator={<Spinner className="animate-spin" />}
        >
          Connect Wallet
        </Button>
      ))}
    </div>
  )
}

export function WithIcons() {
  return (
    <div className="flex items-center space-x-4">
      <Button>Connect Wallet</Button>
      <Button>
        Connect Wallet <ConnectWallets height={16} width={16} />
      </Button>
      <Button>
        <ConnectWallets height={16} width={16} /> Connect Wallet
      </Button>
    </div>
  )
}
