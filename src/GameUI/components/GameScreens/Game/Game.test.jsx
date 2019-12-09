/* eslint-disable no-console */
import React from 'react';
import { render } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Game from './index';

const mockStore = configureStore([]);

jest.mock('../../../../Game/Game.ts', () => {
  return {
    A: true,
    B: false
  };
});

describe('Game tests', () => {
  test('Game rendering correctly with lowest score', () => {
    const store = mockStore({
      game: {
        score: 0,
        time: 300
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Game rendering correctly with low score', () => {
    const store = mockStore({
      game: {
        score: 30,
        time: 300
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Game rendering correctly with normal score', () => {
    const store = mockStore({
      game: {
        score: 50,
        time: 300
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Game rendering correctly with high score', () => {
    const store = mockStore({
      game: {
        score: 70,
        time: 300
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Game rendering correctly with highest score', () => {
    const store = mockStore({
      game: {
        score: 100,
        time: 300
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
