import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type { ElementRef, ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react"
import clsx from "clsx";
import IconChevron from "../icons/components/icon-chevron";


const Accordion = AccordionPrimitive.Root

const AccordionItem = forwardRef<
    ElementRef<typeof AccordionPrimitive.Item>,
    ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>((props, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        {...props}
    />
))
AccordionItem.displayName = "AccordionItem"

interface AccordionTriggerProps extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  className?: string
  showIcon?: boolean
  wrapperClassName?: string
}

const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ children, className, wrapperClassName, showIcon=true, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={clsx(
        "flex-1 flex font-medium text-sm items-center justify-between [&[data-state=open]>#chevron]:rotate-180 gap-[14px] py-[10px]",
        wrapperClassName
      )}
      ref={ref}
      {...props}
    >
      <span className={clsx("flex flex-1", className)}>
        {children}
      </span>
      {showIcon ? <IconChevron className="text-neutral-500 shrink-0 transition-transform duration-200" fontSize="18" id="chevron"/> : null}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName


interface AccordionContentProps extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  wrapperClassName?: string
}

const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ children, className, wrapperClassName, ...props }, ref) => (
  <AccordionPrimitive.Content
    className={clsx(
      "text-sm",
      wrapperClassName
    )}
    ref={ref}
    {...props}
  >
    <div
      className={clsx(
        "pb-[10px] pt-0",
        className
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName



export { Accordion, AccordionItem, AccordionContent, AccordionTrigger}