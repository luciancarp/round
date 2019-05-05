import React from 'react'
import styled from 'styled-components'

// import { spaces } from '../../styles/styles'

const StyledImage = styled.img`
  border-radius: 25px;
  height: ${props => props.big ? '100' : `50`}px;
  width: ${props => props.big ? '100' : `50`}px;
`

export default class BackButton extends React.Component {
  render () {
    return (
      <StyledImage
        src={this.props.src}
        alt=''
      />
    )
  }
}
