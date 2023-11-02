import { cva } from "class-variance-authority";


export const getSelectItemStyle = cva(
    [
        "flex gap-2 items-center",
        "transition duration-100",
        "text-sm rounded-md"
    ],{
        variants: {
            disabled: {
                true: [
                    "pointer-events-none",
                    "text-neutral-600"
                ],
                false: ["text-neutral-800"]
            },
            isTrigger: {
                false: [
                    "font-medium ",
                    "hover:bg-neutral-150",
                    "hover:outline-none focus:outline-none",
                    "cursor-pointer",
                    "p-2 "
                ],
                true: [
                    "px-2 py-1.5",
                    "font-semibold",
                    "shadow-sm"
                ]
            }
        },
        defaultVariants: {
            disabled: false,
            isTrigger: false
        },
        compoundVariants: [

        ]
    }
)

export const getIconWrapperStyle = cva(
    "", {
        variants: {
            isRightIcon: {
                true: "text-base max-w-4 max-h-4 text-neutral-500",
                false: "text-2xl max-w-6 max-h-6 text-inherit"
            }
        },
        defaultVariants: {
            isRightIcon: false
        }
    }
)