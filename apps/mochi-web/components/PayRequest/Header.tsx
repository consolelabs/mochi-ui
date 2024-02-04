import { useClipboard } from '@dwarvesf/react-hooks'
import { isSSR } from '@dwarvesf/react-utils'
import { Tooltip, Typography } from '@mochi-ui/core'
import { CheckLine, LinkLine } from '@mochi-ui/icons'
import clsx from 'clsx'
import Image from 'next/image'
import { SVGProps } from 'react'

type Props = {
  color: 'blue' | 'gray' | 'green'
  title: string
  url: string
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

export default function Header({ color, Icon, url, title }: Props) {
  const { hasCopied, onCopy } = useClipboard(
    isSSR() ? '' : `${window.location.host}${url}`,
  )

  return (
    <div
      className={clsx(
        'flex overflow-hidden relative justify-between items-center p-4 h-[56px]',
        {
          'bg-primary-solid': color === 'blue',
          'bg-neutral-solid': color === 'gray',
          'bg-green-solid': color === 'green',
        },
      )}
    >
      <Image fill src="/svg/wavy-pattern.svg" alt="wavy pattern" />
      <div className="flex relative gap-x-2">
        <Icon className="w-6 h-6 text-text-contrast" />
        <Typography className="p4" color="textContrast" fontWeight="md">
          {title}
        </Typography>
      </div>
      <Tooltip
        componentProps={{
          root: { open: hasCopied || undefined },
          trigger: { asChild: true },
        }}
        content={hasCopied ? 'Copied!' : 'Copy link'}
      >
        <button onClick={onCopy} type="button" className="outline-none">
          {hasCopied ? (
            <CheckLine className="relative w-4 h-4 text-text-contrast" />
          ) : (
            <LinkLine className="relative w-4 h-4 text-text-contrast" />
          )}
        </button>
      </Tooltip>
    </div>
  )
}
