import clsx from 'clsx'
import { create } from 'zustand'
import GiftIcon from './gift-icon'
import PaperplaneIcon from './paperplane-icon'
import PaymeIcon from './payme-icon'
import PaylinkIcon from './paylink-icon'
import Gift from './gift'
import Tip from './Tip'
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

interface WidgetState {
  activeTab: (typeof tabs)[0]
  setActiveTab: (id: string) => void
  overrideWidgetLayoutRender: React.ReactNode
  setOverrideWidgetLayoutRender: (render: React.ReactNode) => void
}

export const useWidget = create<WidgetState>((set) => ({
  activeTab: tabs[0],
  setActiveTab: (id: string) =>
    set((s) => ({ ...s, activeTab: tabs.find((t) => t.id === id) })),
  overrideWidgetLayoutRender: null,
  setOverrideWidgetLayoutRender: (render) =>
    set((s) => ({ ...s, overrideWidgetLayoutRender: render })),
}))

export default function MochiWidget() {
  const { overrideWidgetLayoutRender, activeTab, setActiveTab } = useWidget()

  if (overrideWidgetLayoutRender) return overrideWidgetLayoutRender

  return (
    <div
      style={{
        height: 640,
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
                onClick={() => setActiveTab(t.id)}
                className={clsx(
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
      </div>
    </div>
  )
}
