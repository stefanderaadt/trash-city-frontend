/* eslint-disable no-console */
import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { Screens } from '../../../../enums.ts';
import MainMenu from './index';
import { setScreen } from '../../../../actions/appActions';

const mockStore = configureStore([]);

describe('MainMenu tests', () => {
  test('MainMenu setPage levels calling the right action and properties', () => {
    const store = mockStore({});

    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <MainMenu />
      </Provider>
    );
    const button = wrapper.find('.main-menu-levels-button').first();
    button.simulate('click');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(setScreen(Screens.LevelMenu));
  });

  test('MainMenu setPage controls calling the right action and properties', () => {
    const store = mockStore({});

    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <MainMenu />
      </Provider>
    );
    const button = wrapper.find('.main-menu-controls-button').first();
    button.simulate('click');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(setScreen(Screens.ControlsMenu));
  });

  test('MainMenu setPage settings calling the right action and properties', () => {
    const store = mockStore({});

    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <MainMenu />
      </Provider>
    );
    const button = wrapper.find('.main-menu-settings-button').first();
    button.simulate('click');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(setScreen(Screens.SettingsMenu));
  });

  test('MainMenu window.location.href settings the right URL', () => {
    const store = mockStore({});

    global.window = Object.create(window);

    const wrapper = mount(
      <Provider store={store}>
        <MainMenu />
      </Provider>
    );
    const button = wrapper.find('.main-menu-close-button').first();
    button.simulate('click');

    expect(expect(window.location.href).toEqual('http://localhost/'));
  });
});
