import { CaptionProps, useNavigation } from 'react-day-picker'
import { ReactNode } from 'react'
import format from 'date-fns/format'
import { cva } from 'class-variance-authority'
import { IconChevronLeft, IconChevronRight } from '@consolelabs/icons'

type CalendarCaptionProps = CaptionProps & {
  formater?: (_: Date) => ReactNode
  alignCaptionCenter?: boolean
}

const CalendarCaption = (props: CalendarCaptionProps) => {
  const { formater, alignCaptionCenter, displayMonth } = props
  const { goToMonth, nextMonth, previousMonth } = useNavigation()

  const isDisplayNavButton = true
  // NOTE: Hide nav button if layout is dropdown only
  // captionLayout === 'buttons' || captionLayout === 'dropdown-buttons'

  const renderLabel = (
    <h3 className="text-sm font-medium flex items-center gap-1 mb-3">
      {formater?.(displayMonth) ?? (
        <>
          <span>{format(displayMonth, 'MMMMMMMM')}</span>
          <span>{format(displayMonth, 'yyyy')}</span>
        </>
      )}
    </h3>
  )

  const renderLeftButton = isDisplayNavButton && (
    <button onClick={() => previousMonth && goToMonth(previousMonth)}>
      <IconChevronLeft className="text-xl" />
    </button>
  )

  const renderRightButton = isDisplayNavButton && (
    <button onClick={() => nextMonth && goToMonth(nextMonth)}>
      <IconChevronRight className="text-xl" />
    </button>
  )

  const renderCaptionLayout = alignCaptionCenter ? (
    <div className="w-full flex justify-between">
      {renderLeftButton}
      {renderLabel}
      {renderRightButton}
    </div>
  ) : (
    <div className="w-full flex justify-between">
      {renderLabel}
      <div className="flex gap-2">
        {renderLeftButton}
        {renderRightButton}
      </div>
    </div>
  )

  return <div className="w-full h-fit mb-3">{renderCaptionLayout}</div>
}

export { CalendarCaption }
export type { CalendarCaptionProps }
