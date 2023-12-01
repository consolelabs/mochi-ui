import { SectionBase } from '~cpn/MochiWidget/TokenPicker/type'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  SectionList,
} from '@consolelabs/core'
import Link from 'next/link'
import { Fragment } from 'react'
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
      'flex w-full text-left !px-2 !py-3 bg-white-pure text-neutral-800 !font-normal hover:text-black'

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
      <h3 className="py-2 text-sm text-neutral-600">{section.title}</h3>
    ) : null

  return (
    <Accordion
      type="multiple"
      className="!p-0 !text-neutral-900 rounded-none shadow-none"
    >
      <AccordionItem value="1">
        <AccordionTrigger
          wrapperClassName="!px-2 !py-3"
          className="text-base !text-neutral-800 !font-normal"
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
