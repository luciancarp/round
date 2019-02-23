import React from 'react'
import { shallow } from 'enzyme'
import SecondPage from './SecondPage'

it('should render correctly with no props', () => {
  const component = shallow(<SecondPage />)
  expect(component).toMatchSnapshot()
})
