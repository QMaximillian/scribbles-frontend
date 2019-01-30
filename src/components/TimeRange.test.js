import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import TimeRange from './TimeRange'


Enzyme.configure({ adapter: new Adapter() })

describe('<TimeRange />', () => {
  it('renders a component called TimeRange', () => {
    const wrapper = shallow(<TimeRange />)

    expect(wrapper.exists()).toBe(true)
  })
});
