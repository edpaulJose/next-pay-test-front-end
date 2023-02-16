import React from "react";
import { cleanup, render, waitFor, fireEvent } from "@testing-library/react";
import { mockStore, withProviders } from "../../../../common/utils/tests";
import '@testing-library/jest-dom/extend-expect'
import ThirdPartyCard from "..";

import MOCK_CATEGORIES from '../../../../api/MOCK_DATA/categories.json'

const COMPONENT_ID = 'UnitTest-ThirdPartyCard'

let wrapper
let props
let state
let store
let onNotify = jest.fn()

beforeEach(() => {
  props = {
    id: COMPONENT_ID,
  }
  state = {
    category: {
      dataList: MOCK_CATEGORIES
    }
  }
  store = mockStore(() => state)
})

afterEach(cleanup)

const getWrapper = (props = {}) => {
  wrapper = render(
    withProviders({
      children: <ThirdPartyCard {...props} />,
      store,
    })
  )
}

describe('<ThirdPartyCard />', () => {
  it('should render ThirdPartyCard', async () => {
    await getWrapper(props)
    const { container } = wrapper
    await waitFor(() => expect(container.querySelector(`#${COMPONENT_ID}`)).toBeInTheDocument())
  })
  it('should display all correct third party information', async () => {
    const title = 'Test Title'
    const description = 'Test Description'
    const toRegex = (str) => new RegExp(`\^${str}\$`)
    await getWrapper({
      ...props,
      title,
      categoryIds: ['111', '222'],
      description,
    })
    const { getByText } = wrapper
    await waitFor(() => expect(getByText(toRegex(title))).toBeTruthy())
    await waitFor(() => expect(getByText(toRegex(description))).toBeTruthy())
    await waitFor(() => expect(getByText(toRegex('Accounting,Bookkeeping'))).toBeTruthy())
  })
  it('should trigger onNotifyClick once after clicking Notify me when it\'s ready button', async () => {
    await getWrapper({
      ...props,
      onNotifyClick: onNotify,
    })
    const { getByRole } = wrapper
    fireEvent.click(getByRole('button'))
    expect(onNotify).toHaveBeenCalledTimes(1)
  })
})