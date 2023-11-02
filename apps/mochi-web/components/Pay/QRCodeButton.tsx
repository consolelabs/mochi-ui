import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import Button from '~cpn/base/button'
import Modal from '~components/Modal'
import { QRCode as QRCodeGenerator } from '~components/Wallet/QRCode'
import { useMedia } from '@dwarvesf/react-hooks'
import { useEffect, useRef, useState } from 'react'
import domtoimage from 'dom-to-image'
import createScrollSnap from 'scroll-snap'
import VirtualList, { ScrollDirection } from 'react-tiny-virtual-list'

type Props = {
  links: string[]
  image?: string
  user?: string
  children?: React.ReactNode
}

function Inner({ setIdx, links, refs, image, qrSize }: any) {
  const ref = useRef<HTMLDivElement>(null)
  const qrOuterSize = useMedia(
    ['(min-width: 640px)', '(min-width: 0px)'],
    [318, 268],
    268,
  )

  useEffect(() => {
    const ele = document
      .getElementsByClassName('qr-code-scroll-container')
      .item(0) as HTMLElement
    if (!ele) return () => {}
    const { bind, unbind } = createScrollSnap(
      ele,
      {
        snapDestinationX: '100%',
      },
      () => {
        if (ref.current) {
          const scrollLeft = ref.current?.scrollLeft
          setIdx(Math.floor(scrollLeft / (qrOuterSize + 10)) - 1)
        }
      },
    )
    bind()
    return () => unbind()
  }, [qrOuterSize, setIdx])

  return (
    <VirtualList
      className="qr-code-scroll-container"
      height={qrOuterSize}
      width={qrOuterSize + 10}
      itemCount={links.length}
      itemSize={qrOuterSize + 10}
      scrollDirection={ScrollDirection.HORIZONTAL}
      renderItem={({ index, style }) => {
        return (
          <div style={style}>
            <QRCodeGenerator
              ref={(e) => {
                refs.current[index] = e
              }}
              logoBackground="white"
              logoUrl={image ?? '/assets/mochi-gray.png'}
              uri={links[index]}
              qrSize={qrSize}
            />
          </div>
        )
      }}
    ></VirtualList>
  )
}

export default function QRCodeInfo({ children, links, image }: Props) {
  const {
    isOpen: justCopied,
    onOpen: copied,
    onClose: clearCopied,
  } = useDisclosure()
  const [imgBlob, setImgBlob] = useState<Blob>()
  const [idx, setIdx] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const qrSize = useMedia(
    ['(min-width: 640px)', '(min-width: 0px)'],
    [300, 250],
    250,
  )

  if (!links.filter(Boolean).length) return null

  return (
    <>
      <Button size="sm" className="flex-1" onClick={onOpen}>
        <Icon
          icon="fluent:qr-code-28-filled"
          className="w-4 h-4 text-dashboard-gray-4"
        />
        {children ?? <div className="whitespace-nowrap">QR Code</div>}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-y-1 pb-2 w-full max-w-xs bg-white rounded-lg sm:max-w-md p-[14px]">
          <div className="text-center">
            <div className="font-bold">Pay Link&#39;s QR Code</div>
            <div className="text-xs font-medium mt-[2px] text-dashboard-gray-8">
              Scan to open directly to this pay link:
            </div>
          </div>

          <Button
            onClick={async () => {
              const ref = refs.current[idx]
              if (!ref) return
              let blob = imgBlob
              if (!blob) {
                blob = await domtoimage.toBlob(ref, {
                  bgcolor: 'white',
                })
                setImgBlob(blob)
              }
              await navigator.clipboard
                .write([
                  new ClipboardItem({
                    'image/png': blob,
                  }),
                ])
                .then(copied)
                .then(setTimeout.bind(window, clearCopied, 500))
            }}
            size="sm"
            className="my-2 mx-auto"
          >
            {justCopied ? 'Copied!' : 'Copy QR Code'}
          </Button>
          <Inner
            setIdx={setIdx}
            refs={refs}
            links={links}
            qrSize={qrSize}
            image={image}
          />
        </div>
      </Modal>
    </>
  )
}
