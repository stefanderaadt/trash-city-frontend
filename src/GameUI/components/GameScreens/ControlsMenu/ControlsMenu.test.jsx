/* eslint-disable no-console */
import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { Screens } from '../../../../enums.ts';
import MainMenu from './index';
import { setScreen } from '../../../../actions/appActions';

const mockStore = configureStore([]);

describe('ControlsMenu tests', () => {
  test('ControlsMenu setPage levels calling the right action and properties', () => {
    const store = mockStore({});

    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <MainMenu />
      </Provider>
    );
    const button = wrapper.find('.controls-menu-back-button').first();
    button.simulate('click');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(setScreen(Screens.MainMenu));
  });
});
