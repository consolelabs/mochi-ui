import QRCodeUtil from 'qrcode'
import React, { ReactElement, useMemo } from 'react'

const generateMatrix = (
  value: string,
  errorCorrectionLevel: QRCodeUtil.QRCodeErrorCorrectionLevel,
) => {
  const arr = Array.prototype.slice.call(
    QRCodeUtil.create(value, { errorCorrectionLevel }).modules.data,
    0,
  )
  const sqrt = Math.sqrt(arr.length)
  return arr.reduce(
    (rows, key, index) =>
      (index % sqrt === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    [],
  )
}

const QR_SIZE = 300
const LOGO_SIZE = 64
const LOGO_MARGIN = 8

type Props = {
  ecl?: QRCodeUtil.QRCodeErrorCorrectionLevel
  logoBackground?: string
  logoUrl?: string
  logoPadding?: number
  logoSize?: number
  qrSize?: number
  uri: string
  onCopyQR?: (dataURI: string) => void
  caption?: string
}

export const QRCode = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      ecl = 'H',
      logoBackground,
      logoPadding = 7,
      logoUrl,
      qrSize = QR_SIZE,
      logoSize: _logoSize = LOGO_SIZE,
      uri,
      caption,
    }: Props,
    ref,
  ) => {
    const size = qrSize - LOGO_MARGIN * 2
    const logoSize =
      qrSize <= 200 ? _logoSize / 3 : qrSize <= 250 ? _logoSize / 2 : _logoSize

    const dots = useMemo(() => {
      const dots: ReactElement[] = []
      const matrix = generateMatrix(uri, ecl)
      const cellSize = size / matrix.length
      const qrList = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ]

      qrList.forEach(({ x, y }) => {
        const x1 = (matrix.length - 7) * cellSize * x
        const y1 = (matrix.length - 7) * cellSize * y
        for (let i = 0; i < 3; i++) {
          dots.push(
            <rect
              fill={i % 2 !== 0 ? 'white' : 'black'}
              height={cellSize * (7 - i * 2)}
              key={`${i}-${x}-${y}`}
              rx={(i - 2) * -5 + (i === 0 ? 2 : 0)} // calculated border radius for corner squares
              ry={(i - 2) * -5 + (i === 0 ? 2 : 0)} // calculated border radius for corner squares
              width={cellSize * (7 - i * 2)}
              x={x1 + cellSize * i}
              y={y1 + cellSize * i}
            />,
          )
        }
      })

      const clearArenaSize = Math.floor(
        (logoSize + 25 + logoPadding) / cellSize,
      )
      const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2
      const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1

      const nameMiddleStart = matrix.length / 1.2 - clearArenaSize / 3
      const nameMiddleEnd = matrix.length / 1.2 + clearArenaSize / 3.5

      matrix.forEach((row: QRCodeUtil.QRCode[], i: number) => {
        row.forEach((_: any, j: number) => {
          if (matrix[i][j]) {
            if (
              !(
                (i < 7 && j < 7) ||
                (i > matrix.length - 8 && j < 7) ||
                (i < 7 && j > matrix.length - 8)
              )
            ) {
              if (
                !(
                  i > matrixMiddleStart &&
                  i < matrixMiddleEnd &&
                  j > matrixMiddleStart &&
                  j < matrixMiddleEnd
                ) &&
                (!caption ||
                  !(
                    i > nameMiddleStart - 22 &&
                    i < nameMiddleEnd + 4 &&
                    j > nameMiddleStart + 6.25 &&
                    j < nameMiddleEnd + 4
                  ))
              ) {
                dots.push(
                  <circle
                    cx={i * cellSize + cellSize / 2}
                    cy={j * cellSize + cellSize / 2}
                    fill="black"
                    key={`circle-${i}-${j}`}
                    r={cellSize / 3} // calculate size of single dots
                  />,
                )
              }
            }
          }
        })
      })

      return dots
    }, [caption, ecl, logoPadding, logoSize, size, uri])

    return (
      <div
        ref={ref}
        className="relative flex-shrink-0 p-4 w-min bg-white rounded-2xl border border-theme h-min"
      >
        <div className="flex relative w-full h-full select-none">
          <div
            style={{
              width: logoSize,
              height: logoSize,
              background: logoBackground,
            }}
            className="flex overflow-hidden absolute top-1/2 left-1/2 justify-center items-center rounded-lg -translate-x-1/2 -translate-y-1/2 aspect-square"
          >
            <img
              className="object-cover"
              height={logoSize}
              src={logoUrl}
              width={logoSize}
              alt="Logo"
            />
          </div>
          <svg height={size} style={{ all: 'revert' }} width={size}>
            {dots}
          </svg>
        </div>
        {caption && (
          <p className="absolute bottom-3.5 right-6 pl-24 w-full text-base text-right whitespace-nowrap sm:text-xl truncate">
            {caption}
          </p>
        )}
      </div>
    )
  },
)
