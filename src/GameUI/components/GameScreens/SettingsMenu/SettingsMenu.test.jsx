/* eslint-disable no-console */
import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { Screens } from '../../../../enums.ts';
import SettingsMenu from './index';
import { setScreen } from '../../../../actions/appActions';

const mockStore = configureStore([]);

describe('SettingsMenu tests', () => {
  test('SettingsMenu rangeslider having a function', () => {
    const store = mockStore({
      settings: {
        volume: 50
      }
    });

    const wrapper = mount(
      <Provider store={store}>
        <SettingsMenu />
      </Provider>
    );
    const rangeSlider = wrapper.find('.settings-volume-rangeslider').first();
    const props = rangeSlider.props();
    expect(props.onChange).toEqual(expect.any(Function));
  });

  test('SettingsMenu setPage mainmenu calling the right action and properties', () => {
    const store = mockStore({
      settings: {
        volume: 50
      }
    });

    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <SettingsMenu />
      </Provider>
    );
    const button = wrapper.find('.settings-menu-back-button').first();
    button.simulate('click');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(setScreen(Screens.MainMenu));
  });
});
