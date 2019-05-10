import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/app/App';

describe('<App />', () => {
  it('Cookie provider', () => {
    const outer = shallow(<App />).dive().dive().dive();
    expect(outer.find('CookiesProvider').exists()).toBe(true);
  });
});