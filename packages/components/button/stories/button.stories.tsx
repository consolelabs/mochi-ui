import type { Meta, StoryObj } from '@storybook/react'
import { ConnectWallets, Spinner } from '@mochi-ui/icons'
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
  'soft',
  'link',
]

const buttonSizes: ButtonProps['size'][] = ['sm', 'md', 'lg']

const meta: Meta<typeof Button> = {
  title: 'Form/Button',
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
    <div className="flex w-full">
      <div className="flex flex-col items-stretch gap-5">
        {buttonVariants.map((variant) => (
          <>
            <div key={variant} className="flex justify-around gap-4">
              {buttonColorVariants.map((color) => (
                <Button
                  key={`${variant}-${color}`}
                  variant={variant}
                  color={color}
                >
                  {variant}-{color}
                </Button>
              ))}
            </div>

            <div key={variant} className="flex justify-around gap-4">
              {buttonColorVariants.map((color) => (
                <Button
                  key={`${variant}-${color}`}
                  variant={variant}
                  color={color}
                  disabled
                >
                  {variant}-{color}-disabled
                </Button>
              ))}
            </div>

            <hr />
          </>
        ))}
      </div>
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
