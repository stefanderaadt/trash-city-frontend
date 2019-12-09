/* eslint-disable no-console */
import React from 'react';
import { render } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import App from './App';
import { Screens } from '../../enums.ts';

const mockStore = configureStore([]);

jest.mock('../../Game/Game.ts', () => {
  return {
    A: true,
    B: false
  };
});

describe('App tests', () => {
  test('App rendering loading screen correctly', () => {
    const store = mockStore({
      app: {
        activeScreen: Screens.Loading
      },
      loading: {
        progress: 80
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('App rendering main menu correctly', () => {
    const store = mockStore({
      app: {
        activeScreen: Screens.MainMenu
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('App rendering controls menu correctly', () => {
    const store = mockStore({
      app: {
        activeScreen: Screens.ControlsMenu
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('App rendering settings menu correctly', () => {
    const store = mockStore({
      app: {
        activeScreen: Screens.SettingsMenu
      },
      settings: {
        volume: 50
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('App rendering game ui correctly', () => {
    const store = mockStore({
      app: {
        activeScreen: Screens.Game
      },
      game: {
        score: 34,
        time: 300
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('App rendering levels ui correctly', () => {
    const store = mockStore({
      app: {
        activeScreen: Screens.LevelMenu
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
