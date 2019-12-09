/* eslint-disable no-console */
import React from 'react';
import { mount, render } from 'enzyme';

import { Screens } from '../../../../../../enums.ts';
import Score from '.';

jest.mock('../../../../../../Game/Game.ts', () => {
  return {};
});

describe('Score popup tests', () => {
  test('Score mainmenu button working as expected', () => {
    let screen;
    const wrapper = mount(
      <Score
        game={{
          score: 0,
          time: 300
        }}
        setScreen={s => {
          screen = s;
        }}
        score={{
          scoreName: 'test',
          highScores: [
            { id: '1245215215g', name: 'Stefan', score: 182 },
            { id: '12455215g', name: 'Naam', score: 12 }
          ],
          fetchingHighScores: false,
          fetchedHighScores: true,
          savingScore: false,
          savedScore: false
        }}
      />
    );
    const button = wrapper.find('.popup-button-mainmenu').first();
    button.simulate('click');
    expect(screen).toEqual(Screens.MainMenu);
  });

  test('Score mainmenu button working as expected', () => {
    let name;
    const wrapper = mount(
      <Score
        game={{
          score: 0,
          time: 300
        }}
        score={{
          scoreName: 'not the right name',
          highScores: [
            { id: '1245215215g', name: 'Stefan', score: 182 },
            { id: '12455215g', name: 'Naam', score: 12 }
          ],
          fetchingHighScores: false,
          fetchedHighScores: true,
          savingScore: false,
          savedScore: false
        }}
        setScoreName={n => {
          name = n;
        }}
      />
    );
    const input = wrapper.find('.popup-score-name-input').first();
    input.simulate('change', { target: { value: 'testname' } });
    expect(name).toEqual('testname');
  });

  test('Score rendering correctly with fetchingHighScores = true', () => {
    const wrapper = render(
      <Score
        game={{
          score: 0,
          time: 300
        }}
        score={{
          scoreName: 'nameeee',
          highScores: [
            { id: '1245215215g', name: 'Stefan', score: 182 },
            { id: '12455215g', name: 'Naam', score: 12 }
          ],
          fetchingHighScores: true,
          fetchedHighScores: false,
          savingScore: false,
          savedScore: false
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Score rendering correctly with fetchedHighScores = false', () => {
    const wrapper = render(
      <Score
        game={{
          score: 0,
          time: 300
        }}
        score={{
          scoreName: 'nameeee',
          highScores: [
            { id: '1245215215g', name: 'Stefan', score: 182 },
            { id: '12455215g', name: 'Naam', score: 12 }
          ],
          fetchingHighScores: false,
          fetchedHighScores: false,
          savingScore: false,
          savedScore: false
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
