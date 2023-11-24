/* import clsx from 'clsx' */
import React, { useState } from 'react'
import { PaperplaneCircleSolid } from '@consolelabs/icons'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import Tip from './Tip'

/* function ComingSoon() { */
/*   return ( */
/*     <span className="flex flex-1 justify-center items-center m-4 text-neutral-500"> */
/*       Coming soon... */
/*     </span> */
/*   ) */
/* } */

const tabs = [
  {
    id: 'tip',
    title: 'Tip',
    Icon: PaperplaneCircleSolid,
    render: () => <Tip />,
  },
  /* { */
  /*   id: 'payme', */
  /*   title: 'Pay Me', */
  /*   Icon: IconDollarBubbleCircled, */
  /*   render: ComingSoon, */
  /* }, */
  /* { */
  /*   id: 'paylink', */
  /*   title: 'Pay Link', */
  /*   Icon: IconLinkCircled, */
  /*   render: ComingSoon, */
  /* }, */
  /* { */
  /*   id: 'gift', */
  /*   title: 'Gift', */
  /*   Icon: IconGift, */
  /*   render: ComingSoon, */
  /* }, */
]

export default function MochiWidget() {
  const [activeTab] = useState(tabs[0])

  return (
    <div className="rounded-2xl border shadow-xl bg-white-pure border-neutral-300">
      <ScrollArea.Root
        style={{
          /* height: 570, */
          /* height: 640, */
          height: 670,
          maxWidth: 440,
          minWidth: 340,
        }}
        className="flex overflow-hidden relative z-10 flex-col p-3 w-screen"
      >
        {/* <div className="flex items-center border-b border-[#e5e4e3] pb-2"> */}
        {/*   {tabs.map((t, i) => { */}
        {/*     return ( */}
        {/*       <React.Fragment key={t.title}> */}
        {/*         {i !== 0 && ( */}
        {/*           <div className="flex-shrink-0 w-px h-4 bg-[#d4d3d0] mx-2" /> */}
        {/*         )} */}
        {/*         <button */}
        {/*           type="button" */}
        {/*           onClick={() => setActiveTab(t)} */}
        {/*           className={clsx( */}
        {/*             'whitespace-nowrap text-sm flex-1 flex justify-center items-center gap-x-1', */}
        {/*             { */}
        {/*               'text-[#343433]': t.id === activeTab.id, */}
        {/*               'text-[#848281]': t.id !== activeTab.id, */}
        {/*             }, */}
        {/*           )} */}
        {/*         > */}
        {/*           <t.Icon className="w-4 h-4 fill-current" /> */}
        {/*           <span className="font-medium text-current">{t.title}</span> */}
        {/*         </button> */}
        {/*       </React.Fragment> */}
        {/*     ) */}
        {/*   })} */}
        {/* </div> */}

        <div className="flex flex-col flex-1 gap-y-2 min-h-0">
          {activeTab.render()}
          <span className="text-xs text-[#adacaa] mx-auto">
            Powered by Console Labs
          </span>
        </div>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  )
}
