import { SectionBase } from '~cpn/MochiWidget/TokenPicker/type'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from '@mochi-ui/core'
import Link from 'next/link'
import { Fragment } from 'react'
import { SectionList } from '~cpn/base/section-list'
import { NavItem } from './type'

type MobileAccordionItem = SectionBase<NavItem>

interface MobileNavAccordion {
  label: string
  items?: MobileAccordionItem[]
}

export const MobileNavAccordionItem = (props: MobileNavAccordion) => {
  const { label, items = [] } = props

  const itemRenderer = (item: NavItem) => {
    if (item.component) return item.component
    const wrapperClassName =
      'flex w-full text-left !px-2 !py-3 bg-transparent text-text-primary !font-normal'

    const LinkWrapper = item.href ? Link : Fragment

    return (
      <Button
        variant="link"
        color="neutral"
        className={wrapperClassName}
        onClick={item.onClick}
      >
        <LinkWrapper
          className="flex flex-1 gap-3 items-center h-full"
          href={item.href as any}
        >
          {item.iconLeft && <span className="text-xl">{item.iconLeft}</span>}
          {item.label}
        </LinkWrapper>
      </Button>
    )
  }

  const renderItemSection = (section: MobileAccordionItem) =>
    section.title ? (
      <h3 className="py-2 text-sm text-text-disabled">{section.title}</h3>
    ) : null

  return (
    <Accordion
      type="multiple"
      className="!p-0 !text-text-primary rounded-none shadow-none bg-transparent"
    >
      <AccordionItem value="1">
        <AccordionTrigger
          wrapperClassName="!px-2 !py-3"
          className="text-base !text-text-primary !font-normal"
        >
          {label}
        </AccordionTrigger>
        <AccordionContent className="mt-1 !px-1 !py-0 gap-1">
          <SectionList
            sections={items}
            renderItem={itemRenderer}
            renderSectionHeader={renderItemSection}
            rootClassName=""
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
