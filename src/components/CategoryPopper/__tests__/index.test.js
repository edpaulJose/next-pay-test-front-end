import React from "react";
import { cleanup, render, waitFor, fireEvent } from "@testing-library/react";
import { mockStore, withProviders } from "../../../common/utils/tests";
import '@testing-library/jest-dom/extend-expect'
import CategoryPopper from "..";

import MOCK_CATEGORIES from '../../../api/MOCK_DATA/categories.json'

const COMPONENT_ID = 'UnitTest-CategoryPopper'

let wrapper
let props
let state
let store
let onApply

beforeEach(() => {
  props = {
    id: COMPONENT_ID,
    open: true,
    anchorEl: document.createElement('button')
  }
  state = {
    category: {
      dataList: MOCK_CATEGORIES
    },
    thirdParty: {
      filter: {
        categories: [],
        field: '',
      }
    }
  }
  store = mockStore(() => state)
  onApply = jest.fn()
})

afterEach(cleanup)

const getWrapper = (props = {}) => {
  wrapper = render(
    withProviders({
      children: <CategoryPopper {...props} />,
      store,
    })
  )
}

describe('<CategoryPopper />', () => {
  it('should render CategoryPopper', async () => {
    await getWrapper(props)
    const { container } = wrapper
    waitFor(() => expect(container.querySelector(`#${COMPONENT_ID}`)).toBeInTheDocument())
  })
  it('should display correct number of checkbox categories', async () => {
    await getWrapper(props)
    const { getAllByRole } = wrapper
    const checkboxes = getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(MOCK_CATEGORIES.length)
  })
  it('should check a clicked category checkbox', async () => {
    await getWrapper(props)
    const { getAllByRole } = wrapper
    const checkboxes = getAllByRole('checkbox')
    const checkbox = checkboxes[0]
    await waitFor(() => expect(checkbox).not.toBeChecked())
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })
  it('should trigger onApply once on one click', async () => {
    props = {
      ...props,
      onApply,
    }
    await getWrapper(props)
    const { getByText, getAllByRole } = wrapper
    const checkboxes = getAllByRole('checkbox')
    const checkbox = checkboxes[0]
    fireEvent.click(checkbox)
    await waitFor(() => expect(checkbox).toBeChecked())
    const applyButton = getByText('Apply')
    fireEvent.click(applyButton)
    expect(onApply).toHaveBeenCalledTimes(1)
  })
  it('should trigger onApply once on Clear All click, and uncheck category checkbox', async () => {
    props = {
      ...props,
      onApply,
    }
    await getWrapper(props)
    const { getByText, getAllByRole } = wrapper
    const checkboxes = getAllByRole('checkbox')
    const checkbox = checkboxes[0]
    fireEvent.click(checkbox)
    await waitFor(() => expect(checkbox).toBeChecked())
    const clearAllButton = getByText('Clear all')
    fireEvent.click(clearAllButton)
    await waitFor(() => expect(checkbox).not.toBeChecked())
    expect(onApply).toHaveBeenCalledTimes(1)
  })
  it('should uncheck all checked category checkbox on clicking clear button', async () => {
    await getWrapper(props)
    const { getByText, getAllByRole } = wrapper
    const checkboxes = getAllByRole('checkbox')
    const checkbox1 = checkboxes[0]
    const checkbox2 = checkboxes[2]
    fireEvent.click(checkbox1)
    fireEvent.click(checkbox2)
    await waitFor(() => expect(checkbox1).toBeChecked())
    await waitFor(() => expect(checkbox2).toBeChecked())
    const clearAllButton = getByText('Clear')
    fireEvent.click(clearAllButton)
    await waitFor(() => expect(checkbox1).not.toBeChecked())
    await waitFor(() => expect(checkbox2).not.toBeChecked())
  })
})