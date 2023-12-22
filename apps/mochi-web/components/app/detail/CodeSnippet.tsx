import { Tooltip, Typography } from '@mochi-ui/core'
import { CopySolid } from '@mochi-ui/icons'
import { useClipboard } from '@dwarvesf/react-hooks'
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

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="flex flex-col rounded-lg bg-neutral-800">
      <div className="flex items-center justify-between px-4 py-2">
        <Typography
          level="p7"
          className="font-bold uppercase"
          color="textDisabled"
        >
          Curl request
        </Typography>
        <Tooltip
          content="Copied"
          arrow="top-center"
          componentProps={{ root: { open: hasCopied } }}
        >
          <CopySolid className="w-6 h-6 text-neutral-0" onClick={onCopy} />
        </Tooltip>
      </div>
      <div className="relative h-full overflow-auto">
        <pre className="!bg-transparent !m-0 !pt-0 !pb-2 !text-sm static sm:absolute !px-4">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  )
}
