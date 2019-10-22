import React from 'react';
import { shallow } from 'enzyme';
import Splits from '../';

describe('Splits', () => {
  it('should render', () => {
    const wrapper = shallow(<Splits />);
    expect(wrapper).toBeDefined();
  })
});
