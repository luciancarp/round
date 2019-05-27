import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import styled from 'styled-components'

import StyledLink from './StyledLink'

const StyledButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

export default class BackButton extends React.Component {
  render() {
    let text = 'Go Back'
    if (this.props.text) {
      text = this.props.text
    }
    return (
      <Wrapper>
        <StyledLink noHorizPadLeft to={this.props.path}>
          <StyledButtonContent>
            <IoIosArrowBack />
            {text}
          </StyledButtonContent>
        </StyledLink>
      </Wrapper>
    )
  }
}
