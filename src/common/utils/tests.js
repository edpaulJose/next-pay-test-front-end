
import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'

export const mockStore = configureStore([thunk])

export const withProviders = ({ store, children }) => (
  <Provider store={store}>
    {children}
  </Provider>
)

export * from '@testing-library/react'