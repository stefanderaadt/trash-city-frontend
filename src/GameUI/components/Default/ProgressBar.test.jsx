import React from 'react';
import { shallow } from 'enzyme';

import ProgressBar from './ProgressBar';

describe('ProgressBar tests', () => {
  test('ProgressBar component rendering as expected', () => {
    const wrapper = shallow(<ProgressBar progress={78} />);
    expect(wrapper).toMatchSnapshot();
  });
});
