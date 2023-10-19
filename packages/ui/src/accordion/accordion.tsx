import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type { ElementRef, ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import clsx from 'clsx'
import IconChevron from '../icons/components/icon-chevron'

const Accordion = AccordionPrimitive.Root

const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>((props, ref) => <AccordionPrimitive.Item ref={ref} {...props} />)
AccordionItem.displayName = 'AccordionItem'

interface AccordionTriggerProps
  extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  className?: string
  showIcon?: boolean
  wrapperClassName?: string
}

const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(
  (
    { children, className, wrapperClassName, showIcon = true, ...props },
    ref,
  ) => (
    <AccordionPrimitive.Header className="ui-flex">
      <AccordionPrimitive.Trigger
        className={clsx(
          'ui-flex-1 ui-flex ui-font-medium ui-text-sm ui-items-center ui-justify-between [&[data-state=open]>#chevron]:ui-rotate-180 ui-gap-3 ui-py-3',
          wrapperClassName,
        )}
        ref={ref}
        {...props}
      >
        <span className={clsx('ui-flex ui-flex-1', className)}>{children}</span>
        {showIcon ? (
          <IconChevron
            className="ui-text-base ui-transition-transform ui-duration-200 ui-text-neutral-500 ui-shrink-0"
            id="chevron"
          />
        ) : null}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
)

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

interface AccordionContentProps
  extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  wrapperClassName?: string
}

const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ children, className, wrapperClassName, ...props }, ref) => (
  <AccordionPrimitive.Content
    className={clsx('ui-text-sm', wrapperClassName)}
    ref={ref}
    {...props}
  >
    <div className={clsx('ui-pb-3 ui-pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionContent, AccordionTrigger }
