import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type { ElementRef, ComponentPropsWithoutRef, ReactNode } from 'react'
import { forwardRef } from 'react'
import { IconChevronDown } from '@consolelabs/icons'
import { accordion } from '@consolelabs/theme'

const {
  accordionRootClsx,
  accordionTriggerIconClsx,
  accordionTriggerLeftIconClsx,
  accordionHeaderClsx,
  accordionTriggerWrapperClsx,
  accordionTriggerClsx,
  accordionContentWrapperClsx,
  accordionContentClsx,
} = accordion

const Accordion = forwardRef<
  ElementRef<typeof AccordionPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root
    className={accordionRootClsx({ className })}
    ref={ref}
    {...props}
  />
))

Accordion.displayName = AccordionPrimitive.Root.displayName

const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item className={className} ref={ref} {...props} />
))
AccordionItem.displayName = 'AccordionItem'

interface AccordionTriggerProps
  extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  className?: string
  rightIcon?: ReactNode
  wrapperClassName?: string
  hasPadding?: boolean
  leftIcon?: ReactNode
}

const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>((props, ref) => {
  const {
    children,
    className,
    wrapperClassName,
    rightIcon,
    leftIcon,
    ...restProps
  } = props

  const iconStyle = accordionTriggerIconClsx({})
  const renderRightIcon = (
    <span className={iconStyle} id={!rightIcon ? 'chevron' : undefined}>
      {!rightIcon ? <IconChevronDown /> : rightIcon}
    </span>
  )

  const renderLeftIcon = leftIcon ? (
    <span className={accordionTriggerLeftIconClsx({})}>{leftIcon}</span>
  ) : null

  return (
    <AccordionPrimitive.Header className={accordionHeaderClsx({})}>
      <AccordionPrimitive.Trigger
        className={accordionTriggerWrapperClsx({ className: wrapperClassName })}
        ref={ref}
        {...restProps}
      >
        {renderLeftIcon}
        <span className={accordionTriggerClsx({ className })}>{children}</span>
        {renderRightIcon}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

interface AccordionContentProps
  extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  wrapperClassName?: string
  hasPadding?: boolean
}

const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>((props, ref) => {
  const {
    children,
    className,
    wrapperClassName,
    hasPadding = false,
    ...restProps
  } = props
  return (
    <AccordionPrimitive.Content
      className={accordionContentWrapperClsx({ className: wrapperClassName })}
      ref={ref}
      {...restProps}
    >
      <div className={accordionContentClsx({ className, hasPadding })}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
})

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionContent, AccordionTrigger }
