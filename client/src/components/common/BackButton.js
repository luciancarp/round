import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import styled from 'styled-components'

import StyledLink from './StyledLink'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

export default class BackButton extends React.Component {
  render () {
    return (
      <StyledLink to={this.props.path}>
        <Wrapper>
          <IoIosArrowBack />Go Back
        </Wrapper>
      </StyledLink>
    )
  }
}
