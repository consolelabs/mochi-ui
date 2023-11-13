import type { RenderResult } from '@testing-library/react'
import { render, fireEvent } from '@testing-library/react'
import { Checkbox } from '../src/checkbox'

const CHECKBOX_ROLE = 'checkbox'
const INDICATOR_TEST_ID = 'checkbox-indicator'

describe('given a default Checkbox', () => {
  let rendered: RenderResult
  let checkbox: HTMLElement
  let indicator: HTMLElement | null

  beforeEach(() => {
    rendered = render(<Checkbox />)
    checkbox = rendered.getByRole(CHECKBOX_ROLE)
    indicator = rendered.queryByTestId(INDICATOR_TEST_ID)
  })

  describe('when clicking the checkbox', () => {
    beforeEach(async () => {
      fireEvent.click(checkbox)
      indicator = rendered.queryByTestId(INDICATOR_TEST_ID)
    })
    describe('and clicking the checkbox again', () => {
      beforeEach(async () => {
        fireEvent.click(checkbox)
      })

      it('should remove the indicator', () => {
        expect(indicator).not.toBeInTheDocument()
      })
    })
  })
})

describe('given an uncontrolled `checked` Checkbox', () => {
  let rendered: RenderResult
  let checkbox: HTMLElement
  let indicator: HTMLElement | null
  const onCheckedChange = jest.fn()

  beforeEach(() => {
    rendered = render(<Checkbox defaultChecked onChange={onCheckedChange} />)
    checkbox = rendered.getByRole(CHECKBOX_ROLE)
    indicator = rendered.queryByTestId(INDICATOR_TEST_ID)
  })

  describe('when clicking the checkbox', () => {
    beforeEach(async () => {
      fireEvent.click(checkbox)
    })

    it('should remove the indicator', () => {
      expect(indicator).not.toBeInTheDocument()
    })

    it('should call `onCheckedChange` prop', () => {
      expect(onCheckedChange).toHaveBeenCalled()
    })
  })
})

describe('given a controlled `checked` Checkbox', () => {
  let rendered: RenderResult
  let checkbox: HTMLElement
  const onCheckedChange = jest.fn()

  beforeEach(() => {
    rendered = render(<Checkbox checked onChange={onCheckedChange} />)
    checkbox = rendered.getByRole(CHECKBOX_ROLE)
  })

  describe('when clicking the checkbox', () => {
    beforeEach(() => {
      fireEvent.click(checkbox)
    })

    it('should call `onCheckedChange` prop', () => {
      expect(onCheckedChange).toHaveBeenCalled()
    })
  })
})
