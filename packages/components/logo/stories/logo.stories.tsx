import type { Meta } from '@storybook/react'
import { Logo, LogoWithText } from '../src'

const meta: Meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Default = {
  render: () => {
    return (
      <div className="gap-4 flex">
        <Logo size="xl" />
        <Logo />
      </div>
    )
  },
}

export const WithText = {
  render: () => {
    return (
      <div className="overflow-auto bg-neutral-outline-border p-4">
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 items-start">
          <LogoWithText />
          <LogoWithText orientation="vertical" />
          <LogoWithText scheme="dark" />
          <LogoWithText scheme="dark" orientation="vertical" />
          <LogoWithText scheme="light" />
          <LogoWithText scheme="light" orientation="vertical" />
        </div>
      </div>
    )
  },
}
