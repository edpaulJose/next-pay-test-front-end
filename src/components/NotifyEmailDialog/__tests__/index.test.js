import React from "react";
import { cleanup, render, waitFor, fireEvent } from "@testing-library/react";
import { mockStore, withProviders } from "../../../common/utils/tests";
import '@testing-library/jest-dom/extend-expect'
import NotifyEmailDialog from "..";

const COMPONENT_ID = 'UnitTest-NotifyEmailDialog'

let wrapper
let props
let state
let store
let onClose
let onNotify

beforeEach(() => {
  props = {
    id: COMPONENT_ID,
    open: true,
  }
  state = {}
  store = mockStore(() => state)
  onClose = jest.fn()
  onNotify = jest.fn()
})

afterEach(cleanup)

const getWrapper = (props = {}) => {
  wrapper = render(
    withProviders({
      children: <NotifyEmailDialog {...props} />,
      store,
    })
  )
}

describe('<NotifyEmailDialog />', () => {
  it('should render NotifyEmailDialog', async () => {
    await getWrapper(props)
    const { queryByRole } = wrapper
    await waitFor(() => expect(queryByRole('dialog')).toBeTruthy())
  })
  it('should not render NotifyEmailDialog for false open props', async () => {
    await getWrapper({ ...props, open: false })
    const { queryByRole } = wrapper
    await waitFor(() => expect(queryByRole('dialog')).toBeFalsy())
  })
  it('should trigger close in NotifyEmailDialog if Never mind button is clicked', async () => {
    await getWrapper({ ...props, onClose })
    const { getByRole, getByText } = wrapper
    const emailField = getByRole('textbox', { name: 'Email' })
    await waitFor(() => expect(emailField).toHaveDisplayValue(''))
    fireEvent.change(emailField, { target: { value: 'name@email.com' } })
    await waitFor(() => expect(emailField).toHaveDisplayValue('name@email.com'))
    fireEvent.click(getByText('Never mind'))
    await waitFor(() => expect(emailField).toHaveDisplayValue(''))
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1))
  })
  it('should trigger Notify in NotifyEmailDialog if Notify me button is clicked', async () => {
    await getWrapper({ ...props, onNotify })
    const { getByRole, getByText } = wrapper
    const emailField = getByRole('textbox', { name: 'Email' })
    await waitFor(() => expect(emailField).toHaveDisplayValue(''))
    fireEvent.blur(emailField, { target: { value: 'name' } })
    await waitFor(() => expect(emailField).toBeInvalid())
    fireEvent.blur(emailField, { target: { value: 'name@email.com' } })
    await waitFor(() => expect(emailField).toBeValid())
    fireEvent.click(getByText('Notify me'))
    await waitFor(() => expect(emailField).toHaveDisplayValue(''))
    await waitFor(() => expect(onNotify).toHaveBeenCalledTimes(1))
  })
  it('should disable notify me button for empty textfield', async () => {
    await getWrapper(props)
    const { getByRole, getByText } = wrapper
    const emailField = getByRole('textbox', { name: 'Email' })
    fireEvent.change(emailField, { target: { value: 'name@email.com' } })
    const notifyMeButton = getByText('Notify me')
    await waitFor(() => expect(notifyMeButton).not.toBeDisabled())
    fireEvent.change(emailField, { target: { value: '' } })
    await waitFor(() => expect(notifyMeButton).toBeDisabled())
  })
})