import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react";
import { mockStore, withProviders } from "../../../common/utils/tests";
import '@testing-library/jest-dom/extend-expect'
import PageInformation from "..";

const COMPONENT_ID = 'UnitTest-PageInformation'

let wrapper
let props
let state
let store

beforeEach(() => {
  props = {
    id: COMPONENT_ID,
  }
  state = {
    thirdParty: {
      pagination: {
        total: 21,
        rowsPerPage: 10,
        currentPage: 0,
      }
    }
  }
  store = mockStore(() => state)
})

afterEach(cleanup)

const getWrapper = (props = {}) => {
  wrapper = render(
    withProviders({
      children: <PageInformation {...props} />,
      store,
    })
  )
}

describe('<PageInformation />', () => {
  it('should render PageInformation', async () => {
    await getWrapper(props)
    const { container } = wrapper
    await waitFor(() => expect(container.querySelector(`#${COMPONENT_ID}`)).toBeInTheDocument())
  })
  it('should not render PageInformation for 0 total pagination', async () => {
    state = {
      thirdParty: {
        pagination: {
          total: 0,
          rowsPerPage: 10,
          currentPage: 0,
        }
      }
    }
    await getWrapper(props)
    const { container } = wrapper
    await waitFor(() => expect(container.querySelector(`#${COMPONENT_ID}`)).not.toBeInTheDocument())
  })
  it('should display correct page information', async () => {
    state = {
      thirdParty: {
        pagination: {
          total: 21,
          rowsPerPage: 10,
          currentPage: 1,
        }
      }
    }
    await getWrapper(props)
    const { container } = wrapper
    await waitFor(() => expect(container.querySelector(`#${COMPONENT_ID}`)).toHaveTextContent(/^Showing 11-20 of 21 apps$/))
  })
})