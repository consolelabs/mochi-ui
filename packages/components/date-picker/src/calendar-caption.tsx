import { CaptionProps, useNavigation } from 'react-day-picker'
import { ReactNode } from 'react'
import format from 'date-fns/format'
import { IconChevronLeft, IconChevronRight } from '@consolelabs/icons'
import { dayPickerCaption } from '@consolelabs/theme'

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
    <h3 className={dayPickerCaption.label}>
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
      <IconChevronLeft className={dayPickerCaption.icon} />
    </button>
  )

  const renderRightButton = isDisplayNavButton && (
    <button onClick={() => nextMonth && goToMonth(nextMonth)}>
      <IconChevronRight className={dayPickerCaption.icon} />
    </button>
  )

  const renderCaptionLayout = alignCaptionCenter ? (
    <div className={dayPickerCaption.layout}>
      {renderLeftButton}
      {renderLabel}
      {renderRightButton}
    </div>
  ) : (
    <div className={dayPickerCaption.layout}>
      {renderLabel}
      <div className={dayPickerCaption.buttonGroup}>
        {renderLeftButton}
        {renderRightButton}
      </div>
    </div>
  )

  return <div className={dayPickerCaption.wrapper}>{renderCaptionLayout}</div>
}

export { CalendarCaption }
export type { CalendarCaptionProps }
