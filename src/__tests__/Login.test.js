import React from 'react';
import { shallow } from 'enzyme';
import Login from '../components/login/Login';

describe('<App />', () => {
  it('Has main tag', () => {
    const outer = shallow(<Login />).dive().dive().dive().dive();
    expect(outer.find('main').exists()).toBe(true);
  });
});