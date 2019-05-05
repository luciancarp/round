import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { palette, spaces } from '../../styles/styles'

const StyledError = styled.div`
  padding-bottom: ${spaces.narrow}px;
  color: ${palette.error};
`

const ErrorMsg = ({ error, msg }) => {
  return (
    <span>
      {error && (<StyledError>{msg}</StyledError>)}
    </span>
  )
}

ErrorMsg.propTypes = {
  msg: PropTypes.string.isRequired,
  error: PropTypes.string
}

export default ErrorMsg
