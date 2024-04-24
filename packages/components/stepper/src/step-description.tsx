import { PropsWithChildren, forwardRef } from 'react'
import { stepper } from '@mochi-ui/theme'
import { Typography } from '@mochi-ui/typography'

const { stepDescriptionClsx } = stepper

interface StepDescriptionProps extends PropsWithChildren {
  className?: string
}

const StepDescription = forwardRef<HTMLDivElement, StepDescriptionProps>(
  (props, ref) => {
    const { className, ...restProps } = props

    return (
      <div ref={ref}>
        <Typography
          level="p5"
          className={stepDescriptionClsx({ className })}
          {...restProps}
        />
      </div>
    )
  },
)

StepDescription.displayName = 'StepDescription'

export { StepDescription, type StepDescriptionProps }
