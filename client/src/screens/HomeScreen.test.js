import React from 'react'
import { shallow } from 'enzyme'
import HomeScreen from './HomeScreen'

it('should render correctly with no props', () => {
  const component = shallow(<HomeScreen />)
  expect(component).toMatchSnapshot()
})
