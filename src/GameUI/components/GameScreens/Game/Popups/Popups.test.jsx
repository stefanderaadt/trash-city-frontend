/* eslint-disable no-console */
import React from 'react';
import { render, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { Popups, Screens } from '../../../../../enums.ts';
import PopupsComponent from './index';
import { setScreen } from '../../../../../actions/appActions';
import { setScoreName, saveHighScore } from '../../../../../actions/scoreActions';

const mockStore = configureStore([]);

jest.mock('../../../../../Game/Game.ts', () => {
  return {};
});

describe('Popups tests', () => {
  test('Popups rendering no popups when `Popups.None` is set', () => {
    const store = mockStore({
      game: {
        currentPopup: Popups.None
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <PopupsComponent />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Popups rendering pause Popup correctly', () => {
    const store = mockStore({
      game: {
        currentPopup: Popups.Pause
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <PopupsComponent />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Popups rendering score Popup correctly', () => {
    const store = mockStore({
      game: {
        score: 0,
        time: 300,
        currentPopup: Popups.Score
      },
      score: {
        scoreName: 'nameeee',
        highScores: [
          { id: '1245215215g', name: 'Stefan', score: 182 },
          { id: '12455215g', name: 'Naam', score: 12 }
        ],
        fetchingHighScores: false,
        fetchedHighScores: true,
        savingScore: false,
        savedScore: false
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <PopupsComponent />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Popups rendering info Popup correctly', () => {
    const store = mockStore({
      game: {
        currentPopup: Popups.Info
      },
      level: {
        name: 'LEVEL 1',
        goal: 'Level doel'
      }
    });

    const wrapper = render(
      <Provider store={store}>
        <PopupsComponent />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Popups setPage calling the right action', () => {
    const store = mockStore({
      game: {
        score: 0,
        time: 300,
        currentPopup: Popups.Score
      },
      score: {
        scoreName: 'nameeee',
        highScores: [
          { id: '1245215215g', name: 'Stefan', score: 182 },
          { id: '12455215g', name: 'Naam', score: 12 }
        ],
        fetchingHighScores: false,
        fetchedHighScores: false,
        savingScore: false,
        savedScore: false
      }
    });

    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <PopupsComponent />
      </Provider>
    );
    const button = wrapper.find('.popup-button-mainmenu').first();
    button.simulate('click');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(setScreen(Screens.MainMenu));
  });
});
