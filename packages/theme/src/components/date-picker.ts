const wrapper = 'rounded space-y-3'

const wrapperMdPadding = 'p-3'

const wrapperLgPadding = 'p-3'

const table = 'w-full border-collapse'

const headRow = 'flex text-xs'

const headCell = [
  'font-normal',
  'h-8 w-8',
  'flex',
  'items-center',
  'justify-center',
  'text-neutral-800',
  'tracking-tight',
].join(' ')

const row = 'flex w-full mt-1'

const cell = [
  'block',
  'h-fit',
  'w-fit',
  'p-0',
  'text-neutral-800',
  '[&:has(>.day-range-middle)]:bg-neutral-150',
  '[&:has(>.day-range-start)]:rounded-l-full',
  '[&:has(>.day-range-start)]:bg-neutral-150',
  '[&:has(>.day-range-end)]:rounded-r-full',
  '[&:has(>.day-range-end)]:bg-neutral-150',
  '[&:has(>.day-range-middle)]:first:!rounded-l-full',
  '[&:has(>.day-range-middle)]:last:!rounded-r-full',
].join(' ')

const day = [
  'h-8 w-8',
  'relative',
  'text-xs',
  'rounded-full',
  'transition',
  'duration-100',
  'hover:bg-neutral-150',
  // indicator
  'relative',
  'after:w-1',
  'after:h-1',
  'after:hidden',
  'after:absolute',
  'after:rounded-full',
  'after:bg-primary-700',
  'after:left-1/2',
  'after:bottom-0.5',
  'after:-translate-x-1/2',
].join(' ')

const dayRangeStart = 'day-range-start'

const dayRangeEnd = 'day-range-end'

const dayRangeMiddle = 'day-range-middle'

const dayToday = 'font-semibold after:!block'

const dayOutSide = 'text-neutral-400'

const dayDisabled = 'text-neutral-400'

const dayHidden = 'invisible'

const daySelect = [
  'bg-primary-700',
  'text-white',
  'hover:bg-primary-700',
  '[&.day-range-middle]:bg-transparent',
  '[&.day-range-middle]:text-neutral-800',
  'after:bg-white',
  '[&.day-range-middle]:after:bg-primary-700',
].join(' ')

// Captions
const dayPickerCaption = {
  label: ['text-sm', 'fone-medium', 'flex items-center', 'gap-1'].join(' '),
  icon: 'text-xl',
  layout: 'w-full flex justify-between',
  buttonGroup: 'flex gap-2',
  wrapper: 'w-full h-fit mb-3',
}

const dayPicker = {
  wrapper,
  wrapperLgPadding,
  wrapperMdPadding,
  day,
  row,
  cell,
  dayDisabled,
  dayHidden,
  dayOutSide,
  dayRangeEnd,
  dayRangeStart,
  dayRangeMiddle,
  dayToday,
  daySelect,
  table,
  headRow,
  headCell,
}

export { dayPicker, dayPickerCaption }
