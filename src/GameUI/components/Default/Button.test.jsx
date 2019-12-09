import React from 'react';
import { shallow, mount } from 'enzyme';

import Button from './Button';

describe('Button tests', () => {
  test('Button component rendering as expected', () => {
    const wrapper = shallow(<Button onClick={() => {}} className="test-button" />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Button component rendering as expected with fullwidth set', () => {
    const wrapper = shallow(<Button fullwidth onClick={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Button component rendering as expected with busy set', () => {
    const wrapper = shallow(<Button busy onClick={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Button component rendering as expected with disabled set', () => {
    const wrapper = shallow(<Button disabled onClick={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Button click works as expected', () => {
    let clicked = false;
    const wrapper = mount(
      <Button
        onClick={() => {
          clicked = true;
        }}
      />
    );
    wrapper.simulate('click');
    expect(clicked).toBeTruthy();
  });

  test('Button click works as expected with disabled set', () => {
    let clicked = false;
    const wrapper = mount(
      <Button
        disabled
        onClick={() => {
          clicked = true;
        }}
      />
    );
    wrapper.simulate('click');
    expect(clicked).toBeFalsy();
  });

  test('Button click works as expected with busy set', () => {
    let clicked = false;
    const wrapper = mount(
      <Button
        busy
        onClick={() => {
          clicked = true;
        }}
      />
    );
    wrapper.simulate('click');
    expect(clicked).toBeFalsy();
  });
});
