/* eslint-disable no-console */
import React from 'react';
import { mount } from 'enzyme';

import Info from './Info';

let gameStarted = false;

jest.mock('../../../../../Game/Game.ts', () => {
  return {
    startGame: () => {
      gameStarted = true;
    }
  };
});

describe('Info popup tests', () => {
  test('Info gameStart button working as expected', () => {
    const wrapper = mount(<Info level={{ name: 'Test', goal: 'Test1234' }} />);
    const button = wrapper.find('.popup-button-start').first();
    button.simulate('click');
    expect(gameStarted).toBeTruthy();
  });
});
