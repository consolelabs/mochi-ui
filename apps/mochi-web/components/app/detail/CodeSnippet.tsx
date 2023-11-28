import { Button, Tooltip, Typography } from '@consolelabs/core'
import { CopySolid } from '@consolelabs/icons'
import { useClipboard, useDisclosure } from '@dwarvesf/react-hooks'
import clsx from 'clsx'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { useEffect } from 'react'

const defaultCode = `curl --request POST \\\n  --url https://api.mochi.gg/api/v1/transfer \\\n  --header 'Content-Type: application/json' \\\n  --data '{\n    "from": {\n        "profile_global_id": "1888",\n    },\n    "tos": [\n        {\n            "profile_global_id": "48438",\n        }\n    ],\n    "amount": ["1000000"],\n    "action": "transfer",\n    "token": "USDC",\n    "metadata": {},\n    "note": "Happy Birthday"\n}'`

interface Props {
  code?: string
  language?: string
}

export const CodeSnippet = ({ code = defaultCode, language = 'js' }: Props) => {
  const { onCopy, hasCopied } = useClipboard(code)
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false })

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="flex flex-col rounded-lg bg-neutral-800">
      <div className="flex items-center justify-between px-4 py-2">
        <Typography
          level="p7"
          className="font-bold text-neutral-0"
          color="textTertiary"
        >
          CURL REQUEST
        </Typography>
        <Tooltip
          content="Copied"
          arrow="top-center"
          componentProps={{ root: { open: hasCopied } }}
        >
          <CopySolid className="w-6 h-6 text-neutral-0" onClick={onCopy} />
        </Tooltip>
      </div>
      <div
        className={clsx(
          'relative h-full rounded-lg',
          isOpen ? '' : 'overflow-hidden',
        )}
      >
        <pre
          className={clsx(
            '!bg-transparent !m-0 !pt-0 !px-4 !text-sm overflow-x-auto',
            isOpen ? '!pb-12' : 'absolute !pb-0',
          )}
        >
          <code className={`language-${language}`}>{code}</code>
        </pre>
        <div
          className={clsx(
            'absolute flex items-center justify-center',
            isOpen
              ? 'bottom-4 left-1/2 -translate-x-1/2'
              : 'inset-0 pb-2 w-full h-full bg-[linear-gradient(transparent,rgba(0,0,0,0.8))]',
          )}
        >
          <Button color="neutral" size="sm" onClick={onToggle}>
            {isOpen ? 'Show less' : 'Show more'}
          </Button>
        </div>
      </div>
    </div>
  )
}
