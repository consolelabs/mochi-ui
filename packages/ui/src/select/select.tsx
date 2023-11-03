import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react"
import * as SelectPrimitive from '@radix-ui/react-select'
import clsx from "clsx";
import { IconCheck, IconChevron } from "../icons";
import { type SelectProps, type SelectItemProps, type SelectItemRef, type SelectTriggerRef, type SelectTriggerProps, type SelectGroupRef, SelectGroupProps} from "./type";
import { getIconWrapperStyle, getSelectItemStyle } from "./utils";

function Select(props: SelectProps) {
  const { onChange } = props
  return (
    // Root has no ref
    <SelectPrimitive.Root
      onValueChange={onChange}
      {...props}
    />
  )
}
Select.displayName = SelectPrimitive.Root.displayName

const SelectGroup = forwardRef<
  SelectGroupRef,
  SelectGroupProps
>(({className, ...props}, ref) => {
  return (
    <SelectPrimitive.Group
      className={clsx(
        "space-y-1",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
SelectGroup.displayName = SelectPrimitive.Group.displayName

const SelectValue = SelectPrimitive.Value

const SelectTrigger = forwardRef<
  SelectTriggerRef,
  SelectTriggerProps
>((props, ref) => {
  const { children, disabled, asChild, className, hideRightIcon, rightIcon, leftIcon } = props
  return (
    <SelectPrimitive.Trigger
      asChild={asChild}
      className={getSelectItemStyle({
        className,
        isTrigger: true,
        disabled
      })}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {asChild? children: (
        <>
      {leftIcon ? (
        <SelectPrimitive.Icon asChild
          className={getIconWrapperStyle()}
        >
          {leftIcon}
        </SelectPrimitive.Icon>
      ) : null}
      {children}
      {hideRightIcon ? null : (
        <SelectPrimitive.Icon asChild
          className={getIconWrapperStyle({isRightIcon: true})}
        >
          {rightIcon ?? <IconChevron className="text-sm"/>}
        </SelectPrimitive.Icon>
      )}
        </>
      )}
    </SelectPrimitive.Trigger>
  )}
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={clsx(
        "relative z-50 w-fit bg-white",
        "rounded-lg shadow-md",
        "space-y-1",
        "p-3",
        className
      )}
      position={position}
      ref={ref}
      sideOffset={8}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={clsx(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    className={clsx("text-[10px] uppercase font-bold text-neutral-500", className)}
    ref={ref}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = forwardRef<
  SelectItemRef,
  SelectItemProps
>((props, ref) => {
  const {
    children,
    className,
    disabled,
    leftIcon,
    rightIcon,
    extraRight,
    useIndicator,
    subTitle
  } = props

  const RightIconWrapper = useIndicator ? SelectPrimitive.ItemIndicator: 'span'

  return (
    <SelectPrimitive.Item
      className={getSelectItemStyle({
        className,
        disabled,
      })}
      ref={ref}
      {...props}
    >
      {leftIcon ? <span className={getIconWrapperStyle()}>
          {leftIcon}
        </span> : null}
      <div className="flex-1 flex flex-col items-start">
        <SelectPrimitive.ItemText
        >
          {children}
        </SelectPrimitive.ItemText>
        {subTitle ? <span className="text-neutral-600 text-xs">
            {subTitle}
          </span> : null}
      </div>
      {extraRight}
      {rightIcon || useIndicator && (
        <RightIconWrapper className={getIconWrapperStyle({isRightIcon: true})}>
          {rightIcon || <IconCheck/>}
        </RightIconWrapper>
      )}
    </SelectPrimitive.Item>
  )
})
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    className={clsx(
      "h-px !my-2 bg-neutral-200 -mx-2"
      , className)}
    ref={ref}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator ,
}