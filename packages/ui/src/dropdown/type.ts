import type { VariantProps } from "class-variance-authority"
import type { ReactNode, ComponentPropsWithoutRef, ElementRef } from "react"
import type * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import type { getDropdownContentStyle, getDropdownItemStyle } from "./utils"

export type BaseDropDownItemStyle = VariantProps<typeof getDropdownItemStyle>

export type BaseDropdownContentStyleProps = VariantProps<typeof getDropdownContentStyle>

export interface BaseDropdownItemProps extends BaseDropDownItemStyle {
    leftIcon?: ReactNode
    rightExtra?: ReactNode
    rightIcon?: ReactNode
    className?: string
    children: ReactNode
    subTitle?: ReactNode
    isLeftIconAvatar?: boolean
    wrapperClassName?: string
}
export type DropdownItemRef = ElementRef<typeof DropdownMenuPrimitive.Item>
export type DropdownItemProps = 
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
    & BaseDropdownItemProps

export type DropdownLabelRef = ElementRef<typeof DropdownMenuPrimitive.Label>
export type DropdownLabelProps = 
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
    & BaseDropdownItemProps

export type DropdownSubTriggerRef = ElementRef<typeof DropdownMenuPrimitive.SubTrigger>
export type DropdownSubTriggerProps = 
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
    & BaseDropdownItemProps

export type DropdownContentRef = ElementRef<typeof DropdownMenuPrimitive.Content>
export type DropdownContentProps =
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
    & BaseDropdownContentStyleProps

export type DropdownSubContentRef = ElementRef<typeof DropdownMenuPrimitive.SubContent>
export type DropdownSubContentProps =
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
    & BaseDropdownContentStyleProps

export type DropdownRadioItemRef = ElementRef<typeof DropdownMenuPrimitive.RadioItem>
export type DropdownRadioItemProps = Omit<
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>,
    'onChange'
    >
    & BaseDropdownItemProps & {
        onChange?: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>['onSelect']
    }

export type DropdownRadioGroupRef = ElementRef<typeof DropdownMenuPrimitive.RadioGroup>
export type DropdownRadioGroupProps = Omit<
        ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup>,
        'onValueChange'| 'onChange'
    >
    & {
        onChange?: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup>['onValueChange'],
    }
