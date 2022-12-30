import React from 'React';
import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import regeneratorRuntime from 'regenerator-runtime';
import renderer from 'react-test-renderer';

import reducers from '../../reducers';

test('reducers', () => {
  let state;
  state = reducers(undefined, {});
  expect(state).toEqual({ counter: { value: 1 } });
});
