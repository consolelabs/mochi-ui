import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type { ElementRef, ComponentPropsWithoutRef, ReactNode } from 'react'
import { forwardRef } from 'react'
import clsx from 'clsx'
import IconChevron from '../icons/components/icon-chevron'

const Accordion = forwardRef<
  ElementRef<typeof AccordionPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root
    className={clsx('p-2 space-y-1 rounded-lg shadow-md', className)}
    ref={ref}
    {...props}
  />
))

Accordion.displayName = AccordionPrimitive.Root.displayName

const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    className={clsx('', className)}
    ref={ref}
    {...props}
  />
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

  const iconStyle =
    'text-neutral-500 shrink-0 transition-transform duration-200 text-base'
  const renderRightIcon = (
    <span className={iconStyle} id={!rightIcon ? 'chevron' : undefined}>
      {!rightIcon ? <IconChevron /> : rightIcon}
    </span>
  )

  const renderLeftIcon = leftIcon ? (
    <span className="text-xl">{leftIcon}</span>
  ) : null

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={clsx(
          'flex-1 flex font-medium text-sm items-center justify-between [&[data-state=open]>#chevron]:rotate-180 gap-3 p-2',
          wrapperClassName,
        )}
        ref={ref}
        {...restProps}
      >
        {renderLeftIcon}
        <span className={clsx('flex flex-1', className)}>{children}</span>
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
      className={clsx('text-sm', wrapperClassName)}
      ref={ref}
      {...restProps}
    >
      <div
        className={clsx(
          'py-2',
          {
            'px-10': hasPadding,
            'px-2 ': !hasPadding,
          },
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
})

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionContent, AccordionTrigger }
