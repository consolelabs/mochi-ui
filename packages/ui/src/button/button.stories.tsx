import type { Meta, StoryObj } from '@storybook/react'
import { IconConnectWallets, IconSpinner } from '../icons'
import Button from './button'

const meta: Meta<typeof Button> = {
  title: 'ui/Button',
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
      options: ['solid', 'outline', 'link', 'ghost'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
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

export function Sizes() {
  const sizes = ['sm', 'md', 'lg'] as const

  return (
    <div className="flex items-center space-x-4">
      {sizes.map((size) => (
        <Button key={size} size={size}>
          Connect Wallet
        </Button>
      ))}
    </div>
  )
}

export function Loading() {
  const sizes = ['sm', 'md', 'lg'] as const

  return (
    <div className="flex items-center space-x-4">
      {sizes.map((size) => (
        <Button key={size} size={size} loading>
          Connect Wallet
        </Button>
      ))}
    </div>
  )
}

export function CustomLoadingIndicator() {
  const sizes = ['sm', 'md', 'lg'] as const

  return (
    <div className="flex items-center space-x-4">
      {sizes.map((size) => (
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
  const colors = ['primary', 'secondary', 'danger', 'info'] as const

  return (
    <div className="space-y-4">
      {colors.map((color) => (
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
  const colors = ['primary', 'secondary', 'danger', 'info'] as const

  return (
    <div className="space-y-4">
      {colors.map((color) => (
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
  const colors = ['primary', 'secondary', 'danger', 'info'] as const

  return (
    <div className="space-y-4">
      {colors.map((color) => (
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

export function VariantGhost() {
  const colors = ['primary', 'secondary', 'danger', 'info'] as const

  return (
    <div className="space-y-4">
      {colors.map((color) => (
        <div className="flex gap-x-4" key={color}>
          <Button color={color} variant="ghost">
            {color}
          </Button>
          <Button color={color} disabled variant="ghost">
            {color}
          </Button>
        </div>
      ))}
    </div>
  )
}
