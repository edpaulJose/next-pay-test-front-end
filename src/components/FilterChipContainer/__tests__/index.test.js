import React from "react";
import { cleanup, render, waitFor, fireEvent } from "@testing-library/react";
import { mockStore, withProviders } from "../../../common/utils/tests";
import '@testing-library/jest-dom/extend-expect'
import FilterChipContainer from "..";

import MOCK_CATEGORIES from '../../../api/MOCK_DATA/categories.json'

const COMPONENT_ID = 'UnitTest-FilterChipContainer'

const MOCK_SELECTED_CATEGORIES = [
  {
    "id": "222",
    "label": "Bookkeeping",
    "status": "active"
  },
  {
    "id": "555",
    "label": "eCommerce",
    "status": "active"
  },
]

let wrapper
let props
let state
let store

beforeEach(() => {
  props = {
    id: COMPONENT_ID,
  }
  state = {
    category: {
      dataList: MOCK_CATEGORIES
    },
    thirdParty: {
      filter: {
        categories: MOCK_SELECTED_CATEGORIES,
        field: '',
      }
    }
  }
  store = mockStore(() => state)
})

afterEach(cleanup)

const getWrapper = (props = {}) => {
  wrapper = render(
    withProviders({
      children: <FilterChipContainer {...props} />,
      store,
    })
  )
}

describe('<FilterChipContainer />', () => {
  it('should render FilterChipContainer', async () => {
    await getWrapper(props)
    const { container } = wrapper
    await waitFor(() => expect(container.querySelector(`#${COMPONENT_ID}`)).toBeInTheDocument())
  })
  it('should not render FilterChipContainer for empty selectedCategories', async () => {
    state = {
      ...state,
      thirdParty: {
        filter: {
          categories: [],
        }
      }
    }
    await getWrapper(props)
    const { container } = wrapper
    await waitFor(() => expect(container.querySelector(`#${COMPONENT_ID}`)).toBeFalsy())
  })
  it('should display correct count of category FilterChip', async () => {
    await getWrapper(props)
    const { getAllByText } = wrapper
    const filterChips = getAllByText(/Category/i)
    expect(filterChips).toHaveLength(MOCK_SELECTED_CATEGORIES.length)
  })
  it('should display correct count of category filters after deleting one category filter', async () => {
    await getWrapper(props)
    const { getAllByRole } = wrapper
    const filterButtonChips = getAllByRole('button')
    fireEvent.click(filterButtonChips[0])
    expect(store.getActions().find(({ type }) =>
      type === 'thirdParty/updateCategoryFilter').payload
    ).toHaveLength(MOCK_SELECTED_CATEGORIES.length - 1)
  })
})