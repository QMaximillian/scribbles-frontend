import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow, mount } from 'enzyme'
import Time from './Time'

Enzyme.configure({ adapter: new Adapter() })

describe('<Time />', () => {
  it('renders a component called Time', () => {
    const props = []
    const wrapper = mount(<Time /> (...props))

    expect(wrapper.exists()).toBe(true)
  })
});
