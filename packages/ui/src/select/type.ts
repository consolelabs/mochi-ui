import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react";
import type * as SelectPrimitive from '@radix-ui/react-select'

type ReplaceOnValueChangeByOnChange<
    T extends {onValueChange?: any}
> = Omit<T, 'onValueChange'> & {
    onChange?: T['onValueChange']
}


export type SelectProps =
    ReplaceOnValueChangeByOnChange<ComponentPropsWithoutRef<typeof SelectPrimitive.Root>>

export type SelectItemRef = ElementRef<typeof SelectPrimitive.Item>
export type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    subTitle?: ReactNode
    useIndicator?: boolean
    extraRight?: ReactNode
}

export type SelectTriggerRef = ElementRef<typeof SelectPrimitive.Trigger>
export type SelectTriggerProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    hideRightIcon?: boolean
}