/* eslint-disable no-console */
import React from 'react';
import { mount } from 'enzyme';

import { Screens } from '../../../../../enums.ts';
import Pause from './Pause';

let resumed = false;

jest.mock('../../../../../Game/Game.ts', () => {
  return {
    resume: () => {
      resumed = true;
    }
  };
});

describe('Pause popup tests', () => {
  test('Pause mainmenu button working as expected', () => {
    let screen;
    const wrapper = mount(
      <Pause
        setScreen={s => {
          screen = s;
        }}
      />
    );
    const button = wrapper.find('.popup-button-mainmenu').first();
    button.simulate('click');
    expect(screen).toEqual(Screens.MainMenu);
  });

  test('Pause resume button working as expected', () => {
    const wrapper = mount(<Pause setScreen={() => {}} />);
    const button = wrapper.find('.popup-button-resume').first();
    button.simulate('click');
    expect(resumed).toBeTruthy();
  });
});
