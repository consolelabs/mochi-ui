import { SelectedProfileNode, TipNetworkData } from '~types/tip-graph'
import Modal, { Props as ModalProps } from '~components/Modal'
import { Icon } from '@iconify/react'
import { formatNumber } from '~utils/number'

export interface NetworkModalProps {
  selectedNode: SelectedProfileNode
  isOpen: ModalProps['isOpen']
  onClose: ModalProps['onClose']
  tipNetworkData: TipNetworkData[]
}

export const NetworkModal = ({
  selectedNode,
  isOpen,
  onClose,
  tipNetworkData,
}: NetworkModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-5 pb-5 bg-[#1d1921] text-white rounded-lg min-w-[30rem] max-h-[30rem] overflow-y-auto">
        <div className="text-2xl pt-5 pb-2 sticky top-0 bg-[#1d1921] flex items-center justify-between">
          {selectedNode.parsedProfile?.plain} tip network
          <button type="button" onClick={onClose}>
            <Icon icon="iconamoon:close-thin" fontSize={28} />
          </button>
        </div>
        <ul className="space-y-2">
          {tipNetworkData.map(
            (
              { targetProfile, receiveVolume, spendVolume }: TipNetworkData,
              index,
            ) => (
              <li
                key={targetProfile?.parsedProfile?.plain}
                className="flex items-center text-white space-x-3 text-sm"
              >
                <span className="text-[rgba(255,255,255,0.7)] font-bold">
                  #{index + 1} -
                </span>
                <span className="text-white">
                  {targetProfile?.parsedProfile?.plain}
                </span>
                <span className="bg-[rgba(0,128,0,.2)] p-[1px] flex items-center">
                  <span className="text-[rgba(255,255,255,0.5)] mr-2 text-sm">
                    {formatNumber(receiveVolume)}$
                  </span>
                  <svg
                    viewBox="0 0 512.171 512.171"
                    fill="green"
                    width={12}
                    height={12}
                  >
                    <path
                      d="M35.448 295.532l213.418 213.525c2.006 2.006 4.715 3.115 7.552 3.115 2.837 0 5.547-1.131 7.552-3.136l212.779-213.504c3.051-3.051 3.947-7.637 2.304-11.627-1.664-3.989-5.547-6.571-9.856-6.571H351.864V10.667C351.864 4.779 347.085 0 341.197 0H170.53c-5.888 0-10.667 4.779-10.667 10.667v266.668H42.978c-4.309 0-8.192 2.603-9.856 6.592-1.664 3.989-.725 8.554 2.326 11.605z"
                      data-v-1bd58db8=""
                    ></path>
                  </svg>
                </span>
                <span className="bg-[rgba(255,0,0,.2)] p-[1px] flex items-center">
                  <span className="text-[rgba(255,255,255,0.5)] mr-2 text-sm">
                    {formatNumber(spendVolume)}$
                  </span>
                  <svg fill="red" width={12} height={12} viewBox="0 0 513 513">
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
      </div>
    </Modal>
  )
}
