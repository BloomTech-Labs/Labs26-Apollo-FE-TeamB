import RenderHomePage from '../components/pages/Home/RenderHomePage';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from '../state/store';
import { Provider } from 'react-redux';
import { screen } from '@testing-library/react';

describe('<RenderHomePage /> test suite', () => {
  test('it handles a loading state', () => {
    const authService = {
      logout: jest.fn(),
    };
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <RenderHomePage authService={authService} />
        </Router>
      </Provider>
    );
  });
});
