import { BottomSheetProvider } from '~cpn/BottomSheet'
import React, { SVGProps, useState } from 'react'
import { useDisclosure } from '@dwarvesf/react-hooks'
import {
  /* DollarBubbleCircleSolid, */
  /* GiftSolid, */
  /* LinkCircledSolid, */
  PaperplaneCircleSolid,
} from '@mochi-ui/icons'
import clsx from 'clsx'
import Tip from './Tip'

/* function ComingSoon() { */
/*   return ( */
/*     <span className="flex flex-1 justify-center items-center m-4 text-neutral-500"> */
/*       Coming soon... */
/*     </span> */
/*   ) */
/* } */

const tabs: {
  id: string
  title: string
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  render: (props: any) => JSX.Element
}[] = [
  {
    id: 'tip',
    title: 'Tip',
    Icon: PaperplaneCircleSolid,
    render: (props) => <Tip {...props} />,
  },
  /* { */
  /*   id: 'payme', */
  /*   title: 'Pay Me', */
  /*   Icon: DollarBubbleCircleSolid, */
  /*   render: ComingSoon, */
  /* }, */
  /* { */
  /*   id: 'paylink', */
  /*   title: 'Pay Link', */
  /*   Icon: LinkCircledSolid, */
  /*   render: ComingSoon, */
  /* }, */
  /* { */
  /*   id: 'gift', */
  /*   title: 'Gift', */
  /*   Icon: GiftSolid, */
  /*   render: ComingSoon, */
  /* }, */
]

interface Props {
  wrapperClassName?: string
  className?: string
}

export default function MochiWidget({ wrapperClassName, className }: Props) {
  const {
    isOpen,
    onOpen: showTab,
    onClose: hideTab,
  } = useDisclosure({ defaultIsOpen: true })
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <BottomSheetProvider
      className={clsx(
        'w-auto lg:w-full overflow-hidden rounded-2xl border shadow-xl border-divider',
        'mochi-widget',
        wrapperClassName,
      )}
    >
      <div
        className={clsx(
          'shadow-xl rounded-[15px] bg-background-body flex flex-col',
          className,
        )}
        style={{
          height: 638,
          minWidth: 340,
        }}
      >
        <div
          className={clsx('items-center p-3 border-b border-divider', {
            flex: isOpen,
            hidden: !isOpen,
          })}
        >
          {tabs.map((t, i) => {
            return (
              <React.Fragment key={t.title}>
                {i !== 0 && (
                  <div className="flex-shrink-0 w-px h-4 bg-text-tertiary mx-2" />
                )}
                <button
                  type="button"
                  onClick={() => setActiveTab(t)}
                  className={clsx(
                    'whitespace-nowrap text-sm flex-1 flex justify-center items-center gap-x-1',
                    {
                      'text-text-primary': t.id === activeTab.id,
                      'text-text-secondary': t.id !== activeTab.id,
                    },
                  )}
                >
                  <t.Icon className="w-4 h-4 fill-current" />
                  <span className="font-medium text-current">{t.title}</span>
                </button>
              </React.Fragment>
            )
          })}
        </div>
        <div className="flex overflow-hidden relative z-10 flex-col flex-1 p-3 mt-auto min-h-0">
          <div className="flex flex-col flex-1 gap-y-2 min-h-0">
            {activeTab.render({ showTab, hideTab })}
            <span className="text-xs text-text-disabled mx-auto">
              Powered by Console Labs
            </span>
          </div>
        </div>
      </div>
    </BottomSheetProvider>
  )
}
