import React from 'react'
import styled from 'styled-components'

import { palette, spaces } from '../../styles/styles'

const StyledSelect = styled.select`
  padding: ${spaces.narrow}px;
  border-style: solid;
  border-width: 2px 2px 2px 2px;
  border-radius: 5px 5px 5px 5px; 
  border-color: ${palette.text};
  background: ${palette.darkBackgroundColor};
  font-family: inherit;
  font-size: inherit;
  color: ${palette.text};
  margin-bottom: ${spaces.narrow}px;
  width: 100%;

  -webkit-transition: border-color 0.2s; /* Safari */
  transition: border-color 0.2s;
  transition-timing-function: ease-out;

  &:focus {
    border-color: ${palette.primaryColor};
    outline: none;
    background: ${palette.darkBackgroundColor};
  }

  &::placeholder {
    color: ${palette.darkText};
  }

  &:hover {
    border-color: ${palette.primaryColor};
  }

`

export default (props) => <StyledSelect {...props} />
