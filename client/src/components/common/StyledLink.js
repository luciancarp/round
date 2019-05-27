import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { palette, spaces } from '../../styles/styles'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props =>
    props.selected ? `${palette.primaryColor}` : `${palette.text}`};
  padding: ${spaces.narrow}px;
  padding-left: ${props =>
    props.noHorizPadLeft ? `0px` : `${spaces.narrow}px`};
  padding-right: ${props =>
    props.noHorizPadRight ? `0px` : `${spaces.narrow}px`};

  -webkit-transition: color 0.2s; /* Safari */
  transition: color 0.2s;
  transition-timing-function: ease-out;

  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover {
    color: ${palette.primaryColor};
  }
`

export default props => <StyledLink {...props} />
