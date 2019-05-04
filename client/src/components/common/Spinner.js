import React from 'react'
import styled from 'styled-components'

import spinner from '../../assets/spinner.gif'

const StyledSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 225px);
`

export default () => {
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
