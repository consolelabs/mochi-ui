import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type { ElementRef, ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react"
import clsx from "clsx";
import IconChevron from "../icons/components/icon-chevron";

const Accordion = forwardRef<
  ElementRef<typeof AccordionPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({className, ...props}, ref) => (
  <AccordionPrimitive.Root
    className={clsx(
      "ui-p-2 ui-space-y-1 ui-rounded-lg ui-shadow-md",
      className
    )}
    ref={ref}
    {...props}
  />
))

Accordion.displayName = AccordionPrimitive.Root.displayName

const AccordionItem = forwardRef<
    ElementRef<typeof AccordionPrimitive.Item>,
    ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({className, ...props}, ref) => (
    <AccordionPrimitive.Item
      className={clsx(
        "",
        className
      )}
        ref={ref}
        {...props}
    />
))
AccordionItem.displayName = "AccordionItem"

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
>((props , ref) => {

  const { children, className, wrapperClassName, rightIcon, leftIcon, ...restProps} = props

  const iconStyle = "ui-text-neutral-500 ui-shrink-0 ui-transition-transform ui-duration-200 ui-text-base"
  const renderRightIcon = (
    <span className={iconStyle} id={!rightIcon ? "ui-chevron": undefined}>
      {!rightIcon ? (
        <IconChevron />
      ): rightIcon}
    </span>
  )

  const renderLeftIcon = leftIcon ? (
    <span className="ui-text-xl">
      {leftIcon}
    </span>
  ): null

  return (
    <AccordionPrimitive.Header className="ui-flex">
      <AccordionPrimitive.Trigger
        className={clsx(
          "ui-flex-1 ui-flex ui-font-medium ui-text-sm ui-items-center ui-justify-between [&[data-state=open]>#ui-chevron]:ui-rotate-180 ui-gap-3 ui-p-2",
          wrapperClassName
        )}
        ref={ref}
        {...restProps}
      >
        {renderLeftIcon}
        <span className={clsx("ui-flex ui-flex-1", className)}>
          {children}
        </span>
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
  const { children, className, wrapperClassName, hasPadding=false, ...restProps } = props
  return (
    <AccordionPrimitive.Content
      className={clsx('ui-text-sm', wrapperClassName)}
      ref={ref}
      {...restProps}
    >
      <div
        className={clsx(
          "ui-py-2", {
            "ui-px-10": hasPadding,
            "ui-px-2 ": !hasPadding
          },
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
})

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionContent, AccordionTrigger }
