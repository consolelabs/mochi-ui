import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Logo } from '@mochi-ui/logo'
import { X, Discord, Telegram, Consolelabs } from '@mochi-ui/icons'

import { Footer, FooterProps } from '../src'

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Footer>

const Template = (args: FooterProps) => <Footer {...args} />

export const Default: Story = {
  render: Template,
  args: {
    copyrightText: 'Copyright © 2023 Mochi, All rights reserved',
    logo: <Logo className="!h-9 !w-9" />,
    nav: [
      {
        title: 'Developers',
        links: [
          {
            href: '/',
            text: 'Documentation',
            newTab: true,
          },
          { href: '/', text: 'GitHub' },
        ],
      },
      {
        title: 'Resources',
        links: [{ href: '/', text: 'Changelog' }],
      },
      {
        title: 'Company',
        links: [
          { href: '/', text: 'Contact' },
          { href: '/', newTab: true, text: 'Twitter' },
        ],
      },
    ],
    social: [
      {
        href: '/',
        Icon: Consolelabs,
        title: 'Console Labs',
      },
      { href: '/', Icon: X, title: 'X' },
      { href: '/', Icon: Discord, title: 'Discord' },
      { href: '/', Icon: Telegram, title: 'Telegram' },
    ],
  },
}
