import type { Meta } from '@storybook/react'
import { Logo, LogoWithText } from '../src'

const meta: Meta = {
  title: 'Media & Icons/Logo',
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
        <Logo size="xs" />
        <Logo />
        <Logo size="xl" />
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
          <LogoWithText isDotMochiColor={false} />
          <LogoWithText isDotMochiColor={false} orientation="vertical" />
        </div>
      </div>
    )
  },
}

export const Customized = {
  render: () => {
    return (
      <LogoWithText
        logoProps={{ size: 'xs' }}
        className="!gap-2"
        textClassName="w-18 h-8"
      />
    )
  },
}
