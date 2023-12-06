import { SOCIAL_LINKS } from '~constants'
import { X, Discord, Telegram, Consolelabs } from '@mochi-ui/icons'
import Link from 'next/link'
import { Logo, Footer as FooterCore } from '@mochi-ui/core'
import { ROUTES } from '~constants/routes'

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <FooterCore
      copyrightText={`Copyright © ${year} Mochi, All rights reserved`}
      logo={<Logo className="!h-9 !w-9" />}
      nav={[
        {
          title: 'Developers',
          links: [
            {
              href: SOCIAL_LINKS.DOCUMENT,
              text: 'Documentation',
              newTab: true,
            },
            { href: SOCIAL_LINKS.GITHUB, text: 'GitHub' },
          ],
        },
        {
          title: 'Resources',
          links: [{ href: ROUTES.CHANGELOG, as: Link, text: 'Changelog' }],
        },
        {
          title: 'Company',
          links: [
            { href: SOCIAL_LINKS.DISCORD, text: 'Contact' },
            { href: SOCIAL_LINKS.TWITTER, newTab: true, text: 'Twitter' },
          ],
        },
      ]}
      social={[
        {
          href: SOCIAL_LINKS.CONSOLE,
          Icon: Consolelabs,
          title: 'Console Labs',
        },
        { href: SOCIAL_LINKS.TWITTER, Icon: X, title: 'X' },
        { href: SOCIAL_LINKS.DISCORD, Icon: Discord, title: 'Discord' },
        { href: SOCIAL_LINKS.TELEGRAM, Icon: Telegram, title: 'Telegram' },
      ]}
    />
  )
}
