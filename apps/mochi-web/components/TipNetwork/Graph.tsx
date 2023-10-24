import { useCallback, useEffect, useState } from 'react'
import ForceGraph2D, {
  ForceGraphProps,
  GraphData,
  LinkObject,
  NodeObject,
} from 'react-force-graph-2d'

export interface TipNetworkGraphProps {
  graphData: GraphData
  selectedNode?: NodeObject
}

const VOLUME_STEP = 3

export const TipNetworkGraph = ({
  graphData,
  selectedNode,
  ...rest
}: ForceGraphProps & TipNetworkGraphProps) => {
  const [highlightNodeIds, setHighlightNodeIds] = useState(new Set())
  const [highlightLink, setHighlightLink] = useState<LinkObject | null>(null)
  const [hoverNode, setHoverNode] = useState<NodeObject | null>(null)
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth)
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight)

  const volumes = graphData.nodes.map((node) => node.totalVolume)
  const maxVolume = Math.max(...volumes)
  const minVolume = Math.min(...volumes)
  const radiusStep = Math.round((maxVolume - minVolume) / VOLUME_STEP)
  const activeNode = hoverNode || selectedNode

  const updateHighlight = useCallback(() => {
    setHighlightNodeIds(highlightNodeIds)
  }, [highlightNodeIds])

  const paint = useCallback(
    (
      node: NodeObject,
      ctx: CanvasRenderingContext2D,
      strokeType: string = '#b3eb53',
      fillStyle: string = 'rgba(179, 235, 83, 0.2)',
    ) => {
      const { x, y, totalVolume } = node
      const radius = totalVolume ? Math.ceil(totalVolume / radiusStep) * 5 : 5
      ctx.strokeStyle = strokeType
      ctx.fillStyle = fillStyle
      ctx.beginPath()
      ctx.arc(x || 0, y || 0, radius, 0, 2 * Math.PI, false)
      ctx.stroke()
      ctx.fill()
    },
    [radiusStep],
  )

  const nodePaint = useCallback(
    (node: NodeObject, ctx: CanvasRenderingContext2D) => {
      if (highlightLink) {
        if (
          (highlightLink.source as NodeObject).id === node.id ||
          (highlightLink.target as NodeObject).id === node.id
        ) {
          paint(node, ctx, '#FBE9E8', 'rgba(232, 139, 136, 0.8)')
        } else {
          paint(node, ctx, 'rgba(179, 235, 83, 0.2)', 'rgba(179, 235, 83, 0.1)')
        }
        return
      }

      // const highlightIds =
      //   highlightNodeIds?.size > 0
      //     ? highlightNodeIds
      //     : selectedNode
      //     ? selectedNode.neighborIds
      //     : new Set()

      const highlightIds = selectedNode
        ? selectedNode.neighborIds
        : highlightNodeIds?.size > 0
        ? highlightNodeIds
        : new Set()

      if ([selectedNode?.id, hoverNode?.id].includes(node.id)) {
        paint(node, ctx, '#FBE9E8', 'rgba(232, 139, 136, 0.8)')
      } else if (highlightIds?.has(node.id)) {
        paint(node, ctx, '#E88B88', 'rgba(244, 201, 200, 0.4)')
      } else {
        if (selectedNode) {
          paint(node, ctx, 'rgba(179, 235, 83, 0.2)', 'rgba(179, 235, 83, 0.1)')
        } else {
          paint(node, ctx, '#b3eb53', 'rgba(179, 235, 83, 0.2)')
        }
      }
    },
    [highlightNodeIds, paint, selectedNode, hoverNode, highlightLink],
  )

  const handleNodeHover = (node: NodeObject | null) => {
    highlightNodeIds.clear()
    setHighlightLink(null)
    if (node) {
      highlightNodeIds.add(node.id)
      // ;(node?.neighborIds || []).forEach((neighborId: string) =>
      //   highlightNodeIds.add(neighborId),
      // )
    }

    setHoverNode(node || null)
    updateHighlight()
  }

  // const handleLinkHover = useCallback(
  //   (link: LinkObject | null) => {
  //     highlightNodeIds.clear()
  //     if (link) {
  //       highlightNodeIds.add((link.source as NodeObject).id)
  //       highlightNodeIds.add((link.target as NodeObject).id)
  //     }
  //     setHighlightLink(link)
  //     updateHighlight()
  //   },
  //   [highlightNodeIds, updateHighlight],
  // )

  const isHighlightLink = useCallback(
    (link: LinkObject) => {
      const source = link.source as NodeObject
      const target = link.target as NodeObject
      // if (hoverNode) {
      //   return [source.id, target.id].includes(hoverNode.id)
      // }
      if (selectedNode && highlightLink === null) {
        return [source.id, target.id].includes(selectedNode.id)
      }
      return (
        highlightNodeIds.has(source.id) && highlightNodeIds.has(target.id ?? '')
      )
    },
    [highlightNodeIds, selectedNode, highlightLink],
  )

  const handleLinkColor = useCallback(
    (link: LinkObject) => {
      if (isHighlightLink(link)) {
        return 'rgba(232, 139, 136, 0.8)'
      }
      if (!selectedNode && highlightLink === null) {
        return 'rgba(255,255,255,0.8)'
      }

      return 'rgba(255,255,255,0)'
    },
    [selectedNode, highlightLink, isHighlightLink],
  )

  useEffect(() => {
    function updateSize() {
      setDisplayWidth(window.innerWidth)
      setDisplayHeight(window.innerHeight)
    }
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])
  return (
    <ForceGraph2D
      {...rest}
      width={displayWidth}
      height={displayHeight - 65}
      graphData={graphData}
      nodeColor="#b3eb53"
      nodeId="id"
      nodeLabel={(node) => {
        return `${node.parsedProfile?.plain ?? node.id}`
      }}
      nodeRelSize={10}
      linkColor={handleLinkColor}
      backgroundColor="#000000"
      autoPauseRedraw={true}
      linkWidth={(link) => (isHighlightLink(link) ? 2 : 0.5)}
      linkDirectionalParticleColor={() => 'rgba(255,255,255,0.8)'}
      linkDirectionalParticles={3}
      linkDirectionalParticleWidth={(link) => (isHighlightLink(link) ? 2 : 0)}
      nodeCanvasObject={nodePaint}
      onNodeHover={handleNodeHover}
      onLinkHover={() => false}
    />
  )
}
