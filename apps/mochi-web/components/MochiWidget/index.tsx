import { useState } from 'react'
import cc from 'clsx'
import { useAuthStore } from '~store'
import GiftIcon from './gift-icon'
import PaperplaneIcon from './paperplane-icon'
import PaymeIcon from './payme-icon'
import PaylinkIcon from './paylink-icon'
import Gift from './gift'
import Tip from './tip'
import Payme from './payme'
import Paylink from './paylink'

const tabs = [
  {
    id: 'tip',
    title: 'Tip',
    Icon: PaperplaneIcon,
    render: () => <Tip />,
  },
  {
    id: 'payme',
    title: 'Pay Me',
    Icon: PaymeIcon,
    render: () => <Payme />,
  },
  {
    id: 'paylink',
    title: 'Pay Link',
    Icon: PaylinkIcon,
    render: () => <Paylink />,
  },
  {
    id: 'gift',
    title: 'Gift',
    Icon: GiftIcon,
    render: () => <Gift />,
  },
]

export default function MochiWidget() {
  const [value, setValue] = useState('')
  const [activeTab, setActiveTab] = useState(tabs[0])
  const { isLoggedIn } = useAuthStore()

  return (
    <div
      style={{
        height: 'auto',
        width: 440,
      }}
      className="p-3 flex relative z-10 flex-col rounded-2xl border border-[#e5e4e3] shadow-xl bg-white-pure"
    >
      <div className="flex items-center border-b border-[#e5e4e3] pb-2">
        {tabs.map((t, i) => {
          return (
            <>
              {i !== 0 && (
                <div className="flex-shrink-0 w-px h-4 bg-[#d4d3d0] mx-2" />
              )}
              <button
                key={t.title}
                type="button"
                onClick={() => setActiveTab(t)}
                className={cc(
                  'whitespace-nowrap text-sm font-text flex-1 flex justify-center items-center gap-x-1',
                  {
                    'text-[#343433]': t.id === activeTab.id,
                    'text-[#848281]': t.id !== activeTab.id,
                  },
                )}
              >
                <t.Icon className="w-4 h-4 fill-current" />
                <span className="font-medium text-current">{t.title}</span>
              </button>
            </>
          )
        })}
      </div>

      <div className="flex flex-col flex-1 gap-y-2 min-h-0">
        {activeTab.render()}
        <span className="text-xs text-[#adacaa] mx-auto">
          Powered by Console Labs
        </span>
        {/* <div className="flex flex-col gap-y-1 mt-1"> */}
        {/*   {typeIdx === 0 ? ( */}
        {/*     <> */}
        {/*       <span className="pb-1 text-sm text-center"> */}
        {/*         Celebrate someone&apos;s birthday or achievement by sending them */}
        {/*         money */}
        {/*       </span> */}
        {/*       <Recipient /> */}
        {/*       <Input value={value} setValue={setValue} /> */}
        {/*     </> */}
        {/*   ) : typeIdx === 1 ? ( */}
        {/*     <> */}
        {/*       <span className="pb-1 text-sm text-center"> */}
        {/*         Create a PayLink and distribute them to your liking */}
        {/*       </span> */}
        {/*       <Input value={value} setValue={setValue} /> */}
        {/*     </> */}
        {/*   ) : ( */}
        {/*     <> */}
        {/*       <span className="pb-1 text-sm text-center"> */}
        {/*         Remind your friend to pay you */}
        {/*       </span> */}
        {/*       <Recipient /> */}
        {/*       <Input value={value} setValue={setValue} /> */}
        {/*     </> */}
        {/*   )} */}
        {/* </div> */}
        {/**/}
        {/* {isLoggedIn ? ( */}
        {/*   <button */}
        {/*     className={button({ */}
        {/*       appearance: 'secondary', */}
        {/*     })} */}
        {/*   > */}
        {/*     Pay */}
        {/*   </button> */}
        {/* ) : ( */}
        {/*   <Popover className="relative"> */}
        {/*     <Float */}
        {/*       as="div" */}
        {/*       className="relative" */}
        {/*       enter="transition ease-out duration-200" */}
        {/*       enterFrom="opacity-0 translate-y-1" */}
        {/*       enterTo="opacity-100 translate-y-0" */}
        {/*       leave="transition ease-in duration-150" */}
        {/*       leaveFrom="opacity-100 translate-y-0" */}
        {/*       leaveTo="opacity-0 translate-y-1" */}
        {/*       placement="bottom" */}
        {/*       offset={8} */}
        {/*       adaptiveWidth */}
        {/*     > */}
        {/*       <Popover.Button */}
        {/*         type="button" */}
        {/*         className={button({ */}
        {/*           appearance: 'secondary', */}
        {/*           className: 'w-full', */}
        {/*           size: 'base', */}
        {/*         })} */}
        {/*       > */}
        {/*         Connect Options */}
        {/*       </Popover.Button> */}
        {/*       <Popover.Panel className="z-40 bg-white rounded-lg shadow-full"> */}
        {/*         <LoginPanel compact /> */}
        {/*       </Popover.Panel> */}
        {/*     </Float> */}
        {/*   </Popover> */}
        {/* )} */}
      </div>
    </div>
  )
}
