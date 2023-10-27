'use client'
import { GetServerSideProps } from 'next'
import { Layout } from '~app/layout'
import { HOME_URL } from '~envs'
import { SEO } from '~app/layout/seo'
import { API } from '~constants/api'
import dynamic from 'next/dynamic'
import { TransactionGraphData, TransactionEdge } from '~types/mochi-schema'
import { GraphData } from 'react-force-graph-2d'
import { useMemo, useState } from 'react'
import { ProfileBar } from '~components/TipNetwork/ProfileBar'
import UI, { Platform } from '@consolelabs/mochi-ui'
import { SelectedProfile } from '~components/TipNetwork/SelectedProfile'
import {
  ProfileNode,
  SelectedProfileNode,
  TipNetworkData,
} from '~types/tip-graph'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { NodeObject } from 'react-force-graph-2d'

const TipNetworkGraph = dynamic(
  () =>
    import('~components/TipNetwork/Graph').then((mod) => mod.TipNetworkGraph),
  {
    ssr: false,
  },
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const transactionGraphData = await API.MOCHI_PAY.query(ctx.query)
    .get(`/transactions/graph`)
    .notFound(() => null)
    .json((r: any) => r.data)

  return {
    props: {
      data: transactionGraphData,
    },
  }
}

export interface TipNetworkProps {
  data: TransactionGraphData
}

export default function TipNetwork({ data }: TipNetworkProps) {
  const [selectedNode, setSelectedNode] = useState<
    SelectedProfileNode | undefined
  >(undefined)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const totalVolume = data.nodes.reduce(
    (acc, node) => acc + node.total_volume,
    0,
  )

  const transformedNodes = data.nodes
    .map((node): ProfileNode => {
      const neighborIds = new Set<string>()

      data.edges.forEach((edge) => {
        const { from_profile_id, to_profile_id } = edge
        if (from_profile_id === node.profile_id) {
          neighborIds.add(to_profile_id)
        }

        if (to_profile_id === node.profile_id) {
          neighborIds.add(from_profile_id)
        }
      })

      const parsedProfile = UI.render(Platform.Web, node.profile)

      return {
        id: node.profile_id,
        profile: node.profile,
        parsedProfile: parsedProfile[0],
        totalVolume: node.total_volume,
        neighborIds: neighborIds,
        volumePercent: Number(
          ((node.total_volume * 100) / totalVolume).toFixed(2),
        ),
      }
    })
    .sort((a, b) => b.totalVolume - a.totalVolume)
    .map((node, index): ProfileNode => ({ ...node, volumeRank: index + 1 }))

  const graphData: GraphData = {
    nodes: transformedNodes,
    links: data.edges.map((edge) => ({
      source: edge.from_profile_id,
      target: edge.to_profile_id,
      totalVolume: edge.total_volume,
    })),
  }

  const tipNetWorkData = useMemo(() => {
    if (!selectedNode) {
      return []
    }
    return data.edges
      .filter(({ from_profile_id, to_profile_id }: TransactionEdge) => {
        return [from_profile_id, to_profile_id].includes(selectedNode.id)
      })
      .map(
        ({
          from_profile_id,
          to_profile_id,
          total_volume,
          spend,
          receive,
        }: TransactionEdge): TipNetworkData => {
          const otherProfileId =
            from_profile_id === selectedNode.id
              ? to_profile_id
              : from_profile_id
          const otherProfile = transformedNodes.find(
            (node) => node.id === otherProfileId,
          )
          const spendVolume =
            from_profile_id === selectedNode.id ? spend : receive

          const receiveVolume =
            from_profile_id === selectedNode.id ? receive : spend
          return {
            targetProfile: otherProfile,
            spendVolume,
            receiveVolume,
            totalVolume: total_volume,
          }
        },
      )
      .sort((a, b) => b.totalVolume - a.totalVolume)
  }, [data.edges, transformedNodes, selectedNode])

  return (
    <Layout>
      <SEO
        title={`Tip network from server`}
        description={`Tip network from server`}
        url={`${HOME_URL}/tip-network/`}
      />
      <div className="flex relative w-full h-full">
        <TipNetworkGraph
          graphData={graphData}
          selectedNode={selectedNode}
          onNodeClick={(node: NodeObject) => {
            setSelectedNode(node as SelectedProfileNode)
          }}
        />
        {selectedNode && (
          <SelectedProfile
            selectedNode={selectedNode}
            onClose={() => setSelectedNode(undefined)}
            onShowNetwork={isOpen ? onClose : onOpen}
            showNetwork={isOpen}
            tipNetworkData={tipNetWorkData}
          />
        )}
        <ProfileBar
          onSelectNode={(val) => setSelectedNode(val as SelectedProfileNode)}
          selectedNode={selectedNode}
          graphData={graphData}
          className="overflow-auto absolute top-0 z-10 right-[15px]"
        />
      </div>
    </Layout>
  )
}
