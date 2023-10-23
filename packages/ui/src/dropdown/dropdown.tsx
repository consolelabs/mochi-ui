import * as React from "react"
import * as DropdownMenuPrimitive  from "@radix-ui/react-dropdown-menu"
import clsx from "clsx"
import type { ReactNode } from "react";
import IconChevron from "../icons/components/icon-chevron";
import IconCheck from "../icons/components/icon-check";
import type {
  DropdownContentRef,
  DropdownContentProps,
  DropdownSubContentRef,
  DropdownSubContentProps,
  DropdownSubTriggerRef,
  DropdownSubTriggerProps,
  DropdownItemRef,
  DropdownLabelProps,
  DropdownLabelRef,
  BaseDropdownItemProps,
  DropdownItemProps,
  DropdownRadioItemRef,
  DropdownRadioItemProps,
  DropdownRadioGroupRef,
  DropdownRadioGroupProps
} from "./type";
import { getDropdownContentStyle, getDropdownItemStyle, getIconStyle } from "./utils"

function renderDropdownChildItem (props: BaseDropdownItemProps & { defaultRightIcon?: ReactNode, useIndicator?: boolean }) {
    const { children, subTitle, leftIcon, isLeftIconAvatar, className, rightExtra, rightIcon, defaultRightIcon, useIndicator } = props
    const RightIconWrapper = useIndicator ? DropdownMenuPrimitive.ItemIndicator: 'span'

    return (
        <>
        {Boolean(leftIcon) && (
            <span className={getIconStyle({isLeftIconAvatar})}>
              {leftIcon}
            </span>
          )}
          <div className={clsx("ui-flex-1 ui-py-0.5 ui-flex ui-flex-col", className)}>
            {children}
            <span className={clsx("ui-text-neutral-600 ui-text-xs")}>
              {subTitle}
            </span>
          </div>
          {rightExtra}
          {rightIcon ? (
            <RightIconWrapper className={getIconStyle({isRightIcon: true})}>
              {rightIcon}
            </RightIconWrapper>
          ): defaultRightIcon && (
            <RightIconWrapper className={getIconStyle({isRightIcon: true})}>
              {defaultRightIcon}
            </RightIconWrapper>
          )}
        </>
    )
}

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = React.forwardRef<
  DropdownRadioGroupRef,
  DropdownRadioGroupProps
>(({onChange, ...restProps}, ref) => (
    <DropdownMenuPrimitive.RadioGroup
      onValueChange={onChange}
      ref={ref}
      {...restProps}
    />
))
DropdownMenuRadioGroup.displayName = DropdownMenuPrimitive.RadioGroup.displayName

const DropdownMenuSubTrigger = React.forwardRef<
  DropdownSubTriggerRef,
  DropdownSubTriggerProps
>((props, ref) => {
  const {
    className,
    children,
    leftIcon,
    isLeftIconAvatar,
    rightExtra,
    rightIcon,
    hasPaddingLeft,
    disabled,
    asChild,
    subTitle,
    ...resetProps
  } = props
  return (
    <DropdownMenuPrimitive.SubTrigger
      asChild={asChild}
      className={getDropdownItemStyle({hasPaddingLeft, disabled, className})}
      disabled={disabled}
      ref={ref}
      {...resetProps}
    >
      {asChild ? children : 
      renderDropdownChildItem({children, subTitle, leftIcon, isLeftIconAvatar, rightExtra, rightIcon, className, defaultRightIcon: <IconChevron className="-ui-rotate-90 ui-text-neutral-500"/>})
      }
    </DropdownMenuPrimitive.SubTrigger>
  )
})
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  DropdownSubContentRef,
  DropdownSubContentProps
>((props, ref) => {
  const { hasShadow, isRounded, className } = props

  return (
    <DropdownMenuPrimitive.SubContent
      className={getDropdownContentStyle({hasShadow, isRounded, className})}
      ref={ref}
      {...props}
    />
  )
})
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  DropdownContentRef,
  DropdownContentProps
>(({ className, sideOffset = 4, hasShadow, isRounded , ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      className={getDropdownContentStyle({hasShadow, isRounded, className})}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  DropdownItemRef,
  DropdownItemProps
>((props, ref) => {
  const { 
    children,
    hasPaddingLeft,
    className,
    leftIcon,
    isLeftIconAvatar = false,
    rightExtra,
    onClick,
    disabled,
    rightIcon,
    asChild,
    subTitle,
    wrapperClassName,
    ...restProps
  } = props

  return (
    <DropdownMenuPrimitive.Item
      asChild={asChild}
      className={getDropdownItemStyle({hasPaddingLeft, disabled, className: wrapperClassName})}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault()
        onClick?.(e)
      }}
      ref={ref}
      {...restProps}
    >
      {asChild ? children:
        renderDropdownChildItem({children, leftIcon, isLeftIconAvatar, rightExtra, rightIcon, className, subTitle})
      }
    </DropdownMenuPrimitive.Item>
  )
})
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuRadioItem = React.forwardRef<
  DropdownRadioItemRef,
  DropdownRadioItemProps
>((props, ref) => {
  const {
    asChild,
    hasPaddingLeft,
    disabled,
    children,
    leftIcon,
    isLeftIconAvatar,
    rightExtra,
    rightIcon,
    className,
    subTitle,
    onChange,
    wrapperClassName,
    ...restProps
  } = props
  return (
    <DropdownMenuPrimitive.RadioItem
      asChild={asChild}
      className={clsx(
        getDropdownItemStyle({hasPaddingLeft, disabled, className: wrapperClassName}),
      )}
      disabled={disabled}
      // Using onChange for integrate with Hook Form
      onSelect={(e) => {
        e.preventDefault()
        onChange?.(e)
      }}
      ref={ref}
      {...restProps}
    >
      {asChild ? children:
        renderDropdownChildItem({children, leftIcon, isLeftIconAvatar, rightExtra, rightIcon, defaultRightIcon: <IconCheck className="ui-text-primary-700"/>, className, subTitle, useIndicator: true})
      }
    </DropdownMenuPrimitive.RadioItem>
  )
})
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  DropdownLabelRef,
  DropdownLabelProps
>((props, ref) => {

  const {
    className,
    hasPaddingLeft,
    disabled,
    leftIcon,
    isLeftIconAvatar,
    rightIcon,
    rightExtra,
    asChild,
    children,
    subTitle,
    wrapperClassName,
    ...restProps
  } = props

  return (
    <DropdownMenuPrimitive.Label
      asChild={asChild}
      className={getDropdownItemStyle({hasPaddingLeft, disabled, className: clsx(wrapperClassName, "ui-pointer-events-none")})}
      ref={ref}
      {...restProps}
    >
    {asChild? children: 
      renderDropdownChildItem({children, leftIcon, isLeftIconAvatar, rightExtra, rightIcon, className, subTitle})
    }
    </DropdownMenuPrimitive.Label>
  )
})
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    className={clsx(
      "ui-h-px !ui-my-2 ui-bg-neutral-200 -ui-mx-2",
      className
    )}
    ref={ref}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

export {
  DropdownMenu, // done
  DropdownMenuTrigger, // done
  DropdownMenuLabel, // done
  DropdownMenuItem, // done
  DropdownMenuContent, // done
  DropdownMenuSeparator, // done
  DropdownMenuGroup, // done
  DropdownMenuPortal, // done
  DropdownMenuSub, // done
  DropdownMenuSubTrigger, //done
  DropdownMenuSubContent, // done
  DropdownMenuRadioItem, //
  DropdownMenuRadioGroup, //
}
