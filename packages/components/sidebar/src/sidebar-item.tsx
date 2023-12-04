import type { ReactNode, Attributes, MouseEventHandler } from 'react'
import { createElement } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@mochi-ui/accordion'
import { sidebar } from '@mochi-ui/theme'

export interface Item {
  title: string
  Icon?: (props: any) => JSX.Element
  selected?: boolean
  type?: 'list' | 'button' | 'link'
  as?: React.ComponentType<any>
  href?: string
  pattern?: RegExp
  children?: Item[]
  onClick?: MouseEventHandler
  badge?: ReactNode
  disabled?: boolean
  className?: string
}

interface SidebarItemProps {
  item: Item
  expanded: boolean
  className?: string
  selected?: boolean
}

const {
  sidebarItemIconClsx,
  sidebarItemTitleWrapperClsx,
  sidebarItemTitleClsx,
  sidebarItemTitleBadgeClsx,
  sidebarItemAccordionClsx,
  sidebarItemAccordionTriggerClsx,
  sidebarItemAccordionWrapperClsx,
  sidebarItemAccordionTriggerTitleClsx,
  sidebarItemAccordionContentWrapperClsx,
  sidebarItemAccordionContentClsx,
  classNamePropClsx,
} = sidebar

export default function SidebarItem({
  item,
  expanded,
  className,
  selected,
}: SidebarItemProps) {
  const {
    className: customClassName,
    disabled,
    badge,
    title,
    Icon,
    href,
    as,
    type,
    children = [],
    ...props
  } = item

  const renderTitle = (
    <>
      {Icon !== undefined && (
        <div>
          <Icon
            className={sidebarItemIconClsx({ selected, disabled })}
            height={22}
            width={22}
          />
        </div>
      )}
      {expanded ? (
        <div className={sidebarItemTitleWrapperClsx()}>
          <span className={sidebarItemTitleClsx({ disabled })}>{title}</span>
          {Boolean(badge) && (
            <span className={sidebarItemTitleBadgeClsx()}>{badge}</span>
          )}
        </div>
      ) : null}
    </>
  )

  if (type === 'list') {
    return (
      <Accordion
        className={sidebarItemAccordionClsx()}
        disabled={disabled}
        type="multiple"
      >
        <AccordionItem value={title}>
          <AccordionTrigger
            className={sidebarItemAccordionTriggerClsx()}
            rightIcon={expanded ? null : true}
            wrapperClassName={sidebarItemAccordionWrapperClsx({
              expanded,
              className,
              customClassName,
              selected,
            })}
          >
            <div className={sidebarItemAccordionTriggerTitleClsx({ expanded })}>
              {renderTitle}
            </div>
          </AccordionTrigger>
          <AccordionContent
            className={sidebarItemAccordionContentWrapperClsx()}
            hasPadding={false}
          >
            {children.map((child, index) => (
              <SidebarItem
                className={sidebarItemAccordionContentClsx({
                  className,
                  customClassName,
                })}
                expanded={expanded}
                item={child}
                key={`${index} ${child.title}`}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

  const classNameProp = classNamePropClsx({
    disabled,
    className,
    customClassName,
    selected,
  })

  if (type === 'link' && href) {
    const isAbsolute = href.startsWith('http')
    if (as) {
      return createElement(
        as,
        {
          className: classNameProp,
          href,
          ...(isAbsolute ? { target: '_blank', rel: 'noopener' } : {}),
          ...props,
          disabled,
        } as Attributes,
        [renderTitle],
      )
    }

    return (
      <a className={classNameProp} {...props} href={href}>
        {renderTitle}
      </a>
    )
  }

  return (
    <button
      className={classNameProp}
      type="button"
      {...props}
      disabled={disabled}
    >
      {renderTitle}
    </button>
  )
}
