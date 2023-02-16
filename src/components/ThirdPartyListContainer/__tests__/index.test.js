import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react";
import { mockStore, withProviders } from "../../../common/utils/tests";
import '@testing-library/jest-dom/extend-expect'
import ThirdPartyListContainer from "..";

import MOCK_CATEGORIES from '../../../api/MOCK_DATA/categories.json'
import MOCK_THIRD_PARTY_LIST from '../../../api/MOCK_DATA/thirdPartyLis.json'

const COMPONENT_ID = 'UnitTest-ThirdPartyListContainer'

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
      dataList: MOCK_THIRD_PARTY_LIST.slice(0, 10),
      pagination: {
        total: MOCK_THIRD_PARTY_LIST.length,
        rowsPerPage: 10,
        currentPage: 0,
      },
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
      children: <ThirdPartyListContainer {...props} />,
      store,
    })
  )
}

describe('<ThirdPartyListContainer />', () => {
  it('should render ThirdPartyListContainer', async () => {
    await getWrapper(props)
    const { container } = wrapper
    await waitFor(() => expect(container.querySelector(`#${COMPONENT_ID}`)).toBeInTheDocument())
  })
  it('should not \"We can\’t seem to find what you\’re looking for.\" for empty ThirdParty', async () => {
    state = {
      ...state,
      thirdParty: {
        ...state.thirdParty,
        dataList: [],
        pagination: {
          total: 0,
        }
      }
    }
    await getWrapper(props)
    const { getByText } = wrapper
    expect(getByText(/^We can\’t seem to find what you\’re looking for.$/)).toBeTruthy()
  })
  it('should display 10 thirdparty in page 1', async () => {
    await getWrapper(props)
    const { getAllByTestId } = wrapper
    expect(getAllByTestId('ThirdPartyCard-root-test')).toHaveLength(10)
  })
})