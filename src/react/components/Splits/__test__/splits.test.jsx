import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Splits from '..';

describe('Splits', () => {
  const initialState = {
    timerReducer: {
      splits: [],
    },
  };

  it('should render', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    const wrapper = shallow(<Splits store={store} />);

    expect(wrapper).toBeDefined();
  });
});
