import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type { ElementRef, ComponentPropsWithoutRef, ReactNode } from 'react'
import { forwardRef } from 'react'
import { ChevronDownLine } from '@mochi-ui/icons'
import { accordion } from '@mochi-ui/theme'

const {
  accordionRootClsx,
  accordionTriggerIconClsx,
  accordionTriggerLeftIconClsx,
  accordionHeaderClsx,
  accordionTriggerWrapperClsx,
  accordionTriggerClsx,
  accordionContentClsx,
} = accordion

type AccordionProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>

const Accordion = forwardRef<
  ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root
    className={accordionRootClsx({ className })}
    ref={ref}
    {...props}
  />
))

Accordion.displayName = AccordionPrimitive.Root.displayName

type AccordionItemProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
>

const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item className={className} ref={ref} {...props} />
))
AccordionItem.displayName = AccordionPrimitive.Item.displayName

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
    asChild,
    ...restProps
  } = props

  const iconStyle = accordionTriggerIconClsx()
  const renderRightIcon = (
    <span className={iconStyle} id={!rightIcon ? 'chevron' : undefined}>
      {!rightIcon ? <ChevronDownLine /> : rightIcon}
    </span>
  )

  const renderLeftIcon = leftIcon ? (
    <span className={accordionTriggerLeftIconClsx()}>{leftIcon}</span>
  ) : null

  return (
    <AccordionPrimitive.Header className={accordionHeaderClsx()}>
      <AccordionPrimitive.Trigger
        className={accordionTriggerWrapperClsx({ className: wrapperClassName })}
        ref={ref}
        asChild={asChild}
        {...restProps}
      >
        {asChild ? (
          children
        ) : (
          <>
            {renderLeftIcon}
            <span className={accordionTriggerClsx({ className })}>
              {children}
            </span>
            {renderRightIcon}
          </>
        )}
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
  const { children, className, hasPadding = false, ...restProps } = props
  return (
    <AccordionPrimitive.Content
      className={accordionContentClsx({
        className,
        hasPadding,
      })}
      ref={ref}
      {...restProps}
    >
      {children}
    </AccordionPrimitive.Content>
  )
})

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionContentProps,
  type AccordionTriggerProps,
}
