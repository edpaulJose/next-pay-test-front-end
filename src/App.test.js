import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react";
import { mockStore, withProviders } from "./common/utils/tests";
import '@testing-library/jest-dom/extend-expect'
import App from './App'

let wrapper
let state
let store

beforeEach(() => {
  state = {
    category: {
      dataList: []
    },
    thirdParty: {
      dataList: [],
      pagination: {
        total: 0,
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

const getWrapper = () => {
  wrapper = render(
    withProviders({
      children: <App />,
      store,
    })
  )
}

describe('<App />', () => {
  it('should render App', async () => {
    await getWrapper()
    const { container } = wrapper
    await waitFor(() => expect(container.querySelector('[data-cid="App-root"]')).toBeInTheDocument())
  })
})