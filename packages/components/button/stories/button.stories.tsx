import type { Meta, StoryObj } from '@storybook/react'
import { IconConnectWallets, IconSpinner } from '@consolelabs/icons'
import Button, { ButtonProps } from '../src/button'

const buttonColorVariants: ButtonProps['color'][] = [
  'primary',
  'secondary',
  'warning',
  'danger',
  'success',
  'neutral',
]

const buttonVariants: ButtonProps['variant'][] = ['solid', 'outline', 'link']

const buttonSizes: ButtonProps['size'][] = ['sm', 'md', 'lg']

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
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
    disabled: false,
  },
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
          loadingIndicator={<IconSpinner className="animate-spin" />}
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
        Connect Wallet <IconConnectWallets height={16} width={16} />
      </Button>
      <Button>
        <IconConnectWallets height={16} width={16} /> Connect Wallet
      </Button>
    </div>
  )
}

export function VariantSolid() {
  return (
    <div className="space-y-4">
      {buttonColorVariants.map((color) => (
        <div className="flex gap-x-4" key={color}>
          <Button color={color} variant="solid">
            {color}
          </Button>
          <Button color={color} disabled variant="solid">
            {color}
          </Button>
        </div>
      ))}
    </div>
  )
}

export function VariantOutline() {
  return (
    <div className="space-y-4">
      {buttonColorVariants.map((color) => (
        <div className="flex gap-x-4" key={color}>
          <Button color={color} variant="outline">
            {color}
          </Button>
          <Button color={color} disabled variant="outline">
            {color}
          </Button>
        </div>
      ))}
    </div>
  )
}

export function VariantLink() {
  return (
    <div className="space-y-4">
      {buttonColorVariants.map((color) => (
        <div className="flex gap-x-4" key={color}>
          <Button color={color} variant="link">
            {color}
          </Button>
          <Button color={color} disabled variant="link">
            {color}
          </Button>
        </div>
      ))}
    </div>
  )
}
