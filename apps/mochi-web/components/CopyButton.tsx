import { useClipboard } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import Button from '~cpn/base/button'
import cc from 'clsx'
import { truncate } from '@dwarvesf/react-utils'

export default function CopyButton({
  className,
  children,
}: {
  className?: string
  children: string
}) {
  const { hasCopied, onCopy } = useClipboard(children)

  return (
    <Button
      type="button"
      onClick={onCopy}
      appearance="text"
      size="sm"
      className={cc('flex gap-x-2 items-center pr-3', className ?? '')}
    >
      {truncate(children, 6, true)}
      <div className="relative w-4 h-4">
        <Icon
          icon="ic:round-check"
          className={cc('top-0 left-0 absolute h-full w-full', {
            'inline-block': hasCopied,
            hidden: !hasCopied,
          })}
        />
        <Icon
          icon="uil:copy"
          className={cc('absolute top-0 left-0 w-full h-full', {
            'inline-block': !hasCopied,
            hidden: hasCopied,
          })}
        />
      </div>
    </Button>
  )
}
