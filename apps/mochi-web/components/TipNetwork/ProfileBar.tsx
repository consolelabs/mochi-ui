import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { useState } from 'react'
import { GraphData, NodeObject } from 'react-force-graph-2d'
import { SelectedProfileNode } from '~types/tip-graph'

export interface ProfileBarProps {
  className?: string
  graphData: GraphData
  onSelectNode?: (node?: NodeObject) => void
  selectedNode?: SelectedProfileNode
}

export const ProfileBar = ({
  graphData,
  className,
  selectedNode,
  onSelectNode,
}: ProfileBarProps) => {
  const [showSidebar, setShowSidebar] = useState(true)
  const listProfiles = graphData.nodes

  if (!showSidebar) {
    return (
      <button
        type="button"
        onClick={() => setShowSidebar(true)}
        className="absolute top-0 right-0 flex items-center justify-center text-white bg-[rgba(29,25,33,.8)] px-5 py-2 mt-3 mr-10 rounded-lg overflow-hidden"
      >
        <Icon icon="tdesign:list" width={20} className="mr-2" />
        Profiles List
      </button>
    )
  }
  return (
    <div
      id="profile-list-sidebar"
      className={clsx(
        `bg-[rgba(29,25,33,1)] w-[320px] text-white pb-5`,
        className,
      )}
    >
      <h1 className="flex justify-between w-full text-xl items-center font-bold px-3 sticky top-0 bg-[rgba(29,25,33,1)] py-5">
        Profile List
        <button type="button" onClick={() => setShowSidebar(false)}>
          <Icon icon="iconamoon:close-thin" fontSize={28} />
        </button>
      </h1>
      <ul>
        {listProfiles.map((profile, index) => (
          <li
            key={profile.id}
            className={clsx(
              'flex justify-between text-sm cursor-pointer px-3 py-1',
              selectedNode?.id === profile.id
                ? 'bg-[#de219a]'
                : selectedNode?.neighborIds?.has(profile.id as string)
                ? 'bg-[#4D3B51] hover:bg-[rgba(255,255,255,0.1)]'
                : 'hover:bg-[rgba(255,255,255,0.1)]',
            )}
            role="button"
            data-set={selectedNode?.neighborIds?.has(profile.id as string)}
            onClick={() => {
              onSelectNode?.(
                selectedNode?.id === profile.id
                  ? undefined
                  : (profile as SelectedProfileNode),
              )
            }}
          >
            <span className="text-white">
              <b className="font-bold w-[40px] inline-block">{`#${
                index + 1
              }`}</b>
              {` -  `}
              {profile.parsedProfile?.plain}
            </span>
            <b className="font-bold">{`${profile.volumePercent}%`}</b>
          </li>
        ))}
      </ul>
    </div>
  )
}
