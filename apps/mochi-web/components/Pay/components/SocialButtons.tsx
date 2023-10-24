import { Icon } from '@iconify/react'
import { button } from '~cpn/base/button'
import { AUTH_DISCORD_URL } from '~envs'

export default function SocialButtons({
  iconOnly = false,
}: {
  iconOnly?: boolean
}) {
  const data = [
    {
      link: `${AUTH_DISCORD_URL}?url_location=${window.location.href}`,
      icon: 'ic:baseline-discord',
      name: 'Discord',
    },
    {
      link: '',
      icon: 'ic:baseline-telegram',
      name: 'Telegram',
    },
    {
      link: '',
      icon: 'mdi:twitter',
      name: 'Twitter',
    },
    {
      link: '',
      icon: 'mingcute:google-fill',
      name: 'Google',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {data.map((item) => (
        <a
          key={item.name}
          className={button({
            className: '!shadow-none font-semibold',
          })}
          href={item.link}
        >
          <Icon icon={item.icon} className="flex-shrink-0" />
          {!iconOnly && <div>{item.name}</div>}
        </a>
      ))}
    </div>
  )
}
