import React from 'react'
import styled from 'styled-components'

import spinner from '../../assets/spinner.gif'

const StyledSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh / 4 * 2);

  transition: opacity 0.1s;
  transition-timing-function: ease-out;

  // enter from
  &.fade-enter {
    opacity: 0;
  }

  // enter to
  &.fade-enter-active {
    opacity: 1;
  }

  // exit from
  &.fade-exit {
    opacity: 1;
  }

  // exit to
  &.fade-exit-active {
    opacity: 0;
  }
`

export default class Spinner extends React.Component {
  render() {
    return (
      <StyledSpinner>
        <img
          src={spinner}
          style={{ width: '100px', margin: 'auto', display: 'block' }}
          alt='Loading...'
        />
      </StyledSpinner>
    )
  }
}
