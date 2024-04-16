import { PropsWithChildren, forwardRef } from 'react'
import { stepper } from '@mochi-ui/theme'
import { Typography } from '@mochi-ui/typography'

const { stepTitleClsx } = stepper

interface StepTitleProps extends PropsWithChildren {
  className?: string
}

const StepTitle = forwardRef<HTMLDivElement, StepTitleProps>((props, ref) => {
  const { className, ...restProps } = props

  return (
    <div ref={ref}>
      <Typography
        level="h8"
        className={stepTitleClsx({ className })}
        {...restProps}
      />
    </div>
  )
})

StepTitle.displayName = 'StepTitle'

export { StepTitle, type StepTitleProps }
