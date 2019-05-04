import React from 'react'
import styled from 'styled-components'

import { palette } from '../../styles/styles'

const StyledButton = styled.button`
  text-decoration: none;
  color: ${props => props.selected ? `${palette.primaryColor}` : `${palette.text}`};
  border: none;
  background: none;
  font-family: inherit;
  font-size: inherit;

  -webkit-transition: color 0.2s; /* Safari */
  transition: color 0.2s;
  transition-timing-function: ease-out;

  &:focus, &:visited, &:link, &:active {
      text-decoration: none;
  }

  &:focus, &:target, &:active {
    color: ${palette.primaryColor};
  }

  &:focus {
    outline: none;
  }

  &:hover {
      color: ${palette.primaryColor};
  }
`

export default (props) => <StyledButton {...props} />
