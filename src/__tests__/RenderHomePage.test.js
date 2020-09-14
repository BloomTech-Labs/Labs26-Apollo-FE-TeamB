import RenderHomePage from '../components/pages/Home/RenderHomePage';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { apolloReducer } from '../state/reducers/apolloReducer';

const store = createStore(apolloReducer, applyMiddleware(thunk, logger));

describe('<RenderHomePage /> test suite', () => {
  test('it handles a loading state', () => {
    const authService = {
      logout: jest.fn(),
    };
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <RenderHomePage
            userInfo={{ name: 'Sara' }}
            authService={authService}
          />
        </Router>
      </Provider>
    );
    const button = getByText(/Sign Out/i);
    userEvent.click(button);
    expect(authService.logout).toHaveBeenCalledTimes(1);
    expect(getByText(/hello, sara/i).innerHTML).toBe('Hello, Sara');
  });
});
