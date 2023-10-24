import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { SelectedProfileNode, TipNetworkData } from '~types/tip-graph'
import { formatNumber } from '~utils/number'

export interface SelectedProfileProps {
  selectedNode: SelectedProfileNode
  className?: string
  showNetwork?: boolean
  onClose?: () => void
  onShowNetwork?: () => void
  tipNetworkData: TipNetworkData[]
}

export const SelectedProfile = ({
  selectedNode,
  className,
  onClose,
  onShowNetwork,
  showNetwork = false,
  tipNetworkData,
}: SelectedProfileProps) => {
  return (
    <div
      id="selected-profile"
      className={clsx(
        `absolute top-[15px] left-[15px] flex flex-col z-10 bg-[rgba(29,25,33,1)] w-[360px] text-white pb-5 px-3 transition duration-300`,
        showNetwork && 'bottom-[30%]',
        className,
      )}
    >
      <div className="pb-3">
        <h1 className="flex justify-between w-full text-xl items-center font-bold pt-5 pb-1">
          Selected profile
          <button type="button" onClick={onClose}>
            <Icon icon="iconamoon:close-thin" fontSize={28} />
          </button>
        </h1>
        {selectedNode.parsedProfile && (
          <a
            href={selectedNode.parsedProfile.url}
            className="text-[#de219a] mb-2 block"
            target="_blank"
          >
            {selectedNode.parsedProfile.plain}
          </a>
        )}
        <div>
          Total Volume:{' '}
          <b className="font-bold">{formatNumber(selectedNode.totalVolume)}$</b>
        </div>
        <div>
          Volume Rank: <b className="font-bold">#{selectedNode.volumeRank}</b>
        </div>
        <div>
          Percentage: <b className="font-bold">{selectedNode.volumePercent}%</b>
        </div>
        <button
          className="border border-[#de219a] hover:border-white transition-border-color py-2 px-5 rounded-full overflow-hidden mt-3 w-full"
          type="button"
          onClick={() => {
            onShowNetwork?.()
          }}
        >
          {showNetwork ? 'Hide Network' : 'Show Network'}
        </button>
      </div>
      {showNetwork && (
        <ul className="space-y-2 overflow-y-auto">
          {tipNetworkData.map(
            (
              { targetProfile, receiveVolume, spendVolume }: TipNetworkData,
              index,
            ) => (
              <li
                key={targetProfile?.parsedProfile?.plain}
                className="flex items-center text-white space-x-3 text-xs"
              >
                <span className="text-[rgba(255,255,255,0.7)] font-semibold text-xs">
                  {`${index + 1}. `}
                </span>
                <span className="text-white">
                  {targetProfile?.parsedProfile?.plain}
                </span>
                <span className="bg-[rgba(0,128,0,.2)] p-[1px] flex items-center">
                  <span className="text-[rgba(255,255,255,0.5)] mr-2">
                    {formatNumber(receiveVolume)}$
                  </span>
                  <svg
                    viewBox="0 0 512.171 512.171"
                    fill="green"
                    width={10}
                    height={10}
                  >
                    <path
                      d="M35.448 295.532l213.418 213.525c2.006 2.006 4.715 3.115 7.552 3.115 2.837 0 5.547-1.131 7.552-3.136l212.779-213.504c3.051-3.051 3.947-7.637 2.304-11.627-1.664-3.989-5.547-6.571-9.856-6.571H351.864V10.667C351.864 4.779 347.085 0 341.197 0H170.53c-5.888 0-10.667 4.779-10.667 10.667v266.668H42.978c-4.309 0-8.192 2.603-9.856 6.592-1.664 3.989-.725 8.554 2.326 11.605z"
                      data-v-1bd58db8=""
                    ></path>
                  </svg>
                </span>
                <span className="bg-[rgba(255,0,0,.2)] p-[1px] flex items-center">
                  <span className="text-[rgba(255,255,255,0.5)] mr-2">
                    {formatNumber(spendVolume)}$
                  </span>
                  <svg fill="red" width={10} height={10} viewBox="0 0 513 513">
                    <path
                      d="M476.723 216.64L263.305 3.115C261.299 1.109 258.59 0 255.753 0c-2.837 0-5.547 1.131-7.552 3.136L35.422 216.64c-3.051 3.051-3.947 7.637-2.304 11.627 1.664 3.989 5.547 6.571 9.856 6.571h117.333v266.667c0 5.888 4.779 10.667 10.667 10.667h170.667c5.888 0 10.667-4.779 10.667-10.667V234.837h116.885c4.309 0 8.192-2.603 9.856-6.592 1.664-3.989.725-8.554-2.326-11.605z"
                      data-v-1bd58db8=""
                    ></path>
                  </svg>
                </span>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  )
}
