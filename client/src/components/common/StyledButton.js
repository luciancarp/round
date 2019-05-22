import React from 'react'
import styled from 'styled-components'

import { palette, spaces, fontSizes } from '../../styles/styles'

const StyledButton = styled.button`
  cursor: pointer;
  text-decoration: none;
  color: ${props =>
    props.selected ? `${palette.primaryColor}` : `${palette.text}`};
  border: none;
  background: none;
  font-family: inherit;
  font-size: ${props => (props.big ? `${fontSizes.subTitle}px` : `inherit`)};
  padding: ${props => (props.narrow ? `5px` : `${spaces.narrow}px`)};
  padding-top: ${spaces.narrow}px;
  padding-bottom: ${spaces.narrow}px;

  -webkit-transition: color 0.2s, text-shadow 0.2s; /* Safari */
  transition: color 0.2s, text-shadow 0.2s;
  transition-timing-function: ease-out;

  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:focus,
  &:target {
    color: ${palette.primaryColor};
  }

  &:active {
    text-shadow: 0 0 3px ${palette.primaryColor};
  }

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${palette.primaryColor};
  }
`

export default props => <StyledButton {...props} />
