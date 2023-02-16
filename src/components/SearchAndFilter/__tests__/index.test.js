import React from "react";
import { cleanup, render, waitFor, fireEvent } from "@testing-library/react";
import { mockStore, withProviders } from "../../../common/utils/tests";
import '@testing-library/jest-dom/extend-expect'
import SearchAndFilter from "..";

const COMPONENT_ID = 'UnitTest-SearchAndFilter'

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
      dataList: []
    },
    thirdParty: {
      filter: {
        categories: [],
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
      children: <SearchAndFilter {...props} />,
      store,
    })
  )
}

describe('<SearchAndFilter />', () => {
  it('should render SearchAndFilter', async () => {
    await getWrapper(props)
    const { container } = wrapper
    await waitFor(() => expect(container.querySelector(`#${COMPONENT_ID}`)).toBeInTheDocument())
  })
  it('should display categories popper upon filter button click', async () => {
    await getWrapper(props)
    const { getByRole } = wrapper
    fireEvent.click(getByRole('button'))
    const categoryPopper = getByRole('tooltip')
    expect(categoryPopper).toBeInTheDocument()
  })
  it('should hide categories popper upon filter button click for the 2nd time', async () => {
    await getWrapper(props)
    const { getByText, queryByTestId } = wrapper
    const filterButton = getByText('Filter')
    fireEvent.click(filterButton)
    expect(queryByTestId('SearchAndFilter-CategoryPopper-test')).toBeTruthy()
    fireEvent.click(filterButton)
    expect(queryByTestId('SearchAndFilter-CategoryPopper-test')).toBeFalsy()
  })
})