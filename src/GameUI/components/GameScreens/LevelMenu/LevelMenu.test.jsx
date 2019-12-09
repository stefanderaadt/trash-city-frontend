/* eslint-disable no-console */
import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { Screens } from '../../../../enums.ts';
import LevelMenu from './index';
import { setScreen } from '../../../../actions/appActions';

const mockStore = configureStore([]);

let levelId;

jest.mock('../../../../Game/Game.ts', () => {
  return {
    pickLevel: id => {
      levelId = id;
    }
  };
});

describe('LevelMenu tests', () => {
  test('LevelMenu pickLevel working as expected', () => {
    const store = mockStore({});

    const wrapper = mount(
      <Provider store={store}>
        <LevelMenu />
      </Provider>
    );
    const levelItem = wrapper.find('.game-screen-level-item').first();
    levelItem.simulate('click');
    expect(levelId).toEqual(1);
  });

  test('LevelMenu setPage calling the right action', () => {
    const store = mockStore({});

    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <LevelMenu />
      </Provider>
    );
    const button = wrapper.find('.level-picker-mainmenu-button').first();
    button.simulate('click');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(setScreen(Screens.MainMenu));
  });
});
