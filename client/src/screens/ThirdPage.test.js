import React from 'react'
import { shallow } from 'enzyme'
import ThirdPage from './ThirdPage'

it('should render correctly with no props', () => {
  const component = shallow(<ThirdPage />)
  expect(component).toMatchSnapshot()
})
